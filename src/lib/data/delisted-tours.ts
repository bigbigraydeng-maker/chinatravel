import registry from './delisted-tours.json';

/**
 * Registry of tours that have been taken off sale — the single source of truth.
 *
 * Everything that has to stay in step reads this table instead of hard-coding a slug:
 *  - next.config.js: one 301 per entry (tour page, its sub-pages, `extraPaths`) to `redirectTo`
 *  - tours.ts: the exported `tours` never contains these slugs, so every list, card,
 *    recommendation, feed and sitemap entry built from it drops them
 *  - sitemap.ts: drops any delisted URL, however it was added
 *  - src/__tests__/delisted-tours.test.ts: fails when a slug or name keyword is still in
 *    src/, public/, content/ or the built pages
 *  - scripts/verify-delisted.mjs: post-deploy check against the live site
 *
 * Retiring a tour: delete its entry from tours.ts, add an entry to delisted-tours.json, then run
 * `npm run tour:footprint -- <slug>` until nothing outside the registry is listed.
 * Bringing a tour back: remove its entry from the registry first (the residue test then stops flagging it).
 */
export interface DelistedTour {
  /** Slug the tour had in tours.ts. */
  slug: string;
  destination: 'china' | 'japan' | 'vietnam';
  tier: 'signature' | 'discovery' | 'stopover';
  /** Customer-facing names and phrases that must no longer appear anywhere on the site. */
  nameKeywords: string[];
  /** Live page that old URLs 301 to. */
  redirectTo: string;
  /** Other retired paths (landing pages) that also 301 to `redirectTo`. */
  extraPaths: string[];
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

/** Normalise text before searching it for delisted words: comments, entities, curly quotes, case, whitespace. */
export function normalizeForScan(text: string): string {
  return text
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/&amp;/gi, '&')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/** Normalised needles that must not appear in site content: every slug, name keyword and extra path. */
export function delistedNeedles(): string[] {
  const needles = new Set<string>();
  for (const tour of DELISTED_TOURS) {
    needles.add(normalizeForScan(tour.slug));
    for (const keyword of tour.nameKeywords) needles.add(normalizeForScan(keyword));
    for (const extra of tour.extraPaths) needles.add(normalizeForScan(extra));
  }
  return Array.from(needles);
}
