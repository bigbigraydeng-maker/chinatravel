import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site';

/**
 * Site-wide CTS SEO metadata conventions (align with layout metadataBase; prefer NEXT_PUBLIC_SITE_URL):
 * - title: aim for ~50–60 characters; usually ends with a specific title plus " | CTS Tours" via {@link withCtsTitleSuffix}
 * - description: unique per page, ~140–160 characters (length enforced by page content)
 * - openGraph: absolute URLs, 1200×630 image, type defaults to article (use website for listings/home)
 * - alternates.canonical: same origin and path as the OG url
 * - robots: default index + follow
 */

export type BuildCtsPageMetadataInput = {
  title: string;
  description: string;
  /** In-site path, must start with /, e.g. /china-tours */
  path: string;
  /** Absolute URL or in-site image path starting with / */
  ogImagePath: string;
  ogImageAlt?: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphSiteName?: string;
  robots?: Metadata['robots'];
};

/** Append " | CTS Tours" when the title does not already include "CTS Tours". */
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
