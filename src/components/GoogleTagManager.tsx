'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

interface GtmEvent {
  event: string;
  [key: string]: string | number | boolean | undefined;
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

export function triggerGtmEvent(eventData: GtmEvent) {
  if (typeof window !== 'undefined' && GTM_ID) {
    const dataLayer = (window as any).dataLayer;
    if (dataLayer) {
      dataLayer.push(eventData);
    }
  }
}

export function useGtmTracking() {
  useEffect(() => {
    if (typeof window !== 'undefined' && GTM_ID) {
      (window as any).dataLayer = (window as any).dataLayer || [];
      
      const dataLayer = (window as any).dataLayer;
      
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
