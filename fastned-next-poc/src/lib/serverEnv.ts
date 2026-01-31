export const serverEnv = {
  baseUrl: process.env.FASTNED_UK_API_BASE_URL ?? '',
  apiKey: process.env.FASTNED_UK_API_KEY ?? '',
  referencePath: process.env.FASTNED_UK_REFERENCE_PATH ?? '/uk/reference',
  availabilityPath: process.env.FASTNED_UK_AVAILABILITY_PATH ?? '/uk/availability',
  tariffsPath: process.env.FASTNED_UK_TARIFFS_PATH ?? ''
};

export const isMockMode = (process.env.NEXT_PUBLIC_APP_MODE ?? 'mock') === 'mock';
