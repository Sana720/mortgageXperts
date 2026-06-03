import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const authed = await isAuthenticated();
  return NextResponse.json({ authenticated: authed });
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === expectedPassword) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_session', 'authenticated_admin', {
        httpOnly: true,
        secure: false, // Localhost is not HTTPS, so false is correct
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_session', '', { maxAge: 0, path: '/' });
  return response;
}
