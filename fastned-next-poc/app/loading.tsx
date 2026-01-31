export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 h-8 w-72 animate-pulse rounded-xl bg-white/70" />
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="h-[420px] animate-pulse rounded-3xl bg-white/60" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-24 animate-pulse rounded-2xl bg-white/60" />
          ))}
        </div>
      </div>
    </div>
  );
}
