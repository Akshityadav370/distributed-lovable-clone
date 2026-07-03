import { Link, useNavigate } from 'react-router-dom';
import { ArrowUp, Mic } from 'lucide-react';
import { useState } from 'react';
import { paths } from '@/routes/paths';
import { AuroraBackground } from '@/components/feedback/AuroraBackground';

const CHIPS = [
  { icon: '◱', label: 'Reporting dashboard' },
  { icon: '◷', label: 'Habit tracker' },
  { icon: '⬚', label: 'Onboarding portal' },
  { icon: '❑', label: 'Storefront' },
  { icon: '✎', label: 'Personal blog' },
];

export function HomePage() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');

  const goToSignup = () => navigate(paths.signup);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute left-1/2 top-[34%] h-[720px] w-[1200px] -translate-x-1/2 -translate-y-1/2">
        <AuroraBackground />
      </div>

      <nav className="relative z-10 flex items-center px-10 py-[22px]">
        <div className="flex flex-1 items-center gap-2.5">
          <span className="brand-mark h-7 w-7 rounded-lg" />
          <span className="text-[18px] font-semibold tracking-tight text-ink">Lovable</span>
        </div>
        <div className="flex items-center gap-[30px] text-[14px] text-[#4A4A57]">
          <span className="cursor-pointer">Community</span>
          <span className="cursor-pointer">Pricing</span>
          <span className="cursor-pointer">Enterprise</span>
          <span className="cursor-pointer">Learn</span>
        </div>
        <div className="flex flex-1 items-center justify-end gap-3">
          <Link to={paths.login} className="text-[14px] text-[#4A4A57]">
            Log in
          </Link>
          <Link
            to={paths.signup}
            className="rounded-full bg-ink px-5 py-2 text-[14px] font-medium text-canvas"
          >
            Get started
          </Link>
        </div>
      </nav>

      <div className="relative z-10 flex flex-1 flex-col items-center pt-24">
        <div className="mb-[30px] inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white/70 px-3.5 py-1.5 text-[13px] text-[#4A4A57]">
          <span className="h-[7px] w-[7px] rounded-full bg-success" />
          Introducing Agent mode — build faster than ever
        </div>

        <h1 className="mb-[18px] text-center text-[60px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
          Build something
          <br />
          <span className="brand-text-gradient">Lovable</span>
        </h1>
        <p className="mb-11 text-[19px] text-muted-fg">Create apps and websites by chatting with AI.</p>

        <div className="w-[720px] rounded-canvas border border-border-subtle bg-chat-bubble p-[22px_22px_16px] shadow-[0_12px_40px_rgba(16,24,40,0.08)]">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Lovable to create a prototype for…"
            rows={2}
            className="min-h-[52px] w-full resize-none bg-transparent text-[16px] text-ink placeholder:text-faint-fg outline-none"
          />
          <div className="mt-2 flex items-center gap-2">
            <button className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-border bg-canvas text-ink">
              <Mic className="h-4 w-4" />
            </button>
            <div className="flex-1" />
            <button
              onClick={goToSignup}
              className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-accent text-white"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-[26px] flex max-w-[760px] flex-wrap justify-center gap-2.5">
          {CHIPS.map((chip) => (
            <button
              key={chip.label}
              onClick={goToSignup}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-canvas px-4 py-1.5 text-[13.5px] text-ink shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            >
              <span className="text-[#8A8A98]">{chip.icon}</span>
              {chip.label}
            </button>
          ))}
        </div>

        <div className="mt-10 text-[13px] tracking-[0.02em] text-faint-fg">
          or start from a template · 25M+ projects built with Lovable
        </div>
      </div>
    </div>
  );
}
