'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

/**
 * Right-bottom floating CTA — appears after scroll past hero and stays
 * visible. Two stacked buttons: "Call us" (NZ landline) and "Enquire" (jumps
 * to sticky enquiry form). Hidden on the smallest viewports where the
 * existing FloatingCta from /tours product page already provides this.
 */
const NZ_PHONE_DISPLAY = '+64 9 309 6458';
const NZ_PHONE_TEL = '+6493096458';

export default function FloatingPhoneCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      role="region"
      aria-label="Quick contact"
      aria-hidden={!visible}
      className={`fixed bottom-6 right-6 z-30 transition-all duration-300 hidden md:flex flex-col gap-2 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <a
        href={`tel:${NZ_PHONE_TEL}`}
        className="group inline-flex items-center gap-2 bg-white border border-warm-200 hover:border-amber-400 text-gray-900 font-semibold pl-3 pr-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <span className="w-9 h-9 rounded-full bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center">
          <Icon name="phone" className="w-5 h-5 text-emerald-700" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] uppercase tracking-wider text-gray-500">Call Auckland</span>
          <span className="text-sm">{NZ_PHONE_DISPLAY}</span>
        </span>
      </a>

      <a
        href="#enquiry"
        className="group inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold pl-3 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <span className="w-9 h-9 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center">
          <Icon name="message" className="w-5 h-5 text-white" />
        </span>
        <span className="text-sm">Reserve Your Place →</span>
      </a>
    </div>
  );
}
