import fs from 'fs';
import path from 'path';
import type { ListedObject } from './storage-list';
import type { ImageMetaFile } from './image-metadata';

const SUPABASE_HOST = 'qbturrydultenhlfmdcm.supabase.co';

function extractStoragePathsFromUrl(url: string): { bucket: string; objectPath: string } | null {
  try {
    const u = new URL(url);
    if (!u.hostname.includes(SUPABASE_HOST)) return null;
    const m = u.pathname.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/);
    if (!m) return null;
    return { bucket: m[1], objectPath: decodeURIComponent(m[2].replace(/\/$/, '')) };
  } catch {
    return null;
  }
}

function normalizeRef(bucket: string, objectPath: string): string {
  return `${bucket}/${objectPath}`;
}

/** Collect referenced image URLs from url-mapping JSON and a shallow scan of /src */
export function collectReferencedRefs(projectRoot: string): Set<string> {
  const used = new Set<string>();

  const mappingPath = path.join(projectRoot, 'optimized', 'url-mapping-complete.json');
  if (fs.existsSync(mappingPath)) {
    const raw = fs.readFileSync(mappingPath, 'utf8');
    const mapping = JSON.parse(raw) as Record<string, string>;
    for (const url of Object.values(mapping)) {
      const p = extractStoragePathsFromUrl(url);
      if (p) used.add(normalizeRef(p.bucket, p.objectPath));
    }
  }

  const srcDir = path.join(projectRoot, 'src');
  const urlRegex = new RegExp(
    `https://${SUPABASE_HOST.replace(/\./g, '\\.')}/storage/v1/object/public/([^"'\`\\s>]+)`,
    'g'
  );

  function scanFile(file: string): void {
    const content = fs.readFileSync(file, 'utf8');
    let m: RegExpExecArray | null;
    const re = new RegExp(urlRegex.source, 'g');
    while ((m = re.exec(content))) {
      const rest = m[1];
      const slash = rest.indexOf('/');
      if (slash === -1) continue;
      const bucket = rest.slice(0, slash);
      const objectPath = rest.slice(slash + 1);
      used.add(normalizeRef(bucket, objectPath));
    }
  }

  function walk(dir: string): void {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) {
        if (name === 'node_modules' || name === '.next') continue;
        walk(full);
      } else if (/\.(tsx|ts|jsx|js|mdx)$/.test(name)) {
        scanFile(full);
      }
    }
  }

  walk(srcDir);
  return used;
}

export type AnalyzeResult = {
  unused: ListedObject[];
  large: ListedObject[];
  missingAlt: { bucket: string; path: string; url: string }[];
  recommendations: string[];
  referencedCount: number;
  storageCount: number;
};

export function analyzeImages(
  projectRoot: string,
  objects: ListedObject[],
  meta: ImageMetaFile
): AnalyzeResult {
  const referenced = collectReferencedRefs(projectRoot);
  const referencedCount = referenced.size;

  const unused: ListedObject[] = [];
  for (const o of objects) {
    const key = normalizeRef(o.bucket, o.path);
    if (!referenced.has(key)) {
      unused.push(o);
    }
  }

  const large = objects.filter((o) => o.size > 2 * 1024 * 1024);

  const missingAlt: AnalyzeResult['missingAlt'] = [];
  for (const o of objects) {
    const key = normalizeRef(o.bucket, o.path);
    const m = meta[key];
    const alt = m?.alt?.trim();
    if (!alt) {
      missingAlt.push({ bucket: o.bucket, path: o.path, url: o.publicUrl });
    }
  }

  const recommendations: string[] = [];
  if (unused.length) {
    recommendations.push(
      `${unused.length} objects appear unused by site code and url-mapping — review before deleting.`
    );
  }
  if (large.length) {
    recommendations.push(`${large.length} files exceed 2MB — consider recompressing responsive variants.`);
  }
  if (missingAlt.length) {
    recommendations.push(`${missingAlt.length} files are missing alt text in admin metadata.`);
  }
  if (!recommendations.length) {
    recommendations.push('No major issues detected — keep monitoring storage usage.');
  }

  return {
    unused,
    large,
    missingAlt,
    recommendations,
    referencedCount,
    storageCount: objects.length,
  };
}
