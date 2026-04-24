export type StagingContentType = 'blog' | 'social';

export type StagingStatus = 'draft' | 'pending-review' | 'approved' | 'published';

export type StagingBlogCategory = 'travel-tips' | 'experience' | 'destination' | 'culture';

export interface StagingMetadata {
  description: string;
  keywords: string[];
  category: StagingBlogCategory;
}

export interface StagingSocialVersions {
  linkedin?: string;
  xiaohongshu?: string;
  weibo?: string;
}

export interface StagingContent {
  id: string;
  type: StagingContentType;
  title: string;
  slug: string;
  content: string;
  metadata: StagingMetadata;
  socialVersions?: StagingSocialVersions;
  status: StagingStatus;
  createdAt: string;
  updatedAt: string;
  submittedBy: string;
  approvedBy?: string;
  publishedAt?: string;
}

export interface PublishHistoryEntry {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  approvedBy: string;
}
