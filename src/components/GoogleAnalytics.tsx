'use client';

import Script from 'next/script';
import { getGaId } from '@/lib/env';

// Env-driven: production uses NEXT_PUBLIC_GA_ID, staging uses
// NEXT_PUBLIC_GA_ID_STAGING (see src/lib/env.ts + ceepii-assessment.md §4.4).
// Missing ID renders nothing — safe no-op.
const GA_ID = getGaId();

export function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `,
        }}
      />
    </>
  );
}

export default GoogleAnalytics;

