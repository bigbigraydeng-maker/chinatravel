/**
 * Fetches live sitemap.xml and checks each URL returns HTTP 200.
 * Does NOT query Google indexing status — that requires Search Console URL Inspection API + OAuth.
 *
 * Usage: node scripts/seo/check-sitemap-urls.mjs
 * Optional: SITEMAP_URL=https://example.com/sitemap.xml node scripts/seo/check-sitemap-urls.mjs
 */

import https from 'https';

const SITEMAP_URL = process.env.SITEMAP_URL || 'https://www.ctstours.co.nz/sitemap.xml';
const TIMEOUT_MS = 15000;
const CONCURRENCY = 5;

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: TIMEOUT_MS }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('timeout'));
    });
  });
}

function headStatus(url) {
  return new Promise((resolve) => {
    const u = new URL(url);
    const opts = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'HEAD',
      timeout: TIMEOUT_MS,
    };
    const req = https.request(opts, (res) => {
      resolve(res.statusCode || 0);
      res.resume();
    });
    req.on('error', () => resolve(-1));
    req.on('timeout', () => {
      req.destroy();
      resolve(-2);
    });
    req.end();
  });
}

function extractLocs(xml) {
  const locs = [];
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) {
    locs.push(m[1].trim());
  }
  return [...new Set(locs)];
}

async function poolMap(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return out;
}

async function main() {
  console.log(`Fetching sitemap: ${SITEMAP_URL}\n`);
  const { status, data } = await fetchText(SITEMAP_URL);
  if (status !== 200) {
    console.error(`Sitemap fetch failed: HTTP ${status}`);
    process.exit(1);
  }
  const locs = extractLocs(data);
  console.log(`Found ${locs.length} unique URLs in sitemap.\n`);

  const results = await poolMap(locs, CONCURRENCY, async (url) => {
    const code = await headStatus(url);
    return { url, code };
  });

  const bad = results.filter((r) => r.code !== 200);
  const ok = results.filter((r) => r.code === 200);

  console.log(`HTTP 200: ${ok.length}`);
  console.log(`Not 200 / error: ${bad.length}\n`);

  if (bad.length) {
    console.log('--- Problem URLs ---');
    for (const r of bad) {
      console.log(`${r.code}\t${r.url}`);
    }
    console.log('');
  }

  console.log(
    'Note: This script does NOT check Google indexing. For that:\n' +
      '  • Search Console → Indexing → Pages (coverage)\n' +
      '  • Or URL Inspection for single URLs\n' +
      '  • Programmatic: Search Console URL Inspection API (requires OAuth)\n'
  );

  process.exit(bad.length ? 2 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
