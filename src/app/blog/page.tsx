import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ImmersivePageHero from '@/components/ImmersivePageHero';
import BlogGrid from '@/components/blog/BlogGrid';
import { getAllBlogPosts } from '@/lib/data/blogs';
import { tourImage } from '@/lib/site-media';

export const metadata: Metadata = {
  title: 'Travel Blog | CTS Tours',
  description: 'Travel insights, destination guides, and insider tips from our China travel specialists.',
  openGraph: {
    title: 'Travel Blog | CTS Tours',
    description: 'Travel insights, destination guides, and insider tips from our China travel specialists.',
    type: 'website',
    images: [
      {
        url: tourImage('chengdu-pandas.jpg'),
        width: 1200,
        height: 630,
        alt: 'Giant pandas in Chengdu — CTS Tours travel blog',
      },
    ],
  },
};

const FEATURED_SLUG = 'china-holiday-packages';

export default function BlogPage() {
  const allPosts = getAllBlogPosts();

  const featuredPost =
    allPosts.find((p) => p.slug === FEATURED_SLUG) ?? allPosts[0];
  const gridPosts = allPosts.filter((p) => p.slug !== featuredPost.slug);

  return (
    <div>
      <ImmersivePageHero
        eyebrow="Journal"
        title="Travel Blog"
        subtitle="Insights, guides, and stories from our China travel specialists"
        imageSrc={tourImage('chengdu-pandas.jpg')}
        imageAlt="Giant pandas in Chengdu — CTS Tours travel blog"
        priority
      />

      {/* Featured Post */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Featured
          </p>
          <Link href={`/blog/${featuredPost.slug}`} className="block group max-w-4xl">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-80 md:h-[420px]">
                <Image
                  src={featuredPost.heroImage}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                {/* Stronger gradient for readability on any image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <div className="flex items-center gap-3 text-white/70 text-sm mb-3">
                    <span className="bg-primary text-white px-3 py-0.5 rounded-full text-xs font-medium">
                      Featured
                    </span>
                    <span>
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-NZ', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                    <span>·</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-secondary transition-colors leading-snug">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/80 line-clamp-2 text-sm md:text-base max-w-2xl">
                    {featuredPost.excerpt}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All Posts with filter */}
      <BlogGrid posts={gridPosts} />

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let our experts craft your perfect China experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Browse Tours
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
