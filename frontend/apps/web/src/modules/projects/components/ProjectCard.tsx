import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';
import type { ProjectSummaryResponse } from '../projects.types';

export function ProjectCard({ project }: { project: ProjectSummaryResponse }) {
  return (
    <Link
      to={paths.project(project.id)}
      className="group flex flex-col gap-3 rounded-card border border-border-subtle bg-canvas p-5 transition-shadow hover:shadow-[0_4px_16px_rgba(16,24,40,0.06)]"
    >
      <div className="flex items-center justify-between">
        <span className="brand-mark h-8 w-8 rounded-lg" />
        <span className="rounded-full bg-[rgba(0,0,0,0.05)] px-2 py-0.5 text-[11px] font-medium text-muted-fg">
          {project.role}
        </span>
      </div>
      <div>
        <div className="truncate text-[15px] font-semibold text-ink">{project.name}</div>
        <div className="text-[12.5px] text-faint-fg">
          Updated {new Date(project.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}
