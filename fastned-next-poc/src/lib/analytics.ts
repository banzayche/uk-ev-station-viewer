export function trackEvent(event: string, payload?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line no-console
  console.info(`[analytics] ${event}`, payload ?? {});
}
