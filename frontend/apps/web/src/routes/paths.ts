export const paths = {
  home: '/',
  login: '/login',
  signup: '/signup',
  dashboard: '/dashboard',
  project: (projectId: number | string) => `/projects/${projectId}`,
  projectMembers: (projectId: number | string) => `/projects/${projectId}/members`,
  billing: '/settings/billing',
};
