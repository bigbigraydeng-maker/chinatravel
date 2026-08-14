import type { BlogPost } from '@/lib/types/blog-post';
import { phase1TravelTipPosts } from '@/lib/data/blogs-phase1-travel-tips';
import { longtailBatch1Posts } from '@/lib/data/blogs-longtail-batch1';
import { longtailBatch2Posts } from '@/lib/data/blogs-longtail-batch2';
import { seoT036ToT040BlogPosts } from '@/lib/data/blogs-seo-t036-t040';
import { phase3LineAPosts } from '@/lib/data/blogs-phase3-line-a';
import { phase3LineBPosts } from '@/lib/data/blogs-phase3-line-b';
import { phase3LineCPosts } from '@/lib/data/blogs-phase3-line-c';
import { chinaHolidayPackagesBlogPost } from '@/lib/data/blogs-china-holiday-packages';
import { holidaysToChinaFromNewZealandPost } from '@/lib/data/blogs-cts-blog-2026-06-11-holidays';
import { chinaTourPackagesIncludingAirfareFromNzPost } from '@/lib/data/blogs-cts-blog-2026-06-11-airfare';
import { longtailBatch3Posts } from '@/lib/data/blogs-longtail-batch3';
import { chongqingVsChengduPost } from '@/lib/data/blogs-chongqing-vs-chengdu';
import { howManyDaysInChongqingPost } from '@/lib/data/blogs-how-many-days-in-chongqing';
import { yangtzeRiverCruiseFromChongqingPost } from '@/lib/data/blogs-yangtze-river-cruise-from-chongqing';
import { lizibaMonorailGuidePost } from '@/lib/data/blogs-liziba-monorail-guide';
import { migratedUnsplash, tourImage } from '@/lib/site-media';

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
    heroImage: tourImage('silk-road-wall.jpg'),
    publishedAt: '2026-03-15',
    readTime: '5 min read'
  },
  {
    id: 'blog-2',
    slug: 'giant-pandas-chengdu-complete-guide',
    title: 'Giant Pandas in Chengdu: A Complete Guide',
    excerpt: 'I’m Baker Gu — how I plan panda time in Chengdu, what I book for morning light, and the Signature experiences I add when clients ask for more than a quick look.',
    faqs: [
      {
        question: 'Where is the best place to see giant pandas in China?',
        answer: 'The Chengdu Research Base of Giant Panda Breeding, on the northern edge of Chengdu, is the world\'s leading panda facility and the most reliable place to see pandas of every age — including cubs in the nursery. It is a serious conservation and research centre that admits visitors, not a zoo.'
      },
      {
        question: 'What time should I visit the Chengdu Panda Base?',
        answer: 'Arrive when the gates open — 7:30am from March to October, 8:00am in winter. Pandas are most active during the morning bamboo feed between about 8:30 and 10:30am; by early afternoon most are asleep. The difference between a 8am visit and an 11am visit is enormous.'
      },
      {
        question: 'How much do Chengdu Panda Base tickets cost?',
        answer: 'The standard adult ticket is around 55 yuan — roughly NZD 13. Children under 6 enter free, ages 6 to 17 half price, and visitors over 60 free with a passport. Tickets are real-name (passport number) and can be reserved up to 14 days ahead on the official site; on CTS tours we arrange them for the group.'
      },
      {
        question: 'How long do you need at the panda base?',
        answer: 'Plan on half a day. The base is large and walking-oriented — allow three to four hours to see the adult enclosures, the sub-adult \'kindergarten\' and the nursery without rushing, plus time for the red pandas. Two hours is possible but feels like a sprint.'
      },
      {
        question: 'Can you hold a panda in Chengdu?',
        answer: 'No. Close-contact photo sessions were ended for animal welfare reasons and no reputable facility offers panda holding. Volunteer keeper-for-a-day programmes at facilities outside the city, such as Dujiangyan Panda Valley, are the closest ethical alternative — you help prepare food and clean enclosures, observing at close range without contact.'
      },
    ],
    content: `
I'm **Baker Gu**. There are few wildlife moments I recommend as often as seeing giant pandas in Chengdu — the Sichuan capital remains the best place on earth to watch pandas at close range, if you time the day right. This is my complete guide: where to go, when to arrive, what it costs, and how to get more than the standard two-hour walk-through.

## Where Do You Actually See Pandas in Chengdu?

The **Chengdu Research Base of Giant Panda Breeding** sits on a forested ridge about 10 km north of the city centre. It is the flagship of China's panda programme — home to more than one hundred giant pandas across large bamboo-planted enclosures, with a nursery, research buildings, and a resident population of red pandas. It is a working conservation institution that admits the public, and the difference from a zoo shows: the animals live in big semi-natural habitats, and the science is happening on site.

Getting there is easy: 30 to 40 minutes by taxi or DiDi from central Chengdu, or Metro Line 3 to Panda Avenue then the shuttle. On tour, your coach delivers you to the gate at opening time — which matters more than any other detail in this guide.

## When Should I Go?

**At opening, always.** Gates open at 7:30am from March to October and 8:00am from November to February, with the park cleared at 6:00pm. Pandas eat their main bamboo meal between roughly 8:30 and 10:30am, and that feeding window is when they are genuinely active — climbing, tumbling, jockeying for the best stalks. By early afternoon nearly every adult is asleep in a tree fork, and an 11am arrival sees a park of black-and-white cushions.

Season matters less than time of day, but cooler months help: pandas are built for cold and dislike heat, so on warm days (over about 26 degrees) they retreat indoors to air conditioning by mid-morning. In July and August, treat 7:30 to 10am as the entire visit. September to May is more forgiving.

## What Does It Cost and How Do Tickets Work?

The standard adult ticket is around **55 yuan — roughly NZD 13** — with children under 6 free, ages 6 to 17 half price, and over-60s free on presentation of a passport. Entry is by **real-name reservation**: every ticket is linked to a passport number, bookable up to 14 days ahead on the [official ticketing site](https://m.panda.org.cn/en/service/ticket/), and you show the passport at the gate. On busy dates — Chinese public holidays especially — tickets sell out days ahead.

On CTS tours the reservations are made for the whole group as soon as your booking is confirmed, which is one less thing to manage in Chinese.

## How Should I Plan the Morning?

Walk uphill first, straight to the far enclosures while the crowds pool near the entrance, then work back down. Priorities in order:

- **The adult and sub-adult enclosures** during the morning feed — the heart of the visit
- **The nursery** — depending on season, cubs from incubator-size to tumbling toddlers
- **The 'kindergarten'** — juveniles housed together, reliably the most entertaining animals on the site
- **The red pandas** — quicker, closer and more active than their famous cousins; do not skip them

Allow three to four hours on foot. Paths are well made but the site is genuinely hilly; a shuttle cart runs the main loop for a few yuan if anyone in your group needs it.

## Can I Get Closer — Volunteering and Beyond?

Holding a panda is no longer possible anywhere reputable; the photo sessions were ended on welfare grounds, and I consider that a good thing. The ethical alternative is a **keeper-for-a-day volunteer programme** at one of the bases outside the city — most commonly **Dujiangyan Panda Valley**, about 90 minutes from Chengdu — where you spend the day preparing bamboo and panda cakes, cleaning enclosures, and observing at close range. It books out well ahead; tell us early and we build it into your itinerary as a full-day extension.

## What Else Fits Around the Pandas?

Chengdu deserves more than a panda stopover. The classic pairing is pandas at dawn, then an afternoon in the old lanes and teahouses — see my guide to [things to do in Chengdu beyond the pandas](/blog/chengdu-things-to-do). Food is the city's other headline: Chengdu is a UNESCO City of Gastronomy, and my [Sichuan food guide](/blog/chengdu-spicy-cuisine-culture) covers what to eat and where. With an extra day, the [Leshan Giant Buddha](/blog/leshan-giant-buddha-day-trip) makes an outstanding day trip.

**Baker's insider tip:** most visitors give the base two hours and sprint the main loop. Give it the half day. The morning feed is the spectacle, but the slow hour afterwards — pandas drowsing into nap position in the bamboo groves — is the part my clients talk about at dinner.

## Seeing the Pandas With CTS

Every CTS itinerary that touches Sichuan builds the panda base in at opening time with tickets pre-arranged — see our [Chengdu panda sanctuary page](/chengdu-panda-sanctuary) for how it works on tour. I slot Chengdu into routes like [Best of China — Discovery](/tours/china/discovery/essentials) or our [Chengdu stopover](/tours/china/stopover/chengdu) when you only have a few days, and our full [Chengdu tours](/chengdu-tours) page lists every departure.
    `,
    author: 'Baker Gu',
    authorRole: 'China Travel Specialist',
    category: 'experience',
    tags: ['Pandas', 'Chengdu', 'Wildlife', 'Family-Friendly'],
    heroImage: '/blog/sourced/chengdu-panda-base-pandas-climbing.jpg',
    heroImageCredit: 'Photo: Jimmyshjj, CC BY-SA 4.0, via Wikimedia Commons',
    publishedAt: '2026-03-10',
    readTime: '8 min read'
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
    heroImage: tourImage('shangri-la-monastery-lake.jpg'),
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
    heroImage: '/images/tours/tianmen-mountain-glass-walkway.jpg',
    publishedAt: '2026-02-28',
    readTime: '4 min read'
  },
  {
    id: 'blog-5',
    slug: 'understanding-chinese-tea-culture',
    title: 'Chinese Tea Culture: A Journey Through the Leaf',
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
    heroImage: tourImage('shanghai-yuyuan-night.jpg'),
    publishedAt: '2026-02-20',
    readTime: '5 min read'
  },
  chinaHolidayPackagesBlogPost,
  holidaysToChinaFromNewZealandPost,
  chinaTourPackagesIncludingAirfareFromNzPost,
  chongqingVsChengduPost,
  howManyDaysInChongqingPost,
  yangtzeRiverCruiseFromChongqingPost,
  lizibaMonorailGuidePost,
  ...seoT036ToT040BlogPosts,
  ...phase1TravelTipPosts,
  ...longtailBatch1Posts,
  ...longtailBatch2Posts,
  ...longtailBatch3Posts,
  ...phase3LineAPosts,
  ...phase3LineBPosts,
  ...phase3LineCPosts,
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
