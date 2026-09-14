import { NextResponse } from 'next/server';
import { SEED_TRIP } from '@/lib/seed-data';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (id === SEED_TRIP.id || id === 'current') {
    return NextResponse.json({ trip: SEED_TRIP });
  }

  return NextResponse.json({ trip: SEED_TRIP });
}
