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
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChinaToursHero from '../ChinaToursHero';

function setQuery(qs: string) {
  window.history.replaceState({}, '', `/china-tours${qs}`);
}

afterEach(() => {
  setQuery('');
});

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

  it('mounts variant A by default and fires a single hero_variant_view GTM event', async () => {
    setQuery('');
    await act(async () => {
      render(<ChinaToursHero {...RENDER_PROPS} />);
    });
    const section = document.getElementById('china-tours-hero');
    expect(section).toHaveAttribute('data-hero-variant', 'a');
    const viewEvents = mockTriggerGtm.mock.calls.filter(
      ([payload]) => (payload as { event: string }).event === 'hero_variant_view'
    );
    expect(viewEvents).toHaveLength(1);
    expect(viewEvents[0][0]).toMatchObject({ hero_variant: 'a' });
  });

  it('swaps to variant B copy when ?hero=b is on the URL', async () => {
    setQuery('?hero=b');
    await act(async () => {
      render(<ChinaToursHero {...RENDER_PROPS} />);
    });
    expect(document.getElementById('china-tours-hero')).toHaveAttribute(
      'data-hero-variant',
      'b'
    );
    // Variant B title + form heading + submit label
    expect(
      screen.getByRole('heading', { level: 1, name: /Your China Trip, Quoted in 24 Hours/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Get my 24-hour quote/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send me a quote/i })).toBeInTheDocument();
  });

  it('form submit attaches hero_variant=b to the GTM event when variant B is active', async () => {
    setQuery('?hero=b');
    (global as any).fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    await act(async () => {
      render(<ChinaToursHero {...RENDER_PROPS} />);
    });
    fireEvent.change(screen.getByPlaceholderText(/Full name/i), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'ada@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Send me a quote/i }));
    await waitFor(() => expect(mockFireLeadConversion).toHaveBeenCalled());
    const submitEvent = mockTriggerGtm.mock.calls.find(
      ([p]) => (p as { event: string }).event === 'china_tours_hero_submit'
    );
    expect(submitEvent?.[0]).toMatchObject({ hero_variant: 'b' });
  });

  it('mobile phone-tap CTA renders, links to tel: and fires the phone_call_intent GTM event', async () => {
    await act(async () => {
      render(<ChinaToursHero {...RENDER_PROPS} />);
    });
    const cta = screen.getByLabelText(/Call CTS Tours on 0800 CTS 888/i);
    expect(cta).toHaveAttribute('href', 'tel:0800287888');
    // Hidden on desktop via `md:hidden` — pin the class so a refactor can't
    // silently expose the button on the desktop hero (would double-CTA noise).
    expect(cta.className).toMatch(/\bmd:hidden\b/);
    fireEvent.click(cta);
    const intent = mockTriggerGtm.mock.calls.find(
      ([p]) => (p as { event: string }).event === 'phone_call_intent'
    );
    expect(intent?.[0]).toMatchObject({
      source: 'mobile_hero_cta',
      hero_variant: 'a',
    });
  });

  it('dropdown surfaces the four flagship tours + a fallback option', () => {
    render(<ChinaToursHero {...RENDER_PROPS} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const labels = Array.from(select.options).map((o) => o.value);
    expect(labels).toEqual(
      expect.arrayContaining([
        'Best of China — 15 Days',
        "Tale of Two Cities — 10 Days (Beijing + Xi'an)",
        'Shanghai & Surroundings — 10 Days',
        'Silk Road Discovery — 18 Days',
        'Still deciding — show me all 4',
      ])
    );
    expect(labels).toHaveLength(5);
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
