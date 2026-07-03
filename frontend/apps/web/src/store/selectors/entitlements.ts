import { projectsApi } from '@/modules/projects/projects.api';
import { billingApi } from '@/modules/billing/billing.api';
import type { RootState } from '@/store';

/**
 * UX-only gating: combines the cached project count with the cached plan's
 * maxProjects. The backend remains the real enforcement point.
 */
export function selectCanCreateProject(state: RootState): boolean {
  const projects = projectsApi.endpoints.getProjects.select()(state).data;
  const subscription = billingApi.endpoints.getSubscription.select()(state).data;
  if (!projects || !subscription) return true;
  return projects.length < subscription.plan.maxProjects;
}
