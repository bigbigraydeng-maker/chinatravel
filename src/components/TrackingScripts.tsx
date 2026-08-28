'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { persistUtmParams } from '@/lib/utils/utm-parser';
import { META_PIXEL_ADS, META_PIXEL_OWNED } from '@/lib/analytics/meta-pixels';
import { isStaging } from '@/lib/env';

export default function TrackingScripts() {
  // Capture the ad's UTM / click-ids on first landing so an enquiry submitted
  // later (even after navigating to /thank-you) can be attributed to its source.
  // Kept on staging too, so the UTM capture path stays testable there.
  useEffect(() => {
    persistUtmParams();
  }, []);

  // The Google Ads tag and both Meta Pixels below are hardcoded production
  // properties — unlike GA4/GTM they are not env-driven, so the staging build
  // would otherwise load the live ad pixels. That means a test enquiry on
  // staging would fire the real Google Ads conversion (via fireLeadConversion's
  // gtag call) and a real Meta Pixel Lead, corrupting campaign data.
  //
  // Render nothing on staging. fireLeadConversion degrades safely: it polls for
  // window.gtag / window.fbq and gives up after MAX_ATTEMPTS, so enquiry
  // submission still works end-to-end, it just reports to nothing.
  // See ceepii-assessment.md §4.2.
  if (isStaging()) return null;

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17984232872"
        strategy="afterInteractive"
      />
      <Script
        id="google-ads"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17984232872');
          `,
        }}
      />
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_OWNED}');
            fbq('init', '${META_PIXEL_ADS}');
            fbq('track', 'PageView');
          `,
        }}
      />
    </>
  );
}
