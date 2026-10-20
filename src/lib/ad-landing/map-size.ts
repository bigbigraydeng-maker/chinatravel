import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const cache = new Map<string, { width: number; height: number } | null>();

/**
 * The drawing size of a route map in public/tour-maps, read from the svg's own viewBox, so the page can reserve the
 * map's space before it loads (no layout shift). Null when the file or its viewBox cannot be read.
 */
export function mapSize(file: string): { width: number; height: number } | null {
  if (cache.has(file)) return cache.get(file) ?? null;
  let size: { width: number; height: number } | null = null;
  try {
    const head = readFileSync(join(process.cwd(), 'public', 'tour-maps', file), 'utf8').slice(0, 600);
    const match = head.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
    if (match) size = { width: Number(match[1]), height: Number(match[2]) };
  } catch {
    size = null;
  }
  cache.set(file, size);
  return size;
}
