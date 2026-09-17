import { existsSync } from 'fs';
import path from 'path';
import { getAllBlogPosts } from '@/lib/data/blogs';
import { getBlogInlineImages } from '@/lib/data/blog-inline-images';

test('curated article images exist and are not reused as article hero images', () => {
  const posts = getAllBlogPosts();
  const heroImages = new Set(posts.map((post) => post.heroImage));
  const inlineSources = posts.flatMap((post) => getBlogInlineImages(post.slug).map((image) => image.src));

  expect(inlineSources.length).toBeGreaterThanOrEqual(12);
  expect(new Set(inlineSources).size).toBe(inlineSources.length);

  for (const src of inlineSources) {
    expect(src.startsWith('/')).toBe(true);
    expect(heroImages.has(src)).toBe(false);
    expect(existsSync(path.join(process.cwd(), 'public', src))).toBe(true);
  }
});

test('every curated article image has descriptive alternative text and a caption', () => {
  for (const post of getAllBlogPosts()) {
    for (const image of getBlogInlineImages(post.slug)) {
      expect(image.alt.length).toBeGreaterThan(20);
      expect(image.caption.length).toBeGreaterThan(30);
    }
  }
});
