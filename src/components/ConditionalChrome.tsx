'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideSiteChrome = pathname?.startsWith('/admin');

  return (
    <>
      {!hideSiteChrome && <Navbar />}
      {children}
      {!hideSiteChrome && <Footer />}
    </>
  );
}
