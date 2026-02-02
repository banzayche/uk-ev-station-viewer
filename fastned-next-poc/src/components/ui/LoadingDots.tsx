'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type LoadingDotsProps = {
  label?: string;
  className?: string;
  intervalMs?: number;
};

export function LoadingDots({
  label = 'Updating',
  className,
  intervalMs = 500
}: LoadingDotsProps) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setDots((current) => (current + 1) % 4);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  const dotText = '.'.repeat(dots).padEnd(3, ' ');

  return (
    <span className={cn('inline-flex items-center', className)} aria-live="polite">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        {label}
        <span className="inline-block w-[3ch] whitespace-pre text-left">{dotText}</span>
      </span>
    </span>
  );
}
