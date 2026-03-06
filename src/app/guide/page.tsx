import { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';

// 静态文章数据
const articles = [
  {
    id: 1,
    title: 'Best Time to Visit China',
    content: 'The best time to visit China depends on the region and your interests. Spring (March to May) and autumn (September to November) are generally considered the best seasons, with mild weather and beautiful scenery. In spring, you can enjoy cherry blossoms in cities like Beijing and Shanghai, while autumn brings stunning foliage in areas like Jiuzhaigou and the Huangshan Mountains. Summer (June to August) can be hot and humid, especially in southern China, but it\'s a good time for mountain resorts and coastal areas. Winter (December to February) is cold in northern China, but it\'s the best time for skiing and winter festivals like the Harbin Ice and Snow Festival.',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20spring%20cherry%20blossoms&image_size=landscape_16_9',
    created_at: '2024-03-01'
  },
  {
    id: 2,
    title: 'China Visa Guide for New Zealanders',
    content: 'New Zealand citizens require a visa to enter China. The application process can be done online or through the Chinese Embassy. Make sure to apply well in advance of your trip. The standard tourist visa (L visa) is valid for 3 months and allows for a stay of up to 30 days. You will need to provide a completed application form, passport photos, your passport (valid for at least 6 months), and proof of travel arrangements. For longer stays or business trips, different visa types may be required. It\'s recommended to check the latest visa requirements on the Chinese Embassy website before applying.',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20visa%20application%20process&image_size=landscape_16_9',
    created_at: '2024-02-15'
  },
  {
    id: 3,
    title: 'Is China Safe to Travel?',
    content: 'China is generally a safe country for tourists. Crime rates are low, and the local people are friendly and helpful. However, it\'s always important to take standard travel precautions. Keep an eye on your belongings in crowded areas, especially in tourist hotspots and public transportation. Be cautious when using ATMs and avoid carrying large amounts of cash. Follow local laws and customs, and be respectful of cultural differences. In case of emergency, you can contact the police at 110, ambulance at 120, and fire department at 119. It\'s also a good idea to register with your embassy before traveling.',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20safe%20travel%20tourist%20friendly&image_size=landscape_16_9',
    created_at: '2024-02-01'
  },
  {
    id: 4,
    title: 'Chinese Food Guide for Tourists',
    content: 'Chinese cuisine is diverse and delicious, with each region offering its own unique dishes. Some must-try dishes include Peking duck, dumplings, Kung Pao chicken, Mapo tofu, and hot pot. When dining out, it\'s common to share dishes family-style. Don\'t be afraid to try local specialties, but be aware that some dishes may be spicy. If you have dietary restrictions, it\'s helpful to carry a translation card. Also, tap water is not safe to drink, so stick to bottled water. Street food can be a great way to experience local flavors, but make sure to choose stalls that look clean and busy.',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20cuisine%20traditional%20dishes&image_size=landscape_16_9',
    created_at: '2024-01-20'
  },
  {
    id: 5,
    title: 'Transportation in China',
    content: 'China has an extensive transportation network that makes it easy to travel between cities. High-speed trains are a popular and efficient way to travel, with routes connecting major cities. Flights are also available for longer distances. Within cities, public transportation is usually reliable and affordable, including buses, subways, and taxis. Ride-hailing apps like Didi are widely used in urban areas. For shorter distances, bicycles and e-bikes are common, and many cities have bike-sharing programs. When traveling in remote areas, local transportation may be more limited, so it\'s best to plan ahead.',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20high%20speed%20train%20modern%20transportation&image_size=landscape_16_9',
    created_at: '2024-01-10'
  },
  {
    id: 6,
    title: 'Cultural Etiquette in China',
    content: 'Understanding basic cultural etiquette can help you have a more enjoyable and respectful trip to China. Some important points to remember include: greeting people with a handshake or nod, using both hands when giving or receiving items, addressing people by their title or surname, avoiding public displays of affection, respecting elders, and being mindful of table manners. It\'s also important to be aware of cultural sensitivities, such as avoiding topics like politics or human rights. Learning a few basic Chinese phrases can also go a long way in showing respect and building connections with locals.',
    image_url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20cultural%20etiquette%20traditional%20greeting&image_size=landscape_16_9',
    created_at: '2023-12-25'
  }
];

export const metadata: Metadata = {
  title: 'China Travel Guide - CTS Tours',
  description: 'Essential information and tips for traveling to China, from cultural insights to practical advice.',
  keywords: ['China travel guide', 'China travel tips', 'China culture', 'China travel information', 'CTS Tours'],
  openGraph: {
    title: 'China Travel Guide - CTS Tours',
    description: 'Essential information and tips for traveling to China, from cultural insights to practical advice.',
    type: 'website',
  },
};

const GuidePage = () => {
  return (
    <div>
      {/* Hero 小头图 */}
      <section className="relative h-64 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=China%20travel%20guide%20cultural%20landscape&image_size=landscape_16_9" 
            alt="China Travel Guide" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">China Travel Guide</h1>
          <p className="text-lg">Essential information and tips for traveling to China</p>
        </div>
      </section>

      {/* 文章卡片网格 */}
      <section className="section bg-white">
        <div className="container">
          <SectionTitle subtitle="Resources" title="China Travel Guide" center />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="group">
                <div className="overflow-hidden rounded-lg shadow-md mb-4">
                  <img 
                    src={article.image_url} 
                    alt={article.title} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 font-serif">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.content.substring(0, 100)}...</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {new Date(article.created_at).toLocaleDateString()}
                  </p>
                  <Link href="#" className="text-primary hover:underline inline-flex items-center gap-2">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuidePage;