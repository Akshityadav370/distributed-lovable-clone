import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useInviteMemberMutation } from '../projects.api';
import type { ProjectRole } from '@/store/permissions';

const schema = z.object({
  username: z.string().email('Enter a valid email'),
  role: z.enum(['EDITOR', 'VIEWER']),
});
type FormValues = z.infer<typeof schema>;

export function InviteMemberDialog({
  projectId,
  open,
  onOpenChange,
}: {
  projectId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [inviteMember, { isLoading }] = useInviteMemberMutation();
  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { role: 'EDITOR' } });

  const onSubmit = async (values: FormValues) => {
    await inviteMember({ projectId, body: { username: values.username, role: values.role as ProjectRole } }).unwrap();
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Invite a member</DialogTitle>
            <DialogDescription>They'll get access to this project.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="invite-email">Email</Label>
              <Input id="invite-email" type="email" placeholder="teammate@example.com" {...register('username')} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="invite-role">Role</Label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <select
                    id="invite-role"
                    className="h-9 rounded-md border border-border bg-canvas px-3 text-[14px] text-ink"
                    {...field}
                  >
                    <option value="EDITOR">Editor</option>
                    <option value="VIEWER">Viewer</option>
                  </select>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" disabled={isLoading}>
              {isLoading ? 'Inviting…' : 'Invite'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
