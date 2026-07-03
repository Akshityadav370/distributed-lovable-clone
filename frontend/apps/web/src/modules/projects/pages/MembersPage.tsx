import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { hasPermission } from '@/store/permissions';
import { useGetProjectMembersQuery, useGetProjectQuery, useRemoveMemberMutation } from '../projects.api';
import { InviteMemberDialog } from '../components/InviteMemberDialog';

export function MembersPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const id = Number(projectId);
  const { data: project } = useGetProjectQuery(id);
  const { data: members, isLoading } = useGetProjectMembersQuery(id);
  const [removeMember] = useRemoveMemberMutation();
  const [isInviteOpen, setInviteOpen] = useState(false);

  const canManage = hasPermission(project?.role, 'MANAGE_MEMBERS');

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight text-ink">Members</h1>
            <p className="text-[13.5px] text-muted-fg">{project?.name}</p>
          </div>
          {canManage && (
            <Button variant="accent" onClick={() => setInviteOpen(true)}>
              Invite member
            </Button>
          )}
        </div>

        {isLoading ? (
          <Skeleton className="h-40 w-full rounded-card" />
        ) : (
          <div className="flex flex-col divide-y divide-border-subtle rounded-card border border-border-subtle bg-canvas">
            {members?.map((member) => (
              <div key={member.userId} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{member.name[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-[13.5px] font-medium text-ink">{member.name}</div>
                    <div className="text-[12px] text-faint-fg">{member.username}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[rgba(0,0,0,0.05)] px-2 py-0.5 text-[11px] font-medium text-muted-fg">
                    {member.projectRole}
                  </span>
                  {canManage && member.projectRole !== 'OWNER' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMember({ projectId: id, memberId: member.userId })}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <InviteMemberDialog projectId={id} open={isInviteOpen} onOpenChange={setInviteOpen} />
    </AppShell>
  );
}
