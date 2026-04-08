export const IMAGE_BUCKETS = ['tour-images', 'guide-images', 'credential-images'] as const;

export type ImageBucket = (typeof IMAGE_BUCKETS)[number];

export type ImageCategory = 'tour' | 'guide' | 'credential';

export function categoryToBucket(category: string): ImageBucket {
  switch (category) {
    case 'guide':
      return 'guide-images';
    case 'credential':
      return 'credential-images';
    case 'tour':
    default:
      return 'tour-images';
  }
}

export function bucketToCategory(bucket: string): ImageCategory {
  if (bucket === 'guide-images') return 'guide';
  if (bucket === 'credential-images') return 'credential';
  return 'tour';
}
