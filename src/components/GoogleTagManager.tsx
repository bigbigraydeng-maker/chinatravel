'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { captureUtmParams } from '@/lib/utils/utm-parser';
import { getGtmId } from '@/lib/env';

// Env-driven: production uses NEXT_PUBLIC_GTM_ID, staging uses
// NEXT_PUBLIC_GTM_ID_STAGING (see src/lib/env.ts + ceepii-assessment.md §4.4).
// Missing ID renders nothing — safe no-op.
const GTM_ID = getGtmId();

interface GtmEvent {
  event: string;
  [key: string]: string | number | boolean | undefined;
}

// Extend Window interface for GTM dataLayer
declare global {
  interface Window {
    dataLayer: GtmEvent[];
  }
}

export function GoogleTagManager() {
  if (!GTM_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  );
}

// The GTM container is not installed on the site, so a dataLayer push alone is never
// recorded. These interactions are also sent straight to GA4 through gtag. Keep form
// submissions off this list: they are already reported by fireLeadConversion.
const GA4_DIRECT_EVENTS: ReadonlySet<string> = new Set([
  'click_to_call',
  'itinerary_print_open',
  'itinerary_email_sent',
]);

function sendToGa4(eventData: GtmEvent) {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag || !GA4_DIRECT_EVENTS.has(eventData.event)) return;
  const { event, tour_slug, pagePath } = eventData;
  gtag('event', event, {
    ...(tour_slug ? { tour_slug } : {}),
    ...(pagePath ? { page_path: pagePath } : {}),
  });
}

export function triggerGtmEvent(eventData: GtmEvent) {
  if (typeof window === 'undefined') {
    return; // Server-side render, skip
  }

  sendToGa4(eventData);

  if (!GTM_ID) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[GTM] GTM_ID not configured. Event not sent:', eventData);
    }
    return;
  }

  const dataLayer = window.dataLayer;
  if (!dataLayer) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[GTM] dataLayer not initialized. Event not sent:', eventData);
    }
    return;
  }

  dataLayer.push(eventData);
}

export function useGtmTracking() {
  useEffect(() => {
    if (typeof window !== 'undefined' && GTM_ID) {
      window.dataLayer = window.dataLayer || [];

      const dataLayer = window.dataLayer;

      // Capture UTM parameters from URL (handles both query string and hash)
      // This is important for bit.ly short links that may put params in hash
      captureUtmParams();

      dataLayer.push({
        event: 'pageview',
        pagePath: window.location.pathname,
        pageTitle: document.title,
      });

      const handlePhoneClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.closest('a[href^="tel:"]')) {
          const link = target.closest('a[href^="tel:"]') as HTMLAnchorElement;
          triggerGtmEvent({
            event: 'click_to_call',
            phoneNumber: link.href.replace('tel:', ''),
            timestamp: Date.now(),
            pagePath: window.location.pathname,
          });
        }
      };

      const handleDownload = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const link = target.closest('a[href$=".pdf"], a[download]');
        if (link) {
          const anchor = link as HTMLAnchorElement;
          triggerGtmEvent({
            event: 'download',
            fileUrl: anchor.href,
            fileName: anchor.href.split('/').pop(),
            timestamp: Date.now(),
            pagePath: window.location.pathname,
          });
        }
      };

      document.addEventListener('click', handlePhoneClick);
      document.addEventListener('click', handleDownload);

      return () => {
        document.removeEventListener('click', handlePhoneClick);
        document.removeEventListener('click', handleDownload);
      };
    }
  }, []);
}

export default GoogleTagManager;
