export type FastnedReferenceResponse = {
  lastUpdated: string;
  stations: FastnedReferenceStation[];
};

export type FastnedReferenceStation = {
  id: string;
  name: string;
  address: {
    line1: string;
    city: string;
    postcode: string;
    country: string;
  };
  coordinates: {
    lat: number;
    lon: number;
  };
  operator?: string;
  amenities?: string[];
  evses: FastnedReferenceEvse[];
};

export type FastnedReferenceEvse = {
  id: string;
  connectors: FastnedReferenceConnector[];
};

export type FastnedReferenceConnector = {
  id: string;
  type: string;
  powerKw?: number;
};

export type FastnedAvailabilityResponse = {
  lastUpdated: string;
  evses: FastnedAvailabilityEvse[];
  tariffs?: FastnedTariff[];
};

export type FastnedAvailabilityEvse = {
  id: string;
  status: 'AVAILABLE' | 'CHARGING' | 'OUTOFORDER' | 'UNKNOWN';
};

export type FastnedTariffsResponse = {
  lastUpdated: string;
  tariffs: FastnedTariff[];
};

export type FastnedTariff = {
  stationId: string;
  currency: string;
  pricePerKwh?: number;
  pricePerMinute?: number;
  connectionFee?: number;
  notes?: string;
};
