'use client';

import { Station, Tariff } from '@/domain/types';
import { MapShell } from '@/components/map/MapShell';
import { FavoriteButton } from '@/components/stations/FavoriteButton';
import { EVSETable } from '@/components/stations/EVSETable';
import { TariffCard } from '@/components/stations/TariffCard';
import { StatusPill } from '@/components/ui/StatusPill';
import { stationStatusFromEvses } from '@/lib/status';
import { formatPower, getMaxPower } from '@/lib/utils';

export function StationDetailClient({ station, tariff }: { station: Station; tariff?: Tariff }) {
  const status = stationStatusFromEvses(station.evses);
  const maxPower = getMaxPower(station.evses);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{station.name}</h1>
          <p className="text-sm text-muted">
            {station.address.line1}, {station.address.city} {station.address.postcode}
          </p>
        </div>
        <FavoriteButton stationId={station.id} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <StatusPill status={status} />
        <span className="rounded-full bg-white/80 px-3 py-1 text-xs text-muted">
          {station.evses.length} chargers
        </span>
        {maxPower ? (
          <span className="rounded-full bg-white/80 px-3 py-1 text-xs text-muted">
            Up to {formatPower(maxPower)}
          </span>
        ) : null}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/50 bg-white/80 p-4 shadow-soft">
            <h2 className="text-lg font-semibold">Chargers</h2>
            <div className="mt-3">
              <EVSETable evses={station.evses} />
            </div>
          </div>
          {tariff ? (
            <TariffCard tariff={tariff} />
          ) : (
            <div className="rounded-2xl border border-white/50 bg-white/80 p-4 text-sm text-muted">
              Ad-hoc tariff information is not available for this station.
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/50 bg-white/80 p-4 shadow-soft">
            <h2 className="text-lg font-semibold">Location</h2>
            <div className="mt-3 h-[320px]">
              <MapShell
                stations={[
                  {
                    id: station.id,
                    name: station.name,
                    address: station.address,
                    coordinates: station.coordinates,
                    status
                  }
                ]}
                center={station.coordinates}
                zoom={13}
              />
            </div>
          </div>
          {station.amenities?.length ? (
            <div className="rounded-2xl border border-white/50 bg-white/80 p-4 text-sm text-muted">
              <h3 className="text-sm font-semibold text-ink">Amenities</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {station.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full bg-white/80 px-3 py-1 text-xs text-muted"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
