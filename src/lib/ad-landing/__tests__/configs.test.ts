/**
 * Why this test exists: an ad landing page is built from a per-tour config, and the config is the one place where a
 * person writes sentences. This test makes sure the config cannot say anything the tour data does not say, cannot
 * carry a claim the business has ruled out, cannot name a place the tour does not visit, and cannot point at a
 * picture, map, FAQ or path that does not exist. It reads the real tour data but never depends on today's date or on
 * which departures are currently open.
 */
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { getTourBySlug } from '@/lib/data/tours';
import { AD_LANDING_CONFIGS, getAdLandingConfig } from '@/lib/ad-landing/configs';
import { findForbiddenCopy, selectFaqs, tourCorpus } from '@/lib/ad-landing/facts';
import { mapSize } from '@/lib/ad-landing/map-size';
import type { AdImage, AdLandingConfig, CopyItem } from '@/lib/ad-landing/types';

function copyItems(config: AdLandingConfig): CopyItem[] {
  const items: CopyItem[] = [...config.hero.subhead];
  for (const block of config.blocks) {
    if (block.type === 'cityLoop') {
      for (const stop of block.stops) items.push(...stop.highlights);
    } else if (block.type === 'featureCards') {
      for (const card of block.cards) items.push(...card.body);
    }
  }
  return items;
}

function images(config: AdLandingConfig): AdImage[] {
  const found: AdImage[] = [];
  for (const block of config.blocks) {
    if (block.type === 'featureCards') {
      for (const card of block.cards) {
        if (card.image) found.push(card.image);
      }
    }
  }
  return found;
}

function visibleTexts(config: AdLandingConfig): string[] {
  const texts: string[] = [config.hero.eyebrow, config.hero.headline, config.hero.imageAlt];
  if (config.hero.imageCaption) texts.push(config.hero.imageCaption);
  for (const item of copyItems(config)) texts.push(item.text);
  for (const block of config.blocks) {
    if ('title' in block) texts.push(block.title);
    if (block.type === 'routeMap') texts.push(block.caption);
    if (block.type === 'cityLoop') {
      for (const stop of block.stops) texts.push(stop.city);
    } else if (block.type === 'featureCards') {
      for (const card of block.cards) {
        texts.push(card.title);
        if (card.image) texts.push(card.image.alt);
      }
    }
  }
  return texts;
}

function normalise(value: string): string {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

// Sentence-opening verbs; add a verb here only when it is not a name.
const IGNORED_WORDS = new Set([
  'Take',
  'Dress',
  'Taste',
  'Browse',
  'Visit',
  'Explore',
  'Enjoy',
  'Walk',
  'Stroll',
  'Sail',
  'Cruise',
  'Join',
  'Meet',
  'Discover',
  'See',
  'Watch',
  'Feel',
]);

function capitalisedWords(text: string): string[] {
  return (text.match(/\b[A-Z][a-z']*/g) ?? []).filter((word) => !IGNORED_WORDS.has(word));
}

function mentions(corpus: string, word: string): boolean {
  const escaped = word.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`).test(corpus);
}

describe.each(AD_LANDING_CONFIGS.map((config) => [config.pathKey, config] as const))(
  'ad landing config %s',
  (_pathKey, config) => {
    const tour = getTourBySlug('china', config.tour.tier, config.tour.slug);

    it('points at a tour that exists, is active and is not sold out', () => {
      expect(tour).toBeDefined();
      expect(tour?.isActive).toBe(true);
      expect(tour?.soldOut).not.toBe(true);
    });

    it('uses a path no other page owns', () => {
      expect(config.pathKey).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      const folders = readdirSync(join(process.cwd(), 'src/app/campaigns'));
      expect(folders).not.toContain(config.pathKey);
    });

    it('every sentence is backed by a phrase that occurs in the tour data', () => {
      const corpus = normalise(tourCorpus(tour as NonNullable<typeof tour>));
      const unbacked = copyItems(config)
        .filter((item) => item.source.trim() === '' || !corpus.includes(normalise(item.source)))
        .map((item) => item.source);
      expect(unbacked).toEqual([]);
    });

    it('carries no claim the business has ruled out', () => {
      const offenders = visibleTexts(config)
        .map((text) => ({ text, reasons: findForbiddenCopy(text) }))
        .filter((entry) => entry.reasons.length > 0)
        .map((entry) => `${entry.text} -> ${entry.reasons.join('; ')}`);
      expect(offenders).toEqual([]);
    });

    it('types no figure into its sentences', () => {
      // Prices, dates, durations and counts are read from the tour data when the page renders, never typed into a config.
      const offenders = visibleTexts(config).filter((text) => /\d/.test(text));
      expect(offenders).toEqual([]);
    });

    it('names only places and things the tour data mentions', () => {
      const corpus = normalise(tourCorpus(tour as NonNullable<typeof tour>));
      const unknown: string[] = [];
      for (const item of copyItems(config)) {
        for (const word of capitalisedWords(item.text)) {
          if (!mentions(corpus, word)) unknown.push(word);
        }
      }
      expect(unknown).toEqual([]);
    });

    it('the FAQ block picks questions that exist', () => {
      for (const block of config.blocks) {
        if (block.type === 'faq') {
          expect(selectFaqs(tour?.faqs, block.pick).length).toBe(block.pick.length);
        }
      }
    });

    it('every picture is described and exists on disk', () => {
      for (const image of images(config)) {
        expect(image.src.startsWith('/')).toBe(true);
        expect(existsSync(join(process.cwd(), 'public', image.src))).toBe(true);
        expect(Number.isInteger(image.width) && image.width > 0).toBe(true);
        expect(Number.isInteger(image.height) && image.height > 0).toBe(true);
        expect(image.alt.trim()).not.toBe('');
      }
      if (config.hero.imageSrc) {
        expect(config.hero.imageSrc.startsWith('/')).toBe(true);
        expect(existsSync(join(process.cwd(), 'public', config.hero.imageSrc))).toBe(true);
      }
    });

    it('has the official route map when it shows one', () => {
      const hasRouteMap = config.blocks.some((block) => block.type === 'routeMap');
      if (hasRouteMap) {
        expect(mapSize(`${config.tour.slug}.svg`)).not.toBeNull();
        expect(mapSize(`${config.tour.slug}-mobile.svg`)).not.toBeNull();
      }
    });

    it('has exactly one price block and never repeats a block', () => {
      const types = config.blocks.map((block) => block.type);
      expect(types.filter((type) => type === 'priceDepartures').length).toBe(1);
      expect(new Set(types).size).toBe(types.length);
    });

    it('keeps the first block after the hero a story block, not the form', () => {
      const first = config.blocks[0];
      expect(first).toBeDefined();
      expect(['cityLoop', 'featureCards']).toContain(first.type);
    });
  },
);

describe('ad landing configs', () => {
  it('has at least one config and unique path keys', () => {
    expect(AD_LANDING_CONFIGS.length).toBeGreaterThan(0);
    const keys = AD_LANDING_CONFIGS.map((config) => config.pathKey);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('getAdLandingConfig finds a config by its path key and nothing else', () => {
    for (const config of AD_LANDING_CONFIGS) {
      expect(getAdLandingConfig(config.pathKey)).toBe(config);
    }
    expect(getAdLandingConfig('no-such-path')).toBeUndefined();
  });
});
