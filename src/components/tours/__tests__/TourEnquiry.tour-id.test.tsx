/**
 * TourEnquiry — tour identification on the Lead conversion
 *
 * WHY these tests exist:
 *
 * An enquiry on a tour page (or on an ad landing page, which uses the same
 * form) must tell the two conversion channels WHICH tour it is about, so ads
 * can be judged tour by tour. GA4 `generate_lead` gets `tour_slug` = the
 * address of the tour's own page (never the ad page the visitor came through);
 * Meta Pixel `Lead` gets `content_ids: [<tour slug>]` and
 * `content_type: 'product'` — the same id and type the ViewContent event sends
 * for that tour. Nothing else about the events changes: the Google Ads
 * conversion, the `enquiry_thank_you` event, the shared id, the once-only
 * firing and the existing dataLayer event all stay as they were.
 *
 * We deliberately do NOT mock '@/lib/analytics/lead-conversion',
 * '@/lib/analytics/first-touch' or '@/lib/utils/utm-parser' — the real
 * modules run so we observe the real ad calls landing on window.gtag and
 * window.fbq.
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TourEnquiry from '@/components/tours/TourEnquiry';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: mockPush }) }));

const mockTriggerGtm = jest.fn();
jest.mock('@/components/GoogleTagManager', () => ({
  triggerGtmEvent: (...args: unknown[]) => mockTriggerGtm(...args),
}));

const mockGtag = jest.fn();
const mockFbq = jest.fn();

const mockFetch = jest.fn();

beforeEach(() => {
  mockPush.mockReset();
  mockTriggerGtm.mockReset();
  mockFetch.mockReset();
  sessionStorage.clear();
  mockGtag.mockReset();
  mockFbq.mockReset();
  Object.assign(window, { gtag: mockGtag, fbq: mockFbq });
  global.fetch = mockFetch as unknown as typeof fetch;
  mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });
  window.history.pushState({}, '', '/');
});

afterEach(() => {
  Reflect.deleteProperty(window, 'gtag');
  Reflect.deleteProperty(window, 'fbq');
});

const PROPS = {
  tourName: 'Shanghai & Surroundings',
  tourSlug: 'shanghai-surroundings',
  destination: 'china',
  tier: 'discovery',
};

function fillAndSubmit(values: {
  name?: string;
  email?: string;
  phone?: string;
  travelWindow?: string | null;
  budgetBand?: string | null;
}) {
  if (values.name !== undefined) {
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: values.name } });
  }
  if (values.email !== undefined) {
    fireEvent.change(screen.getByLabelText(/^Email/i), { target: { value: values.email } });
  }
  if (values.phone !== undefined) {
    fireEvent.change(screen.getByLabelText(/^Phone/i), { target: { value: values.phone } });
  }
  // The two travel questions are required on the form: choose valid answers unless a test passes null to leave one empty.
  const travelWindow = values.travelWindow === undefined ? 'mar_may_2027' : values.travelWindow;
  if (travelWindow !== null) {
    fireEvent.change(screen.getByLabelText(/When are you planning to travel/i), {
      target: { value: travelWindow },
    });
  }
  const budgetBand = values.budgetBand === undefined ? 'under_3000' : values.budgetBand;
  if (budgetBand !== null) {
    fireEvent.change(screen.getByLabelText(/Estimated budget per person/i), {
      target: { value: budgetBand },
    });
  }
  fireEvent.click(screen.getByRole('button', { name: /Send Enquiry/i }));
}

function conversions() {
  return {
    ads: mockGtag.mock.calls.filter((c) => c[1] === 'conversion'),
    ga4Lead: mockGtag.mock.calls.filter((c) => c[1] === 'generate_lead'),
    metaLead: mockFbq.mock.calls.filter((c) => c[0] === 'track' && c[1] === 'Lead'),
  };
}

describe('TourEnquiry tells the conversion channels which tour the enquiry is about', () => {
  it('sends the tour page address to GA4 and the tour slug to Meta', async () => {
    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    const c = conversions();
    expect(c.ga4Lead).toHaveLength(1);
    expect(c.ga4Lead[0][2]).toMatchObject({
      lead_source: 'tour_enquiry',
      tour_slug: '/tours/china/discovery/shanghai-surroundings',
    });
    expect(c.metaLead).toHaveLength(1);
    expect(c.metaLead[0]).toEqual([
      'track',
      'Lead',
      { content_ids: ['shanghai-surroundings'], content_type: 'product' },
      { eventID: expect.stringMatching(/^cts-tour_enquiry-/) },
    ]);
  });

  it("uses the tour's own page address even when the visitor arrives on an ad landing page", async () => {
    window.history.pushState({}, '', '/campaigns/shanghai-surroundings?utm_source=facebook');

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    const c = conversions();
    expect(c.ga4Lead).toHaveLength(1);
    expect(c.ga4Lead[0][2].tour_slug).toBe('/tours/china/discovery/shanghai-surroundings');
  });

  it('follows the destination, tier and slug it is given', async () => {
    render(
      <TourEnquiry
        tourName="Natural China"
        tourSlug="landscapes"
        destination="china"
        tier="signature"
      />
    );
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    const c = conversions();
    expect(c.ga4Lead).toHaveLength(1);
    expect(c.ga4Lead[0][2].tour_slug).toBe('/tours/china/signature/landscapes');
    expect(c.metaLead).toHaveLength(1);
    expect(c.metaLead[0][2]).toEqual({
      content_ids: ['landscapes'],
      content_type: 'product',
    });
  });

  it('keeps the existing dataLayer event as it was', async () => {
    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    expect(mockTriggerGtm).toHaveBeenCalledTimes(1);
    expect(mockTriggerGtm).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'tour_enquiry_submit',
        form_type: 'tour_enquiry',
        tour_slug: 'shanghai-surroundings',
      })
    );
  });

  it('leaves the Google Ads conversion without tour fields', async () => {
    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    const c = conversions();
    expect(c.ads).toHaveLength(1);
    expect(c.ads[0][2]).not.toHaveProperty('tour_slug');
  });

  it('sends the events once, and none when the server refuses', async () => {
    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));
    await new Promise((resolve) => setTimeout(resolve, 400));

    const c = conversions();
    expect(c.ads).toHaveLength(1);
    expect(c.ga4Lead).toHaveLength(1);
    expect(c.metaLead).toHaveLength(1);
  });

  it('sends none when the server refuses', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Nope' }),
    });

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await screen.findByText('Nope');

    expect(mockGtag).not.toHaveBeenCalled();
    expect(mockFbq).not.toHaveBeenCalled();
  });
});
