import type { ProjectRole } from '@/store/permissions';

export interface ProjectSummaryResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  role: ProjectRole;
}

export interface ProjectResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectRequest {
  name: string;
}

export interface DeployResponse {
  previewUrl: string;
}

export interface MemberResponse {
  userId: number;
  username: string;
  name: string;
  projectRole: ProjectRole;
  invitedAt: string;
}

export interface InviteMemberRequest {
  username: string;
  role: ProjectRole;
}

export interface UpdateMemberRoleRequest {
  role: ProjectRole;
}
