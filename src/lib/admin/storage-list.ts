import type { SupabaseClient } from '@supabase/supabase-js';
import type { ImageBucket } from './buckets';

export type ListedObject = {
  bucket: ImageBucket;
  path: string;
  name: string;
  size: number;
  updatedAt: string | null;
  publicUrl: string;
};

function isFolderEntry(entry: { id: string | null; name: string }): boolean {
  return entry.id === null;
}

export async function listAllFilesInBucket(
  supabase: SupabaseClient,
  bucket: ImageBucket,
  baseUrl: string
): Promise<ListedObject[]> {
  const out: ListedObject[] = [];

  async function walk(prefix: string): Promise<void> {
    const limit = 1000;
    let offset = 0;
    for (;;) {
      const { data, error } = await supabase.storage.from(bucket).list(prefix, {
        limit,
        offset,
        sortBy: { column: 'name', order: 'asc' },
      });
      if (error) throw error;
      if (!data?.length) break;

      for (const item of data) {
        const fullPath = prefix ? `${prefix}/${item.name}` : item.name;
        if (isFolderEntry(item)) {
          await walk(fullPath);
        } else {
          const size =
            typeof item.metadata === 'object' && item.metadata && 'size' in item.metadata
              ? Number((item.metadata as { size?: number }).size) || 0
              : 0;
          const updatedAt =
            (item.updated_at as string | undefined) ??
            (item.created_at as string | undefined) ??
            null;
          out.push({
            bucket,
            path: fullPath,
            name: item.name,
            size,
            updatedAt,
            publicUrl: `${baseUrl}/storage/v1/object/public/${bucket}/${fullPath
              .split('/')
              .map(encodeURIComponent)
              .join('/')}`,
          });
        }
      }
      if (data.length < limit) break;
      offset += limit;
    }
  }

  await walk('');
  return out;
}

export async function listAllImageFiles(
  supabase: SupabaseClient,
  buckets: readonly ImageBucket[],
  supabaseUrl: string
): Promise<ListedObject[]> {
  const baseUrl = supabaseUrl.replace(/\/$/, '');
  const lists = await Promise.all(
    buckets.map((b) => listAllFilesInBucket(supabase, b, baseUrl))
  );
  return lists.flat();
}
