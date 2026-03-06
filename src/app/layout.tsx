import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'CTS Tours - China Travel Specialists for New Zealanders',
  description: '98 Years Heritage | Direct China Operations | Authentic Access',
  keywords: ['China travel', 'China tours', 'China specialists', 'New Zealand', 'CTS Tours'],
  metadataBase: new URL('https://ctstours.com'),
  openGraph: {
    title: 'CTS Tours - China Travel Specialists',
    description: 'Expert China travel services for New Zealanders',
    type: 'website',
    images: [
      {
        url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20Great%20Wall%20scenic%20landscape&image_size=landscape_16_9',
        width: 1200,
        height: 630,
        alt: 'Great Wall of China',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CTS Tours - China Travel Specialists',
    description: '98 Years Heritage | Direct China Operations | Authentic Access',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.className}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}