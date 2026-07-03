import { useState, type KeyboardEvent } from 'react';
import { Plus, Mic, ChevronDown, ArrowUp, Square } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function Composer({
  isGenerating,
  onSend,
  onStop,
}: {
  isGenerating: boolean;
  onSend: (message: string) => void;
  onStop: () => void;
}) {
  const [value, setValue] = useState('');

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || isGenerating) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="px-4 pb-4 pt-3">
      <div className="rounded-[20px] border border-border-subtle bg-chat-bubble px-4 pb-3 pt-[15px] shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Lovable…"
          rows={1}
          className="mb-[18px] w-full resize-none bg-transparent text-[14px] text-ink placeholder:text-faint-fg outline-none"
        />
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-canvas text-ink shadow-[0_1px_0.5px_rgba(0,0,0,0.05),inset_0_-2px_1px_rgba(0,0,0,0.05)]">
            <Plus className="h-4 w-4" />
          </button>
          <div className="flex-1" />
          <div className="flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-[14px] font-semibold text-ink">
            Build
            <ChevronDown className="h-3.5 w-3.5" />
          </div>
          <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-canvas text-ink shadow-[0_1px_0.5px_rgba(0,0,0,0.05),inset_0_-2px_1px_rgba(0,0,0,0.05)]">
            <Mic className="h-4 w-4" />
          </button>
          <button
            onClick={isGenerating ? onStop : submit}
            disabled={!isGenerating && !value.trim()}
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-colors',
              isGenerating || value.trim() ? 'bg-accent' : 'bg-disabled-fill'
            )}
          >
            {isGenerating ? <Square className="h-3.5 w-3.5" fill="currentColor" /> : <ArrowUp className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
