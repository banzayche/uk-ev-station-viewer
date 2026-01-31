import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Skeleton className="mb-4 h-10 w-72 rounded-2xl" />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <Skeleton className="h-40 rounded-3xl" />
          <Skeleton className="h-64 rounded-3xl" />
        </div>
        <Skeleton className="h-80 rounded-3xl" />
      </div>
    </div>
  );
}
