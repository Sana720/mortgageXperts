import { cookies } from 'next/headers';
import crypto from 'crypto';

const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback-session-secret-dont-use-in-prod';

export function signSession(username: string): string {
  const expires = Date.now() + 1000 * 60 * 60 * 24; // 1 day
  const payload = Buffer.from(`${username}:${expires}`).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session')?.value;
    if (!session) return false;

    const parts = session.split('.');
    if (parts.length !== 2) return false;

    const [payload, signature] = parts;
    const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');

    const a = Buffer.from(signature);
    const b = Buffer.from(expectedSignature);
    
    // Timing safe equal check
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return false;
    }

    const decoded = Buffer.from(payload, 'base64url').toString('utf8');
    const [username, expiresStr] = decoded.split(':');
    const expires = parseInt(expiresStr, 10);

    if (isNaN(expires) || expires < Date.now()) {
      return false;
    }

    return !!username;
  } catch {
    return false;
  }
}
