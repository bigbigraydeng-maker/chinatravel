#!/usr/bin/env node
/**
 * Post-deploy check that delisted tours are gone from a running site and that
 * their old URLs 301 to the replacement page.
 *
 * Usage:
 *   node scripts/verify-delisted.mjs [--base https://www.ctstours.co.nz] [--no-crawl-sitemap] [--concurrency 6]
 *
 * Exit codes: 0 all checks passed, 1 any check failed, 2 usage/registry error.
 */

import { readFileSync } from 'node:fs';
import scan from '../src/lib/data/delisted-scan.cjs';

const DEFAULT_BASE = 'https://www.ctstours.co.nz';
const TIMEOUT_MS = 30000;

const STATIC_PAGE_PATHS = [
  '/sitemap.xml',
  '/',
  '/tours',
  '/tours/find',
  '/tours/china/discovery',
  '/china-tours',
  '/agents',
  '/campaigns/spotlight',
  '/spotlight/october-2026',
  '/preview-home',
  '/beijing-tours',
  '/xian-tours',
  '/shanghai-tours',
  '/chongqing-tours',
  '/yunnan-tours',
  '/explore/beijing',
  '/explore/xian',
  '/explore/shanghai',
  '/blog/holidays-to-china-from-new-zealand',
  '/blog/china-tour-packages-including-airfare-from-nz',
  '/china-visa-guide-for-new-zealanders',
];

const CACHE_HEADERS = ['age', 'x-nextjs-cache', 'cache-control', 'date'];

function usageError(message) {
  console.error(`error: ${message}`);
  console.error(
    'usage: node scripts/verify-delisted.mjs [--base https://www.ctstours.co.nz] [--no-crawl-sitemap] [--concurrency 6]'
  );
  process.exitCode = 2;
}

function parseArgs(argv) {
  const opts = { base: DEFAULT_BASE, crawlSitemap: true, concurrency: 6 };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--no-crawl-sitemap') {
      opts.crawlSitemap = false;
    } else if (arg === '--crawl-sitemap') {
      opts.crawlSitemap = true;
    } else if (arg === '--base') {
      const value = argv[i + 1];
      if (!value) throw new Error('--base requires a value');
      opts.base = value;
      i += 1;
    } else if (arg.startsWith('--base=')) {
      opts.base = arg.slice('--base='.length);
    } else if (arg === '--concurrency') {
      const value = argv[i + 1];
      if (!value) throw new Error('--concurrency requires a value');
      opts.concurrency = Number(value);
      i += 1;
    } else if (arg.startsWith('--concurrency=')) {
      opts.concurrency = Number(arg.slice('--concurrency='.length));
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  if (!Number.isInteger(opts.concurrency) || opts.concurrency < 1) {
    throw new Error('--concurrency must be a positive integer');
  }
  opts.base = opts.base.replace(/\/+$/, '');
  return opts;
}

function loadRegistry() {
  const url = new URL('../src/lib/data/delisted-tours.json', import.meta.url);
  const raw = readFileSync(url, 'utf8');
  const entries = JSON.parse(raw);
  if (!Array.isArray(entries)) throw new Error('registry is not an array');
  return entries;
}

function tourPath(entry) {
  return `/tours/${entry.destination}/${entry.tier}/${entry.slug}`;
}

function retiredPaths(entry) {
  const base = tourPath(entry);
  return [base, `${base}/print`, ...(entry.extraPaths || [])];
}

function cacheDetail(res) {
  const parts = [];
  for (const name of CACHE_HEADERS) {
    const value = res.headers.get(name);
    if (value !== null) parts.push(`${name}=${value}`);
  }
  return parts.join(' ');
}

async function fetchManual(url) {
  return fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(TIMEOUT_MS) });
}

async function fetchFollow(url) {
  return fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(TIMEOUT_MS) });
}

function report(results, ok, label, detail) {
  results.push({ ok, label, detail });
  const status = ok ? 'PASS' : 'FAIL';
  console.log(`${status}  ${label}${detail ? `  ${detail}` : ''}`);
}

async function checkRedirects(entries, base, results) {
  for (const entry of entries) {
    for (const path of retiredPaths(entry)) {
      const label = `301 ${path}`;
      try {
        const res = await fetchManual(base + path);
        const location = res.headers.get('location');
        let resolvedPath = null;
        if (location) {
          try {
            resolvedPath = new URL(location, base).pathname;
          } catch {
            resolvedPath = null;
          }
        }
        const ok = res.status === 301 && resolvedPath === entry.redirectTo;
        report(
          results,
          ok,
          label,
          `status=${res.status} location=${location ?? '(none)'} expected=${entry.redirectTo}`
        );
      } catch (err) {
        report(results, false, label, `network error: ${err.message}`);
      }
    }
  }
}

async function checkPage(base, path, scanner, results) {
  const label = `page ${path}`;
  try {
    const res = await fetchFollow(base + path);
    const body = await res.text();
    const matches = scanner.findInText(body);
    const cache = cacheDetail(res);
    const ok = res.status === 200 && matches.length === 0;
    const parts = [`status=${res.status}`];
    if (cache) parts.push(cache);
    if (matches.length > 0) parts.push(`matched=${JSON.stringify(matches)}`);
    report(results, ok, label, parts.join(' '));
    return { ok, body: res.status === 200 ? body : null };
  } catch (err) {
    report(results, false, label, `network error: ${err.message}`);
    return { ok: false, body: null };
  }
}

function extractLocs(xml) {
  const locs = [];
  const re = /<loc>\s*([^<]+?)\s*<\/loc>/gi;
  let match;
  while ((match = re.exec(xml)) !== null) locs.push(match[1]);
  return locs;
}

function locPathname(loc, base) {
  try {
    return new URL(loc, base).pathname;
  } catch {
    return null;
  }
}

async function runPool(items, concurrency, worker) {
  let index = 0;
  const runners = [];
  const size = Math.min(concurrency, items.length);
  for (let i = 0; i < size; i += 1) {
    runners.push(
      (async () => {
        while (index < items.length) {
          const current = items[index];
          index += 1;
          await worker(current);
        }
      })()
    );
  }
  await Promise.all(runners);
}

async function checkPages(opts, entries, scanner, results) {
  const checked = new Set();
  let sitemapBody = null;

  for (const path of STATIC_PAGE_PATHS) {
    checked.add(path);
    const { body } = await checkPage(opts.base, path, scanner, results);
    if (path === '/sitemap.xml' && body !== null) sitemapBody = body;
  }

  if (opts.crawlSitemap) {
    if (sitemapBody === null) {
      report(results, false, 'crawl sitemap', 'sitemap.xml unavailable, cannot crawl');
    } else {
      const paths = [];
      for (const loc of extractLocs(sitemapBody)) {
        const pathname = locPathname(loc, opts.base);
        if (!pathname) continue;
        if (checked.has(pathname)) continue;
        checked.add(pathname);
        paths.push(pathname);
      }
      await runPool(paths, opts.concurrency, (path) => checkPage(opts.base, path, scanner, results));
    }
  }

  return sitemapBody;
}

function checkSitemap(sitemapBody, entries, base, results) {
  const label = 'sitemap retired paths';
  if (sitemapBody === null) {
    report(results, false, label, 'sitemap.xml unavailable');
    return;
  }
  const retired = [];
  for (const entry of entries) {
    for (const path of retiredPaths(entry)) retired.push(path);
  }
  const offenders = [];
  for (const loc of extractLocs(sitemapBody)) {
    const pathname = locPathname(loc, base);
    if (!pathname) continue;
    for (const path of retired) {
      if (pathname === path || pathname.startsWith(`${path}/`)) {
        offenders.push(pathname);
        break;
      }
    }
  }
  const ok = offenders.length === 0;
  report(results, ok, label, ok ? 'no retired paths' : `found=${JSON.stringify(offenders)}`);
}

async function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (err) {
    usageError(err.message);
    return;
  }

  let entries;
  try {
    entries = loadRegistry();
  } catch (err) {
    console.error(`error: failed to read registry: ${err.message}`);
    process.exitCode = 2;
    return;
  }

  const scanner = scan.buildScanner(entries);
  const results = [];

  await checkRedirects(entries, opts.base, results);
  const sitemapBody = await checkPages(opts, entries, scanner, results);
  checkSitemap(sitemapBody, entries, opts.base, results);

  const failed = results.filter((r) => !r.ok).length;
  console.log(`${results.length} checks, ${failed} failed`);
  process.exitCode = failed === 0 ? 0 : 1;
}

main().catch((err) => {
  console.error(`error: ${err && err.message ? err.message : err}`);
  process.exitCode = 1;
});
