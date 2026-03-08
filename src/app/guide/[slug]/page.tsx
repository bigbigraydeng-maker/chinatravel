import { Metadata } from 'next';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// 静态文章数据
const articles = [
  {
    id: 1,
    title: 'Best Time to Visit China',
    slug: 'best-time-to-visit-china',
    content: 'The best time to visit China depends on the region and your interests. Spring (March to May) and autumn (September to November) are generally considered the best seasons, with mild weather and beautiful scenery. In spring, you can enjoy cherry blossoms in cities like Beijing and Shanghai, while autumn brings stunning foliage in areas like Jiuzhaigou and the Huangshan Mountains. Summer (June to August) can be hot and humid, especially in southern China, but it\'s a good time for mountain resorts and coastal areas. Winter (December to February) is cold in northern China, but it\'s the best time for skiing and winter festivals like the Harbin Ice and Snow Festival.',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20spring%20cherry%20blossoms&image_size=landscape_16_9',
    created_at: '2024-03-01'
  },
  {
    id: 2,
    title: 'China Visa Guide for New Zealanders',
    slug: 'china-visa-guide-for-new-zealanders',
    content: 'New Zealand citizens require a visa to enter China. The application process can be done online or through the Chinese Embassy. Make sure to apply well in advance of your trip. The standard tourist visa (L visa) is valid for 3 months and allows for a stay of up to 30 days. You will need to provide a completed application form, passport photos, your passport (valid for at least 6 months), and proof of travel arrangements. For longer stays or business trips, different visa types may be required. It\'s recommended to check the latest visa requirements on the Chinese Embassy website before applying.',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20visa%20application%20process&image_size=landscape_16_9',
    created_at: '2024-02-15'
  },
  {
    id: 3,
    title: 'Is China Safe to Travel?',
    slug: 'is-china-safe-to-travel',
    content: 'China is generally a safe country for tourists. Crime rates are low, and the local people are friendly and helpful. However, it\'s always important to take standard travel precautions. Keep an eye on your belongings in crowded areas, especially in tourist hotspots and public transportation. Be cautious when using ATMs and avoid carrying large amounts of cash. Follow local laws and customs, and be respectful of cultural differences. In case of emergency, you can contact the police at 110, ambulance at 120, and fire department at 119. It\'s also a good idea to register with your embassy before traveling.',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20safe%20travel%20tourist%20friendly&image_size=landscape_16_9',
    created_at: '2024-02-01'
  },
  {
    id: 4,
    title: 'Chinese Food Guide for Tourists',
    slug: 'chinese-food-guide-for-tourists',
    content: 'Chinese cuisine is diverse and delicious, with each region offering its own unique dishes. Some must-try dishes include Peking duck, dumplings, Kung Pao chicken, Mapo tofu, and hot pot. When dining out, it\'s common to share dishes family-style. Don\'t be afraid to try local specialties, but be aware that some dishes may be spicy. If you have dietary restrictions, it\'s helpful to carry a translation card. Also, tap water is not safe to drink, so stick to bottled water. Street food can be a great way to experience local flavors, but make sure to choose stalls that look clean and busy.',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20cuisine%20traditional%20dishes&image_size=landscape_16_9',
    created_at: '2024-01-20'
  },
  {
    id: 5,
    title: 'Transportation in China',
    slug: 'transportation-in-china',
    content: 'China has an extensive transportation network that makes it easy to travel between cities. High-speed trains are a popular and efficient way to travel, with routes connecting major cities. Flights are also available for longer distances. Within cities, public transportation is usually reliable and affordable, including buses, subways, and taxis. Ride-hailing apps like Didi are widely used in urban areas. For shorter distances, bicycles and e-bikes are common, and many cities have bike-sharing programs. When traveling in remote areas, local transportation may be more limited, so it\'s best to plan ahead.',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20high%20speed%20train%20modern%20transportation&image_size=landscape_16_9',
    created_at: '2024-01-10'
  },
  {
    id: 6,
    title: 'Cultural Etiquette in China',
    slug: 'cultural-etiquette-in-china',
    content: 'Understanding basic cultural etiquette can help you have a more enjoyable and respectful trip to China. Some important points to remember include: greeting people with a handshake or nod, using both hands when giving or receiving items, addressing people by their title or surname, avoiding public displays of affection, respecting elders, and being mindful of table manners. It\'s also important to be aware of cultural sensitivities, such as avoiding topics like politics or human rights. Learning a few basic Chinese phrases can also go a long way in showing respect and building connections with locals.',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20cultural%20etiquette%20traditional%20greeting&image_size=landscape_16_9',
    created_at: '2023-12-25'
  }
];

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  created_at: string;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articles.find((article) => article.slug === params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found - CTS Tours',
      description: 'The article you are looking for does not exist.',
    };
  }

  return {
    title: `${article.title} - CTS Tours`,
    description: article.content.substring(0, 160),
    keywords: ['China travel', 'China guide', article.title, 'CTS Tours'],
    openGraph: {
      title: `${article.title} - CTS Tours`,
      description: article.content.substring(0, 160),
      type: 'article',
      images: [
        {
          url: article.image_url,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

const GuideDetailPage = () => {
  const params = useParams<{ slug: string }>();
  const article = articles.find((article) => article.slug === params.slug);

  if (!article) {
    return (
      <div className="section bg-white">
        <div className="container text-center py-20">
          <h1 className="text-3xl font-bold mb-4 font-serif">Article Not Found</h1>
          <p className="text-lg mb-8">The article you are looking for does not exist.</p>
          <Link href="/guide" className="btn-primary">
            Back to Travel Guide
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero 区域 */}
      <section className="relative h-80 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={article.image_url} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">{article.title}</h1>
          <p className="text-lg">
            {new Date(article.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </section>

      {/* 文章内容 */}
      <section className="section bg-white">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <Link 
              href="/guide" 
              className="text-primary hover:underline inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Guide
            </Link>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed">{article.content}</p>
          </div>

          {/* 分享和互动 */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Share this article</h3>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white hover:bg-sky-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* 相关文章 */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold mb-6 font-serif">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles
                .filter((a) => a.slug !== article.slug)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Link 
                    key={relatedArticle.id} 
                    href={`/guide/${relatedArticle.slug}`}
                    className="group flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded">
                      <img 
                        src={relatedArticle.image_url} 
                        alt={relatedArticle.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(relatedArticle.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedArticle.content.substring(0, 80)}...
                      </p>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuideDetailPage;