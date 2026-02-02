import { NextResponse } from 'next/server';
import { getStationDetail } from '@/data/fastned/client';
import { RateLimitError, UpstreamError } from '@/lib/errors';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await getStationDetail(params.id);

    if (!data) {
      return NextResponse.json({ error: 'Station not found' }, { status: 404 });
    }

    return NextResponse.json({ data });
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
