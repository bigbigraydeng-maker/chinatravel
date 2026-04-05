'use client';

import { useState } from 'react';
import { triggerGtmEvent } from '@/components/GoogleTagManager';
import ItineraryEmailModal from './ItineraryEmailModal';

interface ItineraryActionsProps {
  tourName: string;
  tourSlug: string;
  destination: string;
  tier: string;
}

export default function ItineraryActions({
  tourName,
  tourSlug,
  destination,
  tier,
}: ItineraryActionsProps) {
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handlePrint = () => {
    triggerGtmEvent({
      event: 'itinerary_print_open',
      tour_slug: tourSlug,
      tour_name: tourName,
      pagePath: typeof window !== 'undefined' ? window.location.pathname : '',
      timestamp: Date.now(),
    });
    window.open(
      `/tours/${destination}/${tier}/${tourSlug}/print`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-gray-500 font-medium">Save this itinerary:</span>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print / PDF
        </button>
        <button
          onClick={() => setShowEmailModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-white border border-primary/30 rounded-full hover:bg-primary/5 hover:border-primary transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email Me This
        </button>
      </div>

      {showEmailModal && (
        <ItineraryEmailModal
          tourName={tourName}
          tourSlug={tourSlug}
          destination={destination}
          tier={tier}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </>
  );
}
