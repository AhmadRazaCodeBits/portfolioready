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

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
