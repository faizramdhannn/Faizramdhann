// Tiny in-memory TTL cache shared between public and admin routes so admin writes
// are visible immediately instead of after the 5 minute window.
type Entry<T> = { data: T; timestamp: number };
const store = new Map<string, Entry<unknown>>();
export const CACHE_TTL = 5 * 60 * 1000;

export function getCached<T>(key: string): T | null {
  const hit = store.get(key) as Entry<T> | undefined;
  return hit && Date.now() - hit.timestamp < CACHE_TTL ? hit.data : null;
}
export function getStale<T>(key: string): T | null {
  return (store.get(key) as Entry<T> | undefined)?.data ?? null;
}
export function setCached<T>(key: string, data: T) {
  store.set(key, { data, timestamp: Date.now() });
}
export function invalidate(...keys: string[]) {
  keys.forEach((k) => store.delete(k));
}
