'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VisaFreeBanner from '@/components/VisaFreeBanner';
import NewsletterPopup from '@/components/newsletter/NewsletterPopup';
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
      {/* 面向客户的弹窗不能出现在后台：顾问做客户报价单时被订阅弹窗挡住很荒谬 */}
      {!hideSiteChrome && <NewsletterPopup />}
    </>
  );
}
