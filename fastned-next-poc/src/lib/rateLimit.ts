import 'server-only';

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true } as const;
  }

  if (existing.count >= limit) {
    const retryAfterSeconds = Math.ceil((existing.resetAt - now) / 1000);
    return { ok: false, retryAfterSeconds } as const;
  }

  existing.count += 1;
  buckets.set(key, existing);
  return { ok: true } as const;
}
