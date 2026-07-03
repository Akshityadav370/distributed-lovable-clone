import { Link } from 'react-router-dom';
import { ChevronDown, History, Box, Eye, Code2, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { paths } from '@/routes/paths';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setCanvasMode } from '../workspace.slice';
import { useDeployProjectMutation } from '@/modules/projects';

export function WorkspaceTopBar({ projectId, projectName }: { projectId: number; projectName: string }) {
  const dispatch = useAppDispatch();
  const canvasMode = useAppSelector((s) => s.workspaceUi.canvasMode);
  const user = useAppSelector((s) => s.auth.user);
  const [deployProject, { isLoading: isDeploying }] = useDeployProjectMutation();

  return (
    <div className="flex h-14 shrink-0 border-b border-border-subtle">
      <div className="flex w-[496px] shrink-0 items-center gap-2.5 px-4">
        <Link to={paths.dashboard} title="Back to dashboard" className="brand-mark h-[26px] w-[26px] shrink-0 rounded-md" />
        <div className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="truncate text-[13px] font-semibold text-ink">{projectName}</span>
          <span className="text-[11px] text-faint-fg">Previewing last saved version</span>
        </div>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-faint-fg" />
        <div className="ml-1.5 flex shrink-0 gap-3.5 text-faint-fg">
          <History className="h-4 w-4" />
          <Link to={paths.projectMembers(projectId)}>
            <Box className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 items-center gap-3.5 px-4">
        <div className="inline-flex items-center gap-0.5 rounded-2xl border border-border bg-canvas p-0.5 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">
          <button
            onClick={() => dispatch(setCanvasMode('preview'))}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-[13px] font-medium',
              canvasMode === 'preview'
                ? 'border border-accent-active bg-[linear-gradient(180deg,#EDF3FF,#CDDCFF)] text-accent-active'
                : 'text-muted-fg'
            )}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
          <button
            onClick={() => dispatch(setCanvasMode('code'))}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-[13px] font-medium',
              canvasMode === 'code'
                ? 'border border-accent-active bg-[linear-gradient(180deg,#EDF3FF,#CDDCFF)] text-accent-active'
                : 'text-muted-fg'
            )}
          >
            <Code2 className="h-3.5 w-3.5" />
            Code
          </button>
        </div>

        <div className="flex flex-1 justify-center">
          <div className="min-w-[300px] rounded-[13px] border border-border bg-chat-bubble px-3 py-1 text-[12px] text-muted-fg" />
        </div>

        <div className="flex items-center gap-2.5">
          <Avatar>
            <AvatarFallback>{user?.name?.[0]?.toUpperCase() ?? '?'}</AvatarFallback>
          </Avatar>
          <Button variant="primary" size="sm">
            <Share2 className="h-3.5 w-3.5" />
            Share
          </Button>
          <Button
            variant="accent"
            size="sm"
            disabled={isDeploying}
            onClick={() => deployProject(projectId)}
          >
            {isDeploying ? 'Publishing…' : 'Publish'}
          </Button>
        </div>
      </div>
    </div>
  );
}
