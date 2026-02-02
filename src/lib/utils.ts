import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Evse, StationStatus } from '@/domain/types';

export function cn(...inputs: Array<string | undefined | false | null>) {
  return twMerge(clsx(inputs));
}

export function formatPower(powerKw?: number) {
  if (!powerKw) return '—';
  return `${Math.round(powerKw)}kW`;
}

export function getMaxPower(evses: Evse[]) {
  const powerValues = evses
    .flatMap((evse) => evse.connectors.map((connector) => connector.powerKw ?? 0))
    .filter((value) => value > 0);
  if (powerValues.length === 0) return undefined;
  return Math.max(...powerValues);
}

export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2
  }).format(amount);
}

export function statusLabel(status: StationStatus) {
  const labels: Record<StationStatus, string> = {
    available: 'Available',
    busy: 'Busy',
    offline: 'Offline',
    unknown: 'Unknown'
  };
  return labels[status];
}
