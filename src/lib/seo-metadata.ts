import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site';

/**
 * CTS 全站 SEO 元数据约定（与 layout 的 metadataBase 一致，优先用 NEXT_PUBLIC_SITE_URL）：
 * - title：目标约 50–60 字符，通常以「具体标题 | CTS Tours」结尾（由 {@link withCtsTitleSuffix} 补全）
 * - description：每页唯一，目标约 140–160 字符（由内容侧控制长度）
 * - openGraph：绝对 url、1200×630 图、type 默认 article（列表/首页可用 website）
 * - alternates.canonical：与 OG url 同源同路径
 * - robots：默认 index + follow
 */

export type BuildCtsPageMetadataInput = {
  title: string;
  description: string;
  /** 站点内路径，须以 / 开头，例如 /china-tours */
  path: string;
  /** 绝对 URL，或以 / 开头的站内图片路径 */
  ogImagePath: string;
  ogImageAlt?: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphSiteName?: string;
  robots?: Metadata['robots'];
};

/** 若标题中尚未包含 “CTS Tours”，则追加 “ | CTS Tours”。 */
export function withCtsTitleSuffix(title: string): string {
  const t = title.trim();
  if (/\bCTS\s*Tours\b/i.test(t)) return t;
  return `${t} | CTS Tours`;
}

export function absoluteUrlFromPath(pathOrUrl: string): string {
  const site = getSiteUrl();
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const p = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${site}${p}`;
}

export function buildCtsPageMetadata(input: BuildCtsPageMetadataInput): Metadata {
  const site = getSiteUrl();
  const path = input.path.startsWith('/') ? input.path : `/${input.path}`;
  const pageUrl = `${site}${path}`;

  const imageUrl = absoluteUrlFromPath(input.ogImagePath);

  const title = withCtsTitleSuffix(input.title);
  const ogTitle = input.openGraphTitle
    ? withCtsTitleSuffix(input.openGraphTitle)
    : title;
  const description = input.description;
  const ogDesc = input.openGraphDescription ?? description;

  return {
    title,
    description,
    ...(input.keywords?.length ? { keywords: input.keywords } : {}),
    openGraph: {
      type: input.ogType ?? 'article',
      url: pageUrl,
      title: ogTitle,
      description: ogDesc,
      siteName: input.openGraphSiteName ?? 'CTS Tours — China Travel Specialists',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: input.ogImageAlt ?? ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDesc,
      images: [imageUrl],
    },
    alternates: { canonical: pageUrl },
    robots: input.robots ?? { index: true, follow: true },
  };
}
