import { StationStatus } from '@/domain/types';
import { cn, statusLabel } from '@/lib/utils';

type StatusPillProps = {
  status: StationStatus;
};

export function StatusPill({ status }: StatusPillProps) {
  const styles: Record<StationStatus, string> = {
    available: 'bg-emerald-100 text-emerald-900',
    busy: 'bg-amber-100 text-amber-900',
    offline: 'bg-rose-100 text-rose-900',
    unknown: 'bg-slate-100 text-slate-700'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        styles[status]
      )}
    >
      {statusLabel(status)}
    </span>
  );
}
