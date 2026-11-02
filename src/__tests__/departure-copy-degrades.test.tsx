/**
 * WHY — several pages print the departures straight from the tour data ("departs 18 March 2027 & 10 June 2027").
 * A departure that has left drops out of the data on its own, and once a tour has none left the page must
 * say "ask us", never print an empty list ("departs ."): a join of an empty list is '' (not null), so a `??`
 * fallback does not catch it. These tests move the clock to a day when every departure has gone and read what
 * the pages actually say, in the visible text and in the FAQ structured data. The "still ahead" test uses fixed fake
 * dates (never real ones), so adding or removing a real departure in the tour data cannot break it.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { render } from '@testing-library/react';
import SmallGroupChinaToursPage from '@/app/small-group-china-tours/page';
import GreatWallGuidePage from '@/app/great-wall-travel-guide/page';
import TerracottaGuidePage from '@/app/terracotta-warriors-travel-guide/page';
import VisaGuideOctoberCampaignCtas from '@/components/seo/VisaGuideOctoberCampaignCtas';
import { getPublishedChinaTours, getPublishedTourBySlug, getPublishedTours } from '@/lib/data/published-tour-catalog';
import { tours } from '@/lib/data/tours';

// This suite asserts page departure copy; the guide's async editorial renderer is outside that surface.
jest.mock('@/components/seo/DestinationGuide', () => ({ __esModule: true, default: () => null }));

// Pages now read the shared ME-published catalog. These tests provide the same local fixture through that reader.
jest.mock('@/lib/data/published-tour-catalog', () => {
  const actual = jest.requireActual<typeof import('@/lib/data/published-tour-catalog')>('@/lib/data/published-tour-catalog');
  return {
    ...actual,
    getPublishedTours: jest.fn(),
    getPublishedChinaTours: jest.fn(),
    getPublishedTourBySlug: jest.fn(),
  };
});
const mockedGetPublishedTours = getPublishedTours as jest.MockedFunction<typeof getPublishedTours>;
const mockedGetPublishedChinaTours = getPublishedChinaTours as jest.MockedFunction<typeof getPublishedChinaTours>;
const mockedGetPublishedTourBySlug = getPublishedTourBySlug as jest.MockedFunction<typeof getPublishedTourBySlug>;

function setPublishedCatalog(items: typeof tours) {
  mockedGetPublishedTours.mockResolvedValue(items);
  mockedGetPublishedChinaTours.mockResolvedValue(items.filter((tour) => tour.destination === 'china' && tour.isActive && !tour.soldOut));
  mockedGetPublishedTourBySlug.mockImplementation(async (destination, tier, slug) =>
    items.find((tour) => tour.destination === destination && tour.tier === tier && tour.slug === slug),
  );
}

const ALL_GONE_CLOCK = '2035-01-01T00:00:00Z';

function setClock(iso: string) {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(iso).getTime());
}

/** Everything the page shows as text, plus the answers inside its structured data. */
async function readPage(element: React.ReactElement | null | Promise<React.ReactElement | null>) {
  const resolved = await element;
  const { container, unmount } = render(resolved);
  const text = (container.textContent ?? '').replace(/\s+/g, ' ');
  const data = Array.from(container.querySelectorAll('script[type="application/ld+json"]'))
    .map((script) => script.textContent ?? '')
    .join(' ');
  unmount();
  return { text, data };
}

/** What an empty list looks like once it has been glued into a sentence: "departs ." or "Departures .". */
const DANGLING = /\bdeparts\s*\.|\bDepartures\s+\./;

afterEach(() => {
  jest.useRealTimers();
  setPublishedCatalog(tours);
});

beforeEach(() => setPublishedCatalog(tours));

describe('pages that print departures from the tour data, with every departure gone', () => {
  it('small-group tours: the visible text and the FAQ data say "ask us", not "departs ."', async () => {
    setClock(ALL_GONE_CLOCK);
    const { text, data } = await readPage(SmallGroupChinaToursPage());

    expect(text).not.toMatch(DANGLING);
    expect(data).not.toMatch(DANGLING);
    expect(text).not.toMatch(/\bDeparts\b/); // the cards print "Departs <dates>" only when there are dates
    expect(text).toContain('Ask us for the next departure');
    for (const slug of ['beijing-xian', 'shanghai-surroundings', 'essentials']) {
      const tour = tours.find((item) => item.slug === slug)!;
      expect(data).toContain(`${tour.name}: ask us for the next departure date.`);
    }
  });

  it('Great Wall and Terracotta Warriors guides: the call-to-action says to ask for the next departure', async () => {
    setClock(ALL_GONE_CLOCK);
    for (const page of [GreatWallGuidePage(), TerracottaGuidePage()]) {
      const { text } = await readPage(page);
      expect(text).not.toMatch(DANGLING);
      expect(text).toContain('Ask us for the next departure.');
    }
  });

  it('visa guide block: the cards say "Ask us for the next departure" instead of an empty "Departs ·"', async () => {
    setClock(ALL_GONE_CLOCK);
    const { text } = await readPage(VisaGuideOctoberCampaignCtas());

    expect(text).not.toContain('Departs ·'); // an empty "Departs · " label
    expect(text).toContain('Ask us for the next departure');
  });
});

describe('the same pages, while departures are still ahead', () => {
  // Dates that can never be real: what this pins is that each page prints exactly the dates the tour data gives it,
  // joined with " & ", instead of the "ask us" fallback.
  const FAKE_DEPARTURES: Record<string, string[]> = {
    'beijing-xian': ['3 February 2099', '4 May 2099'],
    'shanghai-surroundings': ['5 February 2099'],
    essentials: ['6 February 2099', '7 May 2099'],
  };

  it('name the dates the published catalogue gives them, whatever those dates are', async () => {
    setPublishedCatalog(tours.map((tour) => FAKE_DEPARTURES[tour.slug]
      ? { ...tour, departureDates: FAKE_DEPARTURES[tour.slug] }
      : tour));
    const smallGroup = await readPage(SmallGroupChinaToursPage());
    const greatWall = await readPage(GreatWallGuidePage());
    const terracotta = await readPage(TerracottaGuidePage());
    const visa = await readPage(VisaGuideOctoberCampaignCtas());

    expect(smallGroup.data).toContain(`${tours.find((tour) => tour.slug === 'beijing-xian')!.name} departs 3 February 2099 & 4 May 2099.`);
    expect(smallGroup.data).toContain(`${tours.find((tour) => tour.slug === 'shanghai-surroundings')!.name} departs 5 February 2099.`);
    expect(smallGroup.data).toContain(`${tours.find((tour) => tour.slug === 'essentials')!.name} departs 6 February 2099 & 7 May 2099.`);
    expect(smallGroup.data).not.toContain('ask us for the next departure date');
    expect(greatWall.text).toContain('Departures 3 February 2099 & 4 May 2099.');
    expect(terracotta.text).toContain('Departures 3 February 2099 & 4 May 2099.');
    expect(visa.text).toContain('Departs · 3 February 2099 & 4 May 2099');
  });
});

describe('source guard', () => {
  /** Pages whose text or schedule comes from the tour data: they must refresh on a timer, or a departure that has left stays until the next deploy. */
  const PAGES_THAT_PRINT_DEPARTURES = [
    'src/app/small-group-china-tours/page.tsx',
    'src/app/great-wall-travel-guide/page.tsx',
    'src/app/terracotta-warriors-travel-guide/page.tsx',
    'src/app/china-visa-guide-for-new-zealanders/page.tsx',
    'src/app/tours/page.tsx',
    'src/app/campaigns/best-of-china/page.tsx',
    'src/app/tours/[destination]/[tier]/[tour]/page.tsx',
  ];

  it.each(PAGES_THAT_PRINT_DEPARTURES)('%s refreshes on a timer', (file) => {
    expect(readFileSync(join(process.cwd(), file), 'utf8')).toMatch(/export const revalidate\s*=\s*\d+/);
  });

  /** `list.join(' & ') ?? 'fallback'` can never fall back: an empty list joins to '' and '' is not null. */
  const JOIN_THEN_NULLISH = /\.join\((?:'[^']*'|"[^"]*"|`[^`]*`)\)\s*\?\?/;

  function sourceFiles(dir: string, out: string[] = []): string[] {
    for (const name of readdirSync(dir)) {
      if (name === 'node_modules' || name === '__tests__') continue;
      const path = join(dir, name);
      if (statSync(path).isDirectory()) sourceFiles(path, out);
      else if (/\.(ts|tsx)$/.test(name) && !name.includes('.test.')) out.push(path);
    }
    return out;
  }

  it('no `.join(...) ??` fallback anywhere in the source (use `||`, or test the list first)', () => {
    const offenders = sourceFiles(join(process.cwd(), 'src')).filter((file) =>
      JOIN_THEN_NULLISH.test(readFileSync(file, 'utf8')),
    );

    expect(offenders.map((file) => file.slice(process.cwd().length + 1))).toEqual([]);
  });
});
