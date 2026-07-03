import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/store/hooks';
import { useGetChatHistoryQuery, useStreamChatMutation, cancelChatStream } from '../chat.api';
import { MessageBubble } from './MessageBubble';
import { Composer } from './Composer';
import { Skeleton } from '@/components/ui/skeleton';

export function ChatPanel({ projectId }: { projectId: number }) {
  const { data: messages, isLoading } = useGetChatHistoryQuery(projectId);
  const [streamChat] = useStreamChatMutation();
  const isGenerating = useAppSelector((s) => s.chatUi.generatingByProject[projectId] ?? false);
  const error = useAppSelector((s) => s.chatUi.errorByProject[projectId]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const handleSend = (message: string) => {
    streamChat({ projectId, message });
  };

  return (
    <div className="flex w-[496px] shrink-0 flex-col">
      <div ref={scrollRef} className="flex flex-1 flex-col gap-[18px] overflow-y-auto px-4 py-6">
        {isLoading ? (
          <>
            <Skeleton className="ml-auto h-14 w-2/3 rounded-2xl" />
            <Skeleton className="h-10 w-full rounded-2xl" />
          </>
        ) : (
          messages?.map((message) => <MessageBubble key={message.id} message={message} />)
        )}
        {error && <p className="text-[12.5px] text-red-500">{error}</p>}
      </div>
      <Composer isGenerating={isGenerating} onSend={handleSend} onStop={() => cancelChatStream(projectId)} />
    </div>
  );
}
