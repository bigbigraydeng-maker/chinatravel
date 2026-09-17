import { existsSync } from 'fs';
import path from 'path';
import { getBlogPostBySlug } from '@/lib/data/blogs';
import { getGuideBySlug } from '@/lib/data/guides';
import { phase1LandmarkGuides } from '@/lib/data/guides-landmarks-phase1';
import { withCtsTitleSuffix } from '@/lib/seo-metadata';

function editorialWordCount(guide: (typeof phase1LandmarkGuides)[number]) {
  return [
    ...guide.introText,
    ...guide.sections.flatMap((section) => section.content),
    ...guide.attractions.map((attraction) => attraction.description),
    ...Object.values(guide.practicalInfo),
    ...guide.faqs.map((faq) => faq.answer),
  ].join(' ').split(/\s+/).filter(Boolean).length;
}

test('phase-one landmark guides meet the editorial SEO baseline', () => {
  expect(phase1LandmarkGuides).toHaveLength(6);

  for (const guide of phase1LandmarkGuides) {
    expect(withCtsTitleSuffix(guide.metaTitle).length).toBeLessThanOrEqual(60);
    expect(guide.metaDescription.length).toBeGreaterThanOrEqual(120);
    expect(guide.metaDescription.length).toBeLessThanOrEqual(160);
    expect(editorialWordCount(guide)).toBeGreaterThanOrEqual(500);
    expect(guide.sections.length).toBeGreaterThanOrEqual(3);
    expect(guide.faqs.length).toBeGreaterThanOrEqual(4);
    expect(guide.quickAnswer?.length).toBeGreaterThanOrEqual(160);
    expect(guide.visitPlanning?.recommendedVisitLength).toBeTruthy();
    expect(guide.visitPlanning?.bestFor).toBeTruthy();
    expect(guide.visitPlanning?.combineWith).toBeTruthy();
    expect(guide.relatedBlogSlugs?.length).toBeGreaterThanOrEqual(3);
    expect(guide.sources?.length).toBeGreaterThanOrEqual(1);
    expect(guide.sources?.every((source) => source.href.startsWith('https://'))).toBe(true);
  }
});

test('Big Wild Goose Pagoda is a substantive destination guide, not a thin landing page', () => {
  const guide = phase1LandmarkGuides.find((item) => item.slug === 'big-wild-goose-pagoda-travel-guide');

  expect(guide).toBeDefined();
  expect(editorialWordCount(guide!)).toBeGreaterThanOrEqual(1200);
  expect(guide!.sections.length).toBeGreaterThanOrEqual(6);
  expect(guide!.faqs.length).toBeGreaterThanOrEqual(6);
  expect(guide!.sources?.length).toBeGreaterThanOrEqual(3);
});

test('guide images are unique, local and present', () => {
  const sources = phase1LandmarkGuides.flatMap((guide) => [
    guide.heroImage,
    ...guide.galleryImages.map((image) => typeof image === 'string' ? image : image.src),
  ]);

  expect(new Set(sources).size).toBe(sources.length);
  for (const src of sources) {
    expect(src.startsWith('/')).toBe(true);
    expect(existsSync(path.join(process.cwd(), 'public', src))).toBe(true);
  }

  for (const guide of phase1LandmarkGuides) {
    for (const image of guide.galleryImages) {
      if (typeof image === 'string') continue;
      expect(image.alt?.length).toBeGreaterThanOrEqual(25);
      expect(image.caption?.length).toBeGreaterThanOrEqual(30);
    }
  }
});

test('related article and guide references resolve', () => {
  for (const guide of phase1LandmarkGuides) {
    for (const slug of guide.relatedBlogSlugs ?? []) expect(getBlogPostBySlug(slug)).toBeDefined();
    for (const slug of guide.relatedGuideSlugs) expect(getGuideBySlug(slug)).toBeDefined();
  }
});
