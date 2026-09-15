'use client';

import { useEffect, useState } from 'react';

/** Live "dd mmmm yyyy hh:mm" clock for Asia/Jakarta, e.g. "15 September 2026 23:15". */
export function useLocalClock() {
  const [formatted, setFormatted] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Jakarta',
    });

    const tick = () => {
      const parts = formatter.formatToParts(new Date());
      const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
      setFormatted(`${get('day')} ${get('month')} ${get('year')} ${get('hour')}:${get('minute')}`);
    };

    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return formatted;
}
