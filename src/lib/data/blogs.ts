import type { BlogPost } from '@/lib/types/blog-post';
import { phase1TravelTipPosts } from '@/lib/data/blogs-phase1-travel-tips';
import { longtailBatch1Posts } from '@/lib/data/blogs-longtail-batch1';
import { seoT036ToT040BlogPosts } from '@/lib/data/blogs-seo-t036-t040';
import { chinaHolidayPackagesBlogPost } from '@/lib/data/blogs-china-holiday-packages';
import { migratedUnsplash } from '@/lib/site-media';

export type { BlogPost };

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'why-silk-road-should-be-your-next-adventure',
    title: 'Why the Silk Road Should Be Your Next Adventure',
    excerpt: 'I’m Baker Gu — here’s why I still believe the Silk Road belongs on your list, and how I design our Signature route through China’s western frontiers.',
    content: `
I’m **Baker Gu**, CTS’s China travel specialist. The Silk Road isn’t just a historical trade route to me — it’s a living museum of cultures, landscapes, and stories that I never get tired of showing people.

**A Journey Through Time**

From the ancient city of Kashgar, where Sunday markets have operated for over 2,000 years, to the Buddhist art of the Mogao Caves in Dunhuang, every stop on the Silk Road tells a story. This is where East met West, where merchants traded not just silk and spices, but ideas, religions, and technologies.

**What makes my Silk Road tour special**

My 14-day Signature Silk Road journey takes you beyond the typical tourist trail. You will:

- Explore the Rainbow Mountains of Zhangye, a geological wonder that looks like it was painted by an artist
- Ride camels through the Singing Sand Dunes at sunset
- Meet Uyghur families in Kashgar and experience their legendary hospitality
- Visit the Mogao Caves with an expert archaeologist who can decode the ancient murals

**Best Time to Visit**

The Silk Road is best experienced from April to October, when the weather is mild and the landscapes are at their most vibrant. Spring brings wildflowers to the desert, while autumn paints the poplar forests in golden hues.

**A Word from Baker**

*"I've travelled the Silk Road dozens of times, and it still takes my breath away. There's something magical about standing in a caravanserai where merchants rested a thousand years ago, knowing you're walking in their footsteps. This isn't just a tour—it's a pilgrimage through history."*

Ready to walk it with me? [Contact our team](/contact) and ask for Baker’s Silk Road — or browse [China Signature tours](/tours/china/signature).
    `,
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'destination',
    tags: ['Silk Road', 'Adventure', 'Cultural', 'Signature'],
    heroImage: migratedUnsplash('photo-1506905925346-21bda4d32df4'),
    publishedAt: '2026-03-15',
    readTime: '5 min read'
  },
  {
    id: 'blog-2',
    slug: 'giant-pandas-chengdu-complete-guide',
    title: 'Giant Pandas in Chengdu: A Complete Guide',
    excerpt: 'I’m Baker Gu — how I plan panda time in Chengdu, what I book for morning light, and the Signature experiences I add when clients ask for more than a quick look.',
    content: `
I’m **Baker Gu**. There are few wildlife moments I recommend as often as seeing giant pandas in Chengdu — the capital of Sichuan still offers the best opportunities to get close, if you time the day right.

**The Chengdu Research Base of Giant Panda Breeding**

This world-renowned facility is home to over 100 giant pandas and is the most popular destination for panda enthusiasts. The best time to visit is early morning (8-10am) when pandas are most active during their bamboo breakfast.

**Exclusive experiences I add**

On my Signature tours I fight for access most visitors never get:

- **Volunteer Programme**: Spend a day as a panda keeper, preparing bamboo and helping with daily care
- **Red Panda Encounter**: Get up close with the adorable (and equally endangered) red pandas
- **Behind-the-Scenes Tour**: Visit the nursery and learn about breeding programmes from researchers

**Beyond the Pandas**

Chengdu offers much more than just pandas. Don't miss:

- The spicy delights of authentic Sichuan hot pot
- Traditional tea houses where locals have gathered for centuries
- The ancient Jinli Street, perfect for evening strolls and souvenir shopping

**Baker\'s Insider Tip**

*"Most tourists rush through the panda base in two hours. I recommend spending at least half a day. The morning feeding is magical, but watching pandas nap in the afternoon bamboo groves is equally enchanting. And don't skip the red pandas—they're incredibly playful and often more active than their larger cousins."*

Planning your panda adventure? I slot Chengdu into routes like [Best of China — Discovery](/tours/china/discovery/essentials) or our [Chengdu stopover](/tours/china/stopover/chengdu) when you only have a few days.
    `,
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'experience',
    tags: ['Pandas', 'Chengdu', 'Wildlife', 'Family-Friendly'],
    heroImage: migratedUnsplash('photo-1564349683136-77e08dba1ef7'),
    publishedAt: '2026-03-10',
    readTime: '4 min read'
  },
  {
    id: 'blog-3',
    slug: 'first-time-china-travel-tips',
    title: 'First-Time China: 10 Essential Travel Tips',
    excerpt: 'Planning your first trip to China? Here are the essential tips every Kiwi traveller needs to know before they go.',
    content: `
China can seem daunting to first-time visitors, but with the right preparation, it becomes one of the most rewarding travel destinations on Earth. Here are my top tips for Kiwi travellers.

**1. Visa-Free Travel for NZ Citizens**

Good news! China has extended visa-free travel to 30 days for New Zealand passport holders until 31 December 2026. This makes now the perfect time to visit.

**2. Download the Right Apps**

Before you go, download:
- **Alipay** or **WeChat Pay** for payments (international cards now supported)
- **Baidu Maps** or **Gaode Maps** (Google Maps doesn't work well in China)
- **Pleco** for translation (works offline)

**3. Cash is Still King in Some Places**

While mobile payments are ubiquitous in cities, rural areas and smaller establishments still prefer cash. Always carry some RMB.

**4. The Great Firewall**

Many Western apps (Google, Facebook, Instagram) are blocked. If you need access, arrange a VPN before you travel—or better yet, embrace the digital detox!

**5. High-Speed Rail is a Game Changer**

China's bullet train network is world-class. The Beijing to Shanghai route (4.5 hours) is often more convenient than flying. Plus, you'll see the countryside.

**6. Food: Be Adventurous, But Smart**

Chinese cuisine varies dramatically by region. Try everything, but:
- Stick to busy restaurants (high turnover = fresh food)
- Bottled water only
- Peel fruits or wash with bottled water

**7. Learn Basic Mandarin**

A few phrases go a long way:
- Xièxie (thank you)
- Nǐ hǎo (hello)
- Duōshǎo qián? (how much?)

**8. Respect the Culture**

- Don't point with your finger—use your whole hand
- Don't stick chopsticks vertically in rice (it resembles funeral rites)
- Business cards should be given and received with both hands

**9. Toilet Paper**

Public restrooms often don't provide toilet paper. Always carry tissues.

**10. Book with a specialist (I mean it)**

China is vast — I have spent twenty-plus years learning which routes deserve your days and which are just brochure filler. I built CTS’s China programmes so I could stand behind every hotel move and guide call.

Ready to start? [Browse our tours](/tours) or [contact me and the team](/contact) for a straight conversation.
    `,
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'travel-tips',
    tags: ['First-Time', 'Tips', 'Practical', 'New Zealand'],
    heroImage: migratedUnsplash('photo-1508804185872-d7badad00f7d'),
    publishedAt: '2026-03-05',
    readTime: '6 min read'
  },
  {
    id: 'blog-4',
    slug: 'avatar-mountains-zhangjiajie-guide',
    title: 'The Real Avatar Mountains: Zhangjiajie Revealed',
    excerpt: 'I’m Baker Gu — how I plan Zhangjiajie so you see the Avatar peaks without wasting your legs on the wrong queue.',
    content: `
I’m **Baker Gu**. When James Cameron dreamed up Pandora’s floating mountains, he was looking at a real place: Zhangjiajie National Forest Park in Hunan — and I still get a jolt every time I take clients up there.

**The Inspiration**

The towering sandstone pillars, shrouded in mist, create an otherworldly landscape that seems to defy gravity. Over 3,000 narrow peaks rise from the forest floor, some reaching heights of 200 metres.

**Best Ways to Experience Zhangjiajie**

**Tianzi Mountain Cable Car**
Rise above the clouds for panoramic views of the peak forest. Morning visits offer the best chance to see the mountains emerging from mist.

**Zhangjiajie Grand Canyon Glass Bridge**
Not for the faint-hearted! This 430-metre glass bridge spans a canyon 300 metres deep. Walking across feels like floating in mid-air.

**Yuanjiajie (Avatar Hallelujah Mountain)**
The famous "Southern Sky Column" that inspired Avatar\'s floating mountains. A 326-metre elevator (Bailong Elevator) takes you to the top.

**Baker\'s Recommendation**

*"Zhangjiajie deserves at least two full days. Stay overnight in the park if possible—waking up to see the peaks emerge from morning mist is unforgettable. And don\'t miss Tianmen Mountain nearby—the 999 steps to Heaven\'s Gate are challenging but worth every step."*

**When to Visit**

April to October offers the best weather, though summer can be crowded. For photographers, the misty shoulder seasons (April-May, September-October) create the most atmospheric conditions.

Experience the peaks on my [Zhangjiajie stopover](/tours/china/stopover/zhangjiajie) or woven into a longer [Discovery or Signature](/tours/china/discovery) loop — tell me how many days you have.
    `,
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'destination',
    tags: ['Avatar Mountains', 'Zhangjiajie', 'Nature', 'Photography'],
    heroImage: migratedUnsplash('photo-1513415756790-2ac1db1297d0'),
    publishedAt: '2026-02-28',
    readTime: '4 min read'
  },
  {
    id: 'blog-5',
    slug: 'understanding-chinese-tea-culture',
    title: 'Understanding Chinese Tea Culture: A Journey Through the Leaf',
    excerpt: 'I’m Baker Gu — tea is how I slow clients down in China; here’s how I read the six great teas and where I take you on tour.',
    content: `
I’m **Baker Gu**. Tea is to China what wine is to France — not just a drink, but a way of life, and I use it to help travellers actually feel the country between temple visits.

**A Brief History**

Legend has it that Emperor Shen Nong discovered tea in 2737 BC when leaves from a wild tree blew into his pot of boiling water. Whether true or not, tea has been central to Chinese culture for millennia.

**The Six Great Teas**

1. **Green Tea (Longjing)** - Unoxidised, fresh and grassy. Hangzhou\'s Dragon Well is the most famous.
2. **Black Tea (Hong Cha)** - Fully oxidised, rich and malty. Keemun is a classic.
3. **Oolong** - Semi-oxidised, complex and aromatic. Tieguanyin from Fujian is renowned.
4. **White Tea** - Minimally processed, delicate. Silver Needle is the premium variety.
5. **Pu-erh** - Fermented and aged, earthy and complex. Yunnan\'s specialty.
6. **Yellow Tea** - Rare and subtle, similar to green but with a unique processing method.

**Where I take you on my tours**

- **Hangzhou**: Dragon Well plantations — I like you to see leaves picked and fired
- **Chengdu**: Old tea houses where locals play mahjong — I use it as a breathing day
- **Fujian**: When we build a longer east coast arc, I chase Oolong country in the Wuyi foothills

**The Gongfu Tea Ceremony**

This traditional brewing method, originating in Fujian and Guangdong, is an art form. Small teapots, multiple short infusions, and careful attention to water temperature bring out the best in each tea.

**Baker\'s Tip**

*"In China, tea is never rushed. When a host refills your cup, tap the table with two fingers—it\'s a silent thank you. And never let your guest\'s cup go empty. These small gestures show respect and understanding of the culture."*

Walk it with me on [Imperial Heritage — Signature](/tours/china/signature/imperial-heritage) or tell me your dates and I will weave tea stops into your route.
    `,
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'culture',
    tags: ['Tea', 'Culture', 'Hangzhou', 'Tradition'],
    heroImage: migratedUnsplash('photo-1556679343-c7306c1976bc'),
    publishedAt: '2026-02-20',
    readTime: '5 min read'
  },
  chinaHolidayPackagesBlogPost,
  ...seoT036ToT040BlogPosts,
  ...phase1TravelTipPosts,
  ...longtailBatch1Posts,
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: BlogPost['category']): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getRecentBlogPosts = (limit: number = 3): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

export const getAllBlogPosts = (): BlogPost[] => {
  return [...blogPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};
