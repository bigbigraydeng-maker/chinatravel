/**
 * SEO template contract — Phase A W2
 *
 * Week 2 restyles the three templates behind 38 content pages:
 *   DestinationGuide  -> 21 *-travel-guide pages
 *   CityTourHub       -> 10 *-tours pages
 *   MarkdownContent   -> 7 discovery guides (with ImmersivePageHero)
 * plus shared furniture (FAQSection, TrustBar) that reaches further still.
 *
 * These pages carry the site's organic search value. A class-only restyle can
 * silently delete the things that value rests on — a schema block, an anchor
 * id, an image `priority` flag, a compliance sentence — and nothing else in
 * the suite would notice.
 *
 * Static source assertions, matching shell-contract.test.ts. What we are
 * guarding is "this still exists in the template", which the source answers
 * directly, without mocking Supabase, next/image and next/navigation to read
 * a heading.
 *
 * Every assertion below was verified against the pre-restyle source, and is
 * meant to be proven by deleting the thing it guards and watching it go red.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const REPO_ROOT = join(__dirname, '..', '..');
const read = (p: string) => readFileSync(join(REPO_ROOT, p), 'utf8');

const DESTINATION_GUIDE = 'src/components/seo/DestinationGuide.tsx';
const CITY_TOUR_HUB = 'src/components/seo/CityTourHub.tsx';
const FAQ_SECTION = 'src/components/FAQSection.tsx';
const TRUST_BAR = 'src/components/TrustBar.tsx';
const MARKDOWN_CONTENT = 'src/components/MarkdownContent.tsx';
const HUB_HERO = 'src/components/seo/HubHero.tsx';
const IMMERSIVE_HERO = 'src/components/ImmersivePageHero.tsx';

describe('structured data survives the restyle', () => {
  // FAQSection emits the ONLY FAQPage schema on the 10 *-tours pages. An
  // earlier plan proposed converging the site's three FAQ disclosure
  // implementations into one; that would have deleted FAQ rich results on all
  // ten. The restyle changes tokens only and this line stays.
  //
  // Assert the JSX usage, not the bare identifier. An earlier version of this
  // test checked `toContain('SchemaMarkup')`, which the import line satisfies
  // on its own — deleting the rendered element left the test green. Caught by
  // deliberately removing the element and finding the suite still passed.
  it('FAQSection still renders the FAQPage schema element', () => {
    const src = read(FAQ_SECTION);
    expect(src).toContain('<SchemaMarkup');
    expect(src).toContain('generateFAQSchema');
  });
});

describe('anchor ids the table of contents and inbound links depend on', () => {
  const guide = read(DESTINATION_GUIDE);

  it.each(['attractions', 'practical', 'faqs'])(
    'DestinationGuide keeps id="%s"',
    (id) => {
      expect(guide).toContain(`id="${id}"`);
    }
  );

  it('DestinationGuide keeps the per-section dynamic id', () => {
    // Editorial sections get id={section.id}; the in-page TOC links to them.
    expect(guide).toMatch(/id=\{section\.id\}/);
  });

  it('DestinationGuide keeps scroll offsets on its anchored sections', () => {
    // Without scroll-mt the sticky nav covers the heading you jumped to.
    const offsets = guide.match(/scroll-mt-\d+/g) ?? [];
    expect(offsets.length).toBeGreaterThanOrEqual(4);
  });

  it('CityTourHub keeps the tours-section anchor its sidebar CTA targets', () => {
    expect(read(CITY_TOUR_HUB)).toContain('id="tours-section"');
  });
});

describe('client-component boundaries', () => {
  // DestinationGuide runs a lightbox on useState. Losing the directive turns
  // it into a server component and the build fails at a non-obvious place.
  it('DestinationGuide stays a client component', () => {
    expect(read(DESTINATION_GUIDE).split('\n')[0].trim()).toBe("'use client';");
  });
});

describe('LCP contract on hero images', () => {
  // HubHero renders above the fold on 31 pages, ImmersivePageHero on 11.
  // Both are the LCP element there. Phase 3 carries a hard mobile
  // LCP < 2.5s gate, so these two flags are load-bearing, not decoration.
  it.each([
    ['HubHero', HUB_HERO],
    ['ImmersivePageHero', IMMERSIVE_HERO],
  ])('%s keeps priority and full-width sizes', (_name, path) => {
    const src = read(path);
    expect(src).toContain('priority');
    expect(src).toContain('sizes="100vw"');
  });
});

describe('brand compliance copy outside the footer', () => {
  // The footer's 1928 strings are covered by shell-contract.test.ts. These two
  // were unguarded — they sit in templates week 2 rewrites.
  //
  // CTS group founding (1928) and NZ trading history (since 2000) are separate
  // facts. Merging them is the standing brand red line; shell-contract.test.ts
  // enforces that repo-wide.
  it('TrustBar keeps the CTS attribution', () => {
    expect(read(TRUST_BAR)).toContain('Backed by CTS · Founded 1928');
  });

  it('CityTourHub keeps the TAANZ + since-2000 sentence', () => {
    expect(read(CITY_TOUR_HUB)).toContain(
      'TAANZ-bonded and Auckland-based since 2000'
    );
  });
});

describe('markdown rendering pipeline', () => {
  // The 7 discovery guides embed raw HTML and GFM tables in their markdown.
  // Dropping either plugin renders that content as escaped text.
  // Assert the plugin is wired into the pipeline, not merely imported — the
  // same blind spot the FAQ schema assertion had.
  it.each([
    ['remarkGfm', 'remarkPlugins={[remarkGfm]}'],
    ['rehypeRaw', 'rehypePlugins={[rehypeRaw]}'],
  ])('MarkdownContent keeps %s wired in', (_name, usage) => {
    expect(read(MARKDOWN_CONTENT)).toContain(usage);
  });
});

describe('guide to tour-hub internal link mesh', () => {
  // Each destination guide links to its matching commercial hub. This mesh is
  // deliberate internal linking, easy to drop while reshuffling a sidebar.
  it('DestinationGuide still references the tour hub URLs', () => {
    const guide = read(DESTINATION_GUIDE);
    const hubs = new Set(guide.match(/\/[a-z-]+-tours(?=['"])/g) ?? []);
    expect(hubs.size).toBeGreaterThanOrEqual(10);
  });
});
