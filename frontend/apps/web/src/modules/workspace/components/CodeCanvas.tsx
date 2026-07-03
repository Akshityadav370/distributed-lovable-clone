import { useAppSelector } from '@/store/hooks';
import { FileTree } from './FileTree';
import { CodeViewer } from './CodeViewer';

export function CodeCanvas({ projectId }: { projectId: number }) {
  const selectedPath = useAppSelector((s) => s.workspaceUi.selectedPath);

  return (
    <div className="flex h-full w-full">
      <FileTree projectId={projectId} />
      {selectedPath ? (
        <CodeViewer projectId={projectId} path={selectedPath} />
      ) : (
        <div className="flex flex-1 items-center justify-center text-[13px] text-faint-fg">
          Select a file to view its contents
        </div>
      )}
    </div>
  );
}
