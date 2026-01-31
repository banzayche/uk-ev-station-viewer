import { StationListItem } from '@/domain/types';
import { StationFilters } from '@/lib/filters';

export type StationsResponse = {
  data: StationListItem[];
  meta: {
    total: number;
    count: number;
    lastUpdated?: string;
  };
};

export async function fetchStations(filters: StationFilters): Promise<StationsResponse> {
  const params = new URLSearchParams();
  if (filters.q) params.set('q', filters.q);
  if (filters.status && filters.status !== 'all') params.set('status', filters.status);
  if (filters.minPowerKw) params.set('minPowerKw', String(filters.minPowerKw));
  if (filters.bbox) params.set('bbox', filters.bbox);

  const response = await fetch(`/api/stations?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to load stations');
  }
  return (await response.json()) as StationsResponse;
}
