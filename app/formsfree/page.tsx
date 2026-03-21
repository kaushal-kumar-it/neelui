'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const FORMSFREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSFREE_ENDPOINT;

export default function SupportPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!FORMSFREE_ENDPOINT) {
      setStatus('error');
      setMessage('Missing NEXT_PUBLIC_FORMSFREE_ENDPOINT environment variable.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(FORMSFREE_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('success');
      setMessage('Your support request has been sent. We will get back to you soon.');
      event.currentTarget.reset();
    } catch {
      setStatus('error');
      setMessage('Unable to submit right now. Please try again in a moment.');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-20 md:px-8">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <Link href="/docs" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Open Docs →
          </Link>
        </div>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 md:p-8">
          <p className="mb-3 inline-flex rounded-full border border-zinc-700 px-3 py-1 text-xs tracking-widest uppercase text-zinc-400">
            Support
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Contact Support</h1>
          <p className="text-zinc-400 text-sm md:text-base mb-6">
            Send your issue details and environment notes. We usually reply within one business day.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm text-zinc-300">Name</label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none focus:border-zinc-600"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-zinc-300">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none focus:border-zinc-600"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block text-sm text-zinc-300">Subject</label>
              <input
                id="subject"
                name="subject"
                required
                className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none focus:border-zinc-600"
                placeholder="Issue summary"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm text-zinc-300">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none focus:border-zinc-600"
                placeholder="Describe the issue, steps to reproduce, and expected behavior."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Request'}
            </button>
          </form>

          {message && (
            <p className={`mt-4 text-sm ${status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {message}
            </p>
          )}


        </section>
      </div>
    </main>
  );
}
