import { describe, expect, it } from 'vitest';
import { toStation } from '@/data/fastned/mappers';
import reference from '@/fixtures/reference.json';
import availability from '@/fixtures/availability.json';

const availabilityMap = new Map(availability.evses.map((evse) => [evse.id, evse.status]));

describe('toStation mapper', () => {
  it('maps reference station to domain station with status', () => {
    const station = toStation(reference.stations[0], availabilityMap, reference.lastUpdated);

    expect(station.id).toBe('uk-london-hammersmith');
    expect(station.evses.length).toBeGreaterThan(0);
    expect(station.evses[0].status).toBe('AVAILABLE');
  });
});
