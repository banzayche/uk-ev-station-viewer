'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapShell } from '@/components/map/MapShell';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { StationFilters } from '@/components/stations/StationFilters';
import { StationList } from '@/components/stations/StationList';
import { StationCompareBar } from '@/components/stations/StationCompareBar';
import { fetchStations } from '@/lib/apiClient';
import { useFavorites } from '@/hooks/useFavorites';
import { useFilterParams } from '@/hooks/useFilterParams';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useCompareSelection } from '@/hooks/useCompareSelection';
import { cn } from '@/lib/utils';

export function StationsPageClient({ defaultView }: { defaultView: 'map' | 'list' }) {
  const { filters, setFilters } = useFilterParams(defaultView);
  const debouncedQuery = useDebouncedValue(filters.q, 300);
  const queryFilters = { ...filters, q: debouncedQuery };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['stations', queryFilters],
    queryFn: () => fetchStations(queryFilters)
  });

  const { favorites } = useFavorites();
  const compare = useCompareSelection(2);

  const stations = useMemo(() => {
    let list = data?.data ?? [];
    if (filters.favoritesOnly) {
      list = list.filter((station) => favorites.includes(station.id));
    }
    return list;
  }, [data?.data, favorites, filters.favoritesOnly]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <StationFilters filters={filters} onChange={setFilters} />
          <div className="lg:hidden">
            <SegmentedControl
              value={filters.view}
              onChange={(value) => setFilters({ ...filters, view: value })}
              options={[
                { value: 'map', label: 'Map' },
                { value: 'list', label: 'List' }
              ]}
              ariaLabel="Map or list view"
            />
          </div>
        </div>
      </div>

      {isError ? (
        <div className="rounded-2xl border border-white/50 bg-white/70 p-6 text-sm text-muted">
          We were unable to load stations right now. Please try again in a moment.
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className={cn('min-h-[320px]', filters.view === 'map' ? 'block' : 'hidden', 'lg:block')}>
          <MapShell stations={stations} />
        </div>
        <div className={cn(filters.view === 'list' ? 'block' : 'hidden', 'lg:block')}>
          <StationList
            stations={stations}
            isLoading={isLoading}
            compare={compare}
            lastUpdated={data?.meta.lastUpdated}
          />
        </div>
      </div>

      <StationCompareBar selectedIds={compare.selectedIds} onClear={compare.clearCompare} />
    </div>
  );
}
