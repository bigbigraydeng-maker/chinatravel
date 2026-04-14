/**
 * Download Unsplash + copy public/ → Supabase tour-images.
 * node scripts/upload-consolidated-images.cjs
 *
 * Env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)
 */
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const BUCKET = 'tour-images';
const ROOT = process.cwd();

function unsplashFetchUrl(slug) {
  return `https://images.unsplash.com/${slug}?auto=format&fit=max&w=2000&q=90`;
}

/** Unsplash photo-* slugs verified fetchable at images.unsplash.com (see local-foods / blogs / tours / pages). */
const UNSPLASH_PHOTOS = [
  'photo-1464817739973-0128fe77aaa1',
  'photo-1469474968028-56623f02e42e',
  'photo-1473163928189-364b2c4e1135',
  'photo-1493976040374-85c8e12f0c0e',
  'photo-1506905925346-21bda4d32df4',
  'photo-1508804185872-d7badad00f7d',
  'photo-1512941937669-90a1b58e7e9c',
  'photo-1513415756790-2ac1db1297d0',
  'photo-1528127269322-539801943592',
  'photo-1528360983277-13d401cdc186',
  'photo-1544025162-d76694265947',
  'photo-1545569341-9eb8b30979d9',
  'photo-1553531384-cc64ac80f931',
  'photo-1556679343-c7306c1976bc',
  'photo-1557750255-c76072a7aad1',
  'photo-1559827260-dc66d52bef19',
  'photo-1564349683136-77e08dba1ef7',
  'photo-1569949381669-ecf31ae8e613',
  'photo-1583417319070-4a69db38a482',
  'photo-1607623814075-e51df1bdc82f',
];

const LOCAL_FILES = [
  { local: 'images/baker-gu-portrait.jpg', remote: 'migrated/site/baker-gu-portrait.jpg' },
  { local: 'images/lisa-li-portrait.jpg', remote: 'migrated/site/lisa-li-portrait.jpg' },
  { local: 'images/guides/shanghai/shanghai-skyline.jpg', remote: 'migrated/site/shanghai-skyline.jpg' },
  { local: 'images/guides/beijing/forbidden-city-aerial.jpg', remote: 'migrated/site/forbidden-city-aerial-portrait.jpg' },
  { local: 'images/credentials/taanz.png', remote: 'migrated/site/credentials-taanz.png' },
  { local: 'images/credentials/iata.png', remote: 'migrated/site/credentials-iata.png' },
  { local: 'images/credentials/tourism-export-council.png', remote: 'migrated/site/credentials-tourism-export-council.png' },
  { local: 'images/credentials/auckland-business-chamber.png', remote: 'migrated/site/credentials-auckland-business-chamber.png' },
  { local: 'images/credentials/qualmark.png', remote: 'migrated/site/credentials-qualmark.png' },
  { local: 'credentials-tia.png', remote: 'migrated/site/credentials-tia.png' },
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

  for (const { local, remote } of LOCAL_FILES) {
    const abs = path.join(ROOT, 'public', local);
    if (!fs.existsSync(abs)) {
      console.warn(`SKIP missing file: ${abs}`);
      fail++;
      continue;
    }
    const buf = fs.readFileSync(abs);
    const ext = path.extname(local).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
    const { error } = await supabase.storage.from(BUCKET).upload(remote, buf, {
      contentType,
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
  }

  console.log(`\nDone. success=${ok} failed/skipped=${fail}`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
