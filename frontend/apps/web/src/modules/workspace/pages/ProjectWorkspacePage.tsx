import { useParams } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { useGetProjectQuery } from '@/modules/projects';
import { ChatPanel } from '@/modules/chat';
import { WorkspaceTopBar } from '../components/WorkspaceTopBar';
import { CodeCanvas } from '../components/CodeCanvas';
import { PreviewPane } from '../components/PreviewPane';

export function ProjectWorkspacePage() {
  const { projectId } = useParams<{ projectId: string }>();
  const id = Number(projectId);
  const { data: project } = useGetProjectQuery(id);
  const canvasMode = useAppSelector((s) => s.workspaceUi.canvasMode);
  const previewUrl = useAppSelector((s) => s.workspaceUi.previewUrlByProject[id] ?? null);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-canvas text-ink">
      <WorkspaceTopBar projectId={id} projectName={project?.name ?? 'Untitled project'} />

      <div className="flex min-h-0 flex-1">
        <ChatPanel projectId={id} />

        <div className="min-w-0 flex-1 p-0">
          <div className="flex h-full w-full overflow-hidden rounded-canvas border border-border-subtle bg-canvas">
            {canvasMode === 'code' ? <CodeCanvas projectId={id} /> : <PreviewPane previewUrl={previewUrl} />}
          </div>
        </div>
      </div>
    </div>
  );
}
