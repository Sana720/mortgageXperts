import { NextResponse } from 'next/server';
import { isAuthenticated, signSession } from '@/lib/auth';
import { executeQuery } from '@/lib/db';
import { getClientIp, isRateLimited } from '@/lib/rateLimiter';
import crypto from 'crypto';

interface DBAdmin {
  id: string;
  username: string;
  password: string;
  createdAt: string;
}

function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash.includes(':')) {
    // Legacy unsalted SHA-256 hash
    const legacyHash = crypto.createHash('sha256').update(password).digest('hex');
    return legacyHash === storedHash;
  }

  // Salted scrypt hash
  const [saltHex, hashHex] = storedHash.split(':');
  const salt = Buffer.from(saltHex, 'hex');
  const expectedHash = crypto.scryptSync(password, salt, 64);
  const actualHash = Buffer.from(hashHex, 'hex');

  return actualHash.length === expectedHash.length && crypto.timingSafeEqual(actualHash, expectedHash);
}

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64);
  return `${salt.toString('hex')}:${hash.toString('hex')}`;
}

export async function GET() {
  const authed = await isAuthenticated();
  return NextResponse.json({ authenticated: authed });
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers);
    if (isRateLimited(ip, 5, 1000 * 60 * 5)) { // 5 attempts per 5 min
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again in 5 minutes.' },
        { status: 429 }
      );
    }

    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const rows = await executeQuery<DBAdmin[]>('SELECT * FROM admins WHERE username = ?', [username]);

    const envAdminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const isEnvMatch = username === 'admin' && password === envAdminPassword;

    let isAuthed = false;
    let needsUpgrade = false;

    if (rows.length > 0) {
      const admin = rows[0];
      if (verifyPassword(password, admin.password)) {
        isAuthed = true;
        if (!admin.password.includes(':')) {
          needsUpgrade = true;
        }
      }
    } else if (isEnvMatch) {
      isAuthed = true;
      needsUpgrade = true;
    }

    if (isAuthed) {
      const secureHash = hashPassword(password);
      if (needsUpgrade) {
        try {
          // Sync and upgrade password schema in the database to salted scrypt
          await executeQuery(
            `INSERT INTO admins (id, username, password) VALUES ('default-admin-id', 'admin', ?) 
             ON DUPLICATE KEY UPDATE password = ?`,
            [secureHash, secureHash]
          );
        } catch (dbErr) {
          console.error('Failed to sync/upgrade admin password to DB:', dbErr);
        }
      }

      const token = signSession(username);
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_session', token, {
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
