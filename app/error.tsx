'use client';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black"
      >
        Try again
      </button>
    </div>
  );
}
