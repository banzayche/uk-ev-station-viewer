import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-muted">
        The page you are looking for does not exist. Try heading back to the stations list.
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
