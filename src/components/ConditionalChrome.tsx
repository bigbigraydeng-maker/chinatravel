'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VisaFreeBanner from '@/components/VisaFreeBanner';
import { useGtmTracking } from '@/components/GoogleTagManager';

export default function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideSiteChrome = pathname?.startsWith('/admin') || pathname?.startsWith('/dev/');
  useGtmTracking();

  return (
    <>
      {!hideSiteChrome && <VisaFreeBanner />}
      {!hideSiteChrome && <Navbar />}
      {children}
      {!hideSiteChrome && <Footer />}
    </>
  );
}
