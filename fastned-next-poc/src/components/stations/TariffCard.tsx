import { Tariff } from '@/domain/types';
import { formatCurrency } from '@/lib/utils';

export function TariffCard({ tariff }: { tariff: Tariff }) {
  return (
    <div className="rounded-2xl border border-white/50 bg-white/80 p-4 shadow-soft">
      <h2 className="text-lg font-semibold">Ad-hoc tariff</h2>
      <div className="mt-3 grid gap-2 text-sm text-muted">
        {tariff.pricePerKwh ? (
          <div className="flex items-center justify-between">
            <span>Price per kWh</span>
            <span className="font-semibold text-ink">
              {formatCurrency(tariff.pricePerKwh, tariff.currency)}
            </span>
          </div>
        ) : null}
        {tariff.pricePerMinute ? (
          <div className="flex items-center justify-between">
            <span>Price per minute</span>
            <span className="font-semibold text-ink">
              {formatCurrency(tariff.pricePerMinute, tariff.currency)}
            </span>
          </div>
        ) : null}
        {tariff.connectionFee ? (
          <div className="flex items-center justify-between">
            <span>Connection fee</span>
            <span className="font-semibold text-ink">
              {formatCurrency(tariff.connectionFee, tariff.currency)}
            </span>
          </div>
        ) : null}
      </div>
      {tariff.notes ? <p className="mt-3 text-xs text-muted">{tariff.notes}</p> : null}
    </div>
  );
}
