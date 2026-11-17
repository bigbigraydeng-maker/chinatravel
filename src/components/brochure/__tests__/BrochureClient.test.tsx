// Why this exists: the call-me panel must only appear for guests who came in
// from a Magic Engine mail; what it sends decides who Baker calls.

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BrochureClient from '@/components/brochure/BrochureClient';
import { recommendCards, type BrochureCard } from '@/lib/brochure/picker';
import type { BrochureView, TourPage } from '@/lib/brochure/view';
import { CTS_PHONE_DISPLAY } from '@/lib/site';

function card(
  over: Partial<BrochureCard> & Pick<BrochureCard, 'path' | 'name' | 'days'>
): BrochureCard {
  return {
    duration: `${over.days} Days`,
    price: 'NZD $3,000',
    departures: ['10 March 2027'],
    moreDepartures: 0,
    tier: 'discovery',
    destination: 'china',
    cities: ['Beijing', "Xi'an", 'Shanghai'],
    hasDepartures: true,
    ...over,
  };
}

const candidates: BrochureCard[] = [
  card({ path: '/tours/china/discovery/a', name: 'Tour A', days: 10, tier: 'discovery' }),
  card({ path: '/tours/china/signature/b', name: 'Tour B', days: 12, tier: 'signature' }),
  card({ path: '/tours/china/discovery/c', name: 'Tour C', days: 14, tier: 'discovery' }),
  card({ path: '/tours/china/signature/d', name: 'Tour D', days: 15, tier: 'signature' }),
  card({ path: '/tours/china/discovery/e', name: 'Tour E', days: 18, tier: 'discovery' }),
  card({ path: '/tours/china/signature/f', name: 'Tour F', days: 21, tier: 'signature' }),
];

const DAYS = [
  { value: '2026-11-20', label: 'Thu 20 Nov' },
  { value: '2026-11-21', label: 'Fri 21 Nov' },
];

function page(c: BrochureCard, index: number): TourPage {
  return {
    anchor: `tour-${c.path.split('/').pop()}`,
    path: c.path,
    name: c.name,
    collection: c.tier === 'signature' ? 'Signature Collection' : 'Discovery Collection',
    index,
    heroImage: '/images/tours/great-wall-cloud-sea.jpg',
    days: c.days,
    when: null,
    flag: 'Enquire for dates',
    route: c.cities.join(' · '),
    fromPrice: c.price,
    solo: null,
    meals: null,
    hotels: null,
    highlights: [],
    inclusions: [],
    exclusions: [],
    departures: [],
  };
}

const view: BrochureView = {
  guidedTours: 2,
  guidedDepartures: 2,
  guidedFrom: 'NZD $3,000',
  discovery: null,
  signature: null,
  stopoverCount: 0,
  stopoverFrom: null,
  stopoverMinDays: 0,
  stopoverMaxDays: 0,
  tourPages: candidates.slice(0, 2).map((c, i) => page(c, i + 1)),
  stopovers: [],
  asia: [],
};

function renderPage() {
  render(<BrochureClient view={view} candidates={candidates} days={DAYS} pdfSize="1.5 MB" />);
}

const mockFetch = jest.fn<Promise<Response>, Parameters<typeof fetch>>();

beforeEach(() => {
  mockFetch.mockReset();
  Object.defineProperty(global, 'fetch', { value: mockFetch, writable: true, configurable: true });
});

afterEach(() => {
  document.cookie = 'cts_me_on=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
});

async function answerAll(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('radio', { name: 'About 10 days' }));
  await user.click(screen.getByRole('radio', { name: 'Yes, first time' }));
  await user.click(screen.getByRole('radio', { name: 'Take it easy' }));
}

test('no flag cookie: no call-me buttons, phone links shown', async () => {
  const user = userEvent.setup();
  renderPage();
  await answerAll(user);
  expect(screen.queryByRole('button', { name: 'Ask Baker to call me' })).toBeNull();
  expect(
    screen.queryByRole('button', { name: 'Ask Baker to call me about this tour' })
  ).toBeNull();
  expect(screen.getAllByRole('link', { name: 'Call us' }).length).toBeGreaterThan(0);
});

test('with flag cookie: suggestions match recommendCards', async () => {
  document.cookie = 'cts_me_on=1; path=/';
  const user = userEvent.setup();
  renderPage();
  await answerAll(user);
  const region = screen.getByRole('region', { name: 'Our suggestions for you' });
  const headings = within(region).getAllByRole('heading', { level: 3 });
  expect(headings).toHaveLength(2);
  const expected = recommendCards(
    { length: '10', firstVisit: true, pace: 'easy' },
    candidates
  ).map((c) => c.name);
  expect(headings.map((h) => h.textContent)).toEqual(expected);
});

test('with flag cookie: quiz panel posts the expected body and confirms', async () => {
  document.cookie = 'cts_me_on=1; path=/';
  mockFetch.mockResolvedValue({ status: 204 } as Response);
  const user = userEvent.setup();
  renderPage();
  await answerAll(user);
  await user.click(screen.getByRole('button', { name: 'Ask Baker to call me' }));
  await user.click(screen.getByRole('radio', { name: 'Afternoon' }));
  await user.selectOptions(screen.getByLabelText('Which day?'), '2026-11-21');
  await user.click(screen.getByRole('button', { name: 'Confirm' }));

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch.mock.calls[0][0]).toBe('/api/me-callback');
  const expectedPicks = recommendCards(
    { length: '10', firstVisit: true, pace: 'easy' },
    candidates
  ).map((c) => c.path);
  expect(JSON.parse(String(mockFetch.mock.calls[0][1]?.body))).toEqual({
    date: '2026-11-21',
    window: 'afternoon',
    tourPath: null,
    quiz: { length: '10', firstVisit: true, pace: 'easy', picks: expectedPicks },
  });
  await screen.findByText('Thank you. Baker will call you on Fri 21 Nov (afternoon).');
});

test('with flag cookie: tour card panel posts tourPath and shows error on 502', async () => {
  document.cookie = 'cts_me_on=1; path=/';
  mockFetch.mockResolvedValue({ status: 502 } as Response);
  const user = userEvent.setup();
  renderPage();
  await user.click(
    screen.getAllByRole('button', { name: 'Ask Baker to call me about this tour' })[0]
  );
  await user.click(screen.getByRole('button', { name: 'Confirm' }));

  const body = JSON.parse(String(mockFetch.mock.calls[0][1]?.body));
  expect(body.tourPath).toBe('/tours/china/discovery/a');
  expect(body.quiz).toBeNull();
  await screen.findByText(
    `Sorry, that did not go through. Please call us on ${CTS_PHONE_DISPLAY}.`
  );
});

test('with flag cookie: network failure shows the sorry message', async () => {
  document.cookie = 'cts_me_on=1; path=/';
  mockFetch.mockRejectedValue(new Error('offline'));
  const user = userEvent.setup();
  renderPage();
  await answerAll(user);
  await user.click(screen.getByRole('button', { name: 'Ask Baker to call me' }));
  await user.click(screen.getByRole('button', { name: 'Confirm' }));
  await screen.findByText(
    `Sorry, that did not go through. Please call us on ${CTS_PHONE_DISPLAY}.`
  );
});

test('the PDF brochure can be downloaded from the cover, each tour and the closing band', () => {
  renderPage();
  const links = screen.getAllByRole('link', { name: /Download the PDF brochure/ });
  // cover + one per tour page + closing band
  expect(links).toHaveLength(view.tourPages.length + 2);
  for (const link of links) {
    expect(link).toHaveAttribute('href', '/brochures/CTS-Tours-2026-2027-Brochure.pdf');
    expect(link).toHaveAttribute('download');
  }
  expect(screen.getAllByText('(PDF · 1.5 MB)').length).toBeGreaterThan(0);
});

test('a tour page leaves out the boxes its data does not have, instead of guessing', () => {
  renderPage();
  const tour = screen.getByRole('article', { name: 'Tour A' });
  expect(within(tour).getByText('From')).toBeInTheDocument();
  expect(within(tour).queryByText('Solo room')).toBeNull();
  expect(within(tour).queryByText('Meals')).toBeNull();
  expect(within(tour).queryByText('Hotels')).toBeNull();
  expect(within(tour).getByText('No departure is scheduled yet.')).toBeInTheDocument();
});
