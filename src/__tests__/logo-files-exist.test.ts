/**
 * About 97 pages of the live site (every guide and destination page) name their
 * logo in their structured data (JSON-LD) as `${siteUrl}/images/cts-logo.png`,
 * and that file did not exist, so the address answered 404 for as long as those
 * pages existed (found 2026-10-21). The same file name is written by hand in
 * about 30 source files. This test finds every local logo picture address that
 * the source code (not the tests) names and checks that the file really exists
 * in public/, so a typo or a deleted file turns the tests red instead of staying
 * a silent 404 in search engines' eyes.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const LOGO_ADDRESS = /(?:\$\{[A-Za-z_.]+\})?(\/[A-Za-z0-9_./-]*logo[A-Za-z0-9_.-]*\.(?:png|jpe?g|webp|svg))/g;

function sourceFiles(dir: string): string[] {
  const found: string[] = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      found.push(...sourceFiles(path));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (!path.endsWith('.ts') && !path.endsWith('.tsx')) {
      continue;
    }

    if (path.includes('/__tests__/') || path.endsWith('.test.ts') || path.endsWith('.test.tsx')) {
      continue;
    }

    found.push(path);
  }

  return found;
}

function logoAddresses(): Map<string, string> {
  const addresses = new Map<string, string>();

  for (const path of sourceFiles(join(process.cwd(), 'src'))) {
    const source = readFileSync(path, 'utf8');

    for (const match of source.matchAll(LOGO_ADDRESS)) {
      const address = match[1];

      if (!addresses.has(address)) {
        addresses.set(address, relative(process.cwd(), path));
      }
    }
  }

  return addresses;
}

describe('every logo picture the source code points at exists', () => {
  const addresses = logoAddresses();

  it('the scan finds the logo pictures the site really uses', () => {
    expect(addresses.has('/logo.png')).toBe(true);
    expect(addresses.has('/images/cts-logo.png')).toBe(true);
  });

  it('every one of them is a file in public/', () => {
    const missing: string[] = [];

    for (const [address, file] of addresses) {
      if (!existsSync(join(process.cwd(), 'public', address))) {
        missing.push(`${address} (first named in ${file})`);
      }
    }

    expect(missing).toEqual([]);
  });
});
