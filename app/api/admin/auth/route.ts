import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

import { executeQuery } from '@/lib/db';
import crypto from 'crypto';

interface DBAdmin {
  id: string;
  username: string;
  password: string;
  createdAt: string;
}

export async function GET() {
  const authed = await isAuthenticated();
  return NextResponse.json({ authenticated: authed });
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const rows = await executeQuery<DBAdmin[]>('SELECT * FROM admins WHERE username = ?', [username]);

    const envAdminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const isEnvMatch = username === 'admin' && password === envAdminPassword;

    let isAuthed = false;

    if (rows.length > 0) {
      const admin = rows[0];
      if (admin.password === hash) {
        isAuthed = true;
      }
    }

    // Fallback: Check if it matches the current environment variable.
    // If it matches, we allow the login and automatically sync the database record.
    if (isEnvMatch) {
      isAuthed = true;
      try {
        // Sync the password to the database to ensure database records are up to date.
        // We use an upsert (INSERT ... ON DUPLICATE KEY UPDATE) so that it updates the existing default admin ID.
        await executeQuery(
          `INSERT INTO admins (id, username, password) VALUES ('default-admin-id', 'admin', ?) 
           ON DUPLICATE KEY UPDATE password = ?`,
          [hash, hash]
        );
      } catch (dbErr) {
        console.error('Failed to sync admin password to DB:', dbErr);
      }
    }

    if (isAuthed) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_session', 'authenticated_admin', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_session', '', { maxAge: 0, path: '/' });
  return response;
}
