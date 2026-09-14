import { NextResponse } from 'next/server';
import { SEED_SANCTUARIES } from '@/lib/seed-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const realm = searchParams.get('realm');

  if (realm) {
    const filtered = SEED_SANCTUARIES.filter(
      (s) => s.realm.toLowerCase() === realm.toLowerCase()
    );
    return NextResponse.json({ sanctuaries: filtered });
  }

  return NextResponse.json({ sanctuaries: SEED_SANCTUARIES });
}
