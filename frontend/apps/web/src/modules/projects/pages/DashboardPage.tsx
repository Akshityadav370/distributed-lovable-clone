import { useState } from 'react';
import { useGetProjectsQuery } from '../projects.api';
import { useGetSubscriptionQuery } from '@/modules/billing';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectCard } from '../components/ProjectCard';
import { CreateProjectDialog } from '../components/CreateProjectDialog';

export function DashboardPage() {
  const { data: projects, isLoading } = useGetProjectsQuery();
  const { data: subscription } = useGetSubscriptionQuery();
  const [isCreateOpen, setCreateOpen] = useState(false);

  const canCreateProject = !projects || !subscription || projects.length < subscription.plan.maxProjects;

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-[26px] font-semibold tracking-tight text-ink">Your projects</h1>
            <p className="text-[14px] text-muted-fg">Pick up where you left off, or start something new.</p>
          </div>
          <Button variant="accent" size="lg" disabled={!canCreateProject} onClick={() => setCreateOpen(true)}>
            New project
          </Button>
        </div>

        {!canCreateProject && (
          <p className="mb-6 text-[12.5px] text-muted-fg">
            You've reached your plan's project limit — upgrade in Billing to create more.
          </p>
        )}

        {isLoading ? (
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-32 rounded-card" />
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-border py-20 text-center">
            <p className="mb-4 text-[14px] text-muted-fg">No projects yet.</p>
            <Button variant="accent" onClick={() => setCreateOpen(true)}>
              Create your first project
            </Button>
          </div>
        )}
      </div>

      <CreateProjectDialog open={isCreateOpen} onOpenChange={setCreateOpen} />
    </AppShell>
  );
}
