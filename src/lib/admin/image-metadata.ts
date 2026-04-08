import type { SupabaseClient } from '@supabase/supabase-js';

const META_BUCKET = 'tour-images' as const;
const META_PATH = '.admin/image-meta.json';

export type ImageMetaEntry = {
  alt?: string;
  tags?: string[];
  description?: string;
};

export type ImageMetaFile = Record<string, ImageMetaEntry>;

function metaKey(bucket: string, path: string): string {
  return `${bucket}/${path}`;
}

export async function loadImageMetadata(supabase: SupabaseClient): Promise<ImageMetaFile> {
  const { data, error } = await supabase.storage.from(META_BUCKET).download(META_PATH);
  if (error || !data) {
    return {};
  }
  try {
    const text = await data.text();
    return JSON.parse(text) as ImageMetaFile;
  } catch {
    return {};
  }
}

export async function saveImageMetadata(
  supabase: SupabaseClient,
  meta: ImageMetaFile
): Promise<{ error: string | null }> {
  const body = JSON.stringify(meta, null, 2);
  const blob = new Blob([body], { type: 'application/json' });
  const { error } = await supabase.storage.from(META_BUCKET).upload(META_PATH, blob, {
    upsert: true,
    contentType: 'application/json',
  });
  if (error) return { error: error.message };
  return { error: null };
}

export async function patchImageMetadata(
  supabase: SupabaseClient,
  bucket: string,
  path: string,
  patch: ImageMetaEntry
): Promise<{ error: string | null }> {
  const all = await loadImageMetadata(supabase);
  const key = metaKey(bucket, path);
  all[key] = { ...all[key], ...patch };
  return saveImageMetadata(supabase, all);
}
