import { NextResponse } from 'next/server';
import { getNavItems, getAllNavItems, updateNavItems } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all');
    const items = all === 'true' ? await getAllNavItems() : await getNavItems();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const items = await updateNavItems(data);
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
