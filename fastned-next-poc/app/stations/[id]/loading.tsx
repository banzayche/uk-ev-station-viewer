export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-4 h-10 w-72 animate-pulse rounded-2xl bg-white/70" />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="h-40 animate-pulse rounded-3xl bg-white/60" />
          <div className="h-64 animate-pulse rounded-3xl bg-white/60" />
        </div>
        <div className="h-80 animate-pulse rounded-3xl bg-white/60" />
      </div>
    </div>
  );
}
