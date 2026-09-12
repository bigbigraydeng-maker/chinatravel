/**
 * Upload public/images/figma-exact/*.webp to Supabase Storage (tour-images bucket).
 * node scripts/upload-figma-exact-images.cjs
 *
 * Env: SUPABASE_SERVICE_KEY (or SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_SUPABASE_ANON_KEY)
 */
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://qbturrydultenhlfmdcm.supabase.co';
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const BUCKET = 'tour-images';
const REMOTE_PREFIX = 'figma-exact';
const LOCAL_DIR = path.join(process.cwd(), 'public', 'images', 'figma-exact');

async function main() {
  if (!SUPABASE_KEY) {
    console.error('Missing SUPABASE_SERVICE_KEY (or SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_SUPABASE_ANON_KEY).');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const files = fs.readdirSync(LOCAL_DIR).filter((f) => f.endsWith('.webp'));

  let ok = 0;
  let fail = 0;
  const urls = {};

  for (const file of files) {
    const abs = path.join(LOCAL_DIR, file);
    const buf = fs.readFileSync(abs);
    const remote = `${REMOTE_PREFIX}/${file}`;
    const { error } = await supabase.storage.from(BUCKET).upload(remote, buf, {
      contentType: 'image/webp',
      upsert: true,
      cacheControl: '31536000',
    });
    if (error) {
      console.error(`FAIL upload ${remote}:`, error.message);
      fail++;
      continue;
    }
    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(remote);
    urls[file] = pub.publicUrl;
    console.log(`OK ${remote} (${Math.round(buf.length / 1024)} KB) -> ${pub.publicUrl}`);
    ok++;
  }

  fs.writeFileSync(
    path.join(process.cwd(), 'scripts', 'figma-exact-urls.json'),
    JSON.stringify(urls, null, 2)
  );

  console.log(`\nDone. success=${ok} failed=${fail}`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
