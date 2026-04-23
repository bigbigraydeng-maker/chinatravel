import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { verifyAdminApi, adminUnauthorized } from '@/lib/auth/admin';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

const SUPABASE_HOST = 'qbturrydultenhlfmdcm.supabase.co';
const URL_RE = /https:\/\/qbturrydultenhlfmdcm\.supabase\.co\/storage\/v1\/object\/public\/[a-zA-Z0-9/_\-.%]+/g;

export type ImageRef = { file: string; line: number };
export type UsageMap = Record<string, ImageRef[]>;

function walkSrc(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.') || entry === 'node_modules') continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walkSrc(full, out);
    } else if (st.isFile() && /\.(ts|tsx)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

function buildUsageMap(): UsageMap {
  const srcDir = join(process.cwd(), 'src');
  const usage: UsageMap = {};
  const cwd = process.cwd().replace(/\\/g, '/');

  for (const filePath of walkSrc(srcDir)) {
    const relPath = filePath.replace(/\\/g, '/').replace(cwd + '/', '');
    const lines = readFileSync(filePath, 'utf-8').split('\n');

    for (let i = 0; i < lines.length; i++) {
      const matches = lines[i].match(URL_RE);
      if (!matches) continue;
      for (const url of matches) {
        if (!usage[url]) usage[url] = [];
        usage[url].push({ file: relPath, line: i + 1 });
      }
    }
  }

  return usage;
}

export async function GET() {
  if (!verifyAdminApi()) return adminUnauthorized();

  try {
    const usage = buildUsageMap();
    return NextResponse.json(usage);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Scan failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
