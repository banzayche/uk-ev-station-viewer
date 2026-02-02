import { StationListItem } from '@/domain/types';
import { StationCard } from './StationCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { LoadingDots } from '@/components/ui/LoadingDots';

export type CompareState = {
  selectedIds: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  canSelect: (id: string) => boolean;
};

type StationListProps = {
  stations: StationListItem[];
  isLoading?: boolean;
  isUpdating?: boolean;
  compare?: CompareState;
  lastUpdated?: string;
};

export function StationList({
  stations,
  isLoading,
  isUpdating,
  compare,
  lastUpdated
}: StationListProps) {
  if (isLoading && stations.length === 0) {
    return (
      <div className="min-h-[420px] space-y-3">
        <div className="flex min-h-[18px] items-center justify-between text-xs text-muted">
          <span>&nbsp;</span>
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-24" />
        ))}
      </div>
    );
  }

  if (stations.length === 0) {
    return (
      <div className="min-h-[220px] rounded-2xl border border-white/50 bg-white/70 p-6 text-sm text-muted">
        No stations match your filters.
      </div>
    );
  }

  return (
    <div className="min-h-[420px] space-y-3">
      <div className="flex min-h-[18px] items-center justify-between text-xs text-muted">
        <span>
          {lastUpdated && `Last updated ${new Date(lastUpdated).toLocaleString()}`}
        </span>
        {isUpdating && (
          <LoadingDots label="Updating" className="rounded-full text-muted" />
        )}
      </div>
      <ul className="space-y-3" role="list" aria-live="polite">
        {stations.map((station) => (
          <li key={station.id}>
            <StationCard station={station} compare={compare} />
          </li>
        ))}
      </ul>
    </div>
  );
}
