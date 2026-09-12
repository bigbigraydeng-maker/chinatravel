/**
 * Upload the 10 re-sourced homepage images (properly licensed iStock replacements)
 * from the local Dropbox working folder to Supabase Storage (tour-images bucket).
 *
 * node --env-file=/Users/raydeng/Projects/chinatravel/.env.local scripts/upload-homepage-v2-images.cjs
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
const LOCAL_DIR =
  '/Users/raydeng/Library/CloudStorage/Dropbox/MagicLab_Studio/CTS/website/images';

const SLOTS = [
  'city-beijing',
  'city-chengdu',
  'city-chongqing',
  'city-shanghai',
  'city-xian',
  'city-zhangjiajie',
  'spotlight-card1',
  'spotlight-card2',
  'spotlight-card3',
  'cta-banner',
  'stopover-beijing',
  'stopover-shanghai',
  'temple-difference',
  'christchurch-departure',
  'blog-article1',
  'blog-article2',
  'blog-article3',
  'upcoming-christmas-new-year',
  'upcoming-golden-china',
  'upcoming-legacy-of-china',
  'upcoming-shanghai-surroundings',
  'upcoming-tale-of-two-cities',
  'upcoming-yunnan',
];

async function main() {
  if (!SUPABASE_KEY) {
    console.error('Missing SUPABASE_SERVICE_KEY (or SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_SUPABASE_ANON_KEY).');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  let ok = 0;
  let fail = 0;
  const urls = {};

  for (const slot of SLOTS) {
    const file = `${slot}-v2.webp`;
    const abs = path.join(LOCAL_DIR, file);
    if (!fs.existsSync(abs)) {
      console.error(`FAIL missing local file: ${abs}`);
      fail++;
      continue;
    }
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
    path.join(process.cwd(), 'scripts', 'homepage-v2-urls.json'),
    JSON.stringify(urls, null, 2)
  );

  console.log(`\nDone. success=${ok} failed=${fail}`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
