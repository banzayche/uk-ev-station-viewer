import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About',
    description: 'About the Fastned Station Explorer POC and data attribution.'
  };
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold">About this POC</h1>
      <p className="mt-3 text-sm text-muted">
        This is a portfolio-quality Next.js 14 App Router proof of concept for exploring Fastned
        UK charging stations. It focuses on data fetching, caching, BFF routing, and a polished,
        accessible UX.
      </p>
      <div className="mt-8 space-y-4 rounded-3xl border border-white/40 bg-white/70 p-6 shadow-soft">
        <div>
          <h2 className="text-lg font-semibold">Data attribution</h2>
          <p className="text-sm text-muted">
            Station data is sourced from Fastned UK Open Data endpoints. Attribution is required
            under the UK open data policy; do not abuse the API, and respect published rate limits.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Tech notes</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-muted">
            <li>Next.js App Router with Route Handlers as a BFF layer.</li>
            <li>React Query for client caching, retries, and loading states.</li>
            <li>Leaflet with OpenStreetMap tiles (no paid keys).</li>
            <li>Mock mode for deterministic fixtures in development and tests.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
