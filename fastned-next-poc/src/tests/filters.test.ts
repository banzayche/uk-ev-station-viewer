import { describe, expect, it } from 'vitest';
import { applyStationFilters } from '@/lib/filters';
import { StationListItem } from '@/domain/types';

const items: StationListItem[] = [
  {
    id: 'station-a',
    name: 'Manchester Trafford',
    address: { line1: 'Line', city: 'Manchester', postcode: 'M17', country: 'UK' },
    coordinates: { lat: 53.48, lon: -2.24 },
    operator: 'Fastned',
    status: 'available',
    evseCount: 2,
    maxPowerKw: 300
  },
  {
    id: 'station-b',
    name: 'Bristol Cribbs',
    address: { line1: 'Line', city: 'Bristol', postcode: 'BS10', country: 'UK' },
    coordinates: { lat: 51.45, lon: -2.58 },
    operator: 'Fastned',
    status: 'offline',
    evseCount: 2,
    maxPowerKw: 150
  }
];

describe('applyStationFilters', () => {
  it('filters by search query', () => {
    const result = applyStationFilters(items, { q: 'Manchester' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('station-a');
  });

  it('filters by status', () => {
    const result = applyStationFilters(items, { status: 'offline' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('station-b');
  });

  it('filters by min power', () => {
    const result = applyStationFilters(items, { minPowerKw: 200 });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('station-a');
  });
});
