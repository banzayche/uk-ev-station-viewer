import { cn } from '@/lib/utils';

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'h-10 w-full rounded-2xl border border-white/70 bg-white/80 px-3 text-sm text-ink focus-visible:ring-2 focus-visible:ring-accent-strong',
        className
      )}
      {...props}
    />
  );
}
