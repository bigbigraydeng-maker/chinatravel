import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ImmersivePageHero from '@/components/ImmersivePageHero';
import { getAllBlogPosts, BlogPost } from '@/lib/data/blogs';
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

export default function BlogPage() {
  const posts = getAllBlogPosts();

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

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
      {featuredPost && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link href={`/blog/${featuredPost.slug}`} className="block group">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <div className="relative h-80 md:h-96">
                    <Image
                      src={featuredPost.heroImage}
                      alt={featuredPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 80vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center gap-4 text-white/80 text-sm mb-3">
                        <span className={`${categoryColors[featuredPost.category]} text-white px-3 py-1 rounded-full`}>
                          {categoryLabels[featuredPost.category]}
                        </span>
                        <span>{new Date(featuredPost.publishedAt).toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        <span>•</span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-secondary transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-white/90 line-clamp-2">
                        {featuredPost.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 font-serif">All Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`${categoryColors[post.category]} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                        {categoryLabels[post.category]}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
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
