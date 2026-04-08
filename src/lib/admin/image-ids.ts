import type { ImageBucket } from './buckets';

export type ImageRef = { bucket: ImageBucket; path: string };

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function encodeImageId(ref: ImageRef): string {
  const payload = JSON.stringify(ref);
  return Buffer.from(encoder.encode(payload)).toString('base64url');
}

export function decodeImageId(id: string): ImageRef | null {
  try {
    const json = decoder.decode(Buffer.from(id, 'base64url'));
    const data = JSON.parse(json) as ImageRef;
    if (!data.bucket || !data.path) return null;
    return data;
  } catch {
    return null;
  }
}
