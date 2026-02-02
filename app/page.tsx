import type { Metadata } from 'next';
import { StationsPageShell } from '@/components/stations/StationsPageShell';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Stations Map',
    description:
      'Explore Fastned UK charging stations with an interactive map, filters, and live availability.'
  };
}

export default function HomePage() {
  return (
    <StationsPageShell
      defaultView="map"
      heading="Fastned Station Explorer (UK)"
      description="Browse Fastned UK charging stations, filter by power and availability, and jump straight to details."
    />
  );
}
