import { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';

// Static travel guide articles
const articles = [
  {
    id: 1,
    title: 'Best Time to Visit China: A Month-by-Month Guide',
    slug: 'best-time-to-visit-china',
    content: 'Spring (March–May) and autumn (September–November) are the best seasons to visit China. Spring brings mild temperatures and cherry blossoms in Beijing and Shanghai, while autumn offers golden foliage at Jiuzhaigou and Huangshan. Summer is ideal for mountain resorts like Zhangjiajie. Winter is perfect for the Harbin Ice Festival and crowd-free UNESCO heritage sites. Planning your visit around the Golden Week holidays (1–7 October) can help you avoid the busiest periods. Our expert-guided China tours are available year-round and tailored to seasonal highlights.',
    image_url: '/images/tours/great-wall-green.jpg',
    created_at: '2024-03-01'
  },
  {
    id: 2,
    title: 'China Visa Guide for New Zealand Travellers',
    slug: 'china-visa-guide-for-new-zealanders',
    content: 'New Zealand citizens need a tourist visa (L visa) to enter China. Apply through the Chinese Visa Application Service Centre in Auckland with your passport, completed application form, two photos, and proof of onward travel. Standard processing takes 4–5 business days. The L visa is typically valid for 60–90 days with stays of up to 30 days per entry. For group tours, your travel specialist can assist with supporting documentation. CTS Tours helps New Zealand travellers prepare complete, accurate applications to avoid delays.',
    image_url: '/images/tours/forbidden-city-aerial.jpg',
    created_at: '2024-02-15'
  },
  {
    id: 3,
    title: 'Is China Safe to Travel? What New Zealanders Need to Know',
    slug: 'is-china-safe-to-travel',
    content: 'China is one of the safest countries in Asia for international tourists. Violent crime rates are very low, and locals are generally welcoming to foreign visitors. Keep valuables secure in crowded areas like train stations and markets. Use licensed taxis or ride-hailing apps such as Didi. In an emergency, dial 110 (police), 120 (ambulance), or 119 (fire). Register with the New Zealand Embassy in Beijing before departure. Travelling with a reputable guided tour company like CTS Tours gives you experienced local guides and 24/7 on-the-ground support throughout your trip.',
    image_url: '/images/tours/shanghai-night-blue.jpg',
    created_at: '2024-02-01'
  },
  {
    id: 4,
    title: 'Chinese Food Guide: Must-Try Dishes by Region',
    slug: 'chinese-food-guide-for-tourists',
    content: 'Chinese cuisine varies dramatically by region. In Beijing, try Peking duck and zhajiangmian noodles. Shanghai is famous for xiaolongbao soup dumplings and hairy crab. Sichuan dishes like mapo tofu and hotpot are boldly spiced. Cantonese dim sum is a must in Guangzhou. Street food markets in Xi\'an serve lamb skewers and roujiamo sandwiches. Vegetarians will find ample options at Buddhist temple restaurants throughout the country. All CTS guided tours include curated dining experiences that showcase authentic local cuisine.',
    image_url: '/images/tours/chengdu-old-town.jpg',
    created_at: '2024-01-20'
  },
  {
    id: 5,
    title: 'Getting Around China: High-Speed Rail, Flights & More',
    slug: 'transportation-in-china',
    content: 'China\'s 40,000 km high-speed rail network connects all major cities efficiently and affordably. Beijing to Shanghai takes just 4.5 hours by G-class train. Domestic flights are practical for longer distances such as Beijing to Chengdu or Shanghai to Guilin. Within cities, subway systems in Beijing, Shanghai, and Chengdu are modern, affordable, and easy to navigate with English signage. Didi (China\'s Uber) works with international payment cards. CTS Tours handles all inter-city transfers, train bookings, and private airport transfers so you can focus on the experience.',
    image_url: '/images/tours/beijing-temple.jpg',
    created_at: '2024-01-10'
  },
  {
    id: 6,
    title: 'China Cultural Etiquette: Essential Tips for First-Time Visitors',
    slug: 'cultural-etiquette-in-china',
    content: 'Understanding Chinese etiquette will enrich your travel experience and build goodwill with locals. Greet with a nod or light handshake. Present business cards and gifts with both hands. Remove shoes before entering homes. Avoid pointing chopsticks upright in rice — it resembles funeral incense. Tipping is not customary and can sometimes cause offence. Loud or confrontational behaviour in public is frowned upon. Learning a few Mandarin phrases — nǐ hǎo (hello), xièxiè (thank you) — goes a long way. Our guides provide cultural briefings before each major destination.',
    image_url: '/images/tours/beijing-temple-2.jpg',
    created_at: '2023-12-25'
  }
];

export const metadata: Metadata = {
  title: 'China Travel Guide 2024 | Tips, Visas & Culture | CTS Tours New Zealand',
  description: 'Your complete China travel guide from CTS Tours New Zealand. Expert advice on the best time to visit China, visa requirements for New Zealanders, Chinese food, transport, safety, and cultural etiquette.',
  keywords: [
    'China travel guide',
    'China travel tips for New Zealanders',
    'best time to visit China',
    'China visa New Zealand',
    'China holiday guide',
    'China culture etiquette',
    'CTS Tours New Zealand',
    'travel to China from NZ',
    'China tour information',
    'China tourism guide 2024'
  ],
  openGraph: {
    title: 'China Travel Guide 2024 | CTS Tours New Zealand',
    description: 'Expert travel tips, visa advice, cultural etiquette, food guides, and transport information for New Zealanders visiting China.',
    type: 'website',
  },
};

const GuidePage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-64 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/baker-gu-guilin.jpg"
            alt="Guilin Li River landscape — China travel guide by CTS Tours"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-55"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">China Travel Guide</h1>
          <p className="text-lg">Expert tips and essential information for travelling to China from New Zealand</p>
        </div>
      </section>

      {/* Article grid */}
      <section className="section bg-white">
        <div className="container">
          <SectionTitle subtitle="Resources" title="Plan Your China Adventure" center />
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10 -mt-4">
            From visa applications to cultural etiquette, our China travel specialists share insider knowledge to help you make the most of your journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/guide/${article.slug}`}
                className="block group"
              >
                <div className="overflow-hidden rounded-lg shadow-md mb-4">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2 font-serif group-hover:text-primary transition-colors">{article.title}</h2>
                  <p className="text-gray-600 mb-4">{article.content.substring(0, 110)}...</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {new Date(article.created_at).toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <div className="text-primary hover:underline inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuidePage;
