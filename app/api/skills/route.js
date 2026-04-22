import { NextResponse } from 'next/server';
import { getSkills, getAllSkills, createSkill, updateSkill, deleteSkill } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all');
    const skills = all === 'true' ? await getAllSkills() : await getSkills();
    const res = NextResponse.json(skills);
    // Only cache public reads, not admin ?all=true reads
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
    const skill = await createSkill(data);
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { _id, ...rest } = data;
    const skill = await updateSkill(_id, rest);
    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await deleteSkill(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
