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
  /** Attribution line for heroImage, required for CC-licensed photos. Plain text, rendered on the hero. */
  heroImageCredit?: string;
  publishedAt: string;
  readTime: string;
  faqs?: { question: string; answer: string }[];
}
