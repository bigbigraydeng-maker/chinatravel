import { phase1StagingEntries } from '@/lib/data/blogs-phase1-travel-tips';
import type { StagingContent } from '@/lib/types/staging';

/** Initial CMS staging rows — mirrors Phase 1 travel-tip posts plus workflow states */
export const stagingBlogPosts: StagingContent[] = [...phase1StagingEntries];
