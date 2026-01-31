import { headers } from 'next/headers';
import { StationDetail } from '@/domain/types';

function getBaseUrl() {
  const headersList = headers();
  const proto = headersList.get('x-forwarded-proto') ?? 'http';
  const host = headersList.get('x-forwarded-host') ?? headersList.get('host');
  return `${proto}://${host}`;
}

export async function fetchStationDetail(id: string): Promise<StationDetail | null> {
  const url = `${getBaseUrl()}/api/stations/${id}`;
  const response = await fetch(url, { next: { revalidate: 60 } });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error('Failed to load station detail');
  }
  const payload = (await response.json()) as { data: StationDetail };
  return payload.data;
}
