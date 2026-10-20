import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { AD_LANDING_PATH_KEYS, shouldHideSiteChrome } from '@/lib/site-chrome';
import { AD_LANDING_CONFIGS } from '@/lib/ad-landing/configs';

/**
 * The site's own header, footer, top banner and sign-up pop-up are hidden on the back office and, from now on, on the
 * ad landing pages (/campaigns/{pathKey}). The change must affect ONLY the ad landing pages: every page that had the
 * site chrome before must still have it, and the back-office rule must behave exactly as before
 * (startsWith('/admin') or startsWith('/dev/')).
 */
describe('shouldHideSiteChrome', () => {
  it.each(['/admin', '/admin/orders', '/administrator', '/dev/preview'])(
    'keeps hiding the back office exactly as before: %s',
    (path) => {
      expect(shouldHideSiteChrome(path)).toBe(true);
    },
  );

  it('keeps hiding the back office exactly as before: /dev (no trailing slash)', () => {
    expect(shouldHideSiteChrome('/dev')).toBe(false);
  });

  it('hides every ad landing page, with or without a trailing slash', () => {
    for (const config of AD_LANDING_CONFIGS) {
      expect(shouldHideSiteChrome(`/campaigns/${config.pathKey}`)).toBe(true);
      expect(shouldHideSiteChrome(`/campaigns/${config.pathKey}/`)).toBe(true);
    }
  });

  it.each([
    '/',
    '/tours',
    '/tours/china/discovery',
    '/tours/china/discovery/shanghai-surroundings',
    '/tours/china/signature/landscapes',
    '/campaigns/best-of-china',
    '/campaigns/chongqing',
    '/campaigns/fire-fuzz',
    '/campaigns/october-2026/shanghai-surroundings',
    '/campaigns/spotlight',
    '/china-tours-from-new-zealand',
    '/thank-you',
    '/blog',
    '/contact',
  ])('keeps the site chrome on every other page: %s', (path) => {
    expect(shouldHideSiteChrome(path)).toBe(false);
  });

  it('is exact: lookalike paths keep the site chrome', () => {
    const key = AD_LANDING_CONFIGS[0].pathKey;
    expect(shouldHideSiteChrome(`/campaigns/${key}/extra`)).toBe(false);
    expect(shouldHideSiteChrome(`/campaigns/${key}-2`)).toBe(false);
    expect(shouldHideSiteChrome(`/campaigns/x${key}`)).toBe(false);
    expect(shouldHideSiteChrome('/campaigns')).toBe(false);
    expect(shouldHideSiteChrome('/campaigns/')).toBe(false);
  });

  it('treats a missing path as a normal page', () => {
    expect(shouldHideSiteChrome(null)).toBe(false);
    expect(shouldHideSiteChrome(undefined)).toBe(false);
    expect(shouldHideSiteChrome('')).toBe(false);
  });

  it('lists exactly the path keys of the page configs', () => {
    expect([...AD_LANDING_PATH_KEYS].sort()).toEqual(AD_LANDING_CONFIGS.map((config) => config.pathKey).sort());
  });

  it('does not import anything, so it adds nothing to the script bundle of every page', () => {
    const source = readFileSync(join(process.cwd(), 'src/lib/site-chrome.ts'), 'utf8');
    expect(source).not.toMatch(/^\s*import\s/m);
  });
});
