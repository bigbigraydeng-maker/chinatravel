/**
 * TourEnquiry — fbclid travels with the enquiry
 *
 * WHY — the ad click id (fbclid) is kept in sessionStorage by the first-touch
 * UTM store (src/lib/utils/utm-parser.ts) and must travel with the enquiry
 * request, because the notification email is the only lead record and the
 * server writes the id into its "Facebook click ID" row.
 *
 * We deliberately do NOT mock '@/lib/utils/utm-parser' — the real module runs
 * so we observe the real first-touch store being read on submit. window.gtag
 * and window.fbq are stubbed only to absorb the Lead conversion that fires on
 * success; this file does not assert on them.
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

function fillAndSubmit(values: { name?: string; email?: string }) {
  if (values.name !== undefined) {
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: values.name } });
  }
  if (values.email !== undefined) {
    fireEvent.change(screen.getByLabelText(/^Email/i), { target: { value: values.email } });
  }
  fireEvent.click(screen.getByRole('button', { name: /Send Enquiry/i }));
}

describe('TourEnquiry — fbclid travels with the enquiry', () => {
  it('sends the fbclid and campaign kept from the ad click with the enquiry', async () => {
    sessionStorage.setItem(
      'cts_utm_first_touch',
      JSON.stringify({ utm_source: 'facebook', utm_campaign: 'oct-2026', fbclid: 'IwAR2x_abc' })
    );
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.utm).toEqual({
      utm_source: 'facebook',
      utm_campaign: 'oct-2026',
      fbclid: 'IwAR2x_abc',
    });
  });

  it('sends an empty utm object when the visitor did not arrive from an ad', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });

    render(<TourEnquiry {...PROPS} />);
    fillAndSubmit({ name: 'Ada Lovelace', email: 'ada@example.com' });

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.utm).toEqual({});
  });
});
