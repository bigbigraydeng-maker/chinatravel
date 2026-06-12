'use client';

import { trackMobileFloatingCTAClick } from '@/lib/analytics/track-tools';
import { Icon } from '@/components/ui/Icon';

interface MobileFloatingCTAProps {
  targetSectionId?: string;
  onCTAClick?: () => void;
}

export default function MobileFloatingCTA({
  targetSectionId = 'tools-banner',
  onCTAClick,
}: MobileFloatingCTAProps) {
  const handleClick = () => {
    trackMobileFloatingCTAClick();
    onCTAClick?.();
    const element = document.getElementById(targetSectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:hidden z-40 pointer-events-none">
      <div className="pointer-events-auto">
        <button
          type="button"
          onClick={handleClick}
          aria-label="View free planning tools to help you prepare your enquiry"
          className="w-full py-3.5 px-5 bg-secondary text-accent font-bold rounded-xl shadow-lg hover:bg-secondary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
        >
          <Icon name="sparkles" className="w-4 h-4 shrink-0" />
          Free planning tools — dates, budget &amp; visa
        </button>
      </div>
    </div>
  );
}
