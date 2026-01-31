import { StationListItem } from '@/domain/types';
import { StationCard } from './StationCard';

export type CompareState = {
  selectedIds: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  canSelect: (id: string) => boolean;
};

type StationListProps = {
  stations: StationListItem[];
  isLoading?: boolean;
  compare?: CompareState;
  lastUpdated?: string;
};

export function StationList({ stations, isLoading, compare, lastUpdated }: StationListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-24 animate-pulse rounded-2xl bg-white/60" />
        ))}
      </div>
    );
  }

  if (stations.length === 0) {
    return (
      <div className="rounded-2xl border border-white/50 bg-white/70 p-6 text-sm text-muted">
        No stations match your filters.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {lastUpdated ? (
        <p className="text-xs text-muted">Last updated {new Date(lastUpdated).toLocaleString()}</p>
      ) : null}
      <ul className="space-y-3">
        {stations.map((station) => (
          <li key={station.id}>
            <StationCard station={station} compare={compare} />
          </li>
        ))}
      </ul>
    </div>
  );
}
