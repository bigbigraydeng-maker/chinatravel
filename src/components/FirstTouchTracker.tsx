'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { recordPageView } from '@/lib/analytics/first-touch';

/** Renders nothing. Records each route for enquiry attribution (see lib/analytics/first-touch.ts). */
export default function FirstTouchTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname) recordPageView(pathname);
  }, [pathname]);
  return null;
}
