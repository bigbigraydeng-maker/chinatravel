/**
 * Canonical Supabase Storage URLs for site-wide media (tour-images bucket).
 * Paths match scripts/upload-consolidated-images.cjs output.
 * Next.js custom loader rewrites these for width/quality (see image-loader.ts).
 */
const SB = 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images';

/** Full URL for a file inside the tour-images bucket */
export function tourImage(relativePath: string): string {
  const clean = relativePath.replace(/^\/+/, '');
  return `${SB}/${clean}`;
}

/** Migrated Unsplash originals (deduped by photo id) */
export const migratedUnsplash = (photoId: string, ext = 'jpg') =>
  tourImage(`migrated/unsplash/${photoId}.${ext}`);

/** Migrated from public/ (staff, credentials, page heroes) */
export const migratedSite = (filename: string) => tourImage(`migrated/site/${filename}`);
