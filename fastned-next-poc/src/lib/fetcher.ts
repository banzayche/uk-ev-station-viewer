import { UpstreamError } from '@/lib/errors';

type NextFetchOptions = {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export async function fetchJson<T>(
  url: string,
  options: RequestInit & NextFetchOptions & { timeoutMs?: number } = {}
): Promise<T> {
  const { timeoutMs = 8000, ...rest } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetch(url, { ...rest, signal: controller.signal });
  } catch (error) {
    clearTimeout(timeout);
    throw new UpstreamError('Upstream request failed', 502);
  }

  clearTimeout(timeout);

  if (!response.ok) {
    throw new UpstreamError(`Upstream error: ${response.status}`, response.status);
  }

  return (await response.json()) as T;
}
