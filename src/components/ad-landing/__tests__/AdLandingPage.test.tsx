/**
 * Why this file exists: an ad landing page is what paid visitors see, so every
 * fact on it must come from the tour data, it must have exactly one enquiry
 * form, its blocks must come in the order the config lists, and no sentence on
 * it may carry a claim the business has ruled out (this includes the FAQ
 * answers and inclusions, which come straight from the tour data).
 *
 * The tests read the real tour data but never depend on today's date or on
 * which departures are open: `today` is passed in.
 */
import { render, screen, waitFor, within } from '@testing-library/react';
import AdLandingPage from '@/components/ad-landing/AdLandingPage';
import { getAdLandingConfig } from '@/lib/ad-landing/configs';
import { findForbiddenCopy, tourCorpus } from '@/lib/ad-landing/facts';
import { getTourBySlug } from '@/lib/data/tours';
import { getDepartureRows } from '@/components/tours/TourGoldenBlocks';
import { CTS_PHONE_DISPLAY, CTS_PHONE_HREF } from '@/lib/site';

jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));

const mockFormProps: Array<Record<string, unknown>> = [];

jest.mock('@/components/tours/TourEnquiry', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    mockFormProps.push(props);
    const React = require('react');
    return React.createElement('form', { 'data-testid': 'enquiry-form' }, 'form');
  },
}));

const config = getAdLandingConfig('shanghai-surroundings');
const tour = getTourBySlug('china', 'discovery', 'shanghai-surroundings');

if (!config || !tour) throw new Error('the Shanghai config and tour must exist');

const cfg = config;
const t = tour;

const PAST = '2000-01-01';
const FUTURE = '2100-01-01';

const BLOCK_IDS: Record<string, string> = {
  cityLoop: 'stops',
  featureCards: 'highlights',
  routeMap: 'route',
  latestContent: 'latest',
  priceDepartures: 'price',
  trust: 'trust-signals',
  inclusions: 'inclusions',
  faq: 'faq',
};

const KNOWN_IDS = Object.values(BLOCK_IDS);

function renderPage(today: string) {
  mockFormProps.length = 0;
  return render(<AdLandingPage config={cfg} tour={t} today={today} />);
}

describe('AdLandingPage', () => {
  // The page sends the Meta "viewed tour" signal when it mounts. Stub fbq for every test so that signal fires at once
  // (instead of polling in the background until some later test defines fbq) and each test starts from a clean count.
  const mockFbq = jest.fn();
  beforeEach(() => {
    mockFbq.mockClear();
    Object.assign(window, { fbq: mockFbq });
  });
  afterEach(() => {
    Reflect.deleteProperty(window, 'fbq');
  });

  it('has one level-1 heading: the config headline, with the duration from the tour data in the line above it', () => {
    renderPage(PAST);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(cfg.hero.headline);
    expect(
      screen.getByText(`${cfg.hero.eyebrow} · ${t.duration.toLowerCase()} from Auckland`),
    ).toBeInTheDocument();
  });

  it('shows the blocks in the order the config lists them', () => {
    const { container } = renderPage(PAST);

    const expected = cfg.blocks
      .map((block) => BLOCK_IDS[block.type])
      .filter((id): id is string => Boolean(id) && id !== 'latest');

    const actual = Array.from(container.querySelectorAll('main [id]'))
      .map((el) => el.id)
      .filter((id) => KNOWN_IDS.includes(id));

    expect(actual).toEqual(expected);
  });

  it('passes the tour and the page name to the one enquiry form', () => {
    renderPage(PAST);

    expect(screen.getAllByTestId('enquiry-form')).toHaveLength(1);
    expect(mockFormProps.length).toBeGreaterThan(0);

    const last = mockFormProps[mockFormProps.length - 1];
    expect(last.tourName).toBe(t.name);
    expect(last.tourSlug).toBe(t.slug);
    expect(last.destination).toBe(t.destination);
    expect(last.tier).toBe(t.tier);
    expect(last.source).toBe(`Ad landing page: ${t.name}`);
  });

  it('prints the dates and prices from the tour data', () => {
    const { container } = renderPage(PAST);

    const rows = getDepartureRows(t, PAST);
    expect(rows.length).toBeGreaterThan(0);

    const text = container.textContent ?? '';
    for (const row of rows) {
      expect(text).toContain(row.label);
      expect(text).toContain(row.price);
    }
  });

  it('prints no price that the tour data does not give it', () => {
    const { container } = renderPage(PAST);

    const rows = getDepartureRows(t, PAST);
    const text = container.textContent ?? '';
    const amounts = text.match(/NZD \$[\d,]+/g) ?? [];

    // Departure prices, the deposit, the single supplement, and any amount that the tour's own text (FAQ answers such
    // as the optional activities) already states. Nothing else may carry a price.
    const allowed = new Set<string>([
      ...rows.map((row) => row.price),
      'NZD $1,000',
      ...(t.singleSupplement ? [t.singleSupplement] : []),
      ...(tourCorpus(t).match(/NZD \$[\d,]+/g) ?? []),
    ]);

    const offenders = amounts.filter((amount) => !allowed.has(amount));
    expect(offenders).toEqual([]);
  });

  it('carries no claim the business has ruled out, not even in the FAQ answers and inclusions', () => {
    const { container } = renderPage(PAST);

    expect(findForbiddenCopy(container.textContent ?? '')).toEqual([]);
  });

  it('says the same price in the hero, the fact strip and the bottom bar', () => {
    const { container } = renderPage(PAST);

    const rows = getDepartureRows(t, PAST);
    expect(rows.length).toBeGreaterThan(0);

    const text = container.textContent ?? '';
    expect(text).toContain(rows[0].price);
    expect(screen.getByText(`From ${rows[0].price} per person`)).toBeInTheDocument();
  });

  it('offers three ways to open the form', () => {
    renderPage(PAST);

    // `hidden: true` because the bottom bar is aria-hidden until the visitor has scrolled past the hero button.
    const buttons = screen.getAllByRole('button', { name: 'Send Enquiry', hidden: true });
    expect(buttons).toHaveLength(3);
    expect(buttons.filter((button) => button.id === 'hero-cta')).toHaveLength(1);
  });

  it('has a header with only the logo link and a footer with the legal links', () => {
    const { container } = renderPage(PAST);

    const header = container.querySelector('header');
    expect(header).not.toBeNull();
    if (!header) throw new Error('the page must have a header');
    const headerLinks = within(header as HTMLElement).getAllByRole('link');
    expect(headerLinks).toHaveLength(1);
    expect(headerLinks[0]).toHaveAttribute('href', '/');

    const footer = container.querySelector('footer');
    expect(footer).not.toBeNull();
    if (!footer) throw new Error('the page must have a footer');
    const footerLinks = within(footer as HTMLElement).getAllByRole('link');
    const hrefs = footerLinks.map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('/terms-and-conditions');
    expect(hrefs).toContain('/privacy-policy');
    expect(hrefs).toContain(CTS_PHONE_HREF);
  });

  it('offers a phone call in the hero, in the bottom bar and in the footer, all with the one CTS number', () => {
    const { container } = renderPage(PAST);

    const phoneLinks = Array.from(container.querySelectorAll('a')).filter(
      (link) => link.getAttribute('href') === CTS_PHONE_HREF,
    );
    expect(phoneLinks).toHaveLength(3);

    const hero = container.querySelector('section[aria-labelledby="hero-heading"]');
    expect(hero).not.toBeNull();
    expect(within(hero as HTMLElement).getByRole('link', { name: `Call ${CTS_PHONE_DISPLAY}` })).toHaveAttribute(
      'href',
      CTS_PHONE_HREF,
    );
    // `hidden: true` because the bottom bar is aria-hidden until the visitor has scrolled past the hero button.
    expect(screen.getByRole('link', { name: 'Call us', hidden: true })).toHaveAttribute('href', CTS_PHONE_HREF);
  });

  it('answers the shopping-stop question in the tour data own words, next to the tea tasting it sells', () => {
    const { container } = renderPage(PAST);
    const shopping = t.faqs?.find((item) => item.question.toLowerCase().includes('shopping stops'));
    if (!shopping) throw new Error('the Shanghai tour data must answer the shopping-stop question');

    const faq = container.querySelector('#faq');
    expect(faq).not.toBeNull();
    expect(faq?.textContent).toContain(shopping.question);
    expect(faq?.textContent).toContain(shopping.answer);
  });

  it('shows a picture on every highlight card', () => {
    const { container } = renderPage(PAST);

    const cards = container.querySelectorAll('#highlights li');
    expect(cards.length).toBeGreaterThan(0);
    for (const card of Array.from(cards)) {
      expect(card.querySelector('img')).not.toBeNull();
    }
  });

  it('shows the hero picture with the config description and caption', () => {
    renderPage(PAST);

    expect(screen.getByAltText(cfg.hero.imageAlt)).toBeInTheDocument();
    if (cfg.hero.imageCaption) {
      expect(screen.getByText(cfg.hero.imageCaption)).toBeInTheDocument();
    }
  });

  it('hides the "latest content" block while the feed is empty', () => {
    const { container } = renderPage(PAST);

    expect(container.querySelector('#latest')).toBeNull();
  });

  it('degrades cleanly when nothing is bookable', () => {
    const { container } = renderPage(FUTURE);

    const text = container.textContent ?? '';
    expect(text).not.toContain('Next departure');
    expect(text).not.toContain('From NZD');
    expect(text).toContain('Ask us for the next departure date and price.');

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Send Enquiry', hidden: true })).toHaveLength(3);

    expect(screen.getAllByText(t.name).length).toBeGreaterThanOrEqual(1);
  });

  it('follows the tour data when it changes: nothing about the tour is typed into the page', () => {
    // A tour with made-up figures. If any of these were typed into a component, the old real value would show up instead.
    const changed = {
      ...t,
      duration: '7 Days',
      departureDates: ['5 February 2099'],
      departurePricing: { '5 February 2099': 'NZD $1,234' },
      singleSupplement: 'NZD $321',
      inclusions: ['A made-up inclusion', 'Return airfares from Auckland'],
    };
    mockFormProps.length = 0;
    const { container } = render(<AdLandingPage config={cfg} tour={changed} today={PAST} />);
    const text = container.textContent ?? '';

    expect(text).toContain(`${cfg.hero.eyebrow} · 7 days from Auckland`);
    for (const expected of [
      '5 February 2099',
      'Returns 11 February 2099',
      'NZD $1,234',
      'From NZD $1,234 per person',
      'NZD $321',
      'A made-up inclusion',
      'Return airfares from Auckland',
    ]) {
      expect(text).toContain(expected);
    }
    for (const original of getDepartureRows(t, PAST).flatMap((row) => [row.label, row.price])) {
      expect(text).not.toContain(original);
    }
    expect(text).not.toContain(`${cfg.hero.eyebrow} · ${t.duration.toLowerCase()} from Auckland`);
    expect(text).not.toContain('International and domestic airfares');

    // The fact strip (the only <dl>) shows the changed duration and none of the original one.
    const strip = container.querySelector('dl');
    expect(strip?.textContent).toContain('7 Days');
    expect(strip?.textContent).not.toContain(t.duration);
  });

  it('sends the Meta "viewed tour X" signal once, with the tour slug as content id, like every other tour page', async () => {
    renderPage(PAST);
    await waitFor(() => expect(mockFbq).toHaveBeenCalled());
    await new Promise((resolve) => setTimeout(resolve, 400));

    const views = mockFbq.mock.calls.filter((call) => call[0] === 'track' && call[1] === 'ViewContent');
    expect(views).toHaveLength(1);
    expect(views[0][2]).toEqual(expect.objectContaining({ content_ids: [t.slug], content_type: 'product' }));
    // Nothing else is reported just by looking at the page: no Lead before an enquiry is accepted.
    expect(mockFbq.mock.calls.filter((call) => call[1] === 'Lead')).toHaveLength(0);
  });

  it('prints every FAQ answer it shows closed', () => {
    const { container } = renderPage(PAST);

    const details = Array.from(container.querySelectorAll('details'));
    for (const element of details) {
      expect(element.hasAttribute('open')).toBe(false);
    }
  });
});
