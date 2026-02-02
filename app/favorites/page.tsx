import type { Metadata } from 'next';
import { FavoritesPageClient } from '@/components/stations/FavoritesPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Favorites',
    description: 'Your saved Fastned UK charging stations.'
  };
}

export default function FavoritesPage() {
  return <FavoritesPageClient />;
}
