/** @jest-environment node */
/**
 * WHY — found in the 2026-11-27 Search Console and GA4 check: structured data typed into post
 * bodies was mangled into invalid JSON, live pages linked to addresses that answer 404, and an old
 * Yunnan address redirected to a page that was switched off.
 */
import { join } from 'node:path';
import { renderBlogPostHtml } from '@/lib/blog-html';
import { getAllBlogPosts } from '@/lib/data/blogs';

type Redirect = { source: string; destination: string };
const nextConfig = require(join(process.cwd(), 'next.config.js')) as { redirects: () => Promise<Redirect[]> };

const DEAD_LINKS = [
  '/tours/china/discovery/yunnan-explorer',
  '/tours/china/discovery/zhangjiajie',
  '/guide/guilin-travel-guide',
];

describe('blog post bodies', () => {
  it('render their structured data blocks as JSON that still parses', () => {
    let checked = 0;
    for (const post of getAllBlogPosts()) {
      const html = renderBlogPostHtml(post.content);
      for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        checked += 1;
        expect(() => JSON.parse(match[1])).not.toThrow();
      }
    }
    expect(checked).toBeGreaterThan(0);
  });

  it('do not link to the addresses that answered 404', () => {
    const offenders = getAllBlogPosts()
      .filter((p) => DEAD_LINKS.some((link) => p.content.includes(`](${link})`)))
      .map((p) => p.slug);
    expect(offenders).toEqual([]);
  });
});

describe('old addresses', () => {
  it('sends the old Yunnan address to the Yunnan hub, not to a switched-off tour', async () => {
    const rules = (await nextConfig.redirects()).filter((r) => r.source.startsWith('/tour/yunnan-delights'));
    expect(rules.map((r) => r.destination)).toEqual(['/yunnan-tours', '/yunnan-tours']);
  });
});
