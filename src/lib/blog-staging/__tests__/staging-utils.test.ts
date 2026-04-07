import type { BlogPost } from '@/lib/types/blog-post';
import type { StagingContent } from '@/lib/types/staging';
import {
  LINKEDIN_SOFT_MAX,
  WEIBO_SOFT_MAX,
  XHS_SOFT_MAX,
  blogPostToStaging,
  charCountAscii,
  charCountWeibo,
  filterStagingItems,
  slugifyStagingTitle,
  sortStagingItems,
  stagingFromGenBlogJson,
} from '../staging-utils';

const sample = (overrides: Partial<StagingContent> = {}): StagingContent => ({
  id: '1',
  type: 'blog',
  title: 'Hello World',
  slug: 'hello-world',
  content: '# Hi',
  metadata: { description: 'd', keywords: ['k'], category: 'travel-tips' },
  status: 'draft',
  createdAt: '2026-04-01T00:00:00.000Z',
  updatedAt: '2026-04-02T00:00:00.000Z',
  submittedBy: 'Test',
  ...overrides,
});

describe('staging-utils', () => {
  describe('slugifyStagingTitle', () => {
    it('lowercases and hyphenates', () => {
      expect(slugifyStagingTitle('Hello & China Guide')).toBe('hello-china-guide');
    });
    it('trims', () => {
      expect(slugifyStagingTitle('  abc  ')).toBe('abc');
    });
  });

  describe('char counts', () => {
    it('ascii length', () => {
      expect(charCountAscii('abc')).toBe(3);
    });
    it('weibo counts graphemes', () => {
      expect(charCountWeibo('你好')).toBe(2);
    });
    it('exports soft limits', () => {
      expect(LINKEDIN_SOFT_MAX).toBeGreaterThan(1000);
      expect(WEIBO_SOFT_MAX).toBe(2000);
      expect(XHS_SOFT_MAX).toBe(1000);
    });
  });

  describe('sortStagingItems', () => {
    it('sorts by createdAt asc', () => {
      const a = sample({ id: 'a', createdAt: '2026-04-02T00:00:00.000Z' });
      const b = sample({ id: 'b', createdAt: '2026-04-01T00:00:00.000Z' });
      const out = sortStagingItems([a, b], 'createdAt', 'asc');
      expect(out.map((x) => x.id)).toEqual(['b', 'a']);
    });
    it('sorts updatedAt desc', () => {
      const a = sample({ id: 'a', updatedAt: '2026-04-01T00:00:00.000Z' });
      const b = sample({ id: 'b', updatedAt: '2026-04-03T00:00:00.000Z' });
      const out = sortStagingItems([a, b], 'updatedAt', 'desc');
      expect(out[0].id).toBe('b');
    });
  });

  describe('filterStagingItems', () => {
    const rows = [
      sample({ id: '1', status: 'draft', type: 'blog', metadata: { ...sample().metadata, category: 'travel-tips' }, title: 'Alpha' }),
      sample({
        id: '2',
        status: 'published',
        type: 'blog',
        metadata: { ...sample().metadata, category: 'culture' },
        title: 'Beta Trip',
        slug: 'beta-trip',
      }),
    ];

    it('filters by status', () => {
      const out = filterStagingItems(rows, {
        status: 'draft',
        type: 'all',
        category: 'all',
        search: '',
      });
      expect(out).toHaveLength(1);
      expect(out[0].id).toBe('1');
    });

    it('filters by category', () => {
      const out = filterStagingItems(rows, {
        status: 'all',
        type: 'all',
        category: 'culture',
        search: '',
      });
      expect(out).toHaveLength(1);
    });

    it('search title', () => {
      const out = filterStagingItems(rows, {
        status: 'all',
        type: 'all',
        category: 'all',
        search: 'beta',
      });
      expect(out).toHaveLength(1);
    });

    it('search slug', () => {
      const out = filterStagingItems(rows, {
        status: 'all',
        type: 'all',
        category: 'all',
        search: 'beta-trip',
      });
      expect(out).toHaveLength(1);
    });
  });

  describe('stagingFromGenBlogJson', () => {
    const valid = JSON.stringify({
      blog: {
        title: 'Visa Tips',
        slug: 'visa-tips',
        content: '# Hello\n\nBody',
        metadata: {
          description: 'desc',
          keywords: ['a', 'b'],
          category: 'travel-tips',
        },
      },
      linkedin: 'L',
      xiaohongshu: 'X',
      weibo: 'W',
    });

    it('parses valid package', () => {
      const row = stagingFromGenBlogJson(valid, 'Claude');
      expect(row).not.toBeNull();
      expect(row?.title).toBe('Visa Tips');
      expect(row?.slug).toBe('visa-tips');
      expect(row?.socialVersions?.linkedin).toBe('L');
    });

    it('generates slug when missing', () => {
      const raw = JSON.stringify({
        blog: { title: 'No Slug Here !!', content: 'x' },
      });
      const row = stagingFromGenBlogJson(raw, 'C');
      expect(row?.slug).toBe('no-slug-here');
    });

    it('returns null on invalid json', () => {
      expect(stagingFromGenBlogJson('not-json', 'C')).toBeNull();
    });

    it('returns null without blog object', () => {
      expect(stagingFromGenBlogJson('{}', 'C')).toBeNull();
    });

    it('returns null without title', () => {
      expect(stagingFromGenBlogJson(JSON.stringify({ blog: { content: 'x' } }), 'C')).toBeNull();
    });
  });

  describe('blogPostToStaging', () => {
    it('maps blog fields', () => {
      const post: BlogPost = {
        id: 'p1',
        slug: 's',
        title: 'T',
        excerpt: 'E',
        content: 'C',
        author: 'A',
        authorRole: 'R',
        category: 'travel-tips',
        tags: ['t'],
        heroImage: 'h',
        publishedAt: '2026-04-08',
        readTime: '5 min',
      };
      const s = blogPostToStaging(post, { submittedBy: 'Bot' });
      expect(s.metadata.description).toBe('E');
      expect(s.metadata.keywords).toEqual(['t']);
      expect(s.submittedBy).toBe('Bot');
    });
  });
});
