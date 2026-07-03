import { api } from '@/store/api';
import { GATEWAY } from '@/lib/http/gateway';
import type { FileTreeDto } from './workspace.types';

const BASE = `${GATEWAY.workspace}/projects`;

export const workspaceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFileTree: builder.query<FileTreeDto, number>({
      query: (projectId) => `${BASE}/${projectId}/files`,
      providesTags: (_r, _e, projectId) => [{ type: 'FileTree', id: projectId }],
    }),
    getFileContent: builder.query<string, { projectId: number; path: string }>({
      query: ({ projectId, path }) => ({
        url: `${BASE}/${projectId}/files/content`,
        params: { path },
        // backend returns ResponseEntity<String> -> text/plain, not JSON
        responseHandler: 'text',
      }),
      providesTags: (_r, _e, { projectId, path }) => [{ type: 'FileContent', id: `${projectId}:${path}` }],
    }),
  }),
});

export const { useGetFileTreeQuery, useGetFileContentQuery } = workspaceApi;
