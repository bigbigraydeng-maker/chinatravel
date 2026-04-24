import type { Metadata } from 'next';
import StagingPanel from '@/components/blog/StagingPanel';
import { stagingBlogPosts } from '@/lib/data/staging-content';

export const metadata: Metadata = {
  title: 'Blog Staging Panel | CTS Tours Content Management',
  description: 'Internal draft workspace for CTS blog and social content. Not intended for public SEO.',
  robots: { index: false, follow: false },
};

export default function BlogStagingPage() {
  return <StagingPanel initialItems={stagingBlogPosts} />;
}
