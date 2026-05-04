'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useGtmTracking } from '@/components/GoogleTagManager';

export default function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideSiteChrome = pathname?.startsWith('/admin');
  useGtmTracking();

  return (
    <>
      {!hideSiteChrome && <Navbar />}
      {children}
      {!hideSiteChrome && <Footer />}
    </>
  );
}
