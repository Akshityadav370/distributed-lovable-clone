import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/auth.slice';
import { paths } from '@/routes/paths';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

export function AppShell({ children }: { children: ReactNode }) {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initial = user?.name?.[0]?.toUpperCase() ?? '?';

  return (
    <div className="min-h-screen bg-page">
      <header className="flex h-14 items-center justify-between border-b border-border-subtle bg-canvas px-6">
        <Link to={paths.dashboard} className="flex items-center gap-2">
          <span className="brand-mark h-6 w-6 rounded-md" />
          <span className="text-[15px] font-semibold tracking-tight text-ink">Lovable</span>
        </Link>
        <nav className="flex items-center gap-5 text-[13px] text-muted-fg">
          <Link to={paths.dashboard} className="hover:text-ink">
            Projects
          </Link>
          <Link to={paths.billing} className="hover:text-ink">
            Billing
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <Avatar>
                  <AvatarFallback>{initial}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-2.5 py-1.5 text-[12.5px] text-muted-fg">{user?.username}</div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  dispatch(logout());
                  navigate(paths.login);
                }}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
