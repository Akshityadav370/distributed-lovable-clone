export type ProjectRole = 'OWNER' | 'EDITOR' | 'VIEWER';

export type ProjectPermission = 'VIEW' | 'EDIT' | 'DELETE' | 'MANAGE_MEMBERS' | 'VIEW_MEMBERS';

/**
 * Client-side mirror of common-lib's ProjectRole -> ProjectPermission mapping.
 * UI-only gating (hide/disable actions) -- the server is the real enforcement
 * point and returns 403 for anything not actually allowed.
 */
const ROLE_PERMISSIONS: Record<ProjectRole, ProjectPermission[]> = {
  OWNER: ['VIEW', 'EDIT', 'DELETE', 'MANAGE_MEMBERS', 'VIEW_MEMBERS'],
  EDITOR: ['VIEW', 'EDIT', 'DELETE', 'VIEW_MEMBERS'],
  VIEWER: ['VIEW', 'VIEW_MEMBERS'],
};

export function hasPermission(role: ProjectRole | undefined, permission: ProjectPermission): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role].includes(permission);
}
