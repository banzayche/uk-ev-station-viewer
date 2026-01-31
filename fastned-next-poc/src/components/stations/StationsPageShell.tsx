import { StationsPageClient } from './StationsPageClient';

export function StationsPageShell({
  defaultView,
  heading,
  description
}: {
  defaultView: 'map' | 'list';
  heading: string;
  description: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">{heading}</h1>
        <p className="max-w-2xl text-sm text-muted">{description}</p>
      </div>
      <StationsPageClient defaultView={defaultView} />
    </section>
  );
}
