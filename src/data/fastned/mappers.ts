import { Station, StationListItem, Tariff } from '@/domain/types';
import { stationStatusFromEvses } from '@/lib/status';
import { getMaxPower } from '@/lib/utils';
import type { FastnedReferenceStation, FastnedTariff } from './types';

export function toStation(
  reference: FastnedReferenceStation,
  availabilityMap: Map<string, string>,
  lastUpdated?: string
): Station {
  return {
    id: reference.id,
    name: reference.name,
    address: reference.address,
    coordinates: reference.coordinates,
    operator: reference.operator ?? 'Fastned',
    amenities: reference.amenities,
    lastUpdated,
    evses: reference.evses.map((evse) => ({
      id: evse.id,
      connectors: evse.connectors.map((connector) => ({
        id: connector.id,
        type: connector.type,
        powerKw: connector.powerKw
      })),
      status: (availabilityMap.get(evse.id) ?? 'UNKNOWN') as Station['evses'][number]['status']
    }))
  };
}

export function toStationListItem(station: Station): StationListItem {
  const status = stationStatusFromEvses(station.evses);
  return {
    id: station.id,
    name: station.name,
    address: station.address,
    coordinates: station.coordinates,
    operator: station.operator,
    status,
    evseCount: station.evses.length,
    maxPowerKw: getMaxPower(station.evses),
    lastUpdated: station.lastUpdated
  };
}

export function toTariff(tariff?: FastnedTariff): Tariff | undefined {
  if (!tariff) return undefined;
  return {
    currency: tariff.currency,
    pricePerKwh: tariff.pricePerKwh,
    pricePerMinute: tariff.pricePerMinute,
    connectionFee: tariff.connectionFee,
    notes: tariff.notes
  };
}
