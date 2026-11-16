'use client';

/**
 * Tells this site's server that a page rendered, only on devices that came in through a Magic Engine mail link
 * (flag cookie `cts_me_on`). Runs on every client-side navigation too. Renders nothing; failures are ignored.
 * See lib/me-click-beacon.ts and app/api/me-view/route.ts.
 */
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { VIEW_FLAG_COOKIE, isTrackedPage } from '@/lib/me-click-beacon';

export default function MePageViewBeacon() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname || !isTrackedPage(pathname)) return;
    if (!document.cookie.split('; ').some((c) => c === `${VIEW_FLAG_COOKIE}=1`)) return;
    const body = JSON.stringify({ path: pathname });
    try {
      if (typeof navigator.sendBeacon === 'function') {
        navigator.sendBeacon('/api/me-view', new Blob([body], { type: 'application/json' }));
        return;
      }
      void fetch('/api/me-view', { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } }).catch(() => undefined);
    } catch {
      // reporting is best effort
    }
  }, [pathname]);
  return null;
}
