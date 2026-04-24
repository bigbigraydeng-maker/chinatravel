import type { BlogPost } from '@/lib/types/blog-post';
import type { StagingContent, StagingSocialVersions, StagingStatus } from '@/lib/types/staging';

export function slugifyStagingTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Character count for social previews (JS string length; adequate for UI hints in staging). */
export function charCountWeibo(text: string): number {
  return text.length;
}

export function charCountAscii(text: string): number {
  return text.length;
}

/** LinkedIn feed post soft limit for UI warning */
export const LINKEDIN_SOFT_MAX = 3000;
export const WEIBO_SOFT_MAX = 2000;
export const XHS_SOFT_MAX = 1000;

export function sortStagingItems(
  items: StagingContent[],
  sortKey: 'createdAt' | 'updatedAt',
  direction: 'asc' | 'desc'
): StagingContent[] {
  const mul = direction === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    const ta = new Date(a[sortKey]).getTime();
    const tb = new Date(b[sortKey]).getTime();
    return (ta - tb) * mul || a.title.localeCompare(b.title);
  });
}

export function filterStagingItems(
  items: StagingContent[],
  filters: {
    status: StagingStatus | 'all';
    type: StagingContent['type'] | 'all';
    category: StagingContent['metadata']['category'] | 'all';
    search: string;
  }
): StagingContent[] {
  const q = filters.search.trim().toLowerCase();
  return items.filter((item) => {
    if (filters.status !== 'all' && item.status !== filters.status) return false;
    if (filters.type !== 'all' && item.type !== filters.type) return false;
    if (filters.category !== 'all' && item.metadata.category !== filters.category) return false;
    if (q) {
      const hay = `${item.title} ${item.slug}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function stagingNowIso(): string {
  return new Date().toISOString();
}

export type GenBlogImportShape = {
  blog?: {
    title?: string;
    slug?: string;
    content?: string;
    metadata?: {
      description?: string;
      keywords?: string[];
      category?: StagingContent['metadata']['category'];
      readTime?: string;
    };
  };
  linkedin?: string;
  xiaohongshu?: string;
  weibo?: string;
};

export function stagingFromGenBlogJson(
  raw: string,
  submittedBy: string
): StagingContent | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== 'object') return null;
  const o = parsed as GenBlogImportShape & Record<string, unknown>;
  const blog = o.blog;
  if (!blog || typeof blog !== 'object') return null;
  const title = typeof blog.title === 'string' ? blog.title : '';
  const content = typeof blog.content === 'string' ? blog.content : '';
  if (!title || !content) return null;
  const slug =
    typeof blog.slug === 'string' && blog.slug.length > 0
      ? blog.slug
      : slugifyStagingTitle(title);
  const md = blog.metadata;
  const description =
    md && typeof md === 'object' && typeof md.description === 'string'
      ? md.description
      : '';
  const keywords =
    md &&
    typeof md === 'object' &&
    Array.isArray(md.keywords) &&
    md.keywords.every((k) => typeof k === 'string')
      ? md.keywords
      : [];
  const category =
    md &&
    typeof md === 'object' &&
    typeof md.category === 'string' &&
    ['travel-tips', 'experience', 'destination', 'culture'].includes(md.category)
      ? (md.category as StagingContent['metadata']['category'])
      : 'travel-tips';
  const social: StagingSocialVersions = {};
  if (typeof o.linkedin === 'string') social.linkedin = o.linkedin;
  if (typeof o.xiaohongshu === 'string') social.xiaohongshu = o.xiaohongshu;
  if (typeof o.weibo === 'string') social.weibo = o.weibo;
  const now = stagingNowIso();
  return {
    id: `import-${slug}-${Date.now()}`,
    type: 'blog',
    title,
    slug,
    content,
    metadata: { description, keywords, category },
    socialVersions: Object.keys(social).length ? social : undefined,
    status: 'draft',
    createdAt: now,
    updatedAt: now,
    submittedBy,
  };
}

export function blogPostToStaging(post: BlogPost, extras: Partial<StagingContent>): StagingContent {
  const now = stagingNowIso();
  return {
    id: post.id,
    type: 'blog',
    title: post.title,
    slug: post.slug,
    content: post.content,
    metadata: {
      description: post.excerpt,
      keywords: post.tags,
      category: post.category,
    },
    status: 'published',
    createdAt: extras.createdAt ?? now,
    updatedAt: extras.updatedAt ?? now,
    submittedBy: extras.submittedBy ?? 'CTS Editorial',
    approvedBy: extras.approvedBy ?? 'CTS Editorial',
    publishedAt: extras.publishedAt ?? post.publishedAt,
    socialVersions: extras.socialVersions,
  };
}
