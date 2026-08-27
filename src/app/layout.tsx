import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';
import ConditionalChrome from '@/components/ConditionalChrome'
import GeoDirective from '@/components/GeoDirective';
import TrackingScripts from '@/components/TrackingScripts';
import { META_PIXEL_IDS } from '@/lib/analytics/meta-pixels';
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
  title: 'China Tours from New Zealand | CTS Tours',
  description:
    "New Zealand's Kiwi-led China travel specialists — CTS Tours NZ, Auckland since 2000, backed by China Travel Service (founded 1928). Expertly crafted tours, direct China operations, authentic experiences. Get your free quote today.",
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
    title: 'China Tours from New Zealand | CTS Tours',
    description:
      "New Zealand's Kiwi-led China travel specialists — CTS Tours NZ, Auckland since 2000, backed by China Travel Service (founded 1928). Expertly crafted tours, direct China operations, authentic experiences.",
    type: 'website',
    locale: 'en_NZ',
    siteName: 'CTS Tours',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'CTS Tours NZ — Kiwi-Led China Travel Specialists (Auckland since 2000, backed by CTS founded 1928)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'China Tours from New Zealand | CTS Tours',
    description:
      "New Zealand's Kiwi-led China travel specialists — CTS Tours NZ, Auckland since 2000, backed by China Travel Service (founded 1928). Direct China operations, authentic experiences. Free quote today.",
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
        <ConditionalChrome>{children}</ConditionalChrome>
        <GeoDirective />
        <TrackingScripts />
        <GoogleAnalytics />
        {/* No-JS PageView fallback — mirrors both datasets initialised in <TrackingScripts>. */}
        {META_PIXEL_IDS.map((pixelId) => (
          <noscript
            key={pixelId}
            dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" alt="" />` }}
          />
        ))}
      </body>
    </html>
  );
}
