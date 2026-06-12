import Link from 'next/link';
import { getBlogPostBySlug } from '@/lib/data/blogs';

interface RecommendedReadingProps {
  slugs: string[];
  /** Section heading — defaults to "Recommended Reading". */
  heading?: string;
  /** Wrap in a centered page container (for full-width pages like the tour page). */
  contained?: boolean;
}

/**
 * "Recommended Reading" blog grid, shared by the destination guide and tour
 * pages so the two stay visually in sync. Unknown slugs are silently dropped;
 * renders nothing when no valid posts remain.
 */
export default function RecommendedReading({
  slugs,
  heading = 'Recommended Reading',
  contained = true,
}: RecommendedReadingProps) {
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((p): p is NonNullable<ReturnType<typeof getBlogPostBySlug>> => Boolean(p));

  if (posts.length === 0) return null;

  return (
    <section className={contained ? 'container mx-auto px-4 max-w-5xl py-12' : 'mb-12'}>
      <h2 className="text-2xl font-serif font-bold text-accent mb-6 pb-3 border-b border-warm-100">
        {heading}
      </h2>
      <div className="grid sm:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex flex-col rounded-xl border border-warm-100 hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden bg-white group"
          >
            <div className="flex-1 p-5 flex flex-col">
              <div className="mb-3">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                  {post.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-accent mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{post.author}</span>
                {post.readTime && <span>{post.readTime} min read</span>}
              </div>
            </div>
            <div className="px-5 py-3 bg-warm-50 border-t border-warm-100 text-sm text-primary font-semibold group-hover:text-primary/80 transition-colors">
              Read Article →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
