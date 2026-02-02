import { StationListItem } from '@/domain/types';

export type StationFilters = {
  q?: string;
  status?: string;
  minPowerKw?: number;
  bbox?: string;
};

export function applyStationFilters(items: StationListItem[], filters: StationFilters) {
  let result = [...items];

  if (filters.q) {
    const query = filters.q.toLowerCase();
    result = result.filter((station) =>
      [station.name, station.address.city, station.address.postcode]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }

  if (filters.status && filters.status !== 'all') {
    result = result.filter((station) => station.status === filters.status);
  }

  if (filters.minPowerKw) {
    result = result.filter((station) => (station.maxPowerKw ?? 0) >= filters.minPowerKw!);
  }

  if (filters.bbox) {
    const parts = filters.bbox.split(',').map(Number);
    if (parts.length === 4 && parts.every((value) => Number.isFinite(value))) {
      const [minLon, minLat, maxLon, maxLat] = parts;
      result = result.filter((station) => {
        const { lat, lon } = station.coordinates;
        return lon >= minLon && lon <= maxLon && lat >= minLat && lat <= maxLat;
      });
    }
  }

  return result;
}
