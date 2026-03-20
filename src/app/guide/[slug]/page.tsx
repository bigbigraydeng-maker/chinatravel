import { Metadata } from 'next';
import Link from 'next/link';

const articles = [
  {
    id: 1,
    title: 'Best Time to Visit China: A Month-by-Month Guide',
    slug: 'best-time-to-visit-china',
    content: `Spring (March–May) and autumn (September–November) are widely regarded as the best times to visit China. During spring, temperatures are mild across most of the country, cherry blossoms bloom in Beijing and Shanghai, and the famous peach blossoms of Guilin create spectacular pink-tinged landscapes. Autumn delivers crisp, clear skies and vibrant foliage — Jiuzhaigou in Sichuan and Huangshan in Anhui are particularly stunning from late September through October.

Summer (June–August) is hot and humid in most regions, but it's an excellent time for mountain retreats such as Zhangjiajie, Huangshan, and Emei Shan, where cooler temperatures provide welcome relief. Coastal destinations like Qingdao and Sanya are also popular in summer. Be prepared for occasional heavy rain during the summer monsoon season.

Winter (December–February) is cold in northern China, but it unlocks unique experiences. The Harbin International Ice and Snow Festival (January–February) is one of the world's most spectacular winter events. Tibet and Yunnan remain relatively mild, and major UNESCO heritage sites like the Forbidden City and Xi'an's Terracotta Warriors see far fewer visitors.

One important planning note: China's Golden Week holidays — National Day (1–7 October) and Chinese New Year (late January or February) — bring enormous domestic travel crowds. We recommend avoiding these periods or booking well in advance. CTS Tours plans itineraries around seasonal highlights to ensure you experience China at its absolute best.`,
    image_url: '/images/tours/great-wall-green.jpg',
    created_at: '2024-03-01'
  },
  {
    id: 2,
    title: 'China Visa Guide for New Zealand Travellers',
    slug: 'china-visa-guide-for-new-zealanders',
    content: `New Zealand passport holders require a visa to enter mainland China. The most common type for leisure travel is the L visa (tourist visa), which allows a stay of up to 30 days per entry and is typically issued with 60 or 90-day validity from the date of issue.

To apply, visit the Chinese Visa Application Service Centre (CVASC) in Auckland. You will need to submit: a completed visa application form, one recent passport-sized photo, your original passport (valid for at least six months beyond your intended stay), and proof of onward or return travel. If you are booking a guided tour, your CTS Tours specialist can provide a confirmation letter to support your application.

Standard processing takes 4–5 business days. Express and urgent processing are available for an additional fee. The standard L visa application fee for New Zealand citizens is approximately NZD $170–$200, subject to change.

For travellers planning to stay longer, visit multiple times, or travel for business, other visa categories include: the M visa (business), F visa (exchange/non-commercial), and X visa (study). China also offers a 144-hour visa-free transit policy for travellers transiting through certain major airports including Beijing, Shanghai, and Guangzhou — useful if you are connecting to another destination.

We recommend applying at least three to four weeks before your departure to allow time for any additional document requests. CTS Tours is happy to assist with the documentation you need to submit a complete, accurate application.`,
    image_url: '/images/tours/forbidden-city-aerial.jpg',
    created_at: '2024-02-15'
  },
  {
    id: 3,
    title: 'Is China Safe to Travel? What New Zealanders Need to Know',
    slug: 'is-china-safe-to-travel',
    content: `China is consistently rated as one of the safest countries in Asia for international tourists. Violent crime against foreign visitors is rare, and cities like Beijing, Shanghai, Chengdu, and Xi'an have extensive public surveillance systems that contribute to high levels of street safety.

That said, standard travel precautions apply. Pickpocketing can occur in crowded tourist areas, busy markets, and on public transport — keep valuables in a secure inner pocket or money belt. Be cautious at busy train stations and airport arrival halls. Use only officially licensed taxis or ride-hailing apps (Didi is the most widely used, and it works with international payment cards).

Emergency contacts to save before you travel: Police — 110, Ambulance — 120, Fire — 119. The New Zealand Embassy in Beijing (+86 10 8531 9900) and the Consulate-General in Shanghai (+86 21 5407 5858) can provide consular assistance if needed. We recommend registering your travel with Safe Travel NZ (safetravel.govt.nz) before departure.

Internet access is restricted in China — Google, Facebook, Instagram, WhatsApp, and many international news sites are blocked. Download a reputable VPN before you leave New Zealand if you need access to these services. WeChat is the dominant messaging and payment app in China and worth installing in advance.

Travelling with a guided tour company like CTS Tours gives you the added security of experienced local guides and 24/7 on-the-ground support throughout your journey, ensuring that any unexpected situations are handled promptly and professionally.`,
    image_url: '/images/tours/shanghai-night-blue.jpg',
    created_at: '2024-02-01'
  },
  {
    id: 4,
    title: 'Chinese Food Guide: Must-Try Dishes by Region',
    slug: 'chinese-food-guide-for-tourists',
    content: `One of the greatest pleasures of travelling in China is the extraordinary diversity of its regional cuisines. Food varies dramatically from province to province — what you eat in Beijing bears little resemblance to the cuisine of Sichuan or Guangdong.

In Beijing, the must-try dish is Peking roast duck (北京烤鸭), served with thin pancakes, spring onion, cucumber, and hoisin sauce. Zhajiangmian (noodles in fermented soybean paste) and jianbing (savoury crepes) are popular street breakfasts. In Shanghai, xiaolongbao (soup dumplings) and hairy crab (in season October–November) are iconic. Shanghai cuisine tends to be sweeter and uses more braising and red-cooking techniques.

Sichuan food is famous for its bold, fiery flavours powered by Sichuan peppercorns. Mapo tofu, dan dan noodles, and Sichuan hotpot are all essential experiences. In Guangdong (Cantonese cuisine), dim sum brunch is a cultural ritual — steamed dumplings, char siu bao (BBQ pork buns), and turnip cake are highlights. Xi'an's Muslim Quarter is home to lamb skewers, roujiamo (Chinese burger), and biangbiang noodles.

Practical tips: tap water is not safe to drink — stick to bottled water or boiled water provided by your hotel. Vegetarians can find dedicated Buddhist vegetarian restaurants in most major cities. If you have food allergies, carry a written card in Chinese listing your restrictions. CTS Tours includes carefully selected restaurant experiences in all itineraries, giving you a curated taste of each region's best dishes.`,
    image_url: '/images/tours/chengdu-old-town.jpg',
    created_at: '2024-01-20'
  },
  {
    id: 5,
    title: 'Getting Around China: High-Speed Rail, Flights & More',
    slug: 'transportation-in-china',
    content: `China has built one of the most impressive transportation networks in the world, making it easier than ever to travel efficiently between its major destinations.

High-speed rail (高铁, gāotiě) is the standout option for inter-city travel. China's network now exceeds 40,000 km — the longest in the world. G-class trains (the fastest, reaching 350 km/h) connect Beijing to Shanghai in just 4.5 hours, Beijing to Xi'an in around 4.5 hours, and Shanghai to Hangzhou in under an hour. Trains are clean, punctual, and offer first and second-class seating. Booking in advance is recommended during peak periods.

For longer distances — such as Beijing to Chengdu, Shanghai to Guilin, or any route to Tibet — domestic flights are the practical choice. China has dozens of airlines and hundreds of domestic routes, with competitive pricing when booked in advance. Note that flights to Tibet require a Tibet Travel Permit in addition to your visa, which CTS Tours arranges on your behalf.

Within cities, metro systems in Beijing, Shanghai, Guangzhou, Chengdu, and other major cities are modern, affordable, and fully signposted in English. Didi (the Chinese equivalent of Uber) works with international Visa and Mastercard via the app's international version. Licensed metered taxis are available everywhere — always insist the driver uses the meter.

CTS Tours takes care of all logistics: inter-city train or flight bookings, private airport and hotel transfers, and local transportation throughout your itinerary. You simply show up and enjoy the journey.`,
    image_url: '/images/tours/beijing-temple.jpg',
    created_at: '2024-01-10'
  },
  {
    id: 6,
    title: 'China Cultural Etiquette: Essential Tips for First-Time Visitors',
    slug: 'cultural-etiquette-in-china',
    content: `Understanding a few key aspects of Chinese culture and etiquette will make your trip more enjoyable, help you build rapport with locals, and show respect for the country's rich traditions.

Greetings and social customs: A nod or a light handshake is the standard greeting. Bowing, as in Japan, is not customary. When exchanging business cards or presenting a gift, offer and receive with both hands as a sign of respect. Address people by their title and surname (e.g., "Manager Zhang" or "Dr. Li") rather than using first names unless invited to do so.

Dining etiquette: Meals in China are typically shared family-style, with dishes placed in the centre of the table. It is considered good manners to serve others before yourself. Do not point chopsticks at others or stand them upright in a bowl of rice — both are considered impolite. Tipping is not customary in mainland China and can sometimes cause confusion or mild offence, especially in local restaurants.

In public spaces: Loud behaviour, raised voices, or public confrontations are generally frowned upon. Queue etiquette is improving in major cities but can be informal in smaller towns. Dress modestly when visiting temples and religious sites — shoulders and knees should be covered.

Language: Learning a handful of Mandarin phrases will be warmly received. Nǐ hǎo (你好) means hello, xièxiè (谢谢) means thank you, and duìbuqǐ (对不起) means sorry or excuse me. Most signage in tourist areas is bilingual, and translation apps work well for everyday communication.

CTS Tours guides provide cultural briefings at the start of each destination, ensuring you feel confident and respectful throughout your journey.`,
    image_url: '/images/tours/beijing-temple-2.jpg',
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
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return {
      title: 'Article Not Found - CTS Tours',
      description: 'The article you are looking for does not exist.',
    };
  }

  const firstSentences = article.content.substring(0, 160).replace(/\n/g, ' ');

  return {
    title: `${article.title} | CTS Tours New Zealand`,
    description: firstSentences,
    keywords: ['China travel', 'China guide', article.title, 'CTS Tours New Zealand', 'China travel tips NZ'],
    openGraph: {
      title: `${article.title} | CTS Tours New Zealand`,
      description: firstSentences,
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

const GuideDetailPage = ({ params }: { params: { slug: string } }) => {
  const article = articles.find((a) => a.slug === params.slug);

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

  const paragraphs = article.content.split('\n\n').filter(Boolean);

  return (
    <div>
      {/* Hero */}
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
            {new Date(article.created_at).toLocaleDateString('en-NZ', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </section>

      {/* Article content */}
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
              Back to Travel Guide
            </Link>
          </div>

          <div className="prose prose-lg max-w-none">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-6">{para}</p>
            ))}
          </div>

          {/* Share */}
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
                  <path d="M0 0h24v24H0z" fill="none"/><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.016 7.536h-1.67c-.197 0-.416.26-.416.605V9.3h2.086l-.28 2.107h-1.806V18h-2.395v-6.593H11v-2.107h1.535V7.93c0-1.524.952-2.356 2.313-2.356.658 0 1.223.05 1.168.05v1.912z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Related articles */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold mb-6 font-serif">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles
                .filter((a) => a.slug !== article.slug)
                .slice(0, 2)
                .map((related) => (
                  <Link
                    key={related.id}
                    href={`/guide/${related.slug}`}
                    className="group flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded">
                      <img
                        src={related.image_url}
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {related.title}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(related.created_at).toLocaleDateString('en-NZ')}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {related.content.substring(0, 80)}...
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuideDetailPage;
