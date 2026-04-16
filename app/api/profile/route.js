import { NextResponse } from 'next/server';
import { getProfile, updateProfile } from '@/lib/db';

export async function GET() {
  try {
    const profile = await getProfile();
    return NextResponse.json(profile);
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
