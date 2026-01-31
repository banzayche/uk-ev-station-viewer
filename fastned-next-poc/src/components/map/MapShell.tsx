'use client';

import dynamic from 'next/dynamic';
import { MapStation } from '@/domain/types';
import { publicEnv } from '@/lib/publicEnv';

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[320px] items-center justify-center rounded-3xl border border-white/50 bg-white/70">
      <span className="text-sm text-muted">Loading map…</span>
    </div>
  )
});

type MapShellProps = {
  stations: MapStation[];
  center?: { lat: number; lon: number };
  zoom?: number;
  onSelectStation?: (id: string) => void;
};

export function MapShell({ stations, center, zoom, onSelectStation }: MapShellProps) {
  return (
    <div className="h-full min-h-[320px] overflow-hidden rounded-3xl border border-white/50 bg-white/70 shadow-soft">
      <MapView
        stations={stations}
        center={center ?? { lat: publicEnv.mapDefaultLat, lon: publicEnv.mapDefaultLon }}
        zoom={zoom ?? publicEnv.mapDefaultZoom}
        onSelectStation={onSelectStation}
      />
    </div>
  );
}
