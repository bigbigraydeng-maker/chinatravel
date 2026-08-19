'use client';

import { useEffect, useState } from 'react';
import { triggerGtmEvent } from '@/components/GoogleTagManager';
import { CTS_PHONE_DISPLAY, CTS_PHONE_HREF, CTS_PHONE_HOURS } from '@/lib/site';

interface FloatingHelpBubbleProps {
  /** Tour name for GTM event labels. Falls back to page path. */
  contextLabel?: string;
  /** Anchor id of the on-page enquiry section — bubble hides once user reaches it. */
  enquirySectionId?: string;
}

/**
 * Desktop-only "Need Help?" bubble anchored to the bottom-right.
 * Mobile uses the existing bottom-bar <FloatingCta />, so this component
 * hides itself below md to avoid double-stacking CTAs on small screens.
 *
 * Pattern is the same idea as TripADeal's Need Help widget — three contact
 * options exposed at one click, no form gate.
 */
export default function FloatingHelpBubble({
  contextLabel = 'site',
  enquirySectionId = 'enquiry',
}: FloatingHelpBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Hide once the enquiry form is on-screen — the bubble would just duplicate it.
  useEffect(() => {
    const handleScroll = () => {
      const enquiry = document.getElementById(enquirySectionId);
      if (!enquiry) {
        setIsHidden(false);
        return;
      }
      const top = enquiry.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      // Hide bubble when enquiry section is within the viewport
      setIsHidden(top < windowHeight && top > -enquiry.offsetHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enquirySectionId]);

  const fireEvent = (action: string) => {
    triggerGtmEvent({
      event: 'click',
      action: `help_bubble_${action}`,
      category: 'engagement',
      label: contextLabel,
      timestamp: Date.now(),
    });
  };

  const handleEnquireClick = () => {
    fireEvent('enquire');
    const el = document.getElementById(enquirySectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  if (isHidden) return null;

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Contact CTS Tours"
          className="mb-3 w-80 rounded-2xl bg-white shadow-2xl border border-warm-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2"
        >
          {/* Header */}
          <div className="bg-primary text-white px-5 py-4 flex items-center justify-between">
            <div>
              <p className="font-serif font-bold text-lg leading-tight">Need help?</p>
              <p className="text-xs text-white/85 mt-0.5">
                Our NZ team replies within one business day
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close help panel"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/15 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contact options */}
          <ul className="divide-y divide-warm-200">
            <li>
              <a
                href={CTS_PHONE_HREF}
                onClick={() => fireEvent('call')}
                className="flex items-center gap-3 px-5 py-4 hover:bg-warm-50 transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-gray-900 leading-tight">Call {CTS_PHONE_DISPLAY}</p>
                  <p className="text-xs text-gray-600 mt-0.5">Speak to a real person · {CTS_PHONE_HOURS}</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="mailto:info@ctstours.co.nz"
                onClick={() => fireEvent('email')}
                className="flex items-center gap-3 px-5 py-4 hover:bg-warm-50 transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-gray-900 leading-tight">Email info@ctstours.co.nz</p>
                  <p className="text-xs text-gray-600 mt-0.5">Reply within one business day</p>
                </div>
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={handleEnquireClick}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-warm-50 transition-colors text-left"
              >
                <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-gray-900 leading-tight">Request a callback</p>
                  <p className="text-xs text-gray-600 mt-0.5">We&apos;ll call you at a time that suits</p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Bubble trigger */}
      <button
        type="button"
        onClick={() => {
          const next = !isOpen;
          setIsOpen(next);
          if (next) fireEvent('open');
        }}
        aria-label={isOpen ? 'Close help' : 'Open help'}
        aria-expanded={isOpen}
        className="group flex items-center gap-2 pl-3 pr-4 py-3 bg-primary text-white rounded-full shadow-xl hover:shadow-2xl hover:bg-primary/90 transition-all"
      >
        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
          {isOpen ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </span>
        <span className="font-semibold text-sm">{isOpen ? 'Close' : 'Need help?'}</span>
      </button>
    </div>
  );
}
