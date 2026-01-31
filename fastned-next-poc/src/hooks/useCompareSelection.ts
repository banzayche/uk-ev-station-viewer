'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export function useCompareSelection(max: number) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setSelectedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id].slice(0, max);
      trackEvent('compare_toggle', { id, selected: next });
      return next;
    });
  };

  const clearCompare = () => {
    setSelectedIds([]);
    trackEvent('compare_clear');
  };

  const canSelect = (id: string) => selectedIds.includes(id) || selectedIds.length < max;

  return { selectedIds, toggleCompare, clearCompare, canSelect };
}
