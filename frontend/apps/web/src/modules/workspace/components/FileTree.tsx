import { useMemo } from 'react';
import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useGetFileTreeQuery } from '../workspace.api';
import { toggleFolder, selectFile } from '../workspace.slice';
import { buildFileTree } from '../lib/build-file-tree';
import { FileTreeNode } from './FileTreeNode';
import { Skeleton } from '@/components/ui/skeleton';

export function FileTree({ projectId }: { projectId: number }) {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetFileTreeQuery(projectId);
  const expandedPaths = useAppSelector((s) => s.workspaceUi.expandedPaths);
  const selectedPath = useAppSelector((s) => s.workspaceUi.selectedPath);

  const tree = useMemo(() => buildFileTree(data?.files.map((f) => f.path) ?? []), [data]);

  return (
    <div className="flex w-[240px] shrink-0 flex-col overflow-y-auto border-r border-border-subtle bg-action-card py-2.5">
      <div className="px-2.5 pb-2.5">
        <div className="flex items-center gap-1.5 rounded-md border border-border-subtle bg-canvas px-2.5 py-1.5 text-[12px] text-faint-fg">
          <Search className="h-3.5 w-3.5" />
          Search code
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-2 px-2.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      ) : (
        tree.map((node) => (
          <FileTreeNode
            key={node.path}
            node={node}
            expandedPaths={expandedPaths}
            selectedPath={selectedPath}
            onToggleFolder={(path) => dispatch(toggleFolder(path))}
            onSelectFile={(path) => dispatch(selectFile(path))}
          />
        ))
      )}
    </div>
  );
}
