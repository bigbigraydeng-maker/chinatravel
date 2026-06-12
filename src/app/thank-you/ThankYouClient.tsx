'use client';

import { useEffect } from 'react';
import { triggerGtmEvent } from '@/components/GoogleTagManager';
import { fireLeadConversion } from '@/lib/analytics/lead-conversion';

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

    // Google Ads conversion + Meta Pixel Lead for the tour-enquiry path.
    // Keyed per enquiry (tour params) so a manual refresh of the same /thank-you
    // URL does not double-count, while a distinct enquiry still fires.
    const dedupeKey = `cts_lead_fired:${tourSlug ?? ''}:${tourName ?? ''}`;
    let alreadyFired = false;
    try {
      alreadyFired = sessionStorage.getItem(dedupeKey) === '1';
    } catch {
      // sessionStorage unavailable (private mode) — fall through and fire once.
    }
    if (!alreadyFired) {
      try {
        sessionStorage.setItem(dedupeKey, '1');
      } catch {
        // ignore — dedup is best-effort; Google Ads "count: one" backstops it.
      }
      fireLeadConversion('tour_enquiry');
    }
  }, [tourSlug, tourName]);

  return null;
}
