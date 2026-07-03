import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/modules/marketing';
import { LoginPage, SignupPage } from '@/modules/auth';
import { DashboardPage, MembersPage } from '@/modules/projects';
import { ProjectWorkspacePage } from '@/modules/workspace';
import { BillingSettingsPage } from '@/modules/billing';
import { ProtectedRoute } from './ProtectedRoute';
import { paths } from './paths';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={paths.home} element={<HomePage />} />
      <Route path={paths.login} element={<LoginPage />} />
      <Route path={paths.signup} element={<SignupPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path={paths.dashboard} element={<DashboardPage />} />
        <Route path="/projects/:projectId" element={<ProjectWorkspacePage />} />
        <Route path="/projects/:projectId/members" element={<MembersPage />} />
        <Route path={paths.billing} element={<BillingSettingsPage />} />
      </Route>

      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
