/**
 * ChongqingCustomEnquiry tests
 *
 * WHY: the Chongqing custom-itinerary form used to rely on the /thank-you page
 * to record the Lead conversion. That page no longer fires it (a direct visit
 * is not an enquiry), so this form must fire it itself — exactly when the API
 * accepted the enquiry, before navigating to /thank-you, and never when the
 * API or the network fails.
 *
 * The real '@/lib/analytics/lead-conversion' module is used (not mocked) so the
 * actual ad calls are observed on window.gtag and window.fbq.
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChongqingCustomEnquiry from '@/components/campaigns/ChongqingCustomEnquiry';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: mockPush }) }));

const mockGtag = jest.fn();
const mockFbq = jest.fn();

const mockFetch = jest.fn();

beforeEach(() => {
  mockPush.mockReset();
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

function fillAndSubmit() {
  fireEvent.change(screen.getByLabelText(/Your name/i), { target: { value: 'Ada Lovelace' } });
  fireEvent.change(screen.getByLabelText(/^Email/i), { target: { value: 'ada@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: /Send My Enquiry/i }));
}

function conversions() {
  return {
    ads: mockGtag.mock.calls.filter((c) => c[1] === 'conversion'),
    ga4Lead: mockGtag.mock.calls.filter((c) => c[1] === 'generate_lead'),
    metaLead: mockFbq.mock.calls.filter((c) => c[0] === 'track' && c[1] === 'Lead'),
  };
}

describe('ChongqingCustomEnquiry', () => {
  it('fires the Lead conversion once, after the API accepts the enquiry, then goes to /thank-you', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });

    render(<ChongqingCustomEnquiry />);
    fillAndSubmit();

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    expect(mockFetch.mock.calls[0][0]).toBe('/api/tailor-made-enquiry');
    expect(mockPush.mock.calls[0][0]).toMatch(/^\/thank-you\?source=chongqing-custom/);

    const c = conversions();
    expect(c.ads).toHaveLength(1);
    expect(c.ga4Lead).toHaveLength(1);
    expect(c.metaLead).toHaveLength(1);
    expect(c.ga4Lead[0][2]).toMatchObject({ lead_source: 'tour_enquiry' });
    expect(c.metaLead[0]).toEqual([
      'track',
      'Lead',
      {},
      { eventID: expect.stringMatching(/^cts-tour_enquiry-/) },
    ]);
  });

  it('fires the conversion before navigating to /thank-you', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });

    render(<ChongqingCustomEnquiry />);
    fillAndSubmit();

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    expect(mockFbq.mock.invocationCallOrder[0]).toBeLessThan(
      mockPush.mock.invocationCallOrder[0]
    );
  });

  it('does not fire any conversion on first render, before anything is submitted', () => {
    render(<ChongqingCustomEnquiry />);

    expect(mockGtag).not.toHaveBeenCalled();
    expect(mockFbq).not.toHaveBeenCalled();
  });

  it('does not fire any conversion when the API rejects the enquiry, and shows the error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Please try again later.' }),
    });

    render(<ChongqingCustomEnquiry />);
    fillAndSubmit();

    await screen.findByText('Please try again later.');

    expect(mockGtag).not.toHaveBeenCalled();
    expect(mockFbq).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('does not fire any conversion when the network request fails', async () => {
    mockFetch.mockRejectedValue(new Error('offline'));

    render(<ChongqingCustomEnquiry />);
    fillAndSubmit();

    await screen.findByText(/Connection error/i);

    expect(mockGtag).not.toHaveBeenCalled();
    expect(mockFbq).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
