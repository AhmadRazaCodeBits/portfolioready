import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No files received.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // In serverless environments (Netlify/Vercel), writing to the local filesystem
    // is not permitted. We convert the image/file directly to a Base64 encoded Data URI.
    const mimeType = file.type || 'application/octet-stream';
    const base64Data = buffer.toString('base64');
    const fileUri = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({ 
      success: true, 
      imageUrl: fileUri 
    });
  } catch (error) {
    console.error('Error occurred in /api/upload: ', error);
    return NextResponse.json({ error: 'Message: ' + error.message }, { status: 500 });
  }
}
