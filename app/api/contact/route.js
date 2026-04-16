import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/validators';

export async function POST(request) {
  try {
    const data = await request.json();

    // Validate input
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;
    console.log('📧 New contact form submission:', { name, email, message });

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL || 'ahmadraza20416@gmail.com',
        subject: `Portfolio Contact: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 16px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; background: white; padding: 16px; border-radius: 6px; border: 1px solid #e2e8f0;">${message}</p>
            </div>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 16px;">
              Sent from your portfolio contact form
            </p>
          </div>
        `,
        replyTo: email,
      });

      console.log('✅ Email sent via Resend');
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ message: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
