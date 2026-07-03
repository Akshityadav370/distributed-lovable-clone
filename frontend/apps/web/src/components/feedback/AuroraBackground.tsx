import { cn } from '@/lib/utils/cn';

const BLOBS = [
  { color: '#FE7B02', style: { left: '-6%', top: '26%', width: '52%', height: '60%' } },
  { color: '#FF7EB0', style: { left: '22%', top: '34%', width: '56%', height: '64%' } },
  { color: '#7B7BFF', style: { right: '-8%', top: '38%', width: '52%', height: '62%' } },
  { color: '#FF66F4', style: { left: '34%', bottom: '-10%', width: '44%', height: '48%' } },
];

export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          className="absolute opacity-50 blur-[100px] dark:opacity-25"
          style={{
            ...blob.style,
            background: `radial-gradient(circle at 50% 50%, ${blob.color} 0%, transparent 62%)`,
          }}
        />
      ))}
    </div>
  );
}
