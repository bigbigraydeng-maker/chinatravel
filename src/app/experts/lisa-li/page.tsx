import { Metadata } from 'next';
import Link from 'next/link';
import { getRecentBlogPosts } from '@/lib/data/blogs';

export const metadata: Metadata = {
  title: 'Lisa Li, MNZM - Managing Director | CTS Tours',
  description: 'Meet Lisa Li, MNZM, Managing Director of CTS Tours and founder of the New Zealand branch of China Travel Service.',
  keywords: ['Lisa Li', 'MNZM', 'Managing Director', 'CTS Tours', 'China Travel Service'],
  openGraph: {
    title: 'Lisa Li, MNZM - Managing Director | CTS Tours',
    description: 'Meet Lisa Li, MNZM, Managing Director of CTS Tours and founder of the New Zealand branch of China Travel Service.',
    type: 'website',
  },
};

const LisaLiPage = () => {
  const recentPosts = getRecentBlogPosts(3);

  return (
    <div>
      {/* Hero 小头图 */}
      <section className="relative h-64 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/guides/beijing/forbidden-city-aerial.jpg"
            alt="Forbidden City, Beijing — CTS Tours Managing Director"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Lisa Li, MNZM</h1>
          <p className="text-lg">Managing Director, CTS Tours</p>
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
                  src="/images/lisa-li-portrait.jpg"
                  alt="Lisa Li, MNZM — Managing Director at CTS Tours New Zealand"
                  className="rounded-lg shadow-xl w-full relative z-10"
                />
              </div>
            </div>
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Lisa Li, MNZM</h2>
              <h3 className="text-xl text-primary mb-8 font-semibold">Managing Director, CTS Tours</h3>
              
              <div className="space-y-6 mb-8">
                <p className="text-gray-600 leading-relaxed">
                  Lisa's journey in travel didn't begin with a business plan — it began with a deep, personal connection to two very different worlds. Born in Qinghai and raised in Xi'an, she grew up surrounded by China's history, culture, and everyday life. After starting her career with China Travel Service, she moved to New Zealand in 1998 — a country that, at the time, felt quiet, open, and completely different from anything she had known.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  What started as a new chapter soon became a mission. In 2000, Lisa established the New Zealand branch of China Travel Service. Over the past 25 years, she has built it into one of the most trusted bridges between New Zealand and Asia — not just through business, but through relationships, understanding, and a genuine passion for connecting people through travel.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Having worked across both China and New Zealand for decades, Lisa understands travel from both sides — how it is experienced, and how it is delivered behind the scenes. This allows CTS Tours to go beyond standard itineraries, offering journeys that feel seamless, authentic, and thoughtfully designed.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  In 2025, Lisa was appointed a Member of the New Zealand Order of Merit (MNZM) in recognition of her contribution to the tourism industry. This prestigious honor reflects her dedication to building strong ties between New Zealand and Asia through travel.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Today, Lisa continues to shape the direction of CTS Tours with a clear focus: helping travellers experience Asia with confidence, and supporting travel agents with the insight and reliability that only comes from long-standing, on-the-ground expertise.
                </p>
              </div>
              
              <div className="bg-light p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-4">Expertise Areas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Business Strategy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Asia Travel</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tourism Development</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cross-Cultural Relations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Leadership</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Customer Experience</span>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Latest Insights</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Travel perspectives and industry insights from our Managing Director
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

export default LisaLiPage;