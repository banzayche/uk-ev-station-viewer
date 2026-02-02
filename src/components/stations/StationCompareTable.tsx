import { StationDetail } from '@/domain/types';
import { formatPower, getMaxPower, statusLabel } from '@/lib/utils';
import { stationStatusFromEvses } from '@/lib/status';

export function StationCompareTable({ stations }: { stations: StationDetail[] }) {
  if (stations.length === 0) {
    return (
      <div className="rounded-2xl border border-white/50 bg-white/70 p-6 text-sm text-muted">
        No stations available to compare.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/50 bg-white/80">
      <table className="w-full text-sm">
        <thead className="bg-white/90 text-xs uppercase text-muted">
          <tr>
            <th className="px-4 py-3 text-left">Metric</th>
            {stations.map((station) => (
              <th key={station.station.id} className="px-4 py-3 text-left">
                {station.station.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-white/60">
            <td className="px-4 py-3 text-muted">City</td>
            {stations.map((station) => (
              <td key={station.station.id} className="px-4 py-3">
                {station.station.address.city}
              </td>
            ))}
          </tr>
          <tr className="border-t border-white/60">
            <td className="px-4 py-3 text-muted">Status</td>
            {stations.map((station) => (
              <td key={station.station.id} className="px-4 py-3">
                {statusLabel(stationStatusFromEvses(station.station.evses))}
              </td>
            ))}
          </tr>
          <tr className="border-t border-white/60">
            <td className="px-4 py-3 text-muted">Chargers</td>
            {stations.map((station) => (
              <td key={station.station.id} className="px-4 py-3">
                {station.station.evses.length}
              </td>
            ))}
          </tr>
          <tr className="border-t border-white/60">
            <td className="px-4 py-3 text-muted">Max power</td>
            {stations.map((station) => (
              <td key={station.station.id} className="px-4 py-3">
                {formatPower(getMaxPower(station.station.evses))}
              </td>
            ))}
          </tr>
          <tr className="border-t border-white/60">
            <td className="px-4 py-3 text-muted">Ad-hoc tariff</td>
            {stations.map((station) => (
              <td key={station.station.id} className="px-4 py-3">
                {station.tariff ? `${station.tariff.currency} tariff available` : 'Not published'}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
