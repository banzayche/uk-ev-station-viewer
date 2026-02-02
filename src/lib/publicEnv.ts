const parseNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const publicEnv = {
  mapDefaultLat: parseNumber(process.env.NEXT_PUBLIC_MAP_DEFAULT_LAT, 54.5),
  mapDefaultLon: parseNumber(process.env.NEXT_PUBLIC_MAP_DEFAULT_LON, -2.5),
  mapDefaultZoom: parseNumber(process.env.NEXT_PUBLIC_MAP_DEFAULT_ZOOM, 6),
  appMode: (process.env.NEXT_PUBLIC_APP_MODE ?? 'mock') as 'mock' | 'live'
};
