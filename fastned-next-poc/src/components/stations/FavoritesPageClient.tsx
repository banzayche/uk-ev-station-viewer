'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { fetchStations } from '@/lib/apiClient';
import { useFavorites } from '@/hooks/useFavorites';
import { StationList } from './StationList';

export function FavoritesPageClient() {
  const { favorites } = useFavorites();
  const { data, isLoading } = useQuery({
    queryKey: ['stations', { favoritesOnly: true }],
    queryFn: () => fetchStations({})
  });

  const stations = useMemo(() => {
    const list = data?.data ?? [];
    return list.filter((station) => favorites.includes(station.id));
  }, [data?.data, favorites]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Favorites</h1>
          <p className="text-sm text-muted">Stations you have starred for quick access.</p>
        </div>
        <Link
          href="/stations"
          className="rounded-full border border-white/60 bg-white/80 px-4 py-2 text-sm font-semibold"
        >
          Browse stations
        </Link>
      </div>
      {favorites.length === 0 ? (
        <div className="rounded-2xl border border-white/50 bg-white/70 p-6 text-sm text-muted">
          You have not added any favorites yet.
        </div>
      ) : (
        <StationList stations={stations} isLoading={isLoading} />
      )}
    </div>
  );
}
