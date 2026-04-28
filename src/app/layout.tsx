import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import '../styles/globals.css';
import ConditionalChrome from '@/components/ConditionalChrome';
import CookieConsentManager from '@/components/CookieConsentManager';
import { getSiteUrl } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'China Tours from New Zealand | CTS Tours - Since 1928',
  description:
    "New Zealand's China travel specialists since 1928. Expertly crafted tours, direct China operations, authentic experiences. Get your free quote today.",
  keywords: [
    'China tours from New Zealand',
    'China travel specialists',
    'New Zealand China tours',
    'CTS Tours',
    'China tours NZ',
    'Beijing tours',
    'Shanghai tours',
    'luxury China travel',
  ],
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: '/logo-square.jpg',
    apple: '/logo-square.jpg',
  },
  openGraph: {
    title: 'China Tours from New Zealand | CTS Tours - Since 1928',
    description:
      "New Zealand's China travel specialists since 1928. Expertly crafted tours, direct China operations, authentic experiences.",
    type: 'website',
    locale: 'en_NZ',
    siteName: 'CTS Tours',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'CTS Tours — China Travel Specialists for New Zealanders since 1928',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'China Tours from New Zealand | CTS Tours - Since 1928',
    description:
      "New Zealand's China travel specialists since 1928. Direct China operations, authentic experiences. Free quote today.",
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1824094338280968');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1824094338280968&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="font-sans antialiased">
        <CookieConsentManager />
        <ConditionalChrome>{children}</ConditionalChrome>
      </body>
    </html>
  );
}
