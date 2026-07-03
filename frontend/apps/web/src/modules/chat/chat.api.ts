import { api } from '@/store/api';
import { authedFetch } from '@/lib/http/authedFetch';
import { GATEWAY } from '@/lib/http/gateway';
import { parseSseStream } from './lib/sse-parser';
import { setGenerating, setError } from './chat.slice';
import type { ChatResponse, StreamResponse } from './chat.types';

const BASE = `${GATEWAY.intelligence}/chat`;

// AbortController isn't serializable, so in-flight stream controllers live
// here at module scope rather than in Redux state.
const activeStreams = new Map<number, AbortController>();

export function cancelChatStream(projectId: number) {
  activeStreams.get(projectId)?.abort();
}

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChatHistory: builder.query<ChatResponse[], number>({
      query: (projectId) => `${BASE}/projects/${projectId}`,
      providesTags: (_r, _e, projectId) => [{ type: 'ChatHistory', id: projectId }],
    }),

    streamChat: builder.mutation<void, { projectId: number; message: string }>({
      queryFn: () => ({ data: undefined }),
      async onCacheEntryAdded({ projectId, message }, { dispatch, cacheDataLoaded, cacheEntryRemoved }) {
        await cacheDataLoaded;

        dispatch(
          chatApi.util.updateQueryData('getChatHistory', projectId, (draft) => {
            draft.push({
              id: -Date.now(),
              role: 'USER',
              events: [],
              content: message,
              tokensUsed: null,
              createdAt: new Date().toISOString(),
            });
            draft.push({
              id: -Date.now() - 1,
              role: 'ASSISTANT',
              events: [],
              content: '',
              tokensUsed: null,
              createdAt: new Date().toISOString(),
            });
          })
        );

        const controller = new AbortController();
        activeStreams.set(projectId, controller);
        dispatch(setGenerating({ projectId, value: true }));
        dispatch(setError({ projectId, message: null }));

        try {
          const res = await authedFetch(`${BASE}/stream`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, projectId }),
            signal: controller.signal,
          });

          if (!res.ok || !res.body) {
            throw new Error(`Chat stream failed with status ${res.status}`);
          }

          for await (const rawFrame of parseSseStream(res.body)) {
            const chunk = JSON.parse(rawFrame) as StreamResponse;
            dispatch(
              chatApi.util.updateQueryData('getChatHistory', projectId, (draft) => {
                const last = draft[draft.length - 1];
                if (last) last.content += chunk.text;
              })
            );
          }

          // Refetch to reconcile with the persisted, typed-event version of
          // this exchange (THOUGHT/FILE_EDIT/TOOL_LOG events only exist on
          // the persisted history, not on the live text stream).
          dispatch(chatApi.util.invalidateTags([{ type: 'ChatHistory', id: projectId }]));
        } catch (err) {
          if ((err as Error).name !== 'AbortError') {
            dispatch(setError({ projectId, message: (err as Error).message }));
          }
        } finally {
          dispatch(setGenerating({ projectId, value: false }));
          activeStreams.delete(projectId);
        }

        await cacheEntryRemoved;
      },
    }),
  }),
});

export const { useGetChatHistoryQuery, useStreamChatMutation } = chatApi;
