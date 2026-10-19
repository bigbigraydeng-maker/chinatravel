import registry from './delisted-tours.json';
import scan from './delisted-scan.cjs';

/**
 * Registry of tours that have been taken off sale — the single source of truth.
 *
 * Everything that has to stay in step reads this table instead of hard-coding a slug:
 *  - next.config.js: one 301 per entry (tour page, its sub-pages, `extraPaths`) to `redirectTo`
 *  - tours.ts: the exported `tours` never contains these slugs, so every list, card,
 *    recommendation, feed and sitemap entry built from it drops them
 *  - sitemap.ts: drops any delisted URL, however it was added
 *  - src/__tests__/delisted-tours.test.ts: fails when a slug, name keyword or pattern is still in
 *    src/, public/, content/ or scripts/ (text, SVG and file names) or in the built pages, unless the
 *    file is listed under `knownResidue`
 *  - scripts/verify-delisted.mjs: post-deploy check against the live site
 *
 * Retiring a tour: delete its entry from tours.ts, add an entry to delisted-tours.json, then run
 * `npm run tour:footprint -- <slug>` until nothing outside the registry is listed.
 * Bringing a tour back: remove its entry from the registry first (the residue test then stops flagging it).
 *
 * The matching rules (entities, quotes, dashes, tags) live in delisted-scan.cjs so the test, the
 * post-deploy script and the footprint script all use one implementation.
 */
export interface KnownResidue {
  /** Repo-relative path that is still allowed to mention the tour. */
  path: string;
  reason: string;
  /** Ledger card that owns the clean-up, e.g. "2026-10-19-chinatravel-brochure-reexport-without-christmas". */
  card: string;
}

export interface DelistedTour {
  /** Slug the tour had in tours.ts. */
  slug: string;
  destination: 'china' | 'japan' | 'vietnam';
  tier: 'signature' | 'discovery' | 'stopover';
  /** Customer-facing names and phrases that must no longer appear anywhere on the site. */
  nameKeywords: string[];
  /** Regular expressions (case-insensitive, applied to normalised text and file paths) for other spellings. */
  patterns?: string[];
  /** Live page that old URLs 301 to. */
  redirectTo: string;
  /** Other retired paths (landing pages) that also 301 to `redirectTo`. */
  extraPaths: string[];
  /** Files that still mention the tour on purpose, each owned by a ledger card. */
  knownResidue?: KnownResidue[];
  /** YYYY-MM-DD */
  delistedOn: string;
}

export const DELISTED_TOURS: DelistedTour[] = registry as DelistedTour[];

export const delistedTourPath = (tour: DelistedTour): string =>
  `/tours/${tour.destination}/${tour.tier}/${tour.slug}`;

/** Paths that must 301 to `redirectTo`: the tour page (its sub-pages follow) and any extra retired page. */
export const delistedPaths = (tour: DelistedTour): string[] => [delistedTourPath(tour), ...tour.extraPaths];

export const isDelistedSlug = (slug: string): boolean => DELISTED_TOURS.some((tour) => tour.slug === slug);

function pathnameOf(urlOrPath: string): string {
  const withoutOrigin = urlOrPath.replace(/^[a-z][a-z0-9+.-]*:\/\/[^/]+/i, '');
  return withoutOrigin.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
}

/** True for a delisted page path or anything under it (e.g. `.../print`), with or without origin or query string. */
export function isDelistedUrl(urlOrPath: string): boolean {
  const path = pathnameOf(urlOrPath).toLowerCase();
  return DELISTED_TOURS.some((tour) =>
    delistedPaths(tour).some((p) => path === p.toLowerCase() || path.startsWith(`${p.toLowerCase()}/`)),
  );
}

const scanner = scan.buildScanner(DELISTED_TOURS);

/** Normalise text before searching it for delisted words (comments, escapes, entities, tags, quotes, dashes, case). */
export const normalizeForScan = (text: string): string => scan.normalizeForScan(text);

/** Normalised literal needles: every slug, name keyword and extra path. */
export const delistedNeedles = (): string[] => scanner.needles.slice();

/** Labels of every delisted slug, keyword or pattern found in a piece of text (empty when clean). */
export const findDelistedInText = (text: string): string[] => scanner.findInText(text);

/** Labels of every delisted slug, keyword or pattern found in a repo-relative file path. */
export const findDelistedInPath = (relativePath: string): string[] => scanner.findInPath(relativePath);

/** Every known-residue entry across the registry. */
export const knownResidueEntries = (): KnownResidue[] => DELISTED_TOURS.flatMap((tour) => tour.knownResidue ?? []);
