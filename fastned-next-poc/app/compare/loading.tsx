import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Skeleton className="mb-6 h-8 w-56" />
      <Skeleton className="h-72 rounded-3xl" />
    </div>
  );
}
