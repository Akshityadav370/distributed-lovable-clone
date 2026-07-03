import { cn } from '@/lib/utils/cn';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-[rgba(0,0,0,0.08)]', className)} {...props} />;
}

export { Skeleton };
