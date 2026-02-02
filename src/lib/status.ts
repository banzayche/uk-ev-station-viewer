import { Evse, StationStatus } from '@/domain/types';

export function stationStatusFromEvses(evses: Evse[]): StationStatus {
  if (evses.some((evse) => evse.status === 'AVAILABLE')) return 'available';
  if (evses.some((evse) => evse.status === 'CHARGING')) return 'busy';
  if (evses.some((evse) => evse.status === 'OUTOFORDER')) return 'offline';
  return 'unknown';
}
