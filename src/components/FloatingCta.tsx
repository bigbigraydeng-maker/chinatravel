'use client';

import { useEffect, useState } from 'react';
import { triggerGtmEvent } from '@/components/GoogleTagManager';

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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="container mx-auto px-4 py-3">
        <button
          onClick={handleClick}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-primary to-primary/90 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Check Availability
        </button>
      </div>
    </div>
  );
}
