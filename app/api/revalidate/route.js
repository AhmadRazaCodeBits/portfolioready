import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getToken } from 'next-auth/jwt';
import { invalidateCache } from '@/lib/db';

/**
 * POST /api/revalidate
 * Triggers on-demand revalidation of the public homepage after admin content updates.
 * Requires admin authentication.
 */
export async function POST(request) {
  try {
    // Verify admin authentication
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Clear in-memory cache
    invalidateCache();

    // Revalidate the homepage and layout
    revalidatePath('/', 'layout');

    return NextResponse.json({
      success: true,
      message: 'Cache cleared and pages revalidated',
      revalidatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
