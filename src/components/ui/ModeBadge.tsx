import { publicEnv } from '@/lib/publicEnv';
import { cn } from '@/lib/utils';

const MODE_LABELS = {
  mock: 'Mock',
  live: 'Live'
} as const;

export function ModeBadge() {
  const mode = publicEnv.appMode;

  return (
    <div
      role="status"
      aria-label={`Data mode: ${MODE_LABELS[mode]}`}
      title="Data mode is configured via NEXT_PUBLIC_APP_MODE."
      className="flex items-center gap-1 rounded-full border border-white/60 bg-white/80 p-0.5 text-[11px] font-semibold"
    >
      {(Object.keys(MODE_LABELS) as Array<keyof typeof MODE_LABELS>).map((key) => (
        <span
          key={key}
          className={cn(
            'rounded-full px-2 py-0.5',
            mode === key ? 'bg-accent text-black' : 'text-muted'
          )}
        >
          {MODE_LABELS[key]}
        </span>
      ))}
    </div>
  );
}
