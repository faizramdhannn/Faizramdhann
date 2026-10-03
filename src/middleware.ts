import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApi = pathname.startsWith('/api/admin');
  const authed = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);

  if (!authed) {
    if (isApi) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (pathname === '/admin/login') return NextResponse.next();
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // CSRF defence in depth: state-changing API calls must come from our own origin.
  if (isApi && request.method !== 'GET') {
    const origin = request.headers.get('origin');
    if (origin && origin !== request.nextUrl.origin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };
