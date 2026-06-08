import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Route-level middleware that protects all /admin/* paths.
 * If the admin_session cookie is not present or has the wrong value,
 * the request is redirected to /admin (login page) instead of
 * serving the protected admin dashboard HTML.
 *
 * NOTE: The admin page itself (GET /admin) always renders the login form
 * when not authenticated, so we only need to guard the API admin routes
 * from direct URL access and any future server-rendered admin sub-pages.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin/* paths (but not /admin itself — that renders the login UI)
  // Also protect /api/admin/* routes (belt-and-suspenders alongside per-route auth)
  const isAdminSubPath =
    pathname.startsWith('/admin/') ||
    (pathname.startsWith('/api/admin/') &&
      !pathname.startsWith('/api/admin/auth')); // allow auth endpoint to work unauthenticated

  if (isAdminSubPath) {
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated_admin') {
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
