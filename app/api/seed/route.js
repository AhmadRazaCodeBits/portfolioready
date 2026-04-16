import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/db';

export async function POST() {
  try {
    const result = await seedDatabase();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
