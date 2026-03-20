import { Metadata } from 'next';
import Link from 'next/link';
import { getRecentBlogPosts } from '@/lib/data/blogs';

export const metadata: Metadata = {
  title: 'Baker Gu - China Travel Specialist | CTS Tours',
  description: 'Meet Baker Gu, our lead China travel specialist and the expert behind our premium China tours.',
  keywords: ['Baker Gu', 'China travel specialist', 'CTS Tours', 'China travel expert'],
  openGraph: {
    title: 'Baker Gu - China Travel Specialist | CTS Tours',
    description: 'Meet Baker Gu, our lead China travel specialist and the expert behind our premium China tours.',
    type: 'website',
  },
};

const BakerGuPage = () => {
  const recentPosts = getRecentBlogPosts(3);

  return (
    <div>
      {/* Hero 小头图 */}
      <section className="relative h-64 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/baker-gu-zhangjiajie.jpg"
            alt="Baker Gu at Zhangjiajie — CTS Tours China Travel Specialist"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Baker Gu</h1>
          <p className="text-lg">China Travel Specialist</p>
        </div>
      </section>

      {/* 专家简介 */}
      <section className="section bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-2/5">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-secondary"></div>
                <img
                  src="/images/baker-gu-great-wall.jpg"
                  alt="Baker Gu — China Travel Specialist at CTS Tours New Zealand"
                  className="rounded-lg shadow-xl w-full relative z-10"
                />
              </div>
            </div>
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Baker Gu</h2>
              <h3 className="text-xl text-primary mb-8 font-semibold">China Travel Specialist</h3>
              
              <div className="space-y-6 mb-8">
                <p className="text-gray-600 leading-relaxed">
                  With over 20 years of experience in the Chinese travel industry, Baker Gu is the expert behind our premium China tours. As our lead specialist, he brings unparalleled knowledge and insight to every aspect of our travel offerings, ensuring that each itinerary is meticulously crafted to provide authentic and unforgettable experiences.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Baker's journey in the travel industry began with a deep passion for China's rich culture and history. Over the years, he has traveled extensively throughout the country, from the bustling metropolises of Beijing and Shanghai to the remote villages of rural Yunnan, building lasting relationships with local communities and gaining exclusive access to unique cultural experiences.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  As the expert behind our product, Baker personally designs each of our premium tours, carefully selecting accommodations, experiences, and itineraries that showcase the best of China while providing genuine cultural immersion. His attention to detail and commitment to quality ensure that every CTS tour delivers exceptional value and authentic experiences.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Beyond tour design, Baker also serves as a trusted advisor to our clients, sharing his expertise and insights to help travelers make the most of their China journey. His deep understanding of Chinese culture, customs, and etiquette ensures that our clients navigate their travels with confidence and respect.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Baker's dedication to excellence and his passion for China shine through in every aspect of our tours, making him not just a travel specialist, but the heart and soul of CTS Tours' commitment to providing exceptional China travel experiences.
                </p>
              </div>
              
              <div className="bg-light p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-4">Expertise Areas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cultural Immersion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom Itineraries</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Premium Travel</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Business Travel</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Chinese Cuisine</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Heritage Sites</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Latest from Baker</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Travel insights, destination guides, and insider tips from our China specialist
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={post.heroImage} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {post.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>
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

          <div className="text-center mt-10">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View All Articles
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BakerGuPage;