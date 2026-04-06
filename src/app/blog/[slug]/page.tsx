import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts, BlogPost } from '@/lib/data/blogs';
import { getSiteUrl } from '@/lib/site';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const categoryLabels: Record<BlogPost['category'], string> = {
  'destination': 'Destinations',
  'experience': 'Experiences',
  'travel-tips': 'Travel Tips',
  'culture': 'Culture'
};

const categoryColors: Record<BlogPost['category'], string> = {
  'destination': 'bg-blue-500',
  'experience': 'bg-green-500',
  'travel-tips': 'bg-orange-500',
  'culture': 'bg-purple-500'
};

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | CTS Tours',
    };
  }

  const base = buildCtsPageMetadata({
    title: `${post.title} | CTS Tours Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogImagePath: post.heroImage,
    ogImageAlt: post.title,
    keywords: post.tags,
    ogType: 'article',
    openGraphTitle: post.title,
    openGraphDescription: post.excerpt,
  });

  return {
    ...base,
    openGraph: {
      type: 'article',
      url: base.openGraph?.url,
      title: base.openGraph?.title ?? post.title,
      description: base.openGraph?.description ?? post.excerpt,
      siteName: base.openGraph?.siteName,
      images: base.openGraph?.images,
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const allPosts = getAllBlogPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-80 md:h-96">
        <div className="absolute inset-0">
          <img 
            src={post.heroImage} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 text-white/80 text-sm mb-4">
              <span className={`${categoryColors[post.category]} text-white px-3 py-1 rounded-full`}>
                {categoryLabels[post.category]}
              </span>
              <span>{new Date(post.publishedAt).toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                BG
              </div>
              <div>
                <p className="text-white font-medium">{post.author}</p>
                <p className="text-white/70 text-sm">{post.authorRole}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
                {post.excerpt}
              </p>
              <div 
                className="text-gray-700 leading-relaxed blog-content"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n\n/g, '</p><p class="mb-6">')
                    .replace(/\n/g, '<br/>')
                    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
                }}
              />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-500 mb-3">TAGS</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-500 mb-3">SHARE THIS ARTICLE</h4>
              <div className="flex gap-4">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Check out this article: ${postUrl}`)}`}
                  className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-light">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 font-serif">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${relatedPost.slug}`} className="block">
                    <div className="relative h-48">
                      <img 
                        src={relatedPost.heroImage} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{new Date(relatedPost.publishedAt).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommended Tours Section */}
      <section className="py-16 bg-warm-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-2 text-center">Explore Our China Tours</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover our carefully curated tours that bring the stories and destinations featured in this guide to life
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link
              href="/beijing-tours"
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-5xl">
                🏯
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Beijing</h3>
                <p className="text-sm text-gray-600">Forbidden City, Great Wall & ancient temples</p>
              </div>
            </Link>
            <Link
              href="/xian-tours"
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-5xl">
                ⚔️
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Xi'an</h3>
                <p className="text-sm text-gray-600">Terracotta Warriors & Silk Road heritage</p>
              </div>
            </Link>
            <Link
              href="/shanghai-tours"
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-5xl">
                🌃
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Shanghai</h3>
                <p className="text-sm text-gray-600">Modern skyline, Yu Garden & river cruises</p>
              </div>
            </Link>
            <Link
              href="/chengdu-tours"
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-5xl">
                🐼
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Chengdu</h3>
                <p className="text-sm text-gray-600">Giant pandas, temples & local culture</p>
              </div>
            </Link>
            <Link
              href="/guilin-tours"
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40 bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-5xl">
                🏞️
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Guilin</h3>
                <p className="text-sm text-gray-600">Li River karst landscapes & bamboo rafting</p>
              </div>
            </Link>
            <Link
              href="/yunnan-tours"
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-5xl">
                🌄
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Yunnan</h3>
                <p className="text-sm text-gray-600">Ethnic minorities, ancient towns & nature</p>
              </div>
            </Link>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/tours"
              className="text-primary hover:underline font-medium"
            >
              View all 22 available tours →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let our experts craft your perfect China experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tailor-made"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Tailor-Made Itinerary
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-8 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
