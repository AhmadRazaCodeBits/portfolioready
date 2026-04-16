import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No files received.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + '_' + file.name.replace(/[^a-zA-Z0-9.-]/g, '');
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure the uploads directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Ignore if directory already exists
    }

    await writeFile(path.join(uploadDir, filename), buffer);

    return NextResponse.json({ 
      success: true, 
      imageUrl: '/uploads/' + filename 
    });
  } catch (error) {
    console.error('Error occurred in /api/upload: ', error);
    return NextResponse.json({ error: 'Message: ' + error.message }, { status: 500 });
  }
}
