import { cn } from '@/lib/utils';

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-xl border border-white/70 bg-white/80 px-3 py-2 text-sm text-ink placeholder:text-muted focus-visible:ring-2 focus-visible:ring-accent-strong',
        className
      )}
      {...props}
    />
  );
}
