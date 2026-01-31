export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-[2000] border-t border-white/40 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>Fastned Station Explorer (UK) — POC</span>
        <span>Data attribution required for Fastned UK Open Data.</span>
      </div>
    </footer>
  );
}
