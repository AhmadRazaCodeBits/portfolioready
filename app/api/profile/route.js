import { NextResponse } from 'next/server';
import { getProfile, updateProfile } from '@/lib/db';

export async function GET() {
  try {
    const profile = await getProfile();
    const res = NextResponse.json(profile);
    res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return res;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const profile = await updateProfile(data);
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
