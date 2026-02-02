import { cn } from '@/lib/utils';

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/50 bg-white/80 p-4 shadow-soft backdrop-blur',
        className
      )}
      {...props}
    />
  );
}
