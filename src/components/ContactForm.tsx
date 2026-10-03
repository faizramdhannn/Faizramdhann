'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

const field =
  'w-full px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 text-sm focus:outline-none focus:border-primary';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setError('');
    setStatus('sending');
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? 'Something went wrong');
      form.reset();
      setStatus('sent');
    } catch (err) {
      setError((err as Error).message);
      setStatus('idle');
    }
  }

  if (status === 'sent') {
    return (
      <div className="liquid-glass rounded-3xl p-8 text-center space-y-3">
        <CheckCircle2 className="mx-auto text-primary" size={36} />
        <p className="font-semibold">Message sent. Thank you!</p>
        <p className="text-sm text-foreground/55">I&apos;ll get back to you as soon as I can.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="liquid-glass rounded-3xl p-6 md:p-8 space-y-4 text-left">
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="name" required maxLength={100} placeholder="Your name" aria-label="Your name" autoComplete="name" className={field} />
        <input name="email" type="email" required maxLength={200} placeholder="Your email" aria-label="Your email" autoComplete="email" className={field} />
      </div>
      <textarea name="message" required minLength={10} maxLength={3000} placeholder="Your message" aria-label="Your message" className={`${field} h-32`} />
      {/* honeypot */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-2xl disabled:opacity-50"
      >
        <Send size={16} /> {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}
