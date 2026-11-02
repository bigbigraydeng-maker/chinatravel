/**
 * One-off: download the Unsplash photos referenced in tours.ts for
 * 'imperial-heritage' (Legacy of China) and 'silk-road' galleries, and
 * upload them to Supabase tour-images/migrated/unsplash/, same convention
 * as scripts/upload-consolidated-images.cjs.
 *
 * Run this once before/after merging the PR that adds the migratedUnsplash(...)
 * gallery entries, or the <img> tags will 404 until these objects exist.
 *
 * node scripts/upload-legacy-silkroad-gallery-photos.cjs
 * Env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)
 */
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const BUCKET = 'tour-images';

function unsplashFetchUrl(slug) {
  return `https://images.unsplash.com/${slug}?auto=format&fit=max&w=2000&q=90`;
}

const UNSPLASH_PHOTOS = [
  'photo-1491552222800-c124480c9b02', // Yangtze / Three Gorges mist — Legacy of China
  'photo-1729862564079-9bf368402110', // Chengdu giant panda — Legacy of China
  'photo-1746243044880-4b71e10be164', // Forbidden City aerial — Legacy of China
  'photo-1782913403748-9cb44b6a5159', // Terracotta Warriors — Legacy of China + Silk Road
  'photo-1507025793886-e20cd4685fae', // Dunhuang desert — Silk Road
  'photo-1438919848714-206d008562bb', // Great Wall — Silk Road
];

async function main() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or Supabase key.');
    process.exit(1);
  }
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  let ok = 0;
  let fail = 0;

  for (const slug of UNSPLASH_PHOTOS) {
    const remote = `migrated/unsplash/${slug}.jpg`;
    const url = unsplashFetchUrl(slug);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`FAIL fetch ${slug}: ${res.status}`);
        fail++;
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      const { error } = await supabase.storage.from(BUCKET).upload(remote, buf, {
        contentType: 'image/jpeg',
        upsert: true,
        cacheControl: '31536000',
      });
      if (error) {
        console.error(`FAIL upload ${remote}:`, error.message);
        fail++;
      } else {
        console.log(`OK ${remote} (${Math.round(buf.length / 1024)} KB)`);
        ok++;
      }
    } catch (e) {
      console.error(`FAIL ${slug}:`, e);
      fail++;
    }
  }
  console.log(`\nDone. success=${ok} failed/skipped=${fail}`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
