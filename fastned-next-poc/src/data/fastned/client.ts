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
import { StationDetail, StationListItem } from '@/domain/types';

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
  if (isMockMode) {
    return referenceFixture as FastnedReferenceResponse;
  }

  if (!serverEnv.baseUrl) {
    throw new UpstreamError('Missing FASTNED_UK_API_BASE_URL', 500);
  }

  applyRateLimit('fastned-reference');

  return fetchJson<FastnedReferenceResponse>(buildUrl(serverEnv.referencePath), {
    next: { revalidate: REFERENCE_REVALIDATE, tags: ['fastned-reference'] },
    headers: serverEnv.apiKey ? { 'x-api-key': serverEnv.apiKey } : undefined
  });
}

async function fetchAvailability(): Promise<FastnedAvailabilityResponse> {
  if (isMockMode) {
    return {
      ...(availabilityFixture as FastnedAvailabilityResponse),
      tariffs: (tariffsFixture as FastnedTariffsResponse).tariffs
    };
  }

  if (!serverEnv.baseUrl) {
    throw new UpstreamError('Missing FASTNED_UK_API_BASE_URL', 500);
  }

  if (serverEnv.tariffsPath && serverEnv.tariffsPath !== serverEnv.availabilityPath) {
    // Keep to two upstream calls by requiring a combined endpoint in live mode.
    // Configure FASTNED_UK_TARIFFS_PATH to match the availability endpoint when tariffs are included.
  }

  applyRateLimit('fastned-availability');

  return fetchJson<FastnedAvailabilityResponse>(buildUrl(serverEnv.availabilityPath), {
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

export async function getStationsList() {
  const data = await getStationsFull();
  return { items: data.listItems, lastUpdated: data.lastUpdated };
}

export async function getStationDetail(id: string) {
  const data = await getStationsFull();
  return data.stations.find((station) => station.station.id === id) ?? null;
}
