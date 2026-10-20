/**
 * An ad landing page is what paid visitors open on a slow phone connection. On 2026-10-21 PageSpeed
 * showed the 193 KB header logo (shown only 157 px wide) and two 185 KB and 474 KB highlight pictures
 * among the heaviest things on the Shanghai page (mobile Largest Contentful Paint 11 s on slow 4G).
 * This test keeps the pictures of an ad landing page light: a config picture at most 170 KB (a card
 * shows a picture at most 352 CSS px wide, so 720 px is enough and the heaviest one is 162 KB), the
 * header logo at most 40 KB and never the full-size /logo.png.
 */

import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { AD_LANDING_CONFIGS } from '@/lib/ad-landing/configs';

const PICTURE_LIMIT_BYTES = 170 * 1024;
const LOGO_LIMIT_BYTES = 40 * 1024;

function sizeOf(path: string): number {
  return statSync(join(process.cwd(), 'public', path)).size;
}

function configPictures(): Array<{ pathKey: string; src: string }> {
  const pictures: Array<{ pathKey: string; src: string }> = [];

  for (const config of AD_LANDING_CONFIGS) {
    const heroSrc = config.hero.imageSrc;
    if (heroSrc !== undefined && heroSrc.startsWith('/')) {
      pictures.push({ pathKey: config.pathKey, src: heroSrc });
    }

    for (const block of config.blocks) {
      if (block.type !== 'featureCards') {
        continue;
      }
      for (const card of block.cards) {
        const image = card.image;
        if (image !== undefined && image.src.startsWith('/')) {
          pictures.push({ pathKey: config.pathKey, src: image.src });
        }
      }
    }
  }

  return pictures;
}

describe('ad landing pictures stay light', () => {
  it('there is at least one picture to check', () => {
    expect(configPictures().length).toBeGreaterThan(0);
  });

  it('every local picture of an ad landing config weighs at most 170 KB', () => {
    const offenders = configPictures()
      .map(({ pathKey, src }) => ({ pathKey, src, size: sizeOf(src) }))
      .filter(({ size }) => size > PICTURE_LIMIT_BYTES)
      .map(({ pathKey, src, size }) => `${pathKey}: ${src} (${Math.round(size / 1024)} KB)`);

    expect(offenders).toEqual([]);
  });

  it('the header logo is a small copy, never the full-size /logo.png', () => {
    const header = readFileSync(
      join(process.cwd(), 'src/components/ad-landing/AdHeader.tsx'),
      'utf8',
    );

    const match = /src="(\/[^"]+\.(?:png|webp|jpe?g))"/.exec(header);
    if (match === null) {
      throw new Error('AdHeader.tsx does not render a local logo picture (no src="/..." match)');
    }

    const logoPath = match[1];

    expect(logoPath).not.toBe('/logo.png');
    expect(sizeOf(logoPath)).toBeLessThanOrEqual(LOGO_LIMIT_BYTES);
  });
});
