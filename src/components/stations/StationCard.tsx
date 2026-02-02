import Link from 'next/link';
import { StationListItem } from '@/domain/types';
import { StatusPill } from '@/components/ui/StatusPill';
import { FavoriteButton } from '@/components/stations/FavoriteButton';
import type { CompareState } from '@/types/stations';
import { formatPower } from '@/lib/utils';

export function StationCard({
  station,
  compare
}: {
  station: StationListItem;
  compare?: CompareState;
}) {
  const compareChecked = compare?.selectedIds.includes(station.id) ?? false;
  const compareDisabled = compare ? !compare.canSelect(station.id) : false;

  return (
    <div className="rounded-2xl border border-white/50 bg-white/80 p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link
            href={`/stations/${station.id}`}
            className="text-base font-semibold"
            data-testid={`station-link-${station.id}`}
          >
            {station.name}
          </Link>
          <p className="text-xs text-muted">
            {station.address.city} • {station.address.postcode}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {compare ? (
            <label className="flex items-center gap-1 text-[11px] text-muted">
              <input
                type="checkbox"
                aria-label="Select for comparison"
                checked={compareChecked}
                disabled={compareDisabled}
                onChange={() => compare.toggleCompare(station.id)}
              />
              Compare
            </label>
          ) : null}
          <FavoriteButton stationId={station.id} size="sm" testId={`favorite-${station.id}`} />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <StatusPill status={station.status} />
        <span className="rounded-full bg-white/70 px-2 py-1 text-muted">
          {station.evseCount} chargers
        </span>
        <span className="rounded-full bg-white/70 px-2 py-1 text-muted">
          Up to {formatPower(station.maxPowerKw)}
        </span>
      </div>
    </div>
  );
}
