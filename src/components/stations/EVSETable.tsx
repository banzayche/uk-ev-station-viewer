import { Evse } from '@/domain/types';
import { formatPower } from '@/lib/utils';

export function EVSETable({ evses }: { evses: Evse[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/60">
      <table className="w-full text-sm">
        <thead className="bg-white/80 text-xs uppercase text-muted">
          <tr>
            <th className="px-3 py-2 text-left">EVSE</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-left">Connectors</th>
          </tr>
        </thead>
        <tbody>
          {evses.map((evse) => (
            <tr key={evse.id} className="border-t border-white/60">
              <td className="px-3 py-2 text-xs text-muted">{evse.id}</td>
              <td className="px-3 py-2 text-xs font-semibold">{evse.status}</td>
              <td className="px-3 py-2">
                <div className="flex flex-wrap gap-2">
                  {evse.connectors.map((connector) => (
                    <span
                      key={connector.id}
                      className="rounded-full bg-white/80 px-2 py-1 text-xs text-muted"
                    >
                      {connector.type}
                      {connector.powerKw ? ` • ${formatPower(connector.powerKw)}` : ''}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
