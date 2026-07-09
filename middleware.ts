import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback-session-secret-dont-use-in-prod';

async function isSessionValid(sessionValue: string): Promise<boolean> {
  try {
    const parts = sessionValue.split('.');
    if (parts.length !== 2) return false;

    const [payload, signature] = parts;
    
    // Import Key for HMAC verification
    const encoder = new TextEncoder();
    const keyData = encoder.encode(SESSION_SECRET);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    // Compute expected HMAC signature
    const payloadData = encoder.encode(payload);
    const signatureBuffer = await crypto.subtle.sign('HMAC', key, payloadData);
    
    // Convert signatureBuffer to base64url string
    const signatureBytes = new Uint8Array(signatureBuffer);
    let binary = '';
    for (let i = 0; i < signatureBytes.byteLength; i++) {
      binary += String.fromCharCode(signatureBytes[i]);
    }
    const expectedSignature = btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    // Compare signatures
    if (signature !== expectedSignature) {
      return false;
    }

    // Decode payload: Base64URL to utf-8 string
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
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

/**
 * Route-level middleware that protects all /admin/* paths.
 * If the admin_session cookie is not present or has an invalid HMAC signature,
 * the request is redirected to /admin (login page).
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public unauthenticated GET access for blogs and testimonials APIs
  const isPublicGetApi =
    request.method === 'GET' &&
    (pathname === '/api/admin/blogs' || pathname === '/api/admin/testimonials');

  // Protect all /admin/* paths (but not /admin itself — that renders the login UI)
  // Also protect /api/admin/* routes
  const isAdminSubPath =
    pathname.startsWith('/admin/') ||
    (pathname.startsWith('/api/admin/') &&
      !pathname.startsWith('/api/admin/auth') &&
      !isPublicGetApi);

  if (isAdminSubPath) {
    const session = request.cookies.get('admin_session');
    if (!session || !(await isSessionValid(session.value))) {
      // For API routes return 401, for page routes redirect to /admin
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path+', '/api/admin/:path+'],
};
