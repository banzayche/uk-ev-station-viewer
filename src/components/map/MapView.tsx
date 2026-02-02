'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import type { LatLngBounds } from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapStation } from '@/domain/types';
import { statusLabel } from '@/lib/utils';

const icon2x = typeof markerIcon2x === 'string' ? markerIcon2x : markerIcon2x.src;
const icon = typeof markerIcon === 'string' ? markerIcon : markerIcon.src;
const shadow = typeof markerShadow === 'string' ? markerShadow : markerShadow.src;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon2x,
  iconUrl: icon,
  shadowUrl: shadow
});

type MapViewProps = {
  stations: MapStation[];
  center: { lat: number; lon: number };
  zoom: number;
  onSelectStation?: (id: string) => void;
};

function BoundsWatcher({ onChange }: { onChange: (bounds: LatLngBounds) => void }) {
  useMapEvents({
    moveend: (event) => {
      onChange(event.target.getBounds());
    },
    zoomend: (event) => {
      onChange(event.target.getBounds());
    }
  });

  return null;
}

export default function MapView({ stations, center, zoom, onSelectStation }: MapViewProps) {
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);

  const visibleStations = useMemo(() => {
    if (!bounds) return stations;
    return stations.filter((station) =>
      bounds.contains([station.coordinates.lat, station.coordinates.lon])
    );
  }, [bounds, stations]);

  return (
    <div role="region" aria-label="Map of charging stations" className="h-full">
      <MapContainer
        center={[center.lat, center.lon]}
        zoom={zoom}
        scrollWheelZoom
        className="h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <BoundsWatcher onChange={(next) => setBounds(next)} />
        {visibleStations.map((station) => (
          <Marker
            key={station.id}
            position={[station.coordinates.lat, station.coordinates.lon]}
            eventHandlers={{
              click: () => onSelectStation?.(station.id)
            }}
          >
            <Popup>
              <div className="space-y-1">
                <div className="text-sm font-semibold">{station.name}</div>
                <div className="text-xs text-muted">
                  {station.address.city} • {station.address.postcode}
                </div>
                {station.status ? (
                  <div className="text-xs text-muted">{statusLabel(station.status)}</div>
                ) : null}
                <Link
                  tabIndex={0}
                  href={`/stations/${station.id}`}
                  className="text-xs font-semibold text-blue-700"
                  aria-label={`Open details for ${station.name}`}
                >
                  Open details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
