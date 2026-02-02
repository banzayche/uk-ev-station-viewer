'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapShell } from '@/components/map/MapShell';
import { Skeleton } from '@/components/ui/Skeleton';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { toast } from 'sonner';
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
  const debouncedQuery = useDebouncedValue(filters.q, 500);
  const queryFilters = { ...filters, q: debouncedQuery };
  const lastErrorRef = useRef<string | null>(null);

  const { data, isLoading, isError, isFetching, error } = useQuery({
    queryKey: ['stations', queryFilters],
    queryFn: () => fetchStations(queryFilters),
    placeholderData: (previous) => previous
  });
  const showInitialSkeleton = isLoading;

  const { favorites } = useFavorites();
  const compare = useCompareSelection(2);

  const stations = useMemo(() => {
    let list = data?.data ?? [];
    if (filters.favoritesOnly) {
      list = list.filter((station) => favorites.includes(station.id));
    }
    return list;
  }, [data?.data, favorites, filters.favoritesOnly]);

  useEffect(() => {
    if (!isError) {
      lastErrorRef.current = null;
      return;
    }
    const message = 'We were unable to load stations right now.';
    if (lastErrorRef.current !== message) {
      toast.error(message);
      lastErrorRef.current = message;
    }
  }, [error, isError]);

  return (
    <div className="space-y-5 lg:grid lg:h-full lg:min-h-0 lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:gap-4 lg:space-y-0">
      <div className="flex flex-col gap-4 lg:shrink-0">
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

      <div className="grid items-stretch gap-4 lg:h-full lg:min-h-0 lg:grid-cols-[1.3fr_0.7fr]">
        <div
          className={cn(
            'h-[48vh] min-h-[360px] max-h-[720px] lg:h-full',
            filters.view === 'map' ? 'block' : 'hidden',
            'lg:block'
          )}
        >
          {showInitialSkeleton ? (
            <Skeleton className="h-full w-full rounded-3xl" />
          ) : (
            <MapShell stations={stations} />
          )}
        </div>
        <div
          className={cn(
            'lg:h-full lg:min-h-0 lg:overflow-y-auto lg:pr-1',
            filters.view === 'list' ? 'block' : 'hidden',
            'lg:block'
          )}
        >
          <StationList
            stations={stations}
            isLoading={showInitialSkeleton}
            isUpdating={isFetching && !isLoading}
            compare={compare}
            lastUpdated={data?.meta.lastUpdated}
          />
        </div>
      </div>

      <StationCompareBar selectedIds={compare.selectedIds} onClear={compare.clearCompare} />
    </div>
  );
}
