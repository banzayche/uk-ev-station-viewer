import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StationDetailClient } from '@/components/stations/StationDetailClient';
import { fetchStationDetail } from '@/lib/serverFetch';

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await fetchStationDetail(params.id);
  if (!data) {
    return {
      title: 'Station not found'
    };
  }

  return {
    title: data.station.name,
    description: `Fastned station in ${data.station.address.city}, ${data.station.address.postcode}.`
  };
}

export default async function StationDetailPage({ params }: PageProps) {
  const data = await fetchStationDetail(params.id);
  if (!data) {
    notFound();
  }

  return <StationDetailClient station={data.station} tariff={data.tariff} />;
}
