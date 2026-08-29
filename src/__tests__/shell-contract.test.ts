/**
 * Shell contract — Phase A W1
 *
 * The Ceepii reskin rewrites Navbar and Footer. Those two files carry things
 * that are invisible to a visual review and that no existing test covers:
 * brand-compliance strings, legal links, the newsletter mount, tracking
 * fallbacks, and the sticky-offset coupling between Navbar and VisaFreeBanner.
 *
 * Analysis before the reskin confirmed the gap concretely: a shell PR could
 * delete every 1928 compliance string and CI would stay green. This suite
 * closes that, and must stay green through the reskin.
 *
 * These are static source assertions rather than renders. What we are guarding
 * is "this string / link / mount still exists in the shell", which the source
 * answers directly — and it avoids mocking next/link, next/image,
 * next/navigation and Supabase just to read a footer. Same approach as
 * shared-blocks.test.ts.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const REPO_ROOT = join(__dirname, '..', '..');
const read = (p: string) => readFileSync(join(REPO_ROOT, p), 'utf8');

const FOOTER = 'src/components/Footer.tsx';
const NAVBAR = 'src/components/Navbar.tsx';
const LAYOUT = 'src/app/layout.tsx';

describe('Footer brand-compliance strings', () => {
  const footer = read(FOOTER);

  // CTS group founding (1928) and NZ trading history (since 2000, 25 years)
  // are two SEPARATE facts. Merging them into "Auckland since 1928" is the
  // standing brand red line — a site-wide correction already went through for
  // it. These exact strings are the compliant phrasings.
  it.each([
    'Backed by CTS · Founded 1928 | Direct China Operations',
    'Part of China Travel Service Group, est. 1928',
  ])('keeps the compliant 1928 attribution: %s', (needle) => {
    expect(footer).toContain(needle);
  });

  it.each([
    'TAANZ-bonded',
    'All card payments processed via PCI-DSS compliant gateways. Client funds held in a TAANZ-bonded trust account.',
  ])('keeps the financial-protection disclosure: %s', (needle) => {
    expect(footer).toContain(needle);
  });
});

describe('Footer required links and mounts', () => {
  const footer = read(FOOTER);

  it('links to Terms & Conditions and Privacy Policy', () => {
    expect(footer).toContain('/terms-and-conditions');
    expect(footer).toContain('/privacy-policy');
  });

  it('still mounts the footer newsletter form', () => {
    expect(footer).toContain('NewsletterSubscribeForm');
    expect(footer).toContain('variant="footer"');
  });
});

describe('Root layout tracking + GEO surface', () => {
  const layout = read(LAYOUT);

  it.each(['GeoDirective', 'TrackingScripts', 'GoogleAnalytics'])(
    'still renders <%s />',
    (component) => {
      expect(layout).toContain(`<${component} />`);
    }
  );

  it('keeps the no-JS Meta Pixel PageView fallback', () => {
    expect(layout).toContain('facebook.com/tr?id=');
    expect(layout).toContain('ev=PageView&noscript=1');
  });
});

describe('Navbar sticky coupling', () => {
  const navbar = read(NAVBAR);

  // VisaFreeBanner is a sticky bar that sits above the nav and publishes its
  // height as --vfb-h. Drop this and the nav overlaps the banner (or leaves a
  // gap when the banner is dismissed).
  it('offsets the sticky nav by the VisaFreeBanner height variable', () => {
    expect(navbar).toContain("var(--vfb-h, 0px)");
    expect(navbar).toContain('sticky');
  });

  // Added in an earlier UX phase: clicking a nav link shows immediate feedback
  // while the next route loads. Easy to lose in a shell rewrite.
  it('keeps the route-change loading indicator', () => {
    expect(navbar).toContain('isNavigating');
  });
});

/**
 * Repo-wide brand red line.
 *
 * Legal phrasings attribute 1928 to the parent group, e.g.
 *   "25 years of Kiwi-led NZ operations (Auckland since 2000), backed by CTS Group experience since 1928"
 *   "25 years in NZ (parent CTS since 1928)"
 * The violation is binding the NZ entity itself to 1928 with no attribution in
 * between. So: flag "since 1928" only when a NZ marker appears shortly before
 * it AND no attributing qualifier sits between the two.
 */
describe('brand red line: NZ history must not be attributed to 1928', () => {
  const NZ_MARKER = /(Auckland|New Zealand|\bNZ\b|Kiwi)/i;
  const ATTRIBUTION = /(parent|CTS Group|China Travel Service|group|2000|25 years|brand|backed by)/i;
  const LOOKBEHIND = 70;

  function sourceFiles(dir: string, acc: string[] = []): string[] {
    for (const entry of readdirSync(join(REPO_ROOT, dir))) {
      if (entry === 'node_modules' || entry === '.next') continue;
      const rel = join(dir, entry);
      if (statSync(join(REPO_ROOT, rel)).isDirectory()) sourceFiles(rel, acc);
      else if (/\.(ts|tsx)$/.test(entry)) acc.push(rel);
    }
    return acc;
  }

  it('has no copy binding Auckland/NZ directly to "since 1928"', () => {
    const selfPath = relative(REPO_ROOT, __filename);
    const violations: string[] = [];

    for (const file of sourceFiles('src')) {
      if (file === selfPath) continue;
      const src = read(file);
      const re = /since 1928/gi;
      let m: RegExpExecArray | null;
      while ((m = re.exec(src))) {
        const before = src.slice(Math.max(0, m.index - LOOKBEHIND), m.index);
        if (NZ_MARKER.test(before) && !ATTRIBUTION.test(before)) {
          const line = src.slice(0, m.index).split('\n').length;
          violations.push(`${file}:${line} — ${before.trim().slice(-60)}[since 1928]`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
