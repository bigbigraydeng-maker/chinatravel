import fs from 'node:fs';
import path from 'node:path';
import { PUBLISHED_TOUR_CATALOG_CONTRACT } from '../published-tour-catalog';

function sourceFiles(root: string): string[] {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) return sourceFiles(absolute);
    return /\.(ts|tsx)$/.test(entry.name) && !absolute.includes(`${path.sep}__tests__${path.sep}`) ? [absolute] : [];
  });
}

describe('published ME tour catalog contract', () => {
  const projectRoot = process.cwd();

  it('records each public surface that reads ME-managed tour records', () => {
    const declared = [...PUBLISHED_TOUR_CATALOG_CONTRACT.consumerFiles].sort();
    const directReaders = sourceFiles(path.join(projectRoot, 'src/app'))
      .concat(sourceFiles(path.join(projectRoot, 'src/components')))
      .filter((file) => /from\s+['"]@\/lib\/data\/published-tour-catalog['"]/.test(fs.readFileSync(file, 'utf8')))
      .map((file) => path.relative(projectRoot, file))
      .sort();

    expect(declared).toEqual(directReaders);
    for (const file of declared) expect(fs.existsSync(path.join(projectRoot, file))).toBe(true);
  });

  it('prevents public code from reading the legacy static tour array directly', () => {
    const publicFiles = sourceFiles(path.join(projectRoot, 'src/app'))
      .concat(sourceFiles(path.join(projectRoot, 'src/components')));
    const bypasses = publicFiles.filter((file) => {
      if (path.relative(projectRoot, file) === 'src/lib/data/published-tour-catalog.ts') return false;
      const source = fs.readFileSync(file, 'utf8');
      return /import\s*\{[^}]*\b(?:tours|fallbackTours|getTourBySlug)\b[^}]*\}\s*from\s*['"]@\/lib\/data\/tours['"]/.test(source);
    }).map((file) => path.relative(projectRoot, file));

    expect(bypasses).toEqual([]);
  });

  it('declares the published fields and the complete consumer route groups', () => {
    expect(PUBLISHED_TOUR_CATALOG_CONTRACT.records.tour).toEqual(expect.arrayContaining([
      'slug', 'name', 'title', 'short_description', 'duration', 'price', 'hero_image', 'is_active',
      'sold_out', 'tour_cities', 'highlights', 'itinerary', 'inclusions', 'exclusions', 'gallery',
      'faqs', 'quick_answer',
    ]));
    expect(PUBLISHED_TOUR_CATALOG_CONTRACT.records.departure).toEqual([
      'tour_id', 'depart_on', 'status', 'price_text_override',
    ]);

    const coveredTourFields = PUBLISHED_TOUR_CATALOG_CONTRACT.recordCoverage
      .filter((coverage) => coverage.record !== 'departures linked by tour_id')
      .flatMap((coverage) => coverage.fields);
    const coveredDepartureFields = PUBLISHED_TOUR_CATALOG_CONTRACT.recordCoverage
      .find((coverage) => coverage.record === 'departures linked by tour_id')?.fields ?? [];
    expect(new Set(coveredTourFields)).toEqual(new Set(PUBLISHED_TOUR_CATALOG_CONTRACT.records.tour));
    expect(new Set(coveredDepartureFields)).toEqual(new Set(PUBLISHED_TOUR_CATALOG_CONTRACT.records.departure));

    const routes = PUBLISHED_TOUR_CATALOG_CONTRACT.surfaces.flatMap((surface) => surface.routes);
    expect(routes).toContain('/tours/[destination]/[tier]/[tour]');
    expect(routes).toContain('/campaigns/[tour]');
    expect(routes).toContain('/china-tours-for-seniors');
    expect(routes).toContain('/travel-tools');
    expect(routes).toContain('/play/[slug]');
    expect(routes).toContain('/sitemap.xml');
    expect(routes).toContain('/api/revalidate');
  });
});
