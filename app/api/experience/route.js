import { NextResponse } from 'next/server';
import { getExperience, getAllExperience, createExperience, updateExperience, deleteExperience } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all');
    const experience = all === 'true' ? await getAllExperience() : await getExperience();
    const res = NextResponse.json(experience);
    if (all !== 'true') {
      res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    }
    return res;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const exp = await createExperience(data);
    return NextResponse.json(exp, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { _id, ...rest } = data;
    const exp = await updateExperience(_id, rest);
    return NextResponse.json(exp);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await deleteExperience(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
