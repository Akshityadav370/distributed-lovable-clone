import { api } from '@/store/api';
import { GATEWAY } from '@/lib/http/gateway';
import { setPreviewUrl } from '@/modules/workspace/workspace.slice';
import type {
  DeployResponse,
  InviteMemberRequest,
  MemberResponse,
  ProjectRequest,
  ProjectResponse,
  ProjectSummaryResponse,
  UpdateMemberRoleRequest,
} from './projects.types';

const BASE = `${GATEWAY.workspace}/projects`;

export const projectsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectSummaryResponse[], void>({
      query: () => BASE,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Project' as const, id })), { type: 'Project' as const, id: 'LIST' }]
          : [{ type: 'Project' as const, id: 'LIST' }],
    }),
    getProject: builder.query<ProjectSummaryResponse, number>({
      query: (id) => `${BASE}/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation<ProjectResponse, ProjectRequest>({
      query: (body) => ({ url: BASE, method: 'POST', body }),
      invalidatesTags: [{ type: 'Project', id: 'LIST' }],
    }),
    updateProject: builder.mutation<ProjectResponse, { id: number; body: ProjectRequest }>({
      query: ({ id, body }) => ({ url: `${BASE}/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Project', id }, { type: 'Project', id: 'LIST' }],
    }),
    deleteProject: builder.mutation<void, number>({
      query: (id) => ({ url: `${BASE}/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Project', id: 'LIST' }],
    }),
    deployProject: builder.mutation<DeployResponse, number>({
      query: (id) => ({ url: `${BASE}/${id}/deploy`, method: 'POST' }),
      async onQueryStarted(projectId, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setPreviewUrl({ projectId, previewUrl: data.previewUrl }));
      },
    }),
    getProjectMembers: builder.query<MemberResponse[], number>({
      query: (projectId) => `${BASE}/${projectId}/members`,
      providesTags: (_r, _e, projectId) => [{ type: 'ProjectMembers', id: projectId }],
    }),
    inviteMember: builder.mutation<MemberResponse, { projectId: number; body: InviteMemberRequest }>({
      query: ({ projectId, body }) => ({ url: `${BASE}/${projectId}/members`, method: 'POST', body }),
      invalidatesTags: (_r, _e, { projectId }) => [{ type: 'ProjectMembers', id: projectId }],
    }),
    updateMemberRole: builder.mutation<
      MemberResponse,
      { projectId: number; memberId: number; body: UpdateMemberRoleRequest }
    >({
      query: ({ projectId, memberId, body }) => ({
        url: `${BASE}/${projectId}/members/${memberId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_r, _e, { projectId }) => [{ type: 'ProjectMembers', id: projectId }],
    }),
    removeMember: builder.mutation<void, { projectId: number; memberId: number }>({
      query: ({ projectId, memberId }) => ({ url: `${BASE}/${projectId}/members/${memberId}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, { projectId }) => [{ type: 'ProjectMembers', id: projectId }],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useDeployProjectMutation,
  useGetProjectMembersQuery,
  useInviteMemberMutation,
  useUpdateMemberRoleMutation,
  useRemoveMemberMutation,
} = projectsApi;
