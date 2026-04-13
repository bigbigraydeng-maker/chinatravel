'use client';

import { useEffect } from 'react';
import { triggerGtmEvent } from '@/components/GoogleTagManager';

type Props = {
  tourSlug?: string;
  tourName?: string;
};

/** Fires once on landing so GTM / Ads can use /thank-you as a conversion URL. */
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
