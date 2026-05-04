import { useEffect } from 'react';
import { triggerGtmEvent } from '@/components/GoogleTagManager';

interface ScrollDepthThreshold {
  percentage: number;
  triggered: boolean;
}

/**
 * Tracks scroll depth percentage and sends events to GTM
 * Usage: useScrollDepthTracking('campaign_page')
 */
export function useScrollDepthTracking(pageName: string) {
  useEffect(() => {
    const thresholds: ScrollDepthThreshold[] = [
      { percentage: 25, triggered: false },
      { percentage: 50, triggered: false },
      { percentage: 75, triggered: false },
      { percentage: 100, triggered: false },
    ];

    const handleScroll = () => {
      if (typeof window === 'undefined') return;

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercentage = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;

      thresholds.forEach((threshold) => {
        if (scrollPercentage >= threshold.percentage && !threshold.triggered) {
          threshold.triggered = true;

          triggerGtmEvent({
            event: 'scroll_depth',
            scroll_depth_percentage: threshold.percentage,
            page_name: pageName,
            page_path: window.location.pathname,
            timestamp: Date.now(),
          });

          // For debugging in development
          if (process.env.NODE_ENV === 'development') {
            console.log(`[ScrollTracking] Scrolled to ${threshold.percentage}% on ${pageName}`);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageName]);
}
