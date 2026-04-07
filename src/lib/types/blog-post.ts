export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  category: 'destination' | 'experience' | 'travel-tips' | 'culture';
  tags: string[];
  heroImage: string;
  publishedAt: string;
  readTime: string;
}
