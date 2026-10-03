import { NextRequest, NextResponse } from 'next/server';
import {
  SESSION_COOKIE, SESSION_TTL_SECONDS, authConfigured, checkPassword, createSessionToken,
} from '@/lib/auth';

// Best-effort brute-force throttle (per server instance).
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000;

function clientKey(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

export async function POST(request: NextRequest) {
  if (!authConfigured()) {
    return NextResponse.json({ error: 'Admin login is not configured' }, { status: 503 });
  }

  const key = clientKey(request);
  const now = Date.now();
  const entry = attempts.get(key);
  if (entry && entry.resetAt > now && entry.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
  }

  const { password } = await request.json().catch(() => ({ password: '' }));
  if (typeof password !== 'string' || !(await checkPassword(password))) {
    attempts.set(key, {
      count: (entry && entry.resetAt > now ? entry.count : 0) + 1,
      resetAt: entry && entry.resetAt > now ? entry.resetAt : now + WINDOW_MS,
    });
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  attempts.delete(key);
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return response;
}
