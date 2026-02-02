'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type FilterState = {
  q: string;
  status: string;
  minPowerKw: number;
  favoritesOnly: boolean;
  view: 'map' | 'list';
};

type SearchParamsLike = {
  get: (key: string) => string | null;
};

const DEFAULT_MIN_POWER = 50;

function parseView(value: string | null, fallback: 'map' | 'list') {
  if (value === 'map' || value === 'list') return value;
  return fallback;
}

function parseFilters(params: SearchParamsLike, defaultView: 'map' | 'list'): FilterState {
  const q = params.get('q') ?? '';
  const status = params.get('status') ?? 'all';
  const minPowerKw = Number(params.get('minPowerKw') ?? DEFAULT_MIN_POWER);
  const favoritesOnly = params.get('favorites') === '1';
  const view = parseView(params.get('view'), defaultView);

  return {
    q,
    status,
    minPowerKw: Number.isFinite(minPowerKw) ? minPowerKw : DEFAULT_MIN_POWER,
    favoritesOnly,
    view
  };
}

function buildParams(filters: FilterState, defaultView: 'map' | 'list') {
  const params = new URLSearchParams();
  if (filters.q) params.set('q', filters.q);
  if (filters.status && filters.status !== 'all') params.set('status', filters.status);
  if (filters.minPowerKw !== DEFAULT_MIN_POWER) {
    params.set('minPowerKw', String(filters.minPowerKw));
  }
  if (filters.favoritesOnly) params.set('favorites', '1');
  if (filters.view !== defaultView) params.set('view', filters.view);
  return params;
}

export function useFilterParams(defaultView: 'map' | 'list') {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const parsed = useMemo(() => parseFilters(searchParams, defaultView), [searchParams, defaultView]);
  const [filters, setFiltersState] = useState<FilterState>(parsed);

  useEffect(() => {
    setFiltersState(parsed);
  }, [parsed]);

  const setFilters = useCallback(
    (next: FilterState) => {
      setFiltersState(next);
      const params = buildParams(next, defaultView);
      const nextQuery = params.toString();
      const currentQuery = searchParams.toString();
      if (nextQuery !== currentQuery) {
        router.replace(`${pathname}${nextQuery ? `?${nextQuery}` : ''}`, { scroll: false });
      }
    },
    [defaultView, pathname, router, searchParams]
  );

  return { filters, setFilters };
}
