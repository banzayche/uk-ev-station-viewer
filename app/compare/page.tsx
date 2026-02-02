import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchStationDetail } from '@/lib/serverFetch';
import { StationCompareTable } from '@/components/stations/StationCompareTable';
import { StationDetail } from '@/domain/types';

type PageProps = {
  searchParams: { ids?: string };
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Compare stations',
    description: 'Compare two Fastned UK stations side by side.'
  };
}

export default async function ComparePage({ searchParams }: PageProps) {
  const ids = searchParams.ids?.split(',').filter(Boolean).slice(0, 2) ?? [];

  if (ids.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-2xl font-semibold">Compare stations</h1>
        <p className="mt-2 text-sm text-muted">
          Select up to two stations from the list to compare power, availability, and tariffs.
        </p>
        <Link
          href="/stations"
          className="mt-6 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black"
        >
          Browse stations
        </Link>
      </div>
    );
  }

  const results = await Promise.all(ids.map((id) => fetchStationDetail(id)));
  const stations = results.filter((item): item is StationDetail => item !== null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Compare stations</h1>
          <p className="text-sm text-muted">Side-by-side comparison for selected stations.</p>
        </div>
        <Link
          href="/stations"
          className="rounded-full border border-white/60 bg-white/80 px-4 py-2 text-sm font-semibold"
        >
          Back to stations
        </Link>
      </div>
      <StationCompareTable stations={stations} />
    </div>
  );
}
