import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import DynamicSection from '@/models/DynamicSection';

export async function GET() {
  try {
    await connectDB();
    const sections = await DynamicSection.find().sort({ order: 1 }).lean();
    return NextResponse.json(sections);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await connectDB();
    const existing = await DynamicSection.findOne({ order: data.order }).lean();
    if (existing) throw new Error(`Order number ${data.order} is already in use.`);
    const section = await DynamicSection.create(data);
    return NextResponse.json(section);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    await connectDB();
    const existing = await DynamicSection.findOne({ order: data.order, _id: { $ne: data._id } }).lean();
    if (existing) throw new Error(`Order number ${data.order} is already in use.`);
    const section = await DynamicSection.findByIdAndUpdate(data._id, data, { new: true }).lean();
    return NextResponse.json(section);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await connectDB();
    await DynamicSection.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
