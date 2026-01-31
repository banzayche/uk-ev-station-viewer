import { NextResponse } from 'next/server';
import { getStationsList } from '@/data/fastned/client';
import { applyStationFilters } from '@/lib/filters';
import { RateLimitError, UpstreamError } from '@/lib/errors';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get('q') ?? undefined;
    const bbox = url.searchParams.get('bbox') ?? undefined;
    const status = url.searchParams.get('status') ?? undefined;
    const minPowerKw = url.searchParams.get('minPowerKw') ?? undefined;

    const { items, lastUpdated } = await getStationsList();

    const filtered = applyStationFilters(items, {
      q,
      bbox,
      status,
      minPowerKw: minPowerKw ? Number(minPowerKw) : undefined
    });

    return NextResponse.json({
      data: filtered,
      meta: {
        total: items.length,
        count: filtered.length,
        lastUpdated
      }
    });
  } catch (error) {
    if (error instanceof RateLimitError) {
      return NextResponse.json(
        {
          error: 'Upstream rate limit reached',
          retryAfter: error.retryAfterSeconds
        },
        { status: 429, headers: { 'Retry-After': String(error.retryAfterSeconds) } }
      );
    }

    if (error instanceof UpstreamError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
