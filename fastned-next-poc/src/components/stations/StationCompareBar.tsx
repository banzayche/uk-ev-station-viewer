import Link from 'next/link';
import { buttonStyles } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function StationCompareBar({
  selectedIds,
  onClear
}: {
  selectedIds: string[];
  onClear: () => void;
}) {
  if (selectedIds.length === 0) {
    return null;
  }

  const compareReady = selectedIds.length === 2;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/50 bg-white/80 px-4 py-3 text-sm shadow-soft">
      <div className="text-muted">
        {compareReady
          ? 'Ready to compare two stations.'
          : 'Select one more station to compare.'}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onClear} className={buttonStyles({ variant: 'ghost', size: 'sm' })}>
          Clear
        </button>
        <Link
          href={`/compare?ids=${selectedIds.join(',')}`}
          className={cn(
            buttonStyles({ variant: 'primary', size: 'sm' }),
            !compareReady && 'pointer-events-none opacity-50'
          )}
          aria-disabled={!compareReady}
        >
          Compare
        </Link>
      </div>
    </div>
  );
}
