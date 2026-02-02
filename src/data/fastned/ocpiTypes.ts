export type OcpiResponse<T> = {
  data: T;
  timestamp?: string;
};

export type OcpiLocation = {
  id: string;
  name?: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  coordinates: { latitude: string; longitude: string };
  operator?: { name?: string };
  facilities?: string[];
  evses?: OcpiEvse[];
};

export type OcpiEvse = {
  uid?: string;
  id?: string;
  evse_id?: string;
  status?: string;
  tariff_id?: string;
  tariff_ids?: string[];
  connectors: OcpiConnector[];
};

export type OcpiConnector = {
  id: string;
  standard: string;
  max_voltage?: number;
  max_amperage?: number;
  max_electric_power?: number;
  tariff_id?: string;
  tariff_ids?: string[];
};

export type OcpiTariff = {
  id: string;
  currency: string;
  elements?: Array<{
    price_components?: Array<{
      type?: string;
      price?: number;
    }>;
  }>;
};
