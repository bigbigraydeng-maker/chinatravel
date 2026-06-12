import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';
import ConditionalChrome from '@/components/ConditionalChrome'
import GeoDirective from '@/components/GeoDirective';
import CookieConsentManager from '@/components/CookieConsentManager';
import NewsletterPopup from '@/components/newsletter/NewsletterPopup';
import TrackingScripts from '@/components/TrackingScripts';
import GoogleAnalytics from '@/components/GoogleAnalytics';
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <CookieConsentManager />
        <ConditionalChrome>{children}</ConditionalChrome>
        <NewsletterPopup />
        <GeoDirective />
        <TrackingScripts />
        <GoogleAnalytics />
        <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1441880990459874&ev=PageView&noscript=1" alt="" />` }} />
      </body>
    </html>
  );
}
