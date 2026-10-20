/**
 * WHY — the ad landing page reuses the site's own enquiry form (`TourEnquiry`),
 * so a visitor's enquiry must reach the same API with the same fields, the same
 * UTM / click-id attribution and the same conversion events as an enquiry made
 * on a normal tour page, including the two required questions (when are you
 * planning to travel, budget per person). The ONLY difference allowed is the
 * `source` label, which tells the team which page the enquiry came from. The
 * conversion events must fire once per accepted enquiry and never when the
 * server refuses it.
 *
 * We deliberately do NOT mock '@/lib/analytics/lead-conversion',
 * '@/lib/analytics/first-touch' or '@/lib/utils/utm-parser'. window.gtag and
 * window.fbq are stubbed only to absorb the Lead conversion that fires on
 * success; this file asserts on them where the behaviour is the point.
 */
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import AdLandingPage from '@/components/ad-landing/AdLandingPage';
import TourEnquiry from '@/components/tours/TourEnquiry';
import { getAdLandingConfig } from '@/lib/ad-landing/configs';
import { getTourBySlug } from '@/lib/data/tours';
import { persistUtmParams } from '@/lib/utils/utm-parser';

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
  window.history.pushState(
    {},
    '',
    '/campaigns/shanghai-surroundings?utm_source=facebook&utm_medium=paid_social&utm_campaign=cts_lead_test&utm_content=shanghai_reel1&fbclid=abc123'
  );
  persistUtmParams();
});

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(window, 'gtag');
  Reflect.deleteProperty(window, 'fbq');
});

const config = getAdLandingConfig('shanghai-surroundings');
const tour = getTourBySlug('china', 'discovery', 'shanghai-surroundings');
if (!config || !tour) throw new Error('the Shanghai config and tour must exist');
const cfg = config;
const t = tour;

const TODAY = '2000-01-01';

// fbq calls that report an enquiry (Lead). The ad page also sends ViewContent when it loads, which is not one.
const leadCalls = () => (mockFbq.mock.calls as unknown[][]).filter((call) => call[0] === 'track' && call[1] === 'Lead');
const enquiryFbqEvents = () =>
  (mockFbq.mock.calls as unknown[][]).map((call) => call[1]).filter((name) => name !== 'ViewContent');

function renderAdPage() {
  return render(<AdLandingPage config={cfg} tour={t} today={TODAY} />);
}

function renderTourPageForm() {
  return render(
    <TourEnquiry tourName={t.name} tourSlug={t.slug} destination={t.destination} tier={t.tier} />
  );
}

function fillAndSubmit(values: {
  name?: string;
  email?: string;
  phone?: string;
  travelWindow?: string;
  budgetBand?: string;
  message?: string;
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
  if (values.travelWindow !== undefined) {
    fireEvent.change(screen.getByLabelText(/When are you planning to travel/i), {
      target: { value: values.travelWindow },
    });
  }
  if (values.budgetBand !== undefined) {
    fireEvent.change(screen.getByLabelText(/Estimated budget per person/i), {
      target: { value: values.budgetBand },
    });
  }
  if (values.message !== undefined) {
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: values.message } });
  }
  const form = screen.getByLabelText(/Full Name/i).closest('form');
  if (!form) throw new Error('the enquiry form must exist');
  fireEvent.submit(form);
}

const VALID = {
  name: 'Test Person',
  email: 'test.person@example.com',
  phone: '021 000 0000',
  travelWindow: 'mar_may_2027',
  budgetBand: '3000_5000',
  message: 'Hello',
};

async function submitAndCapture() {
  fillAndSubmit(VALID);
  await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
  const [url, init]: [string, { method: string; headers: Record<string, string>; body: string }] =
    mockFetch.mock.calls[0];
  const body = JSON.parse(init.body) as Record<string, unknown>;
  return { url, init, body };
}

describe('enquiry form on the ad landing page vs on a tour page', () => {
  it('sends the enquiry to the same API in the same way', async () => {
    renderAdPage();
    const ad = await submitAndCapture();

    cleanup();
    mockFetch.mockClear();
    renderTourPageForm();
    const tourPage = await submitAndCapture();

    expect(ad.url).toBe('/api/tour-enquiry');
    expect(tourPage.url).toBe('/api/tour-enquiry');
    expect(ad.init.method).toBe('POST');
    expect(tourPage.init.method).toBe('POST');
    expect(ad.init.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(tourPage.init.headers).toEqual({ 'Content-Type': 'application/json' });
  });

  it('sends exactly the same fields, with only the source label different', async () => {
    renderAdPage();
    const ad = await submitAndCapture();

    cleanup();
    mockFetch.mockClear();
    renderTourPageForm();
    const tourPage = await submitAndCapture();

    expect({ ...ad.body, source: undefined }).toEqual({ ...tourPage.body, source: undefined });
    expect(ad.body.source).toBe(`Ad landing page: ${t.name}`);
    expect(tourPage.body.source).toBe('Tour Page Enquiry');

    expect(ad.body.tourName).toBe(t.name);
    expect(ad.body.tourSlug).toBe(t.slug);
    expect(ad.body.destination).toBe(t.destination);
    expect(ad.body.tier).toBe(t.tier);
    expect(ad.body.travelWindow).toBe('mar_may_2027');
    expect(ad.body.budgetBand).toBe('3000_5000');
    expect(ad.body.name).toBe(VALID.name);
    expect(ad.body.email).toBe(VALID.email);
    expect(ad.body.phone).toBe(VALID.phone);
  });

  it('carries the ad attribution (utm and click id) with the enquiry', async () => {
    renderAdPage();
    const ad = await submitAndCapture();

    expect(ad.body.utm).toEqual({
      utm_source: 'facebook',
      utm_medium: 'paid_social',
      utm_campaign: 'cts_lead_test',
      utm_content: 'shanghai_reel1',
      fbclid: 'abc123',
    });

    const attribution = ad.body.attribution as Record<string, unknown> | undefined;
    expect(attribution).toBeDefined();
    expect(attribution?.submit_path).toBe('/campaigns/shanghai-surroundings');
    expect(attribution?.utm_source).toBe('facebook');
    expect(attribution?.utm_medium).toBe('paid_social');
    expect(attribution?.utm_campaign).toBe('cts_lead_test');
  });

  it('does not send an enquiry without the two required answers', async () => {
    renderAdPage();
    fillAndSubmit({ ...VALID, travelWindow: '' });

    expect(await screen.findByText('Please choose when you are planning to travel.')).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('does not send an enquiry without the two required answers (budget)', async () => {
    renderAdPage();
    fillAndSubmit({ ...VALID, budgetBand: '' });

    expect(await screen.findByText('Please choose your estimated budget per person.')).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('fires the conversion events once, after the server accepted the enquiry', async () => {
    renderAdPage();
    await submitAndCapture();

    await waitFor(() => expect(leadCalls()).toHaveLength(1));
    await new Promise((resolve) => setTimeout(resolve, 400));

    const gtagCalls = mockGtag.mock.calls as unknown[][];
    const countEvent = (name: string) =>
      gtagCalls.filter((call) => call[0] === 'event' && call[1] === name).length;

    expect(countEvent('conversion')).toBe(1);
    expect(countEvent('generate_lead')).toBe(1);
    expect(countEvent('enquiry_thank_you')).toBe(1);

    // Exactly one Lead. (The ad page also sends its own ViewContent when it loads; that is not an enquiry event.)
    // It names the tour: Meta gets the tour slug (the id ViewContent uses), GA4 gets the slug as tour_slug (like the
    // page's enquiry_open and call_click events) and the TOUR page's address as tour_path, not the ad page the visitor
    // is on.
    expect(leadCalls()).toHaveLength(1);
    expect(leadCalls()[0]).toEqual([
      'track',
      'Lead',
      { content_ids: [t.slug], content_type: 'product' },
      expect.objectContaining({ eventID: expect.any(String) }),
    ]);
    const generateLead = gtagCalls.find((call) => call[0] === 'event' && call[1] === 'generate_lead');
    expect(generateLead?.[2]).toEqual(
      expect.objectContaining({ tour_slug: t.slug, tour_path: `/tours/${t.destination}/${t.tier}/${t.slug}` })
    );
    expect(generateLead?.[2]).not.toEqual(expect.objectContaining({ tour_path: '/campaigns/shanghai-surroundings' }));

    expect(mockTriggerGtm).toHaveBeenCalledTimes(1);
    expect(mockTriggerGtm).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'tour_enquiry_submit',
        tour_slug: t.slug,
        travel_window: 'mar_may_2027',
        budget_band: '3000_5000',
        utm_source: 'facebook',
      })
    );
  });

  it('fires exactly the same events as the tour page form', async () => {
    renderAdPage();
    await submitAndCapture();
    await waitFor(() => expect(leadCalls()).toHaveLength(1));
    await new Promise((resolve) => setTimeout(resolve, 400));

    // The enquiry events only: the ad page's own page-view signal (ViewContent) is left out of the comparison.
    const adGtagEvents = (mockGtag.mock.calls as unknown[][]).map((call) => call[1]);
    const adFbqEvents = enquiryFbqEvents();

    cleanup();
    mockGtag.mockReset();
    mockFbq.mockReset();
    mockTriggerGtm.mockReset();
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });
    sessionStorage.clear();
    persistUtmParams();

    renderTourPageForm();
    await submitAndCapture();
    await waitFor(() => expect(leadCalls()).toHaveLength(1));
    await new Promise((resolve) => setTimeout(resolve, 400));

    const tourGtagEvents = (mockGtag.mock.calls as unknown[][]).map((call) => call[1]);
    const tourFbqEvents = enquiryFbqEvents();

    expect(adGtagEvents).toEqual(tourGtagEvents);
    expect(adFbqEvents).toEqual(tourFbqEvents);
  });

  it('fires nothing when the server refuses the enquiry', async () => {
    mockFetch.mockResolvedValue({ ok: false, json: async () => ({ error: 'Nope' }) });

    renderAdPage();
    fillAndSubmit(VALID);

    expect(await screen.findByText('Nope')).toBeInTheDocument();
    expect(mockGtag).not.toHaveBeenCalled();
    expect(leadCalls()).toHaveLength(0);
    expect(mockTriggerGtm).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('goes to the thank-you page with the tour details, like the tour page', async () => {
    renderAdPage();
    await submitAndCapture();
    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    const adArg = mockPush.mock.calls[0][0] as string;
    expect(adArg.startsWith('/thank-you?')).toBe(true);
    const adQuery = new URLSearchParams(adArg.split('?')[1]);
    expect(adQuery.get('tour')).toBe(t.name);
    expect(adQuery.get('slug')).toBe(t.slug);
    expect(adQuery.get('destination')).toBe(t.destination);
    expect(adQuery.get('tier')).toBe(t.tier);

    cleanup();
    mockPush.mockReset();
    mockFetch.mockClear();
    renderTourPageForm();
    await submitAndCapture();
    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));

    const tourArg = mockPush.mock.calls[0][0] as string;
    expect(tourArg).toBe(adArg);
  });

  it('one submit sends one request', async () => {
    renderAdPage();
    fillAndSubmit(VALID);
    await new Promise((resolve) => setTimeout(resolve, 400));

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
