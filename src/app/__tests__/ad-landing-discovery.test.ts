// An ad landing page is for paid traffic only. It must not be listed in the sitemap, and it must not be blocked in
// robots.txt: a search engine can only obey the page's noindex if it is allowed to fetch the page in the first place.
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { AD_LANDING_CONFIGS } from '@/lib/ad-landing/configs';

describe('ad landing pages and search engines', () => {
  it('are not in the sitemap', async () => {
    const urls = (await sitemap()).map((entry) => entry.url);
    expect(urls.length).toBeGreaterThan(50);
    for (const config of AD_LANDING_CONFIGS) {
      const path = `/campaigns/${config.pathKey}`;
      expect(urls.some((url) => url.includes(path))).toBe(false);
    }
  });

  it('are not blocked in robots.txt, so a search engine can read their noindex', () => {
    const rules = robots().rules;
    const ruleList = Array.isArray(rules) ? rules : [rules];

    for (const rule of ruleList) {
      const disallow = rule.disallow;
      const entries: string[] =
        disallow === undefined ? [] : Array.isArray(disallow) ? disallow : [disallow];

      for (const config of AD_LANDING_CONFIGS) {
        const path = `/campaigns/${config.pathKey}`;
        for (const entry of entries) {
          // An empty entry means "nothing blocked", which is fine.
          if (entry === '') continue;
          expect(path.startsWith(entry)).toBe(false);
        }
      }
    }
  });
});
