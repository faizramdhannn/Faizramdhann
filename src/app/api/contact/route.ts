import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { appendRowExplicit, ensureSheetTab } from '@/lib/googleSheets';

const schema = z.object({
  name: z.string().trim().min(1, 'Please enter your name').max(100),
  email: z.string().trim().email('Please enter a valid email').max(200),
  message: z.string().trim().min(10, 'Message is too short').max(3000),
  website: z.string().max(0).optional(), // honeypot, bots fill it
});

const hits = new Map<string, number[]>();
const LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  // Honeypot: bots fill the hidden field; pretend success without storing anything.
  if (typeof body.website === 'string' && body.website) return NextResponse.json({ success: true });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 });
  }
  const { name, email, message } = parsed.data;

  hits.set(ip, [...recent, now]);

  let stored = false;
  let emailed = false;

  const spreadsheetId = process.env.DATABASE_SPREADSHEET_ID;
  if (spreadsheetId) {
    try {
      await ensureSheetTab(spreadsheetId, 'Messages', ['Date', 'Name', 'Email', 'Message']);
      await appendRowExplicit(spreadsheetId, 'Messages', 'A', 'D', [new Date().toISOString(), name, email, message]);
      stored = true;
    } catch (error) {
      console.error('Contact: sheet store failed', error);
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
          to: process.env.CONTACT_TO_EMAIL || 'faizramdhan17@gmail.com',
          reply_to: email,
          subject: `New portfolio message from ${name}`,
          text: `${message}\n\nFrom: ${name} <${email}>`,
        }),
      });
      emailed = res.ok;
    } catch (error) {
      console.error('Contact: email failed', error);
    }
  }

  if (!stored && !emailed) {
    return NextResponse.json({ error: 'Could not send your message. Please email me directly.' }, { status: 502 });
  }
  return NextResponse.json({ success: true });
}
