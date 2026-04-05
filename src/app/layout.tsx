import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GoogleTagManager } from '@/components/GoogleTagManager';
import GtmInit from '@/components/GtmInit';
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
  title: 'CTS Tours - China Travel Specialists for New Zealanders',
  description: '98 Years Heritage | Direct China Operations | Authentic Access',
  keywords: ['China travel', 'China tours', 'China specialists', 'New Zealand', 'CTS Tours'],
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: '/logo-square.jpg',
    apple: '/logo-square.jpg',
  },
  openGraph: {
    title: 'CTS Tours - China Travel Specialists',
    description: 'Expert China travel services for New Zealanders',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 885,
        height: 244,
        alt: 'CTS Tours - Experience The Real Asia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CTS Tours - China Travel Specialists',
    description: '98 Years Heritage | Direct China Operations | Authentic Access',
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
      <body className="font-sans">
        <GoogleTagManager />
        <GtmInit />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
