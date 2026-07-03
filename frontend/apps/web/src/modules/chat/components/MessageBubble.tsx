import { FileEdit } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAppDispatch } from '@/store/hooks';
import { selectFile } from '@/modules/workspace/workspace.slice';
import type { ChatResponse } from '../chat.types';

export function MessageBubble({ message }: { message: ChatResponse }) {
  const dispatch = useAppDispatch();
  const fileEdits = message.events.filter((e) => e.type === 'FILE_EDIT' && e.filePath);

  if (message.role === 'USER') {
    return (
      <div className="max-w-[86%] self-end rounded-[14px_14px_4px_14px] border border-border-subtle bg-chat-bubble px-4 py-3 text-[13.5px] leading-[1.55] text-ink">
        {message.content}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {message.content && (
        <div className="max-w-none px-0.5 text-[13.5px] leading-[1.6] text-muted-fg [&_a]:underline [&_code]:rounded [&_code]:bg-[rgba(0,0,0,0.06)] [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12px] [&_p]:m-0 [&_p+p]:mt-2">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
        </div>
      )}
      {fileEdits.map((event) => (
        <button
          key={event.id}
          onClick={() => event.filePath && dispatch(selectFile(event.filePath))}
          className="flex w-fit items-center gap-2 rounded-lg border border-border-subtle bg-action-card px-3 py-1.5 text-[12.5px] font-medium text-ink/80 hover:bg-[rgba(0,0,0,0.03)]"
        >
          <FileEdit className="h-3.5 w-3.5 text-faint-fg" />
          {event.filePath}
        </button>
      ))}
    </div>
  );
}
