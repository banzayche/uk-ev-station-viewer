import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '@/hooks/useFavorites';

describe('useFavorites', () => {
  it('stores and restores favorites from localStorage', () => {
    localStorage.clear();

    const { result } = renderHook(() => useFavorites());
    act(() => result.current.toggleFavorite('station-1'));

    expect(result.current.favorites).toContain('station-1');

    const { result: result2 } = renderHook(() => useFavorites());
    expect(result2.current.favorites).toContain('station-1');
  });
});
