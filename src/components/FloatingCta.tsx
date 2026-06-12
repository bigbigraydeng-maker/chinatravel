'use client';

import { useEffect, useState } from 'react';
import { triggerGtmEvent } from '@/components/GoogleTagManager';
import { CTS_PHONE_HREF } from '@/lib/site';

interface FloatingCtaProps {
  tourName: string;
  tourSlug: string;
  enquirySectionId?: string;
}

export default function FloatingCta({
  tourName,
  tourSlug,
  enquirySectionId = 'enquiry',
}: FloatingCtaProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section[id="hero"]');
      let scrolledPastHero = false;
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        scrolledPastHero = heroBottom < 100;
      }

      const enquirySection = document.getElementById(enquirySectionId);
      if (enquirySection) {
        const enquiryTop = enquirySection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setIsVisible(scrolledPastHero && enquiryTop > windowHeight);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [enquirySectionId]);

  const handleClick = () => {
    const enquirySection = document.getElementById(enquirySectionId);
    if (enquirySection) {
      enquirySection.scrollIntoView({ behavior: 'smooth' });
      triggerGtmEvent({
        event: 'click',
        action: 'floating_cta_click',
        category: 'conversion',
        label: tourName,
        timestamp: Date.now(),
      });
    }
  };

  const handleCallClick = () => {
    triggerGtmEvent({
      event: 'click',
      action: 'floating_cta_call',
      category: 'conversion',
      label: tourName,
      timestamp: Date.now(),
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="container mx-auto px-4 py-3 flex items-stretch gap-3">
        {/* Phone-first: older travellers prefer to call rather than fill a form */}
        <a
          href={CTS_PHONE_HREF}
          onClick={handleCallClick}
          className="flex-1 min-h-[52px] px-4 bg-primary text-white font-bold rounded-xl shadow-sm active:scale-[0.99] transition-transform flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
          </svg>
          Call us
        </a>
        <button
          onClick={handleClick}
          className="flex-1 min-h-[52px] px-4 bg-white text-primary border-2 border-primary font-bold rounded-xl active:scale-[0.99] transition-transform flex items-center justify-center gap-2"
        >
          Enquire
        </button>
      </div>
    </div>
  );
}
