// Edge-compatible (Web Crypto) signed-cookie session. No external deps, usable in middleware.
export const SESSION_COOKIE = 'admin_session';
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function authConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

/** Constant-time password check. Never falls back to a default password. */
export async function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!expected || !secret) return false;
  const [a, b] = await Promise.all([sign(input, secret), sign(expected, secret)]);
  return safeEqual(a, b);
}

export async function createSessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not set');
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  return `${expires}.${await sign(String(expires), secret)}`;
}

export async function verifySessionToken(token?: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!token || !secret) return false;
  const [expires, signature] = token.split('.');
  if (!expires || !signature) return false;
  if (Number(expires) < Math.floor(Date.now() / 1000)) return false;
  return safeEqual(signature, await sign(expires, secret));
}
