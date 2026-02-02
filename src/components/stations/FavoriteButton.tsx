'use client';

import { cn } from '@/lib/utils';
import { useFavorites } from '@/hooks/useFavorites';

type FavoriteButtonProps = {
  stationId: string;
  size?: 'sm' | 'md';
  testId?: string;
};

export function FavoriteButton({ stationId, size = 'md', testId }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(stationId);

  return (
    <button
      type="button"
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      onClick={() => toggleFavorite(stationId)}
      data-testid={testId ?? 'favorite-toggle'}
      className={cn(
        'flex items-center justify-center rounded-full border border-white/70 bg-white/80 text-ink transition hover:bg-white',
        size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm'
      )}
    >
      <span className={cn('text-base', favorite ? 'text-yellow-600' : 'text-muted')}>
        {favorite ? '★' : '☆'}
      </span>
    </button>
  );
}
