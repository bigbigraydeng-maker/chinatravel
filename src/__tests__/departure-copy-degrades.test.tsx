/**
 * WHY — several pages print the departures straight from the tour data ("departs 18 March 2027 & 10 June 2027").
 * A departure that has left drops out of the data on its own, and once a tour has none left the page must
 * say "ask us", never print an empty list ("departs ."): a join of an empty list is '' (not null), so a `??`
 * fallback does not catch it. These tests move the clock to a day when every departure has gone and read what
 * the pages actually say, in the visible text and in the FAQ structured data.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { render } from '@testing-library/react';
import SmallGroupChinaToursPage from '@/app/small-group-china-tours/page';
import GreatWallGuidePage from '@/app/great-wall-travel-guide/page';
import TerracottaGuidePage from '@/app/terracotta-warriors-travel-guide/page';
import VisaGuideOctoberCampaignCtas from '@/components/seo/VisaGuideOctoberCampaignCtas';

const TODAY_CLOCK = '2026-10-20T00:00:00Z';
const ALL_GONE_CLOCK = '2035-01-01T00:00:00Z';

function setClock(iso: string) {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(iso).getTime());
}

/** Everything the page shows as text, plus the answers inside its structured data. */
function readPage(element: React.ReactElement) {
  const { container, unmount } = render(element);
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
});

describe('pages that print departures from the tour data, with every departure gone', () => {
  it('small-group tours: the visible text and the FAQ data say "ask us", not "departs ."', () => {
    setClock(ALL_GONE_CLOCK);
    const { text, data } = readPage(<SmallGroupChinaToursPage />);

    expect(text).not.toMatch(DANGLING);
    expect(data).not.toMatch(DANGLING);
    expect(text).not.toMatch(/\bDeparts\b/); // the cards print "Departs <dates>" only when there are dates
    expect(text).toContain('Ask us for the next departure');
    expect(data).toContain('Ask us about the next A Tale of Two Cities (Beijing + Xi\'an) departure.');
    expect(data).toContain('Ask us about the next Shanghai & Surroundings departure.');
    expect(data).toContain('Ask us about the next Best of China departure.');
  });

  it('Great Wall and Terracotta Warriors guides: the call-to-action says to ask for the next departure', () => {
    setClock(ALL_GONE_CLOCK);
    for (const page of [<GreatWallGuidePage key="gw" />, <TerracottaGuidePage key="tw" />]) {
      const { text } = readPage(page);
      expect(text).not.toMatch(DANGLING);
      expect(text).toContain('Ask us for the next departure.');
    }
  });

  it('visa guide block: the cards say "Ask us for the next departure" instead of an empty "Departs ·"', () => {
    setClock(ALL_GONE_CLOCK);
    const { text } = readPage(<VisaGuideOctoberCampaignCtas />);

    expect(text).not.toContain('Departs ·'); // an empty "Departs · " label
    expect(text).toContain('Ask us for the next departure');
  });
});

describe('the same pages, while departures are still ahead', () => {
  it('name the real dates from the tour data', () => {
    setClock(TODAY_CLOCK);
    const smallGroup = readPage(<SmallGroupChinaToursPage />);
    const greatWall = readPage(<GreatWallGuidePage />);
    const visa = readPage(<VisaGuideOctoberCampaignCtas />);

    expect(smallGroup.data).toContain('A Tale of Two Cities (Beijing + Xi\'an) departs 18 March 2027 & 10 June 2027.');
    expect(smallGroup.data).not.toContain('Ask us about the next');
    expect(greatWall.text).toContain('Departures 18 March 2027 & 10 June 2027.');
    expect(visa.text).toContain('Departs · 18 March 2027 & 10 June 2027');
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
