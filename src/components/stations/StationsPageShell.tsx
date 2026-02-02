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
    <section className="mx-auto max-w-6xl px-4 py-10 lg:flex lg:h-[calc(100dvh-60px-20px)] lg:flex-col lg:overflow-hidden lg:py-6">
      <div className="mb-6 flex flex-col gap-2 lg:mb-4 lg:shrink-0">
        <h1 className="text-3xl font-semibold">{heading}</h1>
        <p className="max-w-2xl text-sm text-muted">{description}</p>
      </div>
      <div className="lg:min-h-0 lg:flex-1">
        <StationsPageClient defaultView={defaultView} />
      </div>
    </section>
  );
}
