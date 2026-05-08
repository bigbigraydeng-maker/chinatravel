'use client';

import { useEffect, useState } from 'react';
import NewsletterSubscribeForm from './NewsletterSubscribeForm';

const STORAGE_KEY = 'cts_newsletter_popup_dismissed';
const SUPPRESS_DAYS = 7;
const DELAY_SECONDS = 8;

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const dismissedAt = Number(raw);
      const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
      if (daysSince < SUPPRESS_DAYS) return;
    }

    const timer = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
    }, DELAY_SECONDS * 1000);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setAnimateIn(false);
    setTimeout(() => setVisible(false), 300);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 transition-all duration-300 ${
        animateIn ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter signup"
    >
      <div
        className={`relative w-full max-w-md bg-gradient-to-br from-accent to-slate-800 rounded-2xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 ${
          animateIn
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-95'
        }`}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/15 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close newsletter popup"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative z-10 p-7">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/30 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Free Weekly Newsletter
          </div>

          <h2 className="text-2xl font-serif font-bold text-white mb-2 leading-snug">
            Planning a China trip?
          </h2>
          <p className="text-gray-300 text-sm mb-5 leading-relaxed">
            Get expert guides, visa tips, and exclusive offers from New Zealand&apos;s China specialists — straight to your inbox.
          </p>

          <NewsletterSubscribeForm variant="footer" />

          <button
            onClick={dismiss}
            className="mt-4 w-full text-gray-500 hover:text-gray-300 text-xs text-center transition-colors"
          >
            No thanks, I&apos;ll browse without help
          </button>
        </div>
      </div>
    </div>
  );
}
