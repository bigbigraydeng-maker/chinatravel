/**
 * ChinaToursHero tests
 *
 * Covers the high-value lead funnel guarantees:
 *  - renders title / subtitle / form
 *  - blocks submit when both email and phone are empty (mirrors TourEnquiry rule)
 *  - on successful submit, posts to /api/contact, fires conversion + GTM with
 *    `form_type: 'china_tours_hub'`, and swaps to the success state
 *  - on API error, surfaces the message and keeps the form mounted
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChinaToursHero from '../ChinaToursHero';

const mockFireLeadConversion = jest.fn();
const mockTriggerGtm = jest.fn();
const mockGetStoredUtm = jest.fn();

jest.mock('@/lib/analytics/lead-conversion', () => ({
  fireLeadConversion: (...args: unknown[]) => mockFireLeadConversion(...args),
}));

jest.mock('@/components/GoogleTagManager', () => ({
  triggerGtmEvent: (...args: unknown[]) => mockTriggerGtm(...args),
}));

jest.mock('@/lib/utils/utm-parser', () => ({
  getStoredUtmParams: () => mockGetStoredUtm(),
}));

const RENDER_PROPS = {
  title: 'China Tours from New Zealand',
  subtitle: 'Auckland-based China specialists since 1928.',
  posterImage: '/images/poster.jpg',
};

describe('ChinaToursHero', () => {
  beforeEach(() => {
    mockFireLeadConversion.mockReset();
    mockTriggerGtm.mockReset();
    mockGetStoredUtm.mockReset().mockReturnValue({});
    (global as any).fetch = jest.fn();
  });

  afterEach(() => {
    delete (global as any).fetch;
  });

  it('renders title, subtitle, and the request-callback form', () => {
    render(<ChinaToursHero {...RENDER_PROPS} />);
    expect(screen.getByRole('heading', { level: 1, name: /China Tours from New Zealand/i })).toBeInTheDocument();
    expect(screen.getByText(/Auckland-based China specialists/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Request a callback/i })).toBeInTheDocument();
  });

  it('blocks submit and surfaces an error when both email and phone are empty', async () => {
    render(<ChinaToursHero {...RENDER_PROPS} />);
    fireEvent.change(screen.getByPlaceholderText(/Full name/i), { target: { value: 'Ada Lovelace' } });
    fireEvent.click(screen.getByRole('button', { name: /Request a callback/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/phone number or an email/i);
    expect((global as any).fetch).not.toHaveBeenCalled();
    expect(mockFireLeadConversion).not.toHaveBeenCalled();
  });

  it('posts to /api/contact, fires conversion + GTM event with china_tours_hub form_type, and shows the success state', async () => {
    (global as any).fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ChinaToursHero {...RENDER_PROPS} />);

    fireEvent.change(screen.getByPlaceholderText(/Full name/i), { target: { value: 'Ada Lovelace' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'ada@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Request a callback/i }));

    await waitFor(() => {
      expect(mockFireLeadConversion).toHaveBeenCalledWith('china_tours_hub');
    });

    expect((global as any).fetch).toHaveBeenCalledTimes(1);
    const [url, init] = (global as any).fetch.mock.calls[0];
    expect(url).toBe('/api/contact');
    expect(init.method).toBe('POST');
    const body = JSON.parse(init.body);
    expect(body.name).toBe('Ada Lovelace');
    expect(body.email).toBe('ada@example.com');
    expect(body.travel_interest).toBeTruthy();

    expect(mockTriggerGtm).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'china_tours_hero_submit',
        form_type: 'china_tours_hub',
      })
    );

    expect(await screen.findByRole('status')).toHaveTextContent(/Thanks/i);
  });

  it('keeps the form mounted and shows the API error when submission fails', async () => {
    (global as any).fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Enquiry service is not configured.' }),
    });

    render(<ChinaToursHero {...RENDER_PROPS} />);

    fireEvent.change(screen.getByPlaceholderText(/Full name/i), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByPlaceholderText('Phone'), { target: { value: '+6421...' } });
    fireEvent.click(screen.getByRole('button', { name: /Request a callback/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/not configured/i);
    expect(mockFireLeadConversion).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /Request a callback/i })).toBeInTheDocument();
  });

  it('forwards the first-touch UTM params into the message payload for attribution', async () => {
    mockGetStoredUtm.mockReturnValueOnce({
      utm_source: 'meta',
      utm_campaign: 'oct26-best-of-china',
      gclid: 'GCLID-XYZ',
    });
    (global as any).fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    render(<ChinaToursHero {...RENDER_PROPS} />);
    fireEvent.change(screen.getByPlaceholderText(/Full name/i), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'ada@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Request a callback/i }));

    await waitFor(() => {
      expect((global as any).fetch).toHaveBeenCalledTimes(1);
    });
    const body = JSON.parse((global as any).fetch.mock.calls[0][1].body);
    expect(body.message).toContain('utm_source: meta');
    expect(body.message).toContain('utm_campaign: oct26-best-of-china');
    expect(body.message).toContain('gclid: GCLID-XYZ');
  });
});
