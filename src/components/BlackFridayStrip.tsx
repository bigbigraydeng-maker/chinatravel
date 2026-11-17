'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isOfferOpen } from '@/lib/campaigns/black-friday-2026';

/**
 * Sitewide Black Friday 2026 entry strip. Links to the landing page, is not shown on the landing page itself,
 * and disappears on its own once the offer ends (checked in the browser, so cached pages still switch off).
 */
export default function BlackFridayStrip() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOfferOpen(new Date()));
  }, []);

  if (!open || pathname?.startsWith('/campaigns/black-friday-2026')) return null;

  return (
    <Link
      href="/campaigns/black-friday-2026?utm_source=site&utm_medium=strip&utm_campaign=black-friday-2026"
      className="block bg-[#B61E2E] px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-[#9d1a27]"
    >
      <span className="uppercase tracking-wider">Black Friday Sale</span> · Save up to NZ$2,000 on 2027 China tours ·
      Book by 4 Dec <span aria-hidden="true">→</span>
    </Link>
  );
}
