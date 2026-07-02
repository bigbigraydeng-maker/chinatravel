'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

/**
 * Right-bottom floating CTA cluster — appears after scroll past hero.
 *
 * Visual-consistency refactor (P0 #2): collapsed into a single primary
 * burgundy "Talk to us" button that expands two child actions on click —
 * "Reserve Your Place" (jumps to #enquiry) + "Call Auckland" (tel: link).
 * Pre-refactor: two stacked floating cards, one amber/orange gradient + one
 * white-with-emerald-circle, which together with the top StickyPriceBar +
 * navbar gave the page 4 sticky elements and 5+ colours competing for
 * attention. Now: 1 sticky cluster, single brand-red trigger, gold accent
 * on the primary expanded action — no emerald, no orange.
 *
 * Outside-click / Escape closes the cluster.
 */
const NZ_PHONE_DISPLAY = '+64 9 309 6458';
const NZ_PHONE_TEL = '+6493096458';

export default function FloatingPhoneCta() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Show the cluster after the hero scrolls past, so first paint stays focal.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on outside-click / Escape so the cluster never traps the user.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('touchstart', onPointer, { passive: true });
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('touchstart', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      role="region"
      aria-label="Quick contact"
      aria-hidden={!visible}
      className={`fixed bottom-6 right-6 z-30 transition-all duration-300 hidden md:flex flex-col items-end gap-2 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      {/* Expanded child actions — only mounted when the cluster is open.
          Stacked above the trigger so the visual hierarchy reads:
          Reserve (primary white) → Call (secondary outline) → Talk to us trigger. */}
      {open && (
        <>
          <a
            href="#enquiry"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 bg-white border border-warm-200 hover:border-primary/40 text-primary font-semibold pl-3 pr-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="message" className="w-4 h-4 text-primary" />
            </span>
            <span className="text-sm">Reserve Your Place →</span>
          </a>

          <a
            href={`tel:${NZ_PHONE_TEL}`}
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 bg-white border border-warm-200 hover:border-primary/40 text-accent font-semibold pl-3 pr-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <span className="w-7 h-7 rounded-full bg-warm-100 flex items-center justify-center">
              <Icon name="phone" className="w-4 h-4 text-accent" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-wider text-gray-500">Call Auckland</span>
              <span className="text-sm">{NZ_PHONE_DISPLAY}</span>
            </span>
          </a>
        </>
      )}

      {/* Primary trigger — single brand-red FAB. Click toggles the expanded
          children above; aria-expanded mirrors state for screen readers. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
        className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold pl-3 pr-5 py-3 rounded-full shadow-xl transition-all"
      >
        <span className="w-9 h-9 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center">
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <Icon name="message" className="w-5 h-5 text-white" />
          )}
        </span>
        <span className="text-sm">{open ? 'Close' : 'Talk to us'}</span>
      </button>
    </div>
  );
}
