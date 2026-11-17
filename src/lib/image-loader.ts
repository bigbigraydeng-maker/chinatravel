const SUPABASE_HOST = 'qbturrydultenhlfmdcm.supabase.co';

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Custom Next.js image loader.
 *
 * - Supabase Storage URLs → Supabase Image Transformation API
 *   (resizes server-side, CDN-cached via Cloudflare, correct MIME type)
 * - Unsplash URLs → native Unsplash transform params
 * - Local paths → served directly from public/
 */
export default function imageLoader({ src, width, quality }: ImageLoaderParams): string {
  const q = quality || 75;

  if (src.includes(SUPABASE_HOST) && src.includes('/storage/v1/')) {
    const transformed = src.replace(
      '/storage/v1/object/public/',
      '/storage/v1/render/image/public/'
    );
    // resize=contain keeps the whole photo. Supabase's default (cover) keeps the ORIGINAL height when only a width
    // is given, so a 640-wide request of a 2121x1414 photo came back as a 640x1414 sliver from the middle — every
    // card then showed a blown-up, blurry crop.
    return `${transformed}?width=${width}&quality=${q}&resize=contain`;
  }

  if (src.includes('images.unsplash.com')) {
    try {
      const url = new URL(src);
      url.searchParams.set('w', String(width));
      url.searchParams.set('q', String(q));
      url.searchParams.set('auto', 'format');
      return url.toString();
    } catch {
      return `${src}&w=${width}&q=${q}&auto=format`;
    }
  }

  if (src.startsWith('/')) {
    return src;
  }

  return src;
}
