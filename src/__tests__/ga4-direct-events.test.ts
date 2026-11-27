/**
 * WHY — the GTM container is not installed, so phone taps and itinerary actions pushed to the
 * dataLayer were never recorded. They must reach GA4 through gtag, and form submissions must not,
 * or an enquiry would be counted twice.
 */
process.env.NEXT_PUBLIC_GTM_ID = 'GTM-TEST';

describe('direct GA4 events', () => {
  const gtag = jest.fn();
  let triggerGtmEvent: (e: { event: string; [k: string]: string | number | undefined }) => void;

  beforeAll(async () => {
    ({ triggerGtmEvent } = await import('@/components/GoogleTagManager'));
  });

  beforeEach(() => {
    gtag.mockClear();
    Object.assign(window, { gtag, dataLayer: [] });
  });

  it('sends a phone tap to GA4 without the phone number', () => {
    triggerGtmEvent({ event: 'click_to_call', phoneNumber: '0800287888', pagePath: '/contact' });
    expect(gtag).toHaveBeenCalledWith('event', 'click_to_call', { page_path: '/contact' });
  });

  it('does not send form submissions a second time', () => {
    triggerGtmEvent({ event: 'tour_enquiry_submit', tour_slug: 'essentials' });
    expect(gtag).not.toHaveBeenCalled();
  });
});
