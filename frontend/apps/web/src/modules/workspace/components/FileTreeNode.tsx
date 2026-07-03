import { ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { getFileBadge } from '@/lib/utils/file-badge';
import type { TreeNode } from '../workspace.types';

export function FileTreeNode({
  node,
  expandedPaths,
  selectedPath,
  onToggleFolder,
  onSelectFile,
}: {
  node: TreeNode;
  expandedPaths: string[];
  selectedPath: string | null;
  onToggleFolder: (path: string) => void;
  onSelectFile: (path: string) => void;
}) {
  const isExpanded = expandedPaths.includes(node.path);
  const isActive = node.type === 'file' && node.path === selectedPath;
  const badge = node.type === 'file' ? getFileBadge(node.name) : null;

  return (
    <div>
      <div
        onClick={() => (node.type === 'folder' ? onToggleFolder(node.path) : onSelectFile(node.path))}
        style={{ paddingLeft: 10 + node.depth * 16 + (node.type === 'file' ? 16 : 0) }}
        className={cn(
          'flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md py-1 pr-2.5 text-[13px]',
          isActive ? 'bg-[rgba(37,87,213,0.08)] text-ink' : node.type === 'folder' ? 'text-ink/80' : 'text-muted-fg',
          'hover:bg-[rgba(0,0,0,0.03)]'
        )}
      >
        {node.type === 'folder' &&
          (isExpanded ? (
            <ChevronDown className="h-3 w-3 shrink-0 text-faint-fg" />
          ) : (
            <ChevronRight className="h-3 w-3 shrink-0 text-faint-fg" />
          ))}
        {badge && (
          <span
            className="flex h-[15px] w-7 shrink-0 items-center justify-center rounded text-[8px] font-bold"
            style={{ background: `${badge.color}22`, color: badge.color }}
          >
            {badge.label}
          </span>
        )}
        <span className="overflow-hidden text-ellipsis">{node.name}</span>
      </div>

      {node.type === 'folder' && isExpanded && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.path}
              node={child}
              expandedPaths={expandedPaths}
              selectedPath={selectedPath}
              onToggleFolder={onToggleFolder}
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      )}
    </div>
  );
}
