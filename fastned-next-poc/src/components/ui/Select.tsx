import { cn } from '@/lib/utils';

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'h-10 w-full appearance-none rounded-2xl border border-white/70 bg-white/80 px-3 pr-9 text-sm text-muted',
        "bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 20 20%22 fill=%22none%22%3E%3Cpath d=%22M6 8l4 4 4-4%22 stroke=%22%236b6b6b%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[length:12px_12px] bg-[position:right_0.75rem_center]",
        className
      )}
      {...props}
    />
  );
}
