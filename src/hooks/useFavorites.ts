'use client';

import { useSyncExternalStore } from 'react';
import { trackEvent } from '@/lib/analytics';

const STORAGE_KEY = 'fastned:favorites';
const serverSnapshot: string[] = [];
let memory: string[] = [];
let initialized = false;
const listeners = new Set<() => void>();

const loadFavorites = () => {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    memory = raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    memory = [];
  }
};

const saveFavorites = (next: string[]) => {
  memory = next;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => {
  loadFavorites();
  return memory;
};

const getServerSnapshot = () => serverSnapshot;

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleFavorite = (id: string) => {
    const exists = favorites.includes(id);
    const next = exists ? favorites.filter((item) => item !== id) : [...favorites, id];
    saveFavorites(next);
    trackEvent('favorite_toggle', { id, favorite: !exists });
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite: (id: string) => favorites.includes(id)
  };
}
