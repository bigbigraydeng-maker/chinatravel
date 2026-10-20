/**
 * The logo in the page header (src/components/Navbar.tsx) and in the page footer
 * (src/components/Footer.tsx) is loaded on every page of the site. It used to be
 * public/logo.png, 3543 px wide and 193 KB, for a logo shown about 189 px wide
 * (48 px high), and the site's image loader returns a local file unchanged, so
 * every first-time visitor downloaded all 193 KB. It is now a 640 px wide copy
 * under public/images/brand/. Files directly under public/ are served with
 * `max-age=0` (revalidated on every page view); files under /images/ are cached
 * for a year, so a logo shown on every page must live under /images/. The
 * full-size /logo.png stays in public/ because the page metadata (Open Graph
 * image), the structured data, the print page and the emailed itinerary still
 * use it.
 *
 * Changing the logo means giving the new picture a NEW file name. The 640 in
 * cts-logo-640.webp is its width, not a version number: files under /images/ are
 * cached for a year and marked immutable, so overwriting the file in place would
 * leave returning visitors and Cloudflare showing the old logo for a year, and a
 * `?v=` query string would not help either (the checks below read the file from
 * disk by the exact address written in the component).
 */

import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const LOGO_LIMIT_BYTES = 60 * 1024;
const SHOWN_HEIGHT_PX = 48;

function sizeOf(path: string): number {
  return statSync(join(process.cwd(), 'public', path)).size;
}

function webpSize(path: string): { width: number; height: number } {
  const b = readFileSync(join(process.cwd(), 'public', path));
  const chunk = b.toString('ascii', 12, 16);

  if (chunk === 'VP8L') {
    // Lossless WebP: 14 bits of width then 14 bits of height, both minus one.
    const bits = b.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }

  if (chunk === 'VP8X') {
    // Extended WebP: 24-bit canvas width then 24-bit canvas height, both minus one.
    return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 };
  }

  throw new Error(`${path} is not a lossless or extended WebP`);
}

function logoTag(componentPath: string): { src: string; width: number; height: number } {
  const source = readFileSync(join(process.cwd(), componentPath), 'utf8');

  const tag = /<Image\b[^>]*\balt="CTS Tours"[^>]*>/.exec(source);
  if (tag === null) {
    throw new Error(`${componentPath} does not render the CTS Tours logo <Image> tag`);
  }

  const src = /src="([^"]+)"/.exec(tag[0]);
  const width = /width=\{(\d+)\}/.exec(tag[0]);
  const height = /height=\{(\d+)\}/.exec(tag[0]);

  if (src === null || width === null || height === null) {
    throw new Error(`${componentPath} logo <Image> tag is missing src, width or height`);
  }

  return { src: src[1], width: Number(width[1]), height: Number(height[1]) };
}

const COMPONENTS = [
  ['Navbar', 'src/components/Navbar.tsx'],
  ['Footer', 'src/components/Footer.tsx'],
] as const;

describe('the logo in the page header and footer is a light copy', () => {
  it.each(COMPONENTS)(
    '%s shows a small logo picture from /images/, never the full-size /logo.png',
    (_name, componentPath) => {
      const { src } = logoTag(componentPath);

      expect(src).not.toBe('/logo.png');
      expect(src.startsWith('/images/')).toBe(true);
      expect(sizeOf(src)).toBeLessThanOrEqual(LOGO_LIMIT_BYTES);
    },
  );

  it.each(COMPONENTS)('%s logo picture is sharp enough for a 3x phone', (_name, componentPath) => {
    const { src } = logoTag(componentPath);

    expect(webpSize(src).height).toBeGreaterThanOrEqual(3 * SHOWN_HEIGHT_PX);
  });

  it.each(COMPONENTS)(
    '%s gives the logo the real proportions of the picture, so the page does not jump when it loads',
    (_name, componentPath) => {
      const { src, width, height } = logoTag(componentPath);
      const actual = webpSize(src);

      expect(Math.abs(width / height - actual.width / actual.height) / (actual.width / actual.height)).toBeLessThan(0.01);
    },
  );

  it('the full-size /logo.png is still in public/ for the page metadata, structured data, print page and emails', () => {
    expect(existsSync(join(process.cwd(), 'public', 'logo.png'))).toBe(true);
  });

  it('the header and the footer use the same logo picture', () => {
    expect(logoTag('src/components/Navbar.tsx').src).toBe(logoTag('src/components/Footer.tsx').src);
  });
});
