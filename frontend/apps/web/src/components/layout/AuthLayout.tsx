import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-page px-4">
      <div
        className="pointer-events-none absolute left-1/2 top-[30%] h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-40"
        aria-hidden
      >
        <div className="absolute left-[10%] top-[15%] h-[60%] w-[45%] rounded-full bg-[radial-gradient(circle,_#FE7B02_0%,_transparent_62%)] blur-[100px]" />
        <div className="absolute right-[10%] top-[20%] h-[60%] w-[45%] rounded-full bg-[radial-gradient(circle,_#7B7BFF_0%,_transparent_60%)] blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-[400px] rounded-canvas border border-border-subtle bg-canvas p-8 shadow-[0_12px_40px_rgba(16,24,40,0.08)]">
        <Link to={paths.home} className="mb-6 flex items-center gap-2">
          <span className="brand-mark h-7 w-7 rounded-lg" />
          <span className="text-[17px] font-semibold tracking-tight">Lovable</span>
        </Link>
        <h1 className="mb-1 text-[22px] font-semibold tracking-tight text-ink">{title}</h1>
        <p className="mb-6 text-[13.5px] text-muted-fg">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
