export type StationStatus = 'available' | 'busy' | 'offline' | 'unknown';

export type Address = {
  line1: string;
  city: string;
  postcode: string;
  country: string;
};

export type Coordinates = {
  lat: number;
  lon: number;
};

export type Connector = {
  id: string;
  type: string;
  powerKw?: number;
};

export type EvseStatus = 'AVAILABLE' | 'CHARGING' | 'OUTOFORDER' | 'UNKNOWN';

export type Evse = {
  id: string;
  connectors: Connector[];
  status: EvseStatus;
};

export type Station = {
  id: string;
  name: string;
  address: Address;
  coordinates: Coordinates;
  operator: string;
  evses: Evse[];
  amenities?: string[];
  lastUpdated?: string;
};

export type StationListItem = {
  id: string;
  name: string;
  address: Address;
  coordinates: Coordinates;
  operator: string;
  status: StationStatus;
  evseCount: number;
  maxPowerKw?: number;
  lastUpdated?: string;
};

export type Tariff = {
  currency: string;
  pricePerKwh?: number;
  pricePerMinute?: number;
  connectionFee?: number;
  notes?: string;
};

export type StationDetail = {
  station: Station;
  tariff?: Tariff;
};

export type MapStation = {
  id: string;
  name: string;
  address: Address;
  coordinates: Coordinates;
  status?: StationStatus;
};
