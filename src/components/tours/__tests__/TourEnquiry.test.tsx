/**
 * TourEnquiry — Lead conversion timing tests
 *
 * WHY these tests exist:
 *
 * The Lead conversion (Google Ads conversion + Meta Pixel `Lead` + GA4
 * `generate_lead`) must fire exactly when the API has ACCEPTED the enquiry.
 * Not on page open, not when the API fails, not when validation blocks the
 * submit. And it must fire BEFORE the visitor is sent to /thank-you.
 *
 * It used to fire on the /thank-you page load, which meant any direct visit
 * to that URL (bookmark, shared link, crawler) counted as a lead. These tests
 * pin the conversion to the successful API response so that regression can't
 * silently come back.
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
});

afterEach(() => {
  Reflect.deleteProperty(window, 'gtag');
  Reflect.deleteProperty(window, 'fbq');
});

const PROPS = {
  tourName: 'A Tale of Two Cities',
  tourSlug: 'beijing-xian',
  destination: 'china',
  tier: 'discovery',
};

function fillAndSubmit(values: { name?: string; email?: string; phone?: string; travelWindow?: string | null; budgetBand?: string | null }) {
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
    fireEvent.change(screen.getByLabelText(/When are you planning to travel/i), { target: { value: travelWindow } });
  }
  const budgetBand = values.budgetBand === undefined ? 'under_3000' : values.budgetBand;
  if (budgetBand !== null) {
    fireEvent.change(screen.getByLabelText(/Estimated budget per person/i), { target: { value: budgetBand } });
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

describe('TourEnquiry — Lead conversion timing', () => {
  it('fires the Lead conversion once, after the API accepts the enquiry, then goes to /thank-you', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));
    expect(mockPush.mock.calls[0][0]).toMatch(/^\/thank-you\?/);

    const c = conversions();
    expect(c.ads).toHaveLength(1);
    expect(c.ga4Lead).toHaveLength(1);
    expect(c.metaLead).toHaveLength(1);

    expect(c.ads[0][2]).toMatchObject({
      send_to: 'AW-17984232872/y-kaCLSI9YAcEKi7xv9C',
    });
    // The two events that name the tour: GA4 gets the tour slug and the tour page's address, Meta gets the tour slug
    // (the same id its ViewContent event uses).
    expect(c.ga4Lead[0][2]).toMatchObject({
      lead_source: 'tour_enquiry',
      tour_slug: 'beijing-xian',
      tour_path: '/tours/china/discovery/beijing-xian',
    });
    expect(c.metaLead[0]).toEqual([
      'track',
      'Lead',
      { content_ids: ['beijing-xian'], content_type: 'product' },
      { eventID: expect.stringMatching(/^cts-tour_enquiry-/) },
    ]);
  });

  it('fires the conversion before navigating to /thank-you', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    expect(mockFbq.mock.invocationCallOrder[0]).toBeLessThan(
      mockPush.mock.invocationCallOrder[0]
    );
  });

  it('does not fire any conversion on first render, before anything is submitted', () => {
    render(<TourEnquiry {...PROPS} />);

    expect(mockGtag).not.toHaveBeenCalled();
    expect(mockFbq).not.toHaveBeenCalled();
  });

  it('does not fire any conversion when the API rejects the enquiry, and shows the error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Enquiry service is not configured.' }),
    });

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await screen.findByText('Enquiry service is not configured.');

    expect(mockGtag).not.toHaveBeenCalled();
    expect(mockFbq).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('does not fire any conversion when the network request fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network down'));

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await screen.findByText('Network down');

    expect(mockGtag).not.toHaveBeenCalled();
    expect(mockFbq).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('does not fire any conversion, and does not call the API, when neither phone nor email is given', async () => {
    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace' });

    await screen.findByText(/leave a phone number or an email/i);

    expect(mockFetch).not.toHaveBeenCalled();
    expect(mockGtag).not.toHaveBeenCalled();
    expect(mockFbq).not.toHaveBeenCalled();
  });

  it('accepts a phone number alone and still fires the conversion once', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', phone: '021 555 0100' });

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    const c = conversions();
    expect(c.ads).toHaveLength(1);
    expect(c.metaLead).toHaveLength(1);
  });
});
