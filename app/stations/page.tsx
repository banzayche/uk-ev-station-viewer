import type { Metadata } from 'next';
import { StationsPageShell } from '@/components/stations/StationsPageShell';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Stations List',
    description: 'Browse Fastned UK stations in a list-first view with filters and details.'
  };
}

export default function StationsPage() {
  return (
    <StationsPageShell
      defaultView="list"
      heading="Stations"
      description="Search by location, filter by availability, and compare up to two stations side by side."
    />
  );
}
