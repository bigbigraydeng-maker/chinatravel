'use client';

import { useEffect } from 'react';
import { triggerGtmEvent } from '@/components/GoogleTagManager';

type Props = {
  tourSlug?: string;
  tourName?: string;
};

/**
 * Fires the GTM page event once on landing so GTM / Ads can use /thank-you as a conversion URL.
 *
 * Deliberately does NOT call fireLeadConversion: anyone can open /thank-you directly (bookmark,
 * refresh, shared link, QA) and that is not an enquiry. The Lead conversion (Google Ads + Meta +
 * GA4) is fired by the enquiry forms themselves, right after their API call succeeds.
 */
export default function ThankYouClient({ tourSlug, tourName }: Props) {
  useEffect(() => {
    triggerGtmEvent({
      event: 'tour_enquiry_thank_you',
      form_type: 'tour_enquiry',
      tour_slug: tourSlug ?? '',
      tour_name: tourName ?? '',
      pagePath: '/thank-you',
      timestamp: Date.now(),
    });
  }, [tourSlug, tourName]);

  return null;
}
