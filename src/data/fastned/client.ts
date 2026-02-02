import 'server-only';

import referenceFixture from '@/fixtures/reference.json';
import availabilityFixture from '@/fixtures/availability.json';
import tariffsFixture from '@/fixtures/tariffs.json';
import { serverEnv, isMockMode } from '@/lib/serverEnv';
import { fetchJson } from '@/lib/fetcher';
import { RateLimitError, UpstreamError } from '@/lib/errors';
import { checkRateLimit } from '@/lib/rateLimit';
import { toStation, toStationListItem, toTariff } from './mappers';
import type {
  FastnedAvailabilityResponse,
  FastnedReferenceResponse,
  FastnedTariffsResponse
} from './types';
import type {
  OcpiConnector,
  OcpiEvse,
  OcpiLocation,
  OcpiResponse,
  OcpiTariff
} from './ocpiTypes';
import { Station, StationDetail, StationListItem, Tariff } from '@/domain/types';

const REFERENCE_REVALIDATE = 60 * 60 * 24;
const AVAILABILITY_REVALIDATE = 60;

function buildUrl(path: string) {
  const base = serverEnv.baseUrl.replace(/\/$/, '');
  return `${base}${path}`;
}

function applyRateLimit(key: string) {
  const result = checkRateLimit(key, 60, 60_000);
  if (!result.ok) {
    throw new RateLimitError(result.retryAfterSeconds);
  }
}

async function fetchReference(): Promise<FastnedReferenceResponse> {
  return referenceFixture as FastnedReferenceResponse;
}

async function fetchAvailability(): Promise<FastnedAvailabilityResponse> {
  return {
    ...(availabilityFixture as FastnedAvailabilityResponse),
    tariffs: (tariffsFixture as FastnedTariffsResponse).tariffs
  };
}

function normalizeOcpiStatus(status?: string): Station['evses'][number]['status'] {
  switch (status) {
    case 'AVAILABLE':
    case 'CHARGING':
    case 'OUTOFORDER':
      return status;
    case 'INOPERATIVE':
      return 'OUTOFORDER';
    default:
      return 'UNKNOWN';
  }
}

function getEvseId(evse: OcpiEvse) {
  return evse.uid ?? evse.evse_id ?? evse.id ?? 'unknown-evse';
}

function getConnectorPowerKw(connector: OcpiConnector) {
  if (typeof connector.max_electric_power === 'number') return connector.max_electric_power;
  if (
    typeof connector.max_voltage === 'number' &&
    typeof connector.max_amperage === 'number'
  ) {
    return Math.round((connector.max_voltage * connector.max_amperage) / 100) / 10;
  }
  return undefined;
}

function findTariffId(location: OcpiLocation) {
  for (const evse of location.evses ?? []) {
    if (evse.tariff_id) return evse.tariff_id;
    if (evse.tariff_ids?.length) return evse.tariff_ids[0];
    for (const connector of evse.connectors ?? []) {
      if (connector.tariff_id) return connector.tariff_id;
      if (connector.tariff_ids?.length) return connector.tariff_ids[0];
    }
  }
  return undefined;
}

function mapOcpiTariff(tariff?: OcpiTariff): Tariff | undefined {
  if (!tariff) return undefined;
  const priceComponents = tariff.elements?.flatMap((element) => element.price_components ?? []) ?? [];
  const pricePerKwh = priceComponents.find((pc) => pc.type === 'ENERGY')?.price;
  const pricePerMinute = priceComponents.find((pc) => pc.type === 'TIME')?.price;
  const connectionFee = priceComponents.find((pc) => pc.type === 'FLAT')?.price;
  return {
    currency: tariff.currency,
    pricePerKwh,
    pricePerMinute,
    connectionFee
  };
}

async function fetchOcpiLocations(): Promise<OcpiResponse<OcpiLocation[]>> {
  if (!serverEnv.baseUrl) {
    throw new UpstreamError('Missing FASTNED_UK_API_BASE_URL', 500);
  }

  applyRateLimit('fastned-ocpi-locations');

  return fetchJson<OcpiResponse<OcpiLocation[]>>(buildUrl(serverEnv.referencePath), {
    next: { revalidate: REFERENCE_REVALIDATE, tags: ['fastned-reference'] },
    headers: serverEnv.apiKey ? { 'x-api-key': serverEnv.apiKey } : undefined
  });
}

async function fetchOcpiTariffs(): Promise<OcpiResponse<OcpiTariff[]>> {
  if (!serverEnv.baseUrl) {
    throw new UpstreamError('Missing FASTNED_UK_API_BASE_URL', 500);
  }

  if (!serverEnv.tariffsPath) {
    return { data: [] };
  }

  applyRateLimit('fastned-ocpi-tariffs');

  return fetchJson<OcpiResponse<OcpiTariff[]>>(buildUrl(serverEnv.tariffsPath), {
    next: { revalidate: AVAILABILITY_REVALIDATE, tags: ['fastned-availability'] },
    headers: serverEnv.apiKey ? { 'x-api-key': serverEnv.apiKey } : undefined
  });
}

type FullStationsResult = {
  stations: StationDetail[];
  listItems: StationListItem[];
  lastUpdated?: string;
};

async function getStationsFull(): Promise<FullStationsResult> {
  if (isMockMode) {
    const reference = await fetchReference();
    let availability: FastnedAvailabilityResponse | null = null;

    try {
      availability = await fetchAvailability();
    } catch (error) {
      if (error instanceof RateLimitError) {
        throw error;
      }
      availability = { lastUpdated: reference.lastUpdated, evses: [], tariffs: [] };
    }

    const availabilityMap = new Map(
      availability.evses.map((evse) => [evse.id, evse.status])
    );
    const tariffMap = new Map(
      (availability.tariffs ?? []).map((tariff) => [tariff.stationId, tariff])
    );

    const stations = reference.stations.map((station) =>
      toStation(station, availabilityMap, availability.lastUpdated || reference.lastUpdated)
    );

    const stationDetails: StationDetail[] = stations.map((station) => ({
      station,
      tariff: toTariff(tariffMap.get(station.id))
    }));

    return {
      stations: stationDetails,
      listItems: stations.map(toStationListItem),
      lastUpdated: availability.lastUpdated || reference.lastUpdated
    };
  }

  const [locationsResponse, tariffsResponse] = await Promise.all([
    fetchOcpiLocations(),
    fetchOcpiTariffs()
  ]);

  const tariffs = new Map(
    (tariffsResponse.data ?? []).map((tariff) => [tariff.id, tariff])
  );

  const stations: StationDetail[] = (locationsResponse.data ?? []).map((location) => {
    const evses =
      location.evses?.map((evse) => ({
        id: getEvseId(evse),
        connectors: (evse.connectors ?? []).map((connector) => ({
          id: connector.id,
          type: connector.standard,
          powerKw: getConnectorPowerKw(connector)
        })),
        status: normalizeOcpiStatus(evse.status)
      })) ?? [];

    const station: Station = {
      id: location.id,
      name: location.name ?? location.id,
      address: {
        line1: location.address,
        city: location.city,
        postcode: location.postal_code,
        country: location.country
      },
      coordinates: {
        lat: Number(location.coordinates.latitude),
        lon: Number(location.coordinates.longitude)
      },
      operator: location.operator?.name ?? 'Fastned',
      amenities: location.facilities,
      lastUpdated: locationsResponse.timestamp,
      evses
    };

    const tariffId = findTariffId(location);
    return {
      station,
      tariff: mapOcpiTariff(tariffs.get(tariffId ?? ''))
    };
  });

  const listItems = stations.map((detail) => toStationListItem(detail.station));

  return {
    stations,
    listItems,
    lastUpdated: locationsResponse.timestamp
  };
}

export async function getStationsList() {
  const data = await getStationsFull();
  return { items: data.listItems, lastUpdated: data.lastUpdated };
}

export async function getStationDetail(id: string) {
  const data = await getStationsFull();
  return data.stations.find((station) => station.station.id === id) ?? null;
}
