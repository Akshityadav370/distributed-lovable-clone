import { AuroraBackground } from '@/components/feedback/AuroraBackground';

export function PreviewPane({ previewUrl }: { previewUrl: string | null }) {
  if (previewUrl) {
    return <iframe src={previewUrl} title="Project preview" className="h-full w-full border-0" />;
  }

  return (
    <div className="relative h-full w-full">
      <AuroraBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[22px] font-normal tracking-tight text-ink/80">
          Preview will appear here after your first deploy
        </span>
      </div>
    </div>
  );
}
