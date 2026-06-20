import { NextRequest, NextResponse } from 'next/server';
import { getSeoPageMeta } from '@/lib/data/seo-pages';
import { getTourBySlug } from '@/lib/data/tours';
import { getGuideBySlug } from '@/lib/data/guides';
import { blogPosts } from '@/lib/data/blogs';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'x-api-key, Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function extractMarkdownHeadings(content: string): Array<{ level: number; text: string }> {
  return content
    .split('\n')
    .flatMap((line) => {
      const h2 = line.match(/^##\s+(.+)/);
      const h3 = line.match(/^###\s+(.+)/);
      if (h2) return [{ level: 2, text: h2[1].trim() }];
      if (h3) return [{ level: 3, text: h3[1].trim() }];
      return [];
    });
}

function detectWeaknesses(opts: {
  wordCount: number;
  description: string;
  content: string;
  faqCount: number;
  subheadingCount: number;
}): string[] {
  const issues: string[] = [];
  if (opts.wordCount < 600)
    issues.push(`字数不足 (当前 ${opts.wordCount} 字，建议 ≥ 600)`);
  if (opts.description.length < 140)
    issues.push(`meta description 过短 (${opts.description.length} 字符，建议 140–160)`);
  if (!/new zealand|nzd|kiwi|auckland/i.test(opts.content))
    issues.push('缺少 GEO 本地化信号（New Zealand / NZD / Kiwi / Auckland 等）');
  if (opts.faqCount < 3)
    issues.push(`FAQ 数量不足 (${opts.faqCount} 条，建议 ≥ 5)`);
  if (opts.subheadingCount < 2)
    issues.push(`H2/H3 子标题不足 (${opts.subheadingCount} 个，建议 ≥ 3)`);
  return issues;
}

function isAuthorized(request: NextRequest): boolean {
  const apiKey = process.env.SITE_ANALYZER_API_KEY;
  if (!apiKey) return true; // not configured → open
  const fromQuery = request.nextUrl.searchParams.get('key');
  const fromHeader = request.headers.get('x-api-key');
  return fromQuery === apiKey || fromHeader === apiKey;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: CORS_HEADERS });
  }

  const rawPath = request.nextUrl.searchParams.get('path') ?? '';
  const cleanPath = rawPath.replace(/^\//, '');
  const segments = cleanPath.split('/').filter(Boolean);

  // ── 1. SEO hub pages (/china-tours, /beijing-tours, etc.) ──────────────────
  const seoPage = getSeoPageMeta(cleanPath);
  if (seoPage) {
    const faqBlock = seoPage.faqs
      .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
      .join('\n\n');
    const content = [seoPage.h1, seoPage.heroSubtitle, seoPage.introText, faqBlock].join('\n\n');
    const wordCount = countWords(content);
    return NextResponse.json(
      {
        url: `https://www.ctstours.co.nz/${cleanPath}`,
        path: `/${cleanPath}`,
        type: 'seo-page',
        title: seoPage.title,
        h1: seoPage.h1,
        description: seoPage.description,
        content,
        wordCount,
        headings: [
          { level: 1, text: seoPage.h1 },
          { level: 2, text: seoPage.heroSubtitle },
        ],
        faqs: seoPage.faqs,
        weaknesses: detectWeaknesses({
          wordCount,
          description: seoPage.description,
          content,
          faqCount: seoPage.faqs.length,
          subheadingCount: 1,
        }),
      },
      { headers: CORS_HEADERS }
    );
  }

  // ── 2. Destination guides (/guide/[slug]) ──────────────────────────────────
  if (segments[0] === 'guide' && segments[1]) {
    const guide = getGuideBySlug(segments[1]);
    if (guide) {
      const sectionsText = guide.sections
        .map((s) => `## ${s.title}\n${s.content.join('\n')}`)
        .join('\n\n');
      const attractionsText = guide.attractions
        .map((a) => `### ${a.name}\n${a.description}`)
        .join('\n\n');
      const faqBlock = guide.faqs
        .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
        .join('\n\n');
      const content = [
        guide.h1,
        guide.heroSubtitle,
        guide.introText.join('\n'),
        sectionsText,
        attractionsText,
        faqBlock,
      ].join('\n\n');
      const wordCount = countWords(content);
      const subheadings = [
        ...guide.sections.map((s) => ({ level: 2, text: s.title })),
        ...guide.attractions.map((a) => ({ level: 3, text: a.name })),
      ];
      return NextResponse.json(
        {
          url: `https://www.ctstours.co.nz/guide/${guide.slug}`,
          path: `/guide/${guide.slug}`,
          type: 'guide',
          title: guide.metaTitle,
          h1: guide.h1,
          description: guide.metaDescription,
          content,
          wordCount,
          headings: [{ level: 1, text: guide.h1 }, ...subheadings],
          faqs: guide.faqs,
          weaknesses: detectWeaknesses({
            wordCount,
            description: guide.metaDescription,
            content,
            faqCount: guide.faqs.length,
            subheadingCount: subheadings.length,
          }),
        },
        { headers: CORS_HEADERS }
      );
    }
  }

  // ── 3. Tour detail pages (/tours/[dest]/[tier]/[slug]) ─────────────────────
  if (segments[0] === 'tours' && segments.length >= 4) {
    const destination = segments[1];
    const tier = segments[2];
    const slug = segments[3];
    const tour = getTourBySlug(destination, tier, slug);
    if (tour) {
      const itineraryText = tour.itinerary
        .map((d) => `Day ${d.day}: ${d.title}\n${d.description}`)
        .join('\n\n');
      const highlightsText = `## Tour Highlights\n${tour.highlights.join('\n')}`;
      const inclusionsText = `## Inclusions\n${tour.inclusions.join('\n')}\n\n## Exclusions\n${tour.exclusions.join('\n')}`;
      const faqBlock = (tour.faqs ?? [])
        .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
        .join('\n\n');
      const content = [
        tour.title,
        tour.shortDescription,
        highlightsText,
        `## Day-by-Day Itinerary\n${itineraryText}`,
        inclusionsText,
        faqBlock,
      ].join('\n\n');
      const wordCount = countWords(content);
      const itineraryHeadings = tour.itinerary.map((d) => ({
        level: 3,
        text: `Day ${d.day}: ${d.title}`,
      }));
      return NextResponse.json(
        {
          url: `https://www.ctstours.co.nz/tours/${destination}/${tier}/${slug}`,
          path: `/tours/${destination}/${tier}/${slug}`,
          type: 'tour',
          title: tour.metaTitle,
          h1: tour.title,
          description: tour.metaDescription,
          price: tour.price,
          duration: tour.duration,
          content,
          wordCount,
          headings: [
            { level: 1, text: tour.title },
            { level: 2, text: 'Tour Highlights' },
            { level: 2, text: 'Day-by-Day Itinerary' },
            ...itineraryHeadings,
            { level: 2, text: 'Inclusions & Exclusions' },
          ],
          faqs: tour.faqs ?? [],
          weaknesses: detectWeaknesses({
            wordCount,
            description: tour.metaDescription,
            content,
            faqCount: (tour.faqs ?? []).length,
            subheadingCount: 2 + itineraryHeadings.length,
          }),
        },
        { headers: CORS_HEADERS }
      );
    }
  }

  // ── 4. Blog posts (/blog/[slug]) ───────────────────────────────────────────
  if (segments[0] === 'blog' && segments[1]) {
    const post = blogPosts.find((b) => b.slug === segments[1]);
    if (post) {
      const faqBlock = (post.faqs ?? [])
        .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
        .join('\n\n');
      const content = [post.title, post.excerpt, post.content, faqBlock].join('\n\n');
      const wordCount = countWords(content);
      const subheadings = extractMarkdownHeadings(post.content);
      return NextResponse.json(
        {
          url: `https://www.ctstours.co.nz/blog/${post.slug}`,
          path: `/blog/${post.slug}`,
          type: 'blog',
          title: post.title,
          h1: post.title,
          description: post.excerpt,
          content,
          wordCount,
          headings: [{ level: 1, text: post.title }, ...subheadings],
          faqs: post.faqs ?? [],
          weaknesses: detectWeaknesses({
            wordCount,
            description: post.excerpt,
            content,
            faqCount: (post.faqs ?? []).length,
            subheadingCount: subheadings.length,
          }),
        },
        { headers: CORS_HEADERS }
      );
    }
  }

  return NextResponse.json(
    { error: 'Page not found', path: rawPath },
    { status: 404, headers: CORS_HEADERS }
  );
}
