import { NextResponse } from 'next/server';
import { getChatbotResponses } from '@/lib/db';
import { getChatbotResponse } from '@/lib/chatbot';

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { message: 'Message is required' },
        { status: 400 }
      );
    }

    const responses = await getChatbotResponses();
    const reply = getChatbotResponse(message, responses);

    // Chatbot responses can be cached at CDN edge since they're deterministic
    const res = NextResponse.json({ reply });
    res.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    return res;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
