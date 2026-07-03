import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import { useGetFileContentQuery } from '../workspace.api';
import { getFileBadge, getShikiLang } from '@/lib/utils/file-badge';
import { Skeleton } from '@/components/ui/skeleton';

export function CodeViewer({ projectId, path }: { projectId: number; path: string }) {
  const { data: content, isLoading } = useGetFileContentQuery({ projectId, path });
  const [html, setHtml] = useState<string | null>(null);
  const fileName = path.split('/').pop() ?? path;
  const badge = getFileBadge(fileName);

  useEffect(() => {
    if (content === undefined) return;
    let cancelled = false;
    codeToHtml(content, {
      lang: getShikiLang(fileName),
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    }).then((result) => {
      if (!cancelled) setHtml(result);
    });
    return () => {
      cancelled = true;
    };
  }, [content, fileName]);

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex h-[38px] shrink-0 items-center border-b border-border-subtle bg-code-surface">
        <div className="flex h-full items-center gap-2 border-r border-border-subtle border-t-2 border-t-accent-active bg-canvas px-3.5 text-[12.5px] text-ink">
          <span
            className="flex h-[15px] w-7 items-center justify-center rounded text-[8px] font-bold"
            style={{ background: `${badge.color}22`, color: badge.color }}
          >
            {badge.label}
          </span>
          {fileName}
        </div>
      </div>
      <div className="flex-1 overflow-auto font-mono text-[12.5px] leading-[1.7] [&_pre]:!bg-transparent [&_pre]:p-4">
        {isLoading || !html ? (
          <div className="flex flex-col gap-2 p-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-3.5 w-2/3" />
            ))}
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </div>
    </div>
  );
}
