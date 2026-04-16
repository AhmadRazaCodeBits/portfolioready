import { NextResponse } from 'next/server';
import { getProjects, getAllProjects, createProject, updateProject, deleteProject } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all');
    const projects = all === 'true' ? await getAllProjects() : await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const project = await createProject(data);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { _id, ...rest } = data;
    const project = await updateProject(_id, rest);
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await deleteProject(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
