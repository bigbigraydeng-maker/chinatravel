// Complete Travel Guides Database for 21 Chinese Destinations
// Structured for SEO pages and tour integration

const SB = 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public';
const TI = `${SB}/tour-images`;
export const migratedUnsplash = (photoId: string) => `${TI}/migrated/unsplash/${photoId}.jpg`;

/** Curated gallery slot: plain URL or URL + Tailwind for square thumbnail framing. */
export type GuideGalleryImage = string | { src: string; imgClass?: string };

export function galleryItem(src: string, imgClass?: string): GuideGalleryImage {
  return imgClass ? { src, imgClass } : src;
}

export interface Attraction {
  name: string;
  description: string;
  visitDuration: string;
  bestTime: string;
  ticketInfo?: string;
}

export interface PracticalInfo {
  transportation: string;
  climate: string;
  bestTime: string;
  budget: string;
  language: string;
  safety: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Section {
  title: string;
  id: string;
  content: string[];
}

export interface DestinationGuide {
  id: string;
  slug: string;
  destinationName: string;
  parentDestination?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  heroSubtitle: string;
  heroImage: string;
  /** Optional Tailwind classes merged onto the guide hero background image (e.g. object-[center_20%]). */
  heroImageClassName?: string;
  introText: string[];
  sections: Section[];
  attractions: Attraction[];
  practicalInfo: PracticalInfo;
  faqs: FAQ[];
  relatedTourSlugs: string[];
  relatedGuideSlugs: string[];
  galleryImages: GuideGalleryImage[];
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// BEIJING GUIDE
// ============================================================================

export const beijingGuide: DestinationGuide = {
  id: 'guide-beijing',
  slug: 'beijing-travel-guide',
  destinationName: 'Beijing',
  metaTitle: 'Beijing Travel Guide | China\'s Imperial Capital | CTS',
  metaDescription: 'Discover Beijing\'s imperial landmarks: Great Wall, Forbidden City, Temple of Heaven & hidden hutong gems. Expert travel guide for New Zealand visitors to China\'s capital.',
  keywords: ['Beijing travel', 'Forbidden City', 'Great Wall', 'Chinese culture', 'Beijing attractions'],
  h1: 'Beijing Travel Guide: Discover China\'s Imperial Capital',
  heroSubtitle: 'From Ancient Palaces to Modern Metropolis',
  heroImage: `${TI}/forbidden-city-aerial.jpg`,
  heroImageClassName: 'object-[center_35%]',
  introText: [
    'Beijing, the heart of China for over 3,000 years, seamlessly blends ancient imperial grandeur with contemporary urban dynamism. As capital of the world\'s most populous nation, this sprawling metropolis offers travellers an unparalleled window into Chinese civilisation, from the architectural marvels of the Forbidden City to the engineering wonder of the Great Wall. Whether you\'re tracing the footsteps of emperors through ornate palace halls or savouring authentic Peking duck in century-old restaurants, Beijing delivers an immersive cultural experience.',
    'For New Zealand visitors, Beijing serves as the natural gateway to China. The city\'s exceptional museums house treasures spanning dynasties, whilst its revitalised hutong neighbourhoods reveal the intimate daily life of Beijing\'s residents. Modern infrastructure and English signage in tourist areas make navigation straightforward, whilst the underground metro system—one of the world\'s most efficient—connects you instantly to centuries-old temples, imperial gardens, and vibrant night markets.',
    'A well-planned Beijing itinerary requires a minimum of 3-4 days to appreciate both headline attractions and hidden cultural gems. Early morning visits to major sites beat the crowds, whilst evening temple fairs and rooftop dining experiences showcase the city\'s contemporary energy. Whether travelling during the crisp autumn months or celebrating Chinese New Year festivities, Beijing rewards the curious traveller with memories that endure.'
  ],
  sections: [
    {
      title: 'The Forbidden City & Imperial Beijing',
      id: 'imperial-beijing',
      content: [
        'The Forbidden City stands as the world\'s largest and most intact imperial palace complex, housing 980 buildings across 72 hectares. Built during the Ming Dynasty (1406), this UNESCO World Heritage site served as home to 24 emperors across two dynasties. The symmetrical layout reflects ancient Chinese cosmological principles, with the emperor\'s residence at the symbolic centre representing his role as the link between heaven and earth.',
        'Navigating the Forbidden City requires strategic planning. Enter early (gates open 8:30am) to avoid peak crowds around 11am. Focus on the three great halls (Hall of Supreme Harmony, Hall of Central Harmony, Hall of Preserving Harmony) that showcase imperial grandeur, then explore the inner palace residential quarters revealing intimate court life. The Palace Museum—housed within the complex—exhibits imperial treasures including jade figurines, ancient manuscripts, and imperial regalia.',
        'Adjacent Jingshan Park offers the finest panoramic views of the Forbidden City\'s golden roofs with Beijing\'s modern skyline as backdrop—ideal for photography. The Qing Dynasty emperors used this vantage point for surveillance. Sunset visits provide dramatic lighting; night illumination of the complex happens during festive seasons.'
      ]
    },
    {
      title: 'The Great Wall: Engineering Marvel',
      id: 'great-wall',
      content: [
        'The Great Wall of China, stretching over 21,000 kilometres, represents humanity\'s most ambitious construction project. Built across millennia (7th century BC to 17th century AD), this defensive masterpiece was designed to protect Chinese kingdoms from northern invasions. Most of today\'s surviving wall dates from the Ming Dynasty (1368-1644), rebuilt using brick and stone for greater durability than earlier rammed earth versions.',
        'Popular sections near Beijing include Badaling (most visited, fully restored, close to city), Mutianyu (steep terrain, fewer crowds, cable car access), and Juyongguan (dramatic canyon setting). Badaling lies just 43km northwest—a 90-minute drive—making it ideal for first-time visitors. The walk from Badaling\'s visitor centre to the restored wall takes 20 minutes; most visitors spend 2-3 hours hiking sections, with distances ranging from easy 1km walks to challenging 5km treks.',
        'For an authentic experience, visit Mutianyu (74km northeast). This reconstructed section features cable cars and toboggan descents, surrounded by lush forest. The relatively quiet ambience compared to Badaling rewards visitors with genuine atmosphere. Hiking between restored watchtowers offers sublime views of the wall snaking across ridgelines. Spring and autumn provide ideal conditions; summer heat can be intense, whilst winter access may be restricted by snow.'
      ]
    },
    {
      title: 'Temple Complexes & Spiritual Beijing',
      id: 'temples-spirituality',
      content: [
        'Beijing\'s temple complexes offer insights into Chinese Buddhism, Taoism, and folk religion. The Lama Temple (Yonghe Gong), the largest Tibetan Buddhist temple outside Tibet, showcases stunning gilt bronze Buddha statues and intricate thangka paintings. The 26-metre-tall sandalwood Buddha in the uppermost hall represents a technical marvel—the statue was shipped from Nepal in pieces and assembled in situ.',
        'The Temple of Heaven (Tiantan) served as the religious centre of imperial Beijing. Emperors conducted annual sacrificial ceremonies here to ensure cosmic harmony and favourable harvests. The site\'s architectural layout embodies cosmological principles: circular structures representing heaven, square ones representing earth. The Echo Wall phenomenon—whispers carry clearly along the curved walls—delights visitors. The grounds, converted to a public park in 1918, offer peaceful morning tai chi scenes and seasonal temple fairs.',
        'Summer Palace temples, located within the extensive imperial pleasure gardens, blend religious and recreational architecture. Confucius Temple stands as the second-largest Confucian temple outside of Qufu, its courtyard peaceful and contemplative. Many visitors combine temple visits with hutong tours, discovering neighbourhood Taoist shrines and folk religion altars that reveal grassroots spiritual practices.'
      ]
    },
    {
      title: 'Modern Beijing & Contemporary Culture',
      id: 'modern-beijing',
      content: [
        'Beijing\'s transformation into a 21st-century metropolis is evident in striking contemporary architecture. The Bird\'s Nest (Olympic Stadium) and Water Cube (National Swimming Centre), designed for the 2008 Olympics, showcase innovative engineering. The CCTV Headquarters building—a radical geometric loop—has become an architectural icon. The 798 Art District, converted from Cold War-era electronics factories, now hosts cutting-edge galleries, studios, and trendy cafes attracting international artists.',
        'The city\'s restaurant scene extends far beyond Peking duck. Michelin-starred establishments serve refined Chinese regional cuisines, whilst street food markets offer authentic experiences at minimal cost. Night markets like Wangfujing offer everything from traditional snacks to daring delicacies. The hutong neighbourhoods—traditional courtyard residential areas—preserve old Beijing\'s character, with boutique hotels, craft workshops, and family-run eateries embedded within narrow alleyways.',
        'Shopping ranges from luxury malls in CBD areas to the historic Silk Street markets. Pearl markets, jade trading posts, and antique quarters offer authentic Chinese goods. Contemporary Beijing also embraces creative industries: craft breweries, design studios, and independent bookshops flourish alongside traditional enterprises. Evening options include Peking Opera performances, contemporary theatre, and rooftop bars with Forbidden City views.'
      ]
    },
    {
      title: 'Day Trips from Beijing',
      id: 'day-trips',
      content: [
        'The Ming Tombs, located 40km northwest, contain mausoleums of 13 Ming emperors. The Sacred Way approach—lined with stone statuary representing imperial guard—conveys ceremonial grandeur. Several tombs are open to visitors; Changling (the largest) features impressive underground palaces. Most visitors combine the Ming Tombs with Great Wall visits in a single excursion.',
        'Zhoukoudian Peking Man Site, 50km south, presents evidence of hominid habitation dating back 500,000 years. The museum and excavation sites provide evolutionary and paleoanthropological context. Cuandixia, a well-preserved Ming Dynasty village 60km southwest, offers glimpses of traditional rural life with stone architecture and cultural heritage preservation efforts.',
        'Simatai and Jinshanling Great Wall sections, 120km northeast near Miyun County, appeal to serious hikers. Simatai\'s steep gradients and unrestored sections challenge adventurers, whilst Jinshanling offers moderate trails through mixed restored and wild wall terrain. These sections receive considerably fewer visitors than Badaling or Mutianyu, rewarding effort with solitude and authenticity.'
      ]
    }
  ],
  attractions: [
    {
      name: 'The Forbidden City',
      description: 'Imperial palace complex with 980 buildings, 24 emperors\' residences, and world-class museum collections spanning Chinese history.',
      visitDuration: '3-4 hours minimum',
      bestTime: 'Early morning (8:30-10am) to avoid crowds; spring and autumn for weather',
      ticketInfo: '¥60 adults; ¥30 students; free for under 6; museum entry included'
    },
    {
      name: 'Great Wall (Badaling)',
      description: 'Most visited restored section, 43km from city centre, featuring cable cars and well-maintained hiking paths.',
      visitDuration: '3-4 hours',
      bestTime: 'Spring (April-May) and autumn (September-October) for weather and visibility',
      ticketInfo: '¥40 adults; cable car ¥100 return'
    },
    {
      name: 'Temple of Heaven',
      description: 'Ceremonial centre where emperors conducted cosmic harmony rituals; stunning architecture and peaceful parks.',
      visitDuration: '2-3 hours',
      bestTime: 'Early morning for tai chi and peaceful atmosphere; spring for flowers',
      ticketInfo: '¥35 adults; ¥17.50 students; grounds only ¥15'
    },
    {
      name: 'Lama Temple (Yonghe Gong)',
      description: 'Largest Tibetan Buddhist temple outside Tibet with 26-metre sandalwood Buddha and intricate thangka artwork.',
      visitDuration: '1.5-2 hours',
      bestTime: 'Morning visits offer quieter experience; avoid Chinese holidays',
      ticketInfo: '¥25 adults; ¥12.50 students; includes audio guide'
    },
    {
      name: 'Summer Palace',
      description: 'Imperial pleasure gardens spanning 294 hectares with temples, lakes, bridges, and reconstructed palace buildings.',
      visitDuration: '3-4 hours',
      bestTime: 'Early morning or late afternoon; autumn foliage is spectacular',
      ticketInfo: '¥30 adults (park); ¥20 for building interiors; ¥40 combined'
    },
    {
      name: 'Hutong Neighbourhoods & Rickshaw Tours',
      description: 'Traditional residential areas offering authentic Beijing life, family-run restaurants, and cultural immersion.',
      visitDuration: '2 hours guided tour',
      bestTime: 'Any season; evening offers local dining and courtyard hospitality',
      ticketInfo: 'Rickshaw tours ¥150-250 per person; walking tours ¥100-150'
    },
    {
      name: 'National Museum of China',
      description: 'World\'s largest museum by floor area featuring Chinese art, archaeology, history spanning ancient to modern eras.',
      visitDuration: '2-3 hours (sampling highlights)',
      bestTime: 'Weekdays for fewer crowds; free admission (book online 2+ hours ahead)',
      ticketInfo: 'Free entry; ID required for ticket collection'
    },
    {
      name: 'Ming Tombs',
      description: 'Sacred Way lined with stone statues leads to mausoleums of 13 Ming emperors; Changling features imperial underground palace.',
      visitDuration: '2-3 hours',
      bestTime: 'Spring and autumn; combine with Great Wall day trip',
      ticketInfo: '¥40 for sacred way; individual tombs ¥35-65; combined ticket ¥130'
    }
  ],
  practicalInfo: {
    transportation: 'Extensive metro system (13 lines) with clear English signage; taxis and ride-sharing (Didi) ubiquitous; rental cars available but traffic challenging. Airport (PCF) offers 24-minute express train to city (¥25). Long-distance buses connect to all regional destinations.',
    climate: 'Cold, dry winters (-10 to 0°C, November-March); warm summers (25-35°C, June-August); spring and autumn are mild and pleasant. Pollution can be heavy in winter and spring.',
    bestTime: 'September to October (autumn, 15-25°C, clear skies) and April to May (spring, 10-20°C, flowers blooming). July-August very hot; December-February very cold.',
    budget: 'Budget meals ¥20-50; mid-range ¥100-300; luxury ¥500+. Hotels: budget ¥200-400, mid-range ¥600-1500, luxury ¥2000+. Metro card refundable, single journeys ¥2-6.',
    language: 'Mandarin Chinese primary; English spoken in tourist areas, hotels, restaurants. Apps (WeChat, Alipay) essential for payments; translation apps helpful.',
    safety: 'Very safe for tourists; petty theft rare but practise general caution. Avoid political discussions. Air quality can affect outdoor plans; check daily AQI forecasts. Register with NZ embassy if staying extended period.'
  },
  faqs: [
    {
      question: 'How many days do I need in Beijing?',
      answer: 'A minimum of 3-4 days allows coverage of Forbidden City, Great Wall, Temple of Heaven, and hutong exploration. 5-6 days permits relaxed pace, day trips, and cultural immersion. Many luxury tours allocate 4-5 days here as gateway.'
    },
    {
      question: 'What\'s the best way to visit the Great Wall from Beijing?',
      answer: 'Badaling is closest (43km, 1.5-hour drive) and most accessible for first-time visitors. Mutianyu (74km) offers fewer crowds and forested backdrop. Simatai suits serious hikers. Organised tours handle transport; independent visitors use hired cars or metro to Huailai then shuttle buses.'
    },
    {
      question: 'Do I need a guide for the Forbidden City?',
      answer: 'English-language audio guides (included in admission) are comprehensive and self-paced. Hired guides (¥150-300 for group) provide context and skip-the-line access through side entrances. Group tours included in multi-day packages.'
    },
    {
      question: 'Is the Beijing smog always a problem?',
      answer: 'Air quality is seasonal; winter (December-February) and spring (March-April) see worse pollution. Summer and autumn generally clear. Check daily AQI forecasts; masks available if needed. Severe pollution days occasionally close outdoor attractions or limit visibility.'
    },
    {
      question: 'Can I visit the Forbidden City at night?',
      answer: 'Standard daytime hours are 8:30am-5pm (closed Mondays). Special evening illumination during Chinese New Year and other festivals. Night tours are organised tours only, not individual visits. Most major temples offer evening hours until 5-6pm.'
    }
  ],
  relatedTourSlugs: ['best-of-china-beijing-xian-hangzhou-puyuan', 'beijing-signature-imperial-heritage'],
  relatedGuideSlugs: ['great-wall-travel-guide', 'forbidden-city-travel-guide'],
  // Hero already uses aerial palace — gallery: Great Wall + temple only; verified tour-images; no duplicates.
  galleryImages: [
    `${TI}/great-wall-mist.jpg`,
    `${TI}/great-wall-cloud-sea.jpg`,
    `${TI}/great-wall-green.jpg`,
    `${TI}/beijing-temple.jpg`,
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-11'
};

// ============================================================================
// XI'AN GUIDE
// ============================================================================

export const xianGuide: DestinationGuide = {
  id: 'guide-xian',
  slug: 'xian-travel-guide',
  destinationName: 'Xi\'an',
  metaTitle: 'Xi\'an Travel Guide | Terracotta Warriors | CTS Tours',
  metaDescription: 'Xi\'an travel guide: Terracotta Army, ancient walls, Buddhist temples. Explore China\'s historic Silk Road capital.',
  keywords: ['Xi\'an travel', 'Terracotta Warriors', 'Silk Road', 'ancient city', 'Xi\'an attractions'],
  h1: 'Xi\'an Travel Guide: Land of the Terracotta Army',
  heroSubtitle: 'Where Ancient Warriors Await Discovery',
  heroImage: `${TI}/xian-terracotta.jpg`,
  heroImageClassName: 'object-[center_25%]',
  introText: [
    'Xi\'an was the capital of thirteen Chinese dynasties, including the Qin, Tang, and Ming. It is one of the world\'s oldest cities that people still live in today.',
    'For more than two thousand years, Xi\'an sat at the eastern end of the Silk Road. Traders and faiths met here. The name means "Western Peace."',
    'The Terracotta Army is Xi\'an\'s headline sight. Farmers found the warriors in 1974. Thousands of life-sized figures still guard Emperor Qin\'s tomb.',
    'You can also walk Ming-era city walls, visit Buddhist pagodas, and browse the Muslim Quarter for food and crafts.',
    'Flights and high-speed trains link Xi\'an to Beijing and Shanghai. The metro is easy to use in the centre.',
    'For New Zealand visitors, Xi\'an pairs well with Beijing on one trip. Allow time for noodles, bread dishes, and night views from the walls.'
  ],
  sections: [
    {
      title: 'The Terracotta Army & Qin Mausoleum',
      id: 'terracotta-army',
      content: [
        'Emperor Qin Shi Huang commissioned this extraordinary underground army around 210 BC, following the Warring States period which he unified. Estimates suggest approximately 8,000 soldiers, accompanied by horses, chariots, and weapons, were crafted from local clay. Each warrior displays distinct facial features, hairstyles, and armour, suggesting portraits of actual soldiers. The scale of this project—employing hundreds of craftspeople over decades—illustrates the emperor\'s vision of imperial power extended into the afterlife.',
        'Three main pits have been excavated. Pit 1 contains the largest concentration of warriors in battle formation (approximately 6,000), currently displayed in a colossal exhibition hall where visitors observe ongoing excavation work. Pit 2 houses mixed infantry, archers, and cavalry units. Pit 3, smaller and containing higher-ranking officers, provides insight into military hierarchy. Visitors can observe terracotta soldiers at various stages of archaeological treatment—some still partially buried, others fully restored to striking effect.',
        'The site experience includes the museum complex spanning 62 hectares. The Qin Shi Huang Mausoleum Museum contextualises the emperor\'s reign and tomb complex. Bronze chariot and horse replicas, discovered near the mausoleum entrance, showcase Qin metallurgical expertise. The surrounding park offers respite; the mausoleum itself remains unexcavated, archaeologists preserving it for future generations with superior technological capabilities. Plan 3-4 hours for thorough exploration; early arrival (8am opening) minimises crowds around the exhibition halls.'
      ]
    },
    {
      title: 'Ancient City Walls & Medieval Xi\'an',
      id: 'city-walls',
      content: [
        'Xi\'an\'s city walls, first built during the Tang Dynasty and reconstructed during the Ming (1370 AD), represent the world\'s most complete surviving ancient city walls. Measuring 13.7 kilometres in circumference with 98 watchtowers, the walls enclose the historic city centre. Unlike many Chinese cities that demolished walls during modernisation, Xi\'an preserved this architectural treasure. The restored walls feature tarmac surfaces suitable for walking, cycling, or electric cart rides, offering panoramic city views.',
        'Walking sections require 2-3 hours for the complete circuit; renting bicycles or e-scooters accelerates pace. The four main gates—east, south, west, north—feature recently renovated gate towers showcasing Tang Dynasty architectural styles. Evening visits are particularly atmospheric; moonlit walks provide romantic ambiance, whilst nighttime illumination accents architectural details. The Dayan Pagoda area near the south gate offers photogenic perspectives of wall and ancient structures.',
        'Inside the walls, the historic city reveals narrow lanes connecting temples, traditional courtyard houses, and restored Ming architecture. The Bell Tower (originally built 1384) stands at the city\'s geographic centre and remains a functional timekeeper. The Drum Tower nearby participates in daily performance demonstrations. Street-level exploration reveals family-operated noodle shops, antique dealers, and craft workshops preserving traditional skills.'
      ]
    },
    {
      title: 'Buddhist & Taoist Spiritual Heritage',
      id: 'spiritual-heritage',
      content: [
        'The Great Goose Pagoda, built 652 AD during the Tang Dynasty, originally housed Buddhist scriptures brought from India by the monk Xuanzang. This seven-storey brick structure represents pinnacle Tang architecture. Visitors can climb internal stairs (or elevators) to observation decks offering city panoramas. The surrounding temple grounds include gardens, meditation halls, and a museum detailing Xuanzang\'s legendary pilgrimage to India—immortalised in the classic novel "Journey to the West."',
        'Shaanxi Province contains exceptional Buddhist cave temples, particularly at Binyang Caves and Qianfo Caves (Thousand Buddha Caves). These rock-carved temples, created across multiple dynasties (4th-9th centuries), showcase evolving Buddhist iconography and sculptural techniques. Many caves feature colossal Buddha statues, intricate relief carvings, and faded pigments revealing artistic sophistication. The Zhenwu Temple, dedicated to the Taoist deity Zhenwu, combines residential temple architecture with surrounding courtyards.',
        'Xi\'an\'s Grand Mosque, established 8th century, represents one of China\'s largest Islamic centres, blending Chinese architectural styles with Islamic design principles. The mosque complex includes courtyards, prayer halls, and mingaret-style structures. Muslim services occur daily; non-Muslim visitors can observe architecture respectfully. The adjacent Muslim Quarter bustles with cultural commerce and authentic cuisine.'
      ]
    },
    {
      title: 'Silk Road Heritage & Trade Routes',
      id: 'silk-road',
      content: [
        'As the eastern terminus of the Silk Road, Xi\'an synthesized trade goods, ideas, religions, and artistic styles from across Central Asia and beyond. The Silk Road Museum (Museum of Chinese Silk Road Civilisation) documents this 2,000-year exchange through artifacts, maps, and multimedia presentations. Exhibits showcase trade goods (silks, spices, ceramics), religious art (Buddhist sculptures, Islamic calligraphy), and numismatic collections reflecting multicultural commerce.',
        'The Shaanxi History Museum houses comprehensive collections spanning multiple dynasties, including Zhou, Qin, Tang, and Song periods. The museum\'s chronological arrangement traces political, artistic, and technological developments. Notable exhibits include jade carvings, bronze vessels, ceramic figurines, and imperial regalia. The treasure collection—requiring separate queuing—showcases the empire\'s most prized objects. Audio guides in multiple languages contextualise displays.',
        'Modern Xi\'an acknowledges Silk Road heritage through cultural initiatives. The annual Silk Road International Festival (September-October) hosts exhibitions, performances, and academic conferences. Cultural parks recreating Silk Road trading towns, though somewhat commercialised, illustrate historical commercial dynamics. The Tang West Market museum complex reconstructs a Tang Dynasty marketplace, complete with vendor stalls and commercial activities.'
      ]
    },
    {
      title: 'Shaanxi Cuisine & Culinary Experiences',
      id: 'cuisine',
      content: [
        'Xi\'an and Shaanxi Province offer distinctive regional cuisines reflecting the region\'s wheat-based agricultural heritage. Roujiamo ("meat-filled bun") combines slow-braised pork shoulder with cumin-spiced herbs stuffed into sesame-crusted flatbread—a portable staple found at street stalls throughout the city. Biangbiang noodles (wide hand-pulled ribbons), featuring characteristically wide, hand-pulled ribbons, appear in numerous variations: oil-splashed, vinegar-based, or in broth.',
        'Shaanxi cold noodle preparations, served year-round, include liangpi (wheat or rice-based sheets with vinegar-chilli dressing) and cold sesame noodles. Street food experiences in the Muslim Quarter offer lamb skewers (yangrouping), flatbreads (jianbing), and fragrant soups. Huimin Street evening market provides concentrated street food exploration—dozens of vendors cook traditional specialities in compact quarters.',
        'Fine dining restaurants serve elevated Shaanxi cuisine using premium ingredients. Tang-themed banquet restaurants recreate imperial dining experiences with historical accuracy. Wine regions in Shaanxi produce distinctive varietals; wine appreciation tastings offer enological education. Tea culture thrives; jasmine and flower tea ceremonies provide meditative experiences. Cooking classes teaching roujiamo preparation or noodle-making offer hands-on cultural engagement.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Terracotta Army Museum',
      description: 'Archaeological marvel featuring 8,000+ life-sized terracotta warriors, horses, and chariots from Qin Dynasty mausoleum.',
      visitDuration: '3-4 hours',
      bestTime: 'Early morning (8am) before crowds; spring and autumn for weather',
      ticketInfo: '¥150 adults; ¥75 students; 1.5km from city centre, accessible by shuttle bus'
    },
    {
      name: 'Xi\'an City Walls',
      description: 'Best-preserved medieval city walls (13.7km) with watchtowers, gates, museums, offering 360-degree city views.',
      visitDuration: '2-3 hours walking or cycling',
      bestTime: 'Late afternoon for photography; evening for romantic atmosphere',
      ticketInfo: '¥54 adults for entry; bike rental ¥30-50; e-scooter ¥40-80'
    },
    {
      name: 'Great Goose Pagoda',
      description: 'Seven-storey Tang Dynasty pagoda housing Buddhist reliquaries; interior stairs to observation decks.',
      visitDuration: '1.5-2 hours',
      bestTime: 'Late morning or late afternoon for light; spring flowers spectacular',
      ticketInfo: '¥50 adults; ¥25 students; climbing included'
    },
    {
      name: 'Shaanxi History Museum',
      description: 'Comprehensive museum spanning Zhou to Song dynasties with jade, bronze, ceramics, and imperial collections.',
      visitDuration: '2-3 hours',
      bestTime: 'Weekday mornings for shorter queues; avoid Chinese holidays',
      ticketInfo: 'Free with ID; book online 2+ hours ahead; treasure gallery ¥20 additional'
    },
    {
      name: 'Muslim Quarter & Huimin Street',
      description: 'Historic Islamic neighbourhood with grand mosque, bazaars, street food stalls, and cultural authenticity.',
      visitDuration: '2-3 hours',
      bestTime: 'Early evening for food markets and cooler temperature; weekday for fewer tourists',
      ticketInfo: 'Free to explore; food purchases ¥20-100; mosque entry free'
    },
    {
      name: 'Small Goose Pagoda & Tang West Market Museum',
      description: 'Tang Dynasty pagoda paired with reconstructed marketplace offering cultural immersion and shopping.',
      visitDuration: '2 hours',
      bestTime: 'Morning or late afternoon; cooler and less crowded',
      ticketInfo: 'Pagoda ¥30; marketplace ¥50; combined ¥70'
    },
    {
      name: 'Binyang Caves Buddhist Temple',
      description: 'Ancient rock-carved Buddhist caves featuring colossal statues, intricate reliefs, and architectural evolution.',
      visitDuration: '2-3 hours',
      bestTime: 'Spring and autumn; morning light for photography',
      ticketInfo: '¥25 adults; 40km from city, arrange transport through hotel'
    },
    {
      name: 'Silk Road Museum',
      description: 'Specialised museum documenting 2,000-year trade routes through artifacts, maps, and multicultural exhibits.',
      visitDuration: '1.5-2 hours',
      bestTime: 'Weekday afternoons; quieter and contemplative',
      ticketInfo: '¥35 adults; ¥17.50 students; closed Mondays'
    }
  ],
  practicalInfo: {
    transportation: 'Modern metro system (4 lines) with clear signage; taxis and Didi ride-sharing widely available. Xianyang Airport (45km) has shuttle buses (¥25), metro (¥2.50), or taxi (¥100-120). High-speed trains to Beijing (5 hours), Shanghai (10 hours), Chengdu (3 hours), Hangzhou (12 hours). Long-distance buses connect provincial destinations.',
    climate: 'Cold, dry winters (-5 to 5°C, November-March); hot summers (25-35°C, June-August); spring and autumn mild. Limited rainfall year-round.',
    bestTime: 'April to May (spring, 15-25°C, flowers blooming) and September to November (autumn, 10-20°C, clear skies). December-February very cold; July-August very hot.',
    budget: 'Street food ¥10-30; mid-range meals ¥50-150; upscale restaurants ¥200-500+. Hotels: budget ¥150-350, mid-range ¥500-1200, luxury ¥1500+. Attractions individually range ¥30-150.',
    language: 'Mandarin Chinese; some English in tourist areas and hotels. Apps for translation helpful. Most staff at major attractions speak basic English.',
    safety: 'Safe city for tourists; standard urban precautions apply. Terracotta Army area well-developed with clear tourist infrastructure. Night activities concentrate in city-centre areas.'
  },
  faqs: [
    {
      question: 'Can I see the Terracotta Army\'s complete collection?',
      answer: 'Only three pits have been excavated; many soldiers remain buried. The museum displays thousands in the main exhibition halls plus ongoing excavation sites where visitors observe active archaeological work. Complete excavation is deliberately deferred for future generations with superior technologies.'
    },
    {
      question: 'How do I reach the Terracotta Army from Xi\'an city?',
      answer: 'The site (35km east) is reachable by hired car (45 minutes, ¥80-100), tour bus (¥50-80), shuttle bus from tourist centres (¥25-35), or metro line 9 to end station then shuttle (¥2.50 metro + ¥25 shuttle). Most day tours include transport and guide.'
    },
    {
      question: 'Is climbing Xi\'an walls difficult?',
      answer: 'Walking the flat rampart surface is straightforward; climbing internal stairs to watchtowers is moderate effort. Sections near gates are busier. Renting bikes or e-scooters extends reach without physical exertion. Strollers and wheelchairs navigate rampart sections easily.'
    },
    {
      question: 'What\'s the best time to visit Xi\'an?',
      answer: 'April-May and September-November offer ideal weather (15-25°C) and clear visibility. Summer is hot (30-35°C); winter is cold (-5 to 5°C). Avoid Chinese New Year (late January-February) and October Golden Week when crowds peak.'
    },
    {
      question: 'Can I eat well in Xi\'an as a Western vegetarian?',
      answer: 'Buddhist temples offer vegetarian meals; Muslim Quarter has vegetable-based noodle options; modern restaurants accommodate dietary restrictions. Fresh produce markets abound. Communicate dietary needs clearly; language apps help bridge gaps.'
    }
  ],
  relatedTourSlugs: ['best-of-china-beijing-xian-hangzhou-puyuan', 'xian-signature-ancient-capitals'],
  relatedGuideSlugs: ['terracotta-warriors-travel-guide', 'silk-road-travel-guide'],
  // Hero = terracotta; gallery omits Beijing/Guilin wall shots; second pit with top-weighted crop.
  galleryImages: [
    `${TI}/silk-road-wall.jpg`,
    `${TI}/china-pagoda-night.jpg`,
    galleryItem(`${TI}/xian-terracotta-2.jpg`, 'object-top'),
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-21'
};

// ============================================================================
// SHANGHAI GUIDE
// ============================================================================

export const shanghaiGuide: DestinationGuide = {
  id: 'guide-shanghai',
  slug: 'shanghai-travel-guide',
  destinationName: 'Shanghai',
  metaTitle: 'Shanghai Travel Guide | Modern China\'s Gateway | CTS Tours',
  metaDescription: 'Shanghai travel guide: The Bund, Yu Garden, museums. Experience Asia\'s most cosmopolitan city.',
  keywords: ['Shanghai travel', 'The Bund', 'Yu Garden', 'modern Shanghai', 'French Concession'],
  h1: 'Shanghai Travel Guide: East Meets West on the Huangpu River',
  heroSubtitle: 'Asia\'s Most Cosmopolitan City',
  heroImage: `${TI}/shanghai-night-blue.jpg`,
  heroImageClassName: 'object-[center_35%]',
  introText: [
    'Shanghai is China\'s largest city and a global finance hub. About twenty-four million people live here. Skyscrapers sit next to historic streets.',
    'The city grew from a small port to a 19th-century treaty port. Today you see art deco banks on the Bund and towers in Pudong across the river.',
    'Pudong Airport is a main gateway for New Zealand travellers. Shanghai works well as a stop or as a base for side trips.',
    'Yu Garden shows classic Chinese garden design. The French Concession has cafés and tree-lined walks.',
    'Water towns like Zhujiajiao are a short trip away. Plan a mix of icons, museums, and local food.'
  ],
  sections: [
    {
      title: 'The Bund: Shanghai\'s Iconic Waterfront',
      id: 'the-bund',
      content: [
        'The Bund (Waitan waterfront), literally "foreshore," stretches 1.5 kilometres along the western bank of the Huangpu River. This promenade showcases a remarkable collection of early 20th-century architecture: the Customs House with its iconic clock tower, the neoclassical HSBC Building, art deco hotels, and trading company headquarters. These structures represent multiple foreign powers\' colonial ambitions in Shanghai, earning the Bund its nickname "Wall Street of Asia."',
        'The eastern riverbank, across the Huangpu, presents Shanghai\'s modern face. The Oriental Pearl Tower (468 metres) dominated skylines before supertall structures proliferated. The Shanghai Tower (632 metres, China\'s tallest) offers observation decks and a record-setting elevator reaching 500m in just 55 seconds. Visitors can traverse the Huangpu via the pedestrian tunnel or various bridge crossings, experiencing both historical and contemporary Shanghai from strategic viewpoints.',
        'Evening visits transform the Bund into a spectacular illuminated landscape. The nightly light show—featuring synchronised building illuminations choreographed to music—captivates tourists and locals alike. River cruises departing from the Bund provide perspective on both shores whilst photographing this photogenic landscape. The promenade itself offers unobstructed river views, riverside restaurants, and street-level cultural attractions.'
      ]
    },
    {
      title: 'Yu Garden & Traditional Chinese Architecture',
      id: 'yu-garden',
      content: [
        'Yu Garden (Yuyuan) represents Ming Dynasty scholar\'s garden design principles, created in 1559 for a wealthy merchant\'s family. Spanning just 2 hectares, this extraordinarily intricate garden demonstrates how Chinese aesthetics compress landscape diversity into compact spaces. Artificial mountains, pavilions, bridges, and water features create multiple distinct "scenes," each viewpoint revealing carefully composed vistas. The garden exemplifies Taoist philosophy of humans existing in harmony with nature.',
        'Key structures include the Dajing Pavilion (commanding views), the Tower of Jade Magnificence (five-storey landmark), and numerous pavilions with poetic names reflecting philosophical concepts. The garden\'s surrounding walls feature 127 roof decorations representing symbolic meanings. A classical aesthetic principle holds that visitors should "wander like scholars," exploring without predetermined routes, discovering new vistas continuously.',
        'The adjacent City God Temple (Chenghuang Miao) and its bustling marketplace merge spiritual devotion with commercial activity. The temple, renovated, functions actively with worshippers burning incense. The marketplace teems with food vendors, souvenir stalls, and cultural atmosphere. Early morning visits before tourist influx offer more authentic experiences. The lantern festival decorations (especially Chinese New Year) illuminate the garden spectacularly.'
      ]
    },
    {
      title: 'French Concession & Colonial Heritage',
      id: 'french-concession',
      content: [
        'The French Concession (historic French quarter), administered by France from 1849-1943, preserves tree-lined streets, belle époque villas, and sophisticated commercial establishments. Fuxing Road represents the Concession\'s main thoroughfare, flanked by cafes, galleries, bookstores, and restaurants. Unlike the grid-pattern International Settlement, the French Concession features organic street layouts, creating intimate neighbourhoods where colonial charm persists.',
        'Jing\'an Temple, historically significant Buddhist temple reconstructed within the Concession, now stands surrounded by modern development yet maintains spiritual function. The temple\'s annual lantern festivals attract thousands. Propaganda Poster Art Centre documents Cultural Revolution artistic production through historical context. Former residences of Chinese Communist Party leaders (Chen Yi Residence, Soong Ching-ling Residence) function as museums revealing political history.',
        'Contemporary French Concession blends heritage preservation with modern cafes, boutique hotels, and gallery spaces. Tianzifang alleyway complex (Tian Zi Fang) comprises traditional shikumen (lane houses) converted to studios, cafes, and shops, offering village-like atmosphere within urban context. Evening strolls reveal romantic ambiance; weekend explorations reveal artistic communities and design studios.'
      ]
    },
    {
      title: 'Museums & Cultural Institutions',
      id: 'museums-culture',
      content: [
        'The Shanghai Museum houses exceptional collections of Chinese bronzes, ceramics, calligraphy, and painting across 11 galleries. The bronze collection—particularly ritual vessels from Shang and Zhou dynasties—showcases metallurgical sophistication. The ceramics gallery traces porcelain development from primitive earthenware through blue-and-white Ming pieces to contemporary works. Rotating exhibitions feature contemporary Chinese and international artists.',
        'The Power Station of Art (former Huangpu Power Station) represents adaptive reuse of industrial heritage. This contemporary art museum showcases cutting-edge installations, performances, and multimedia works. The dramatic industrial architecture—featuring soaring spaces and massive turbines—becomes installation environment itself. The rooftop offers panoramic city views and sculpture garden spaces.',
        'The China Art Museum, housed in former World Expo pavilion, emphasises contemporary and modern Chinese art. Shanghai Museum of Glass, the world\'s first glass museum, displays ancient glass works and contemporary glass art. The Longhua Temple and Bell Tower complex represents Buddhist heritage within urban context, with functioning temple atmosphere and periodic exhibitions.'
      ]
    },
    {
      title: 'Water Towns & Day Excursions',
      id: 'water-towns',
      content: [
        'Zhujiajiao (Zhujiajiao water town), a water town 48km southwest, features Ming and Qing architecture preserved along channels spanned by arched bridges. Known as the "Venice of Shanghai," this 2-hour excursion offers narrow lanes, family-run shops, local restaurants, and boating opportunities. The ancient archways, temples, and market streets preserve pre-industrial commercial atmosphere. Photography is exceptional, particularly early morning light and evening reflections.',
        'Tongli (Taihu water town), 80km southwest near Lake Taihu, represents similarly atmospheric water town with 15 lakes integrated into residential layout. The town\'s design—featuring canal navigation primary to movement—creates enclosed, intimate neighbourhood spaces. Five classical gardens demonstrate aesthetic philosophy; stone bridges provide picturesque photography. Traditional crafts (silk production, woodcarving) remain practised; artisan demonstrations educate visitors.',
        'Both towns offer homestay experiences, boat tours, and traditional tea ceremonies. Full-day excursions from Shanghai include guided tours, meals, and transport. Independent visitors rent cars or take minibuses from metro stations. Overnight stays in water towns provide evening quiet after day-tripper departures, offering more authentic neighbourhood experiences.'
      ]
    }
  ],
  attractions: [
    {
      name: 'The Bund',
      description: 'Iconic 1.5km waterfront promenade featuring colonial architecture, river views, and nightly light shows.',
      visitDuration: '2-3 hours',
      bestTime: 'Late afternoon into evening for golden hour and light shows',
      ticketInfo: 'Free to walk; river cruises ¥100-250; tower visits ¥120-280'
    },
    {
      name: 'Yu Garden',
      description: 'Ming Dynasty scholar\'s garden with pavilions, bridges, and philosophically-designed landscapes.',
      visitDuration: '1.5-2 hours',
      bestTime: 'Early morning before crowds; lantern festivals spectacular',
      ticketInfo: '¥40 adults; ¥20 students; includes surrounding City God Temple'
    },
    {
      name: 'Shanghai Museum',
      description: 'World-class museum featuring Chinese bronzes, ceramics, calligraphy, and rotating contemporary exhibits.',
      visitDuration: '2-3 hours',
      bestTime: 'Weekday afternoons; quiet and contemplative atmosphere',
      ticketInfo: 'Free with ID; book online 2+ hours ahead'
    },
    {
      name: 'French Concession & Tianzifang',
      description: 'Historic colonial neighbourhood with tree-lined streets, cafes, galleries, and converted laneway studios.',
      visitDuration: '2-3 hours walking',
      bestTime: 'Late afternoon and evening for cafes and galleries; weekends busier',
      ticketInfo: 'Free to explore; individual shops and restaurants pricing varies'
    },
    {
      name: 'Shanghai Tower',
      description: 'China\'s tallest building (632m) with observation decks, record-speed elevator, and panoramic city views.',
      visitDuration: '1-2 hours',
      bestTime: 'Late afternoon for sunset views; clear weather essential',
      ticketInfo: '¥188 day ticket; ¥228 includes evening light show'
    },
    {
      name: 'Zhujiajiao Water Town',
      description: 'Ancient canal-side village with Ming-era architecture, bridges, and traditional commerce.',
      visitDuration: '4-5 hours (day excursion)',
      bestTime: 'Early morning before crowds; photography golden hour',
      ticketInfo: 'Entry free; parking/transportation ¥30-50; tours ¥120-180'
    },
    {
      name: 'Power Station of Art',
      description: 'Contemporary art museum in repurposed power station with dramatic industrial spaces and installations.',
      visitDuration: '2-3 hours',
      bestTime: 'Weekday afternoons; special exhibitions on weekends',
      ticketInfo: '¥60 adults; ¥30 students; closed Mondays'
    },
    {
      name: 'Longhua Temple & Bell Tower',
      description: 'Historic Buddhist temple with functioning shrine, ancient bells, and rooftop city views.',
      visitDuration: '1.5 hours',
      bestTime: 'Morning for prayer ceremonies and peaceful atmosphere',
      ticketInfo: '¥10 entry; photography permitted in temple grounds'
    }
  ],
  practicalInfo: {
    transportation: 'Extensive metro system (17 lines) with English signage; taxis and Didi ubiquitous. Maglev train from airport (30km) reaches 431km/h, completes journey in 8 minutes (¥55). Regular airport shuttle buses (¥25). High-speed trains to Beijing (5 hours), Xi\'an (10 hours), Hangzhou (1 hour), Chongqing (16 hours).',
    climate: 'Cold, damp winters (-5 to 5°C, December-February); hot, humid summers (25-35°C, June-August); spring and autumn mild. Significant rainfall year-round.',
    bestTime: 'September to November (autumn, 15-25°C, lower humidity) and April to May (spring, 10-20°C, flowers blooming). May and September ideal. December-February damp and cold; July-August hot and humid.',
    budget: 'Street food ¥15-40; mid-range ¥80-200; upscale ¥300-800+. Hotels: budget ¥200-400, mid-range ¥700-1500, luxury ¥2000+. Attractions individually ¥40-188.',
    language: 'Mandarin Chinese with dialect; English well-spoken in tourist areas, hotels, upscale restaurants. International city with multilingual signage.',
    safety: 'Very safe for tourists; cosmopolitan atmosphere. Petty theft in crowds (metro, markets) requires standard precautions. Late-night dining and entertainment districts busy and lively.'
  },
  faqs: [
    {
      question: 'How long should I spend in Shanghai?',
      answer: 'Two days minimum covers The Bund, Yu Garden, Shanghai Museum, and French Concession. Three to four days permits day trips to water towns, museum visits, and leisurely neighbourhood exploration. Many luxury tours allocate 3 days here.'
    },
    {
      question: 'What\'s the best way to get from Pudong Airport to city centre?',
      answer: 'Maglev train (8 minutes, ¥55) is fastest but limited stops. Airport shuttle buses (¥25, 45-60 minutes) serve multiple hotels. Metro line 2 (cheapest, ¥7, 40-50 minutes) requires less luggage. Taxi/Didi (¥80-120, 30-50 minutes depending on traffic) offers door-to-door service.'
    },
    {
      question: 'Are day trips to water towns worth it?',
      answer: 'Yes, they offer authentic contrast to urban Shanghai. Zhujiajiao (1-2 hours away) is closest; full-day excursions include guided tours. Overnight stays in water towns permit evening quiet and morning exploration before crowds. Most visitors recommend at least one water town visit.'
    },
    {
      question: 'Can I visit museums on Mondays?',
      answer: 'Shanghai Museum and many major museums close Mondays. Power Station of Art closes Mondays. Check individual museum websites. The Bund, Yu Garden, and water towns remain open daily. Plan museum visits for Tuesday-Sunday.'
    },
    {
      question: 'What\'s the best time to visit The Bund?',
      answer: 'Late afternoon (4-6pm) offers golden light for photography, transitioning to evening when building illuminations activate (7-9pm). Weekday evenings are less crowded than weekends. River cruises provide alternative perspectives on the architecture.'
    }
  ],
  relatedTourSlugs: ['best-of-china-beijing-xian-hangzhou-puyuan', 'shanghai-signature-modern-heritage'],
  relatedGuideSlugs: ['hangzhou-travel-guide', 'zhujiajiao-water-town-guide'],
  galleryImages: [
    `${TI}/shanghai-night-red.jpg`,
    `${TI}/shanghai-skyline.jpg`,
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-21'
};

// ============================================================================
// CHENGDU GUIDE
// ============================================================================

export const chengduGuide: DestinationGuide = {
  id: 'guide-chengdu',
  slug: 'chengdu-travel-guide',
  destinationName: 'Chengdu',
  metaTitle: 'Chengdu Travel Guide | Giant Pandas | Sichuan Culture | CTS Tours',
  metaDescription: 'Chengdu travel guide: Giant Pandas, temples, Sichuan cuisine. Discover China\'s most livable city.',
  keywords: ['Chengdu travel', 'giant pandas', 'Sichuan cuisine', 'temples', 'panda research'],
  h1: 'Chengdu Travel Guide: Pandas, Culture & Spicy Delights',
  heroSubtitle: 'Where Ancient Wisdom Meets Gentle Giants',
  heroImage: `${TI}/chengdu-old-town.jpg`,
  heroImageClassName: 'object-[center_32%]',
  introText: [
    'Chengdu is the capital of Sichuan Province. Roughly sixteen million people live here. Locals are known for teahouses, slow meals, and spicy food.',
    'The Giant Panda Breeding Research Base is the top draw. You can see pandas in large outdoor enclosures and learn how breeding helps the species.',
    'Temples, old lanes, and new art districts round out the city. Teahouses are social hubs for chess, mahjong, and jasmine tea.',
    'High-speed trains run to Beijing, Shanghai, and Guilin. Leshan Giant Buddha and Mount Emei are popular day trips.',
    'If you want food, culture, and pandas in one place, Chengdu is a strong choice for New Zealand visitors.'
  ],
  sections: [
    {
      title: 'Giant Pandas & Conservation',
      id: 'giant-pandas',
      content: [
        'The Giant Panda Base, established 1987, operates as both research institution and tourism attraction. Housing approximately 150 pandas (70% of the world\'s captive population), the base spans 666 hectares of naturalistic habitat. Visitors walk bamboo-shaded pathways observing pandas at various life stages in semi-wild conditions. The facility prioritises animal welfare; research focuses on breeding programmes, habitat restoration, and reintroduction to wild populations.',
        'Early morning visits (7-8am) offer optimal panda viewing; animals are most active and cooler temperatures prevent lethargy. Different enclosures house pandas by age: cubs in nursery areas (most photogenic), juveniles in intermediate habitats, and adults in expansive territories. The museum complex explains conservation science, showing how Sichuan\'s bamboo forests (panda primary food) are being protected. Educational programmes detail habitat challenges and reintroduction successes.',
        'Photography is exceptional during morning hours. Most visitors spend 3-4 hours at the base, combining panda observation with museum exhibits and walking meditation gardens. The base provides shuttle buses; independent entrance requires taxis from city. Tour operators typically include base visits as part of Chengdu itineraries, often combining with other attractions for efficiency.'
      ]
    },
    {
      title: 'Buddhist Temples & Spiritual Heritage',
      id: 'temples-spiritual',
      content: [
        'Wenshu Temple (Chengdu), dating to Tang Dynasty, remains a functioning Buddhist monastery hosting approximately 100 monks. The temple\'s layout follows classical design principles: series of interconnected courtyards leading to increasingly sacred inner sanctums. The monastery\'s Buddhist library contains thousands of sutras and manuscripts. Visitors observe monks in prayer halls and meditation chambers; tea ceremonies serve visitors in traditional courtyards.',
        'Qingyang Palace (Chengdu Taoist complex), dedicated to Daoism\'s highest deity, represents one of China\'s most important Taoist temples. Built during Tang Dynasty, reconstructed multiple times, the palace features eight trigrams layout reflecting Taoist cosmology. The octagonal tower, accessible by internal stairs, offers city views. Fortune-telling, calligraphy services, and traditional crafts persist within temple grounds, maintaining living religious practice.',
        'Bamboo-shaded Leshan Great Buddha, located 160km away, features the world\'s largest stone Buddha (71 metres). Carved into riverside cliff over 90 years (8th century), this monumental sculpture represents one of humanity\'s most ambitious artistic achievements. Visitors descend 217 steps to observe the feet; boat tours provide full-figure perspective. The surrounding temples, museums, and scenic areas justify full-day excursion.'
      ]
    },
    {
      title: 'Sichuan Cuisine & Culinary Traditions',
      id: 'cuisine-traditions',
      content: [
        'Sichuan cuisine distinguishes itself through numbing sensation from Sichuan peppercorns (huajiao) combined with chilli heat. This distinctive sensory profile—called "ma la" (numbing-spicy)—permeates nearly all local dishes. Mapo Tofu, soft tofu in spiced broth, represents signature dish. Chongqing Chicken (la zi ji, spicy chicken) features wok-cooked chicken pieces with dried chillis and Sichuan peppercorns creating crispy, intensely flavoured result.',
        'Street food culture thrives in Chengdu\'s night markets. Hot pot (huoguo) represents communal dining experience where diners cook raw ingredients in table-side broth; dipping sauce (typically sesame-oil based) moderates heat. Dumplings (jiaozi), wontons (huntun), and noodle specialities fill casual restaurants. The Chen Mapo Tofu restaurant, operating since 1862, preserves original recipes and techniques.',
        'Tea culture interwoven with Chengdu\'s lifestyle. Teahouses (chaguan) scatter throughout neighbourhoods; locals spend entire afternoons socialising, gaming, and sipping jasmine tea. Modern cafes coexist with century-old establishments, yet traditional patterns persist. Cooking classes teaching hot pot, mapo tofu, or dumpling-making offer hands-on culinary engagement.'
      ]
    },
    {
      title: 'Contemporary Arts & Urban Renewal',
      id: 'arts-urban',
      content: [
        'Chengdu\'s contemporary arts scene flourished post-2000 with government initiatives supporting creative industries. The OCT Loft creative park, housed in renovated industrial spaces, concentrates galleries, studios, design workshops, and cafes. The Chengdu Contemporary Museum showcases modern and contemporary Chinese art. Artist communities in formerly industrial zones (Hehuachi area) reveal emerging cultural dynamism.',
        'Kuanzhai Xiangzi (Wide and Narrow Alleys), restored historic alleyway complex, preserves Ming and Qing architecture whilst supporting artisan workshops, boutique shops, and teahouses. The neighbourhood exemplifies sensitive urban renewal—preserving architectural heritage whilst integrating contemporary functions. Evening explorations reveal atmospheric lighting and social ambience.',
        'The Chengdu Design Week (annual, September-October) showcases contemporary design. Live music venues, independent film screenings, and theatrical performances occur throughout the city. The Chengdu base appeals equally to cultural tourists seeking deeper engagement than panda-focused visits alone.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Giant Panda Base',
      description: 'World\'s largest captive panda population in naturalistic habitats; research facility and conservation centre.',
      visitDuration: '3-4 hours',
      bestTime: 'Early morning (7-8am) for active panda viewing; spring weather ideal',
      ticketInfo: '¥55 adults; ¥27.50 students; entrance required by 8am for panda activity'
    },
    {
      name: 'Wenshu Temple',
      description: 'Functioning Buddhist monastery with monks, sutra library, meditation halls, and traditional tea ceremonies.',
      visitDuration: '1.5-2 hours',
      bestTime: 'Early morning for prayer ceremonies; peaceful atmosphere',
      ticketInfo: '¥10 entry; tea ceremony ¥15-25; donations welcome'
    },
    {
      name: 'Qingyang Palace',
      description: 'Taoist temple with octagonal tower, cosmological architecture, and fortune-telling services.',
      visitDuration: '1.5 hours',
      bestTime: 'Morning or late afternoon; avoid mid-day heat',
      ticketInfo: '¥12 entry; calligraphy and services additional cost'
    },
    {
      name: 'Leshan Great Buddha',
      description: 'World\'s largest stone Buddha (71m) carved into riverside cliff; Buddhist temples and scenic area.',
      visitDuration: '4-5 hours (day excursion)',
      bestTime: 'Clear weather for photography; early morning for light',
      ticketInfo: '¥90 adults; ¥45 students; boat tour ¥30 additional'
    },
    {
      name: 'Kuanzhai Xiangzi Historic Alleyways',
      description: 'Restored Ming-Qing neighbourhood with artisan workshops, boutiques, galleries, and traditional teahouses.',
      visitDuration: '2-3 hours',
      bestTime: 'Late afternoon and evening for ambiance; weekends busier',
      ticketInfo: 'Free to explore; individual shops and teahouses pricing varies'
    },
    {
      name: 'Du Fu Thatched Cottage',
      description: 'Poet\'s historic residence and museum featuring classical gardens and literary collections.',
      visitDuration: '1.5-2 hours',
      bestTime: 'Morning for quiet atmosphere; spring flowers lovely',
      ticketInfo: '¥60 adults; ¥30 students; includes audio guide'
    },
    {
      name: 'Chengdu Contemporary Museum',
      description: 'Modern and contemporary Chinese art with rotating international exhibitions.',
      visitDuration: '2 hours',
      bestTime: 'Weekday afternoons for fewer crowds',
      ticketInfo: 'Free with ID; book online 2+ hours ahead'
    },
    {
      name: 'Night Food Markets',
      description: 'Street food concentration featuring Sichuan specialities, hot pot, dumplings, and local delicacies.',
      visitDuration: '1.5-2 hours',
      bestTime: 'Evening (6pm onwards); weekend busier',
      ticketInfo: 'Free to explore; individual food items ¥10-30'
    }
  ],
  practicalInfo: {
    transportation: 'Modern metro system (5 lines expanding); taxis and Didi ride-sharing ubiquitous. Chengdu Shuangliu Airport (16km) offers shuttle buses (¥25), metro line 10 (¥5, 30 minutes). High-speed trains to Beijing (12 hours), Shanghai (14 hours), Guilin (9 hours), Xi\'an (5 hours). Local buses and trolleys serve city comprehensively.',
    climate: 'Mild year-round compared to northern China. Winters (December-February) 5-15°C, rarely freezing. Summers (June-August) 25-35°C, humid. Cloud cover frequent; sunny days less common. Spring and autumn mild and pleasant.',
    bestTime: 'March to May (spring, 15-25°C, flowers blooming) and September to November (autumn, 15-25°C, clear skies). December-February cool and cloudy; July-August hot and humid.',
    budget: 'Street food ¥10-25; mid-range ¥40-120; upscale ¥150-400. Hotels: budget ¥120-280, mid-range ¥400-900, luxury ¥1200+. Attractions ¥12-90 individually.',
    language: 'Mandarin Chinese; Sichuan dialect spoken locally. English less common than coastal cities but present in tourist areas. Translation apps helpful.',
    safety: 'Safe for tourists; neighbourhood feel compared to mega-cities. Standard urban precautions apply. Spicy food may challenge some palates; indicate heat preference.'
  },
  faqs: [
    {
      question: 'When is the best time to see pandas at the Base?',
      answer: 'Early morning (7-8am opening) guarantees active pandas before heat causes lethargy. Cloudy mornings are better than sunny (reduces heat). Arrive 15 minutes before opening to secure early entry. Avoid peak tourist season (Chinese New Year, summer holidays) for smaller crowds.'
    },
    {
      question: 'How do I reach Leshan Buddha from Chengdu?',
      answer: 'Located 160km south (2.5-3 hours). Hire car (¥400-600), join organised tour (¥200-300 including transport/guide), or take bus from city centre (¥30-50, 3-4 hours). Most tours combine Leshan with Mount Emei for full-day or overnight excursions.'
    },
    {
      question: 'Is Sichuan food too spicy for Western palates?',
      answer: 'Numbing sensation differs from pure heat; many find it interesting rather than painful. Request "not spicy" (bu la) when ordering. Mild versions of dishes exist. Teahouses and tourist restaurants offer non-spicy options. Culinary adventure is rewarding for those seeking authentic flavours.'
    },
    {
      question: 'Can I hold or touch pandas?',
      answer: 'The base permits photography but not touching for animal welfare and safety reasons. Close approach is possible in designated areas. The breeding base prioritises animal wellbeing over tourist interaction. Educational component emphasises respect for wildlife.'
    },
    {
      question: 'How long should I spend in Chengdu?',
      answer: 'Two days minimum: one day panda base, one day temples or cultural exploration. Three days permits day trip to Leshan Buddha. Four+ days allows deeper cultural immersion, arts district exploration, and relaxed teahouse experiences. Most luxury tours allocate 2-3 days.'
    }
  ],
  relatedTourSlugs: ['colorful-yunnan-beijing-hub', 'chengdu-signature-panda-culture'],
  relatedGuideSlugs: ['leshan-buddha-travel-guide', 'emei-mountain-travel-guide'],
  galleryImages: [
    galleryItem(`${TI}/chengdu-pandas.jpg`, 'object-[center_42%]'),
    galleryItem(`${TI}/china-pagoda-night.jpg`, 'object-[center_38%]'),
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-21'
};

// ============================================================================
// GUILIN GUIDE
// ============================================================================

export const guilinGuide: DestinationGuide = {
  id: 'guide-guilin',
  slug: 'guilin-travel-guide',
  destinationName: 'Guilin',
  metaTitle: 'Guilin Travel Guide | Li River Cruise | Karst Mountains | CTS Tours',
  metaDescription: 'Guilin travel guide: Li River, karst landscapes, ancient cormorant fishing. Explore China\'s most scenic region.',
  keywords: ['Guilin travel', 'Li River', 'karst mountains', 'Yangshuo', 'cormorant fishing'],
  h1: 'Guilin Travel Guide: Where Mountains Meet Water',
  heroSubtitle: 'China\'s Most Picturesque Landscape',
  heroImage: `${TI}/guilin-river-valley.jpg`,
  heroImageClassName: 'object-[center_35%]',
  introText: [
    'Guilin lies in Guangxi in southern China. Limestone peaks rise straight from the Li River. The scenery has inspired Chinese art for centuries.',
    'The Li River cruise to Yangshuo is the classic experience. You pass peaks, villages, and bamboo for about eighty-three kilometres.',
    'Cormorant fishing shows still run for visitors. They nod to an older river culture.',
    'Flights connect Guilin to Beijing, Shanghai, and Chengdu. You can add caves, cycling, or village walks.',
    'For New Zealand travellers who want postcard China, Guilin and Yangshuo are hard to beat.'
  ],
  sections: [
    {
      title: 'Li River Cruise: The Essential Journey',
      id: 'li-river-cruise',
      content: [
        'The Li River cruise represents China\'s most celebrated scenic journey. The 83-kilometre route from Guilin to Yangshuo passes through landscapes so distinctive that UNESCO recognised the area as World Heritage Site. The cruise\'s geological marvel stems from karst formation—limestone dissolution creating dramatic peaks, caves, and underground waterways. These mountains, named after their shapes (Elephant Hill, Camel Peak, Maiden Peak), inspired millennia of artistic representation.',
        'Full-day cruises depart Guilin morning (8-9am), reaching Yangshuo evening (5-6pm), with stops for lunch and village visits. Shorter cruises (Guilin to Zhujiang or Yue-Tong sections) compress the experience into half-days. Private boat charters provide flexibility; bamboo rafting offers alternative perspectives. Optimal conditions occur during spring (April-May) and autumn (September-October) when water levels suit navigation and weather permits clear views.',
        'The famous Liusanjie cormorant fishing demonstrations occur nightly in Yangshuo. Fishermen guide bamboo boats using trained cormorants with snares preventing them from swallowing larger fish; the birds disgorge catches into baskets. This millennium-old technique now serves primarily tourism, yet traditional knowledge and skills persist. Evening performances under moonlight create atmospheric experiences; understanding historical context deepens appreciation.'
      ]
    },
    {
      title: 'Yangshuo & Rural Village Life',
      id: 'yangshuo-rural-life',
      content: [
        'Yangshuo, 83km downstream from Guilin, evolved from quiet riverside village to cosmopolitan traveller hub whilst maintaining village character. The West Street area attracts backpackers and tourists with cafes, language schools, and adventure tourism operators. Genuine village atmosphere persists in surrounding neighbourhoods: family-run restaurants, agricultural fields, and traditional architecture remain integral.',
        'The area\'s appeal lies in balancing exploration accessibility with authentic rural experience. Bicycle rentals (¥10-20 daily) permit independent exploration of surrounding villages, farms, and scenic viewpoints. Dragon\'s Backbone Rice Terraces, 2-3 hours north, feature stunning agricultural sculptures carved into mountains across centuries. Photography enthusiasts find golden-hour light transforming terraced landscapes into abstract compositions.',
        'Rock climbing and caving attract adventure tourists; limestone formations create sport climbing routes. Professional operators offer instruction; experienced climbers access challenging multi-pitch routes. The surrounding countryside accommodates homestays with local families, offering rural immersion and home-cooked meals. Many visitors base themselves in Yangshuo for 2-3 days, using it as hub for surrounding exploration.'
      ]
    },
    {
      title: 'Karst Caves & Geological Wonders',
      id: 'karst-caves',
      content: [
        'Reed Flute Cave (Ludi Yan), 5km from Guilin city, showcases stalactite and stalagmite formations sculpted across millennia. Modern illumination highlights crystal formations, underground rivers, and cavernous spaces. The 240-metre walkway navigates increasingly dramatic chambers; some formations resemble recognisable objects (elephants, lions, pagodas), engaging visitors\' imagination. An hour suffices for complete exploration.',
        'The Moon Hill Cave in Yangshuo features naturally circular opening resembling moon; pathways ascend through cave reaching the opening for valley views. The walking route combines cave exploration with rural landscape immersion. Luminous stalactites catch light creating otherworldly atmosphere. Local guides explain geological processes and cultural histories embedded in landscape.',
        'Thousand Buddha Cave and other lesser-known formations offer quieter alternatives to heavily touristed attractions. Professional guides provide geological and historical context. Cave temperatures remain constant (15-18°C) regardless of outside weather; jackets recommended.'
      ]
    },
    {
      title: 'Local Culture & Minority Communities',
      id: 'local-culture',
      content: [
        'Guangxi hosts multiple ethnic minorities: Zhuang (largest), Yao, Miao, and Dong peoples. Traditional clothing remains visible in rural areas; markets feature distinctive handicrafts and textiles. The Zhuang embroidery technique, passed through generations, features intricate patterns reflecting mythological and natural themes. Visitors can observe production or commission custom pieces.',
        'Oil-paper umbrella production, practised in neighbouring Jiangxi Province yet connected to Guangxi cultural networks, showcases traditional craftsmanship. Artisans hand-paint waterproof paper using natural dyes and fine brushes; the resulting umbrellas function as both practical tools and artistic works. Markets offer examples; workshops permit observation of production.',
        'Local festivals celebrate seasonal transitions and ethnic traditions. The Cormorant Fishing Festival (September), Dragon Boat Festival (lunar May), and regional celebration patterns reflect deep cultural continuity. Seasonal markets offer fresh produce, traditional foods, and handicrafts at minimal cost. Homestays facilitate cultural exchange, breaking down tourist-local barriers.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Li River Cruise',
      description: 'World-famous 83km scenic journey through karst mountains; UNESCO World Heritage landscape.',
      visitDuration: '8-9 hours (full day)',
      bestTime: 'April-May and September-October for water levels and weather',
      ticketInfo: '¥350-500 adults full cruise; shorter routes ¥100-250; includes transport'
    },
    {
      name: 'Yangshuo Village',
      description: 'Riverside village hub with accommodation, restaurants, adventure tourism, and rural exploration base.',
      visitDuration: '2-3 days recommended',
      bestTime: 'Any season; spring and autumn ideal',
      ticketInfo: 'Free to explore; accommodation ¥200-800; meals ¥20-100'
    },
    {
      name: 'Reed Flute Cave',
      description: 'Illuminated stalactite cave with underground river; modern walkway through geological formations.',
      visitDuration: '1 hour',
      bestTime: 'Morning or afternoon; any season',
      ticketInfo: '¥110 adults; ¥55 students; transport from city ¥20-30'
    },
    {
      name: 'Dragon\'s Backbone Rice Terraces',
      description: 'UNESCO landscape of centuries-old mountain terraces; photogenic agricultural artwork.',
      visitDuration: '4-5 hours (day trip)',
      bestTime: 'Spring (planting, water-filled) or autumn (harvest, golden hues)',
      ticketInfo: '¥80 adults; scenic area entry; arrange transport through hotel'
    },
    {
      name: 'Cormorant Fishing Night Show',
      description: 'Traditional fishing technique demonstration with trained birds; evening performance with lantern atmosphere.',
      visitDuration: '1-1.5 hours',
      bestTime: 'Evening performances nightly in Yangshuo',
      ticketInfo: '¥100-150 per person; includes drinks; book through hotel'
    },
    {
      name: 'Moon Hill Cave',
      description: 'Natural rock formation with circular opening; cave exploration combined with panoramic views.',
      visitDuration: '2-3 hours',
      bestTime: 'Morning for light; early afternoon for photography',
      ticketInfo: '¥60 adults; ¥30 students; walk from Yangshuo town centre'
    },
    {
      name: 'Elephant Hill (Xiangbi Shan)',
      description: 'Iconic landmark with elephant-shaped peak; scenic spot in Guilin city area.',
      visitDuration: '1-1.5 hours',
      bestTime: 'Late afternoon and evening for sunset',
      ticketInfo: '¥75 adults; ¥37.50 students'
    },
    {
      name: 'Guilin Folk Customs Museum',
      description: 'Cultural heritage focusing on ethnic minorities and traditional craftsmanship.',
      visitDuration: '1.5-2 hours',
      bestTime: 'Weekday mornings for quiet atmosphere',
      ticketInfo: '¥60 adults; ¥30 students; includes guided tour'
    }
  ],
  practicalInfo: {
    transportation: 'Guilin Liangjiang International Airport connects to major cities (Beijing 3 hours, Shanghai 2.5 hours, Chengdu 2.5 hours). City has growing metro system; taxis/Didi ubiquitous. Li River cruises depart morning from city docks. Yangshuo accessible by direct minibus (1.5 hours, ¥20) or cruise completion. Bicycle rentals popular for local exploration.',
    climate: 'Subtropical; warm and humid most of year. Winters (December-February) cool (5-15°C), rarely cold. Summers (June-August) hot (25-35°C) and humid with frequent rain. Spring and autumn mild and pleasant.',
    bestTime: 'April to May (spring, water levels ideal, 15-25°C) and September to November (autumn, clear skies, 15-25°C). Avoid rainy season (May-June) when flooding possible; summer very hot and humid.',
    budget: 'Street food and casual meals ¥20-50; mid-range ¥80-200; upscale ¥200-500+. Accommodation: budget ¥100-250, mid-range ¥400-900, luxury ¥1200+. Cruises and cave entries ¥60-500 depending on service level.',
    language: 'Mandarin Chinese; Guangxi dialect spoken locally. English present in tourist-heavy Yangshuo; scarce elsewhere. Translation apps essential for independent travel.',
    safety: 'Generally safe; river cruises operate under regulation. Standard precautions on boats and in caves. Rural areas very safe. Water safety varies by conditions; follow guide instructions.'
  },
  faqs: [
    {
      question: 'Should I book the Li River cruise in advance?',
      answer: 'Advance booking (via hotel or travel agent) guarantees spot and permits price negotiation. Walk-up bookings exist but higher prices and potential unavailability during peak seasons (Chinese New Year, summer holidays). Budget 2-3 days\' advance notice minimum; spontaneous same-day bookings possible at higher cost.'
    },
    {
      question: 'How long does the Li River cruise take?',
      answer: 'Full journey Guilin to Yangshuo requires 8-9 hours including lunch and stops. Shorter segments (half-day cruises) cover 30-40km in 4 hours. Private charters permit flexible timing and custom stops. Most visitors prefer full-day immersion for landscape appreciation.'
    },
    {
      question: 'Is Yangshuo safe for solo travellers?',
      answer: 'Yangshuo is exceptionally safe and extremely backpacker-friendly with extensive tourism infrastructure. Solo female travellers, families, and various traveller types thrive here. Numerous hostels and language schools facilitate meeting other travellers. The village atmosphere and tourist prevalence create low-risk environment.'
    },
    {
      question: 'Can I do multiple activities in Yangshuo?',
      answer: 'Yes; most visitors base themselves 2-3 days and undertake multiple excursions: Li River segments, cave visits, rice terrace treks, rock climbing, cycling tours. This permits both adventure activities and relaxation. A week in Yangshuo permits deeper exploration of surrounding region.'
    },
    {
      question: 'Is cormorant fishing authentic or just tourist performance?',
      answer: 'The modern practice is tourist-oriented; traditional fishing was sustainable livelihood. However, families maintaining the tradition preserve genuine knowledge and cultural heritage. Evening performances remain impressive demonstrations of human-animal partnership and traditional technique. Understanding historical context enriches appreciation.'
    }
  ],
  relatedTourSlugs: ['best-of-china-beijing-xian-hangzhou-puyuan', 'guilin-signature-karst-rivers'],
  relatedGuideSlugs: ['yangshuo-travel-guide', 'li-river-travel-guide'],
  galleryImages: [
    `${TI}/guilin-river-valley.jpg`,
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-21'
};

// ============================================================================
// ZHANGJIAJIE GUIDE
// ============================================================================

export const zhangjiajieGuide: DestinationGuide = {
  id: 'guide-zhangjiajie',
  slug: 'zhangjiajie-travel-guide',
  destinationName: 'Zhangjiajie',
  metaTitle: 'Zhangjiajie Travel Guide | Avatar Mountains | Glass Walkway | CTS Tours',
  metaDescription: 'Zhangjiajie travel guide: Zhangjiajie National Park, Avatar Mountains, Tianmen Mountain. Visit China\'s most dramatic landscape.',
  keywords: ['Zhangjiajie travel', 'Avatar Mountains', 'glass walkway', 'Tianmen Mountain', 'national park'],
  h1: 'Zhangjiajie Travel Guide: Mountains That Touch the Sky',
  heroSubtitle: 'Home of Avatar\'s Pandora Landscape',
  heroImage: `${TI}/zhangjiajie.jpg`,
  heroImageClassName: 'object-[center_30%]',
  introText: [
    'Zhangjiajie is in Hunan Province in central China. Sandstone pillars rise more than a thousand metres in places. Mist often fills the valleys.',
    'James Cameron used the national park as a visual reference for Avatar. Expect crowds at famous viewpoints and on the glass skywalk.',
    'Wulingyuan is a UNESCO World Heritage site. Cable cars, elevators, and trails help you move between peaks.',
    'Allow at least two or three full days for the forest park and Tianmen Mountain. Trains link the city to Beijing, Shanghai, and Chengdu.',
    'For New Zealand visitors who love heights and hiking, Zhangjiajie is a standout nature stop.'
  ],
  sections: [
    {
      title: 'Zhangjiajie National Forest Park',
      id: 'national-forest-park',
      content: [
        'The national park encompasses three primary scenic areas: Zhangjiajie Mountain (Mount Zhangjiajie), Tianzi Mountain (Emperor Mountain), and Suoxi Valley, plus numerous lesser-known sections. The sandstone pillar formations—resulted from 300 million years of geological processes—rise dramatically from the park floor. These distinctive peaked mountains create visual drama distinct from elsewhere in China.',
        'A comprehensive park experience requires 2-3 days. Day one might explore Zhangjiajie Mountain scenic area via cable car ascent, glass walkway experience, and forest trails. Day two permits Tianzi Mountain exploration, featuring panoramic vistas and fewer crowds than Zhangjiajie Mountain. Day three allows Suoxi Valley hikes through quiet forest sections, past ancient temples, to remote viewpoints.',
        'The famous Bailong Elevator—a high-speed lift ascending 326 metres vertically through mountain face—offers thrilling alternative to hiking steep sections. The Ten-Mile Gallery scenic section features peaceful cableway journey through dramatic valleys. Morning hikes offer misty atmospheric conditions; afternoon light cuts through clouds creating dramatic photography opportunities.'
      ]
    },
    {
      title: 'The Glass Walkway & Extreme Experiences',
      id: 'glass-walkway',
      content: [
        'The Zhangjiajie Glass Skywalk, constructed on cliff at 1,430 metres elevation, extends 430 metres offering unobstructed valley views through transparent glass beneath visitors\' feet. The walkway accommodates simultaneous passage of 800 people. The experience creates exhilarating (or terrifying) sensation of walking above the landscape, with only glass separating visitors from 300-metre voids.',
        'The walkway represents human engineering ambition applied to natural landscape. Construction required innovative techniques drilling into cliff faces, installing cable systems, and creating transparent structure withstanding extreme weather and seismic activity. Access requires valid ID; rental shoe covers protect the glass. The wait-time fluctuates by season; early morning visits (8-9am) minimise queues.',
        'Beyond the walkway, other extreme experiences include cliff-face bungee jumping (470 metres), cableway with glass sections, and hiking across narrow cliff passages. These attractions appeal to adventure-seekers; traditional tourists may find standard trail experiences equally rewarding. The landscape\'s inherent drama transcends artificial adrenaline-enhancement.'
      ]
    },
    {
      title: 'Tianmen Mountain & Cable Car Experiences',
      id: 'tianmen-mountain',
      content: [
        'Tianmen Mountain (Tianmen Shan, Heaven\'s Gate Mountain), located near Zhangjiajie city (30km), features the world\'s longest non-stop cable car (7,455 metres) ascending 1,279 metres. The cable car journey requires 8 minutes and passes several peaks; some passengers experience altitude-induced anxiety. The summit features observation platforms, Buddhist temple, and dramatic cliff views.',
        'The Heaven\'s Gate natural arch—a natural rock passage at mountain summit—represents a geomantic auspicious symbol. Ancient emperors performed ceremonies here believing cosmic forces concentrated at this location. The modern cable car experience, whilst removing the pilgrimage hardship, preserves the spiritual geography.',
        'Descent options include cable car return (retracing ascent), or the famous 999-step staircase descending cliff face (approximately 30-45 minutes). Alternative hiking paths offer quieter alternatives to cable car crowds. The scenic area warrants 4-5 hours including cable car rides, temple visits, and plateau exploration.'
      ]
    },
    {
      title: 'The Avatar Connection & Cultural Impact',
      id: 'avatar-connection',
      content: [
        'James Cameron\'s scouting expedition (2008) identified Zhangjiajie National Forest Park as visual inspiration for Avatar\'s Pandora landscape. The floating mountain islands in Avatar\'s fictional world directly paralleled the sandstone pillars of Zhangjiajie. The 2009 Avatar release triggered massive tourism surge; the park was renamed "Avatar Hallelujah Mountain" for several years.',
        'Avatar tourism remains powerful draw; many visitors explicitly desire experiencing "Pandora landscape." Tour operators capitalise on Avatar references; hotels feature Avatar imagery; guides provide Avatar context. Whilst the comparison is somewhat superficial—Avatar\'s fictional ecosystems contrast sharply with Zhangjiajie\'s real biodiversity—the cultural connection heightens appreciation for the landscape\'s otherworldly qualities.',
        'The park itself benefits from Avatar tourism through increased infrastructure investment and international profile. However, overcrowding during peak seasons challenges park preservation. Environmental concerns regarding cable cars, walking paths, and human impact on sensitive ecosystems require ongoing management.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Zhangjiajie National Forest Park',
      description: 'UNESCO World Heritage sandstone pillar landscape; primary destination featuring cable cars, glass walkway, temples.',
      visitDuration: '2-3 days for comprehensive exploration',
      bestTime: 'April-May and September-October for weather; misty mornings atmospheric',
      ticketInfo: '¥248 (3-day pass); ¥298 with cable car; scenic vehicles included'
    },
    {
      name: 'Glass Skywalk',
      description: 'Transparent cliff-mounted walkway at 1,430m offering vertigo-inducing valley perspectives.',
      visitDuration: '1-1.5 hours',
      bestTime: 'Early morning (8-9am) for minimal queues; clear weather for views',
      ticketInfo: 'Included in park pass; shoe covers ¥30; ID required'
    },
    {
      name: 'Bailong Elevator',
      description: 'High-speed lift ascending 326m through mountain face; alternative to hiking steep terrain.',
      visitDuration: '20-30 minutes (including ascent/descent)',
      bestTime: 'Any time; reduces physical exertion on steep trail',
      ticketInfo: 'Included in park pass; operates weather permitting'
    },
    {
      name: 'Tianmen Mountain',
      description: 'Heaven\'s Gate mountain with world\'s longest cable car, temple, and 999-step descent option.',
      visitDuration: '4-5 hours',
      bestTime: 'Morning for clear light; cable car ride dramatic at any time',
      ticketInfo: '¥258 adults; ¥129 students; cable car, descent stairs, scenic area included'
    },
    {
      name: 'Ten-Li Gallery (Ten-Mile Gallery)',
      description: 'Scenic cableway through dramatic valleys; peaceful alternative to peak areas.',
      visitDuration: '1.5-2 hours',
      bestTime: 'Any season; less crowded than famous viewpoints',
      ticketInfo: 'Included in park pass; gentle alternative to hiking'
    },
    {
      name: 'Suoxi Valley',
      description: 'Quiet valley section with forest trails, streams, ancient temples, fewer crowds.',
      visitDuration: '3-4 hours',
      bestTime: 'Any season; morning hiking most pleasant',
      ticketInfo: 'Included in park pass; hiking distance 6-8km'
    },
    {
      name: 'Tianzi Mountain Scenic Area',
      description: 'Panoramic mountain vistas; photo hot spots and less crowded than Zhangjiajie Mountain.',
      visitDuration: '3-4 hours',
      bestTime: 'Late afternoon for sunset light; spring for flowers',
      ticketInfo: 'Included in park pass; hiking trails moderate difficulty'
    },
    {
      name: 'Zhangjiajie Grand Canyon Glass Bridge',
      description: 'Transparent bridge suspended 300m above canyon; engineering feat and photography location.',
      visitDuration: '1-1.5 hours',
      bestTime: 'Early morning or late afternoon for light; clear weather essential',
      ticketInfo: '¥128 adults; ¥64 students; separate from national park pass'
    }
  ],
  practicalInfo: {
    transportation: 'Zhangjiajie Hehuang Airport (45km) connects to major cities (Beijing 2.5 hours, Shanghai 2 hours, Chengdu 1.5 hours). City has metro development; taxis/Didi prevalent. High-speed trains to Beijing (11 hours), Shanghai (12 hours), Chengdu (6 hours), Chongqing (4 hours). Park accessed by cable car, scenic vehicles, and hiking; internal transport passes included in park admission.',
    climate: 'Subtropical; mild year-round. Winters (December-February) cool (5-15°C), rarely cold. Summers (June-August) warm (20-28°C) with occasional rain. Spring and autumn mild (15-25°C). Cloud cover frequent; misty atmospheric conditions common.',
    bestTime: 'April to May (spring, mild weather, flowers) and September to November (autumn, clear skies, ideal hiking). December-February cool and foggy; July-August warm and humid. Rainy season (May-June) can affect visibility.',
    budget: 'Street food and casual meals ¥20-50; mid-range ¥60-150; upscale ¥150-400. Accommodation: budget ¥100-250, mid-range ¥400-900, luxury ¥1200+. Park entry ¥248-298; activities ¥100-258 additional. Multi-day park passes recommended.',
    language: 'Mandarin Chinese; Hunan dialect spoken locally. English present in tourist-heavy city areas; scarce in national park. Translation apps recommended for independent exploration.',
    safety: 'Zhangjiajie safe for tourists; well-developed tourism infrastructure. National park hiking requires reasonable fitness levels; steep sections and exposed cliff edges demand attention. Heights and exposure create psychological challenges for some visitors. Follow guide safety instructions carefully.'
  },
  faqs: [
    {
      question: 'How many days should I spend in Zhangjiajie?',
      answer: 'Minimum 2 days: one day Zhangjiajie National Forest Park (glass walkway, main scenic areas), one day Tianmen Mountain. Three days permits Zhangjiajie mountain comprehensive exploration plus day trip to Tianmen. Four+ days allows multiple park areas, quieter trails, and neighbouring attractions.'
    },
    {
      question: 'Is the glass walkway actually scary?',
      answer: 'Psychological response varies. Some visitors find it thrilling; others experience significant vertigo. The structure is engineered safely; fear is psychological. If afraid of heights, consider skipping this attraction. Alternative park experiences (cable cars, hiking) offer drama without glass-floor exposure.'
    },
    {
      question: 'Can I do Zhangjiajie and Guilin in one trip?',
      answer: 'Yes; both in southern/central China. High-speed rail connects Zhangjiajie to Guilin (5-6 hours). Most itineraries allocate 2-3 days Zhangjiajie, 2-3 days Guilin. Combined trips require 5-6 days minimum; ideal itinerary uses 7-8 days.'
    },
    {
      question: 'When is the best time to visit Zhangjiajie?',
      answer: 'April-May (spring, mild, flowers) and September-November (autumn, clear skies) ideal. Cloud cover frequent any time; misty mornings atmospheric but reduce visibility. December-February cold and foggy; July-August warm and humid. Avoid Chinese New Year and summer holidays for crowds.'
    },
    {
      question: 'Do I need good fitness for Zhangjiajie hiking?',
      answer: 'Park offers varied difficulty: cable cars permit low-fitness access; moderate trails suit average fitness; steep sections challenge experienced hikers. Main attractions (glass walkway, Bailong elevator, Tianmen cable car) avoid strenuous hiking. Independent hikers should assess personal fitness and select trails accordingly.'
    }
  ],
  relatedTourSlugs: ['best-of-china-beijing-xian-hangzhou-puyuan', 'zhangjiajie-signature-mountains'],
  relatedGuideSlugs: ['tianmen-mountain-travel-guide', 'zhangjiajie-avatar-mountains-guide'],
  galleryImages: [],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-21'
};

// ============================================================================
// YUNNAN GUIDE
// ============================================================================

export const yunnanGuide: DestinationGuide = {
  id: 'guide-yunnan',
  slug: 'yunnan-travel-guide',
  destinationName: 'Yunnan',
  metaTitle: 'Yunnan Travel Guide | Diverse Landscapes & Cultures | CTS Tours',
  metaDescription: 'Yunnan travel guide: Stone Forest, rice terraces, ethnic minorities. Explore China\'s most colourful province.',
  keywords: ['Yunnan travel', 'Stone Forest', 'Dali', 'ethnic minorities', 'natural beauty'],
  h1: 'Yunnan Travel Guide: Province of Colour and Culture',
  heroSubtitle: 'Where Mountains, Minorities & Mystique Meet',
  heroImage: `${TI}/yunnan-rice-terraces.jpg`,
  heroImageClassName: 'object-[center_35%]',
  introText: [
    'Yunnan is in southwest China. Twenty-five ethnic groups are officially recognised here. Landscapes range from steamy valleys to snowy peaks.',
    'The province name means "South of the Clouds." Rice terraces, stone forests, and old towns sit within a few hours of each other.',
    'Kunming is the capital. Locals call it the "City of Eternal Spring" for its mild weather.',
    'Dali, Lijiang, and Shangri-La are the best-known stops. Each has its own culture, food, and pace.',
    'You can fly into Kunming and join trains or coaches between towns. One week covers highlights; two weeks allow villages and treks.',
    'For New Zealand travellers, Yunnan suits slow travel, photography, and food-focused trips.'
  ],
  sections: [
    {
      title: 'Stone Forest & Geological Wonders',
      id: 'stone-forest',
      content: [
        'The Stone Forest (Shilin), located 80km southeast of Kunming, comprises labyrinthine limestone formations creating an underground landscape above ground. The karst peaks—some reaching 40 metres—create narrow passages, natural arches, and dramatic shadows. UNESCO recognised the area as World Heritage site, acknowledging both geological and cultural significance. Archaeological evidence suggests human habitation spanning millennia.',
        'The scenic area permits multiple exploration routes of varying difficulty. Guided tours (¥80-120) provide geological context and navigate the maze-like landscape efficiently. Independent exploration permits flexibility but requires careful navigation. Paths are well-marked; most visitors spend 3-4 hours traversing main features. The Yi ethnic minority\'s presence (Yi people historically inhabited surrounding areas) adds cultural layer to geological spectacle.',
        'Sani cultural performances occur nightly, demonstrating Yi tradition song, dance, and costume. The performances commercialise culture somewhat, yet practitioners maintain authentic knowledge and pride in heritage. Torch-lit evening walks through the stone forest create atmospheric experiences distinct from daytime visits.'
      ]
    },
    {
      title: 'Dali & Ancient South Silk Road',
      id: 'dali-silk-road',
      content: [
        'Dali, ancient capital of the Nanzhao Kingdom (738-1095 AD), retains archaeological and architectural significance. The walled Old Town preserves Ming and Qing architecture, with cobblestone streets, whitewashed buildings, and ornate wooden gates reflecting Bai ethnic architectural traditions. The Three Pagodas, original dating to Tang Dynasty, dominated Dali\'s skyline for centuries; recent restoration preserves architectural heritage.',
        'The town functions as cultural crossroads on the ancient South Silk Road. Historically, merchants, pilgrims, and adventurers traversed Dali en route between Tibet, Burma, India, and coastal China. Modern Dali witnesses tourism flowing in similar patterns—backpackers, academics, and spiritual seekers congregate in Old Town cafes discussing travels and discoveries. This contemporary pilgrimage energy echoes historical commercial dynamism.',
        'Erhai Lake, adjacent to Dali, provides water recreation, scenic walks, and small island temples. Cycling around the lake (full circuit 130km; section cycling popular) offers rural landscape immersion. Fishermen\'s villages on lake periphery maintain traditional net-casting techniques. Evening light across the lake creates photogenic conditions; sunrise over mountains equally dramatic.'
      ]
    },
    {
      title: 'Lijiang & Naxi Heritage',
      id: 'lijiang-naxi',
      content: [
        'Lijiang, ancient town on the north bank of the Jinsha River (Yangtze upper course), preserves Naxi ethnic cultural heritage. The Old Town (UNESCO World Heritage site) features distinctive architecture: no walls (unusual for Chinese towns), wooden structures with intricate carvings, water channels integrated throughout. The Naxi people, unique ethnic group inhabiting this region, developed their own written language (Dongba script), music, and cultural traditions.',
        'The town\'s layout reflects feng shui principles and practical water management (channels provide firefighting capability, as demonstrated by 1996 fire that destroyed much of neighbouring Dukezong Town but spared Lijiang). Walking the narrow lanes reveals courtyard gardens, shops selling traditional crafts, restaurants serving Naxi cuisine, and spiritual shrines. The atmosphere blends tourism infrastructure with genuine cultural practice.',
        'Mu Residence exemplifies Naxi wealthy merchant architecture; the compound spans an entire city block with elaborate gardens and ceremonial halls. Black Dragon Pool garden offers reflection views of the Jade Dragon Snow Mountain. The Naxi music and dance tradition (Dongjing opera) performed by elderly Naxi musicians continues in evening performances, preserving cultural knowledge.'
      ]
    },
    {
      title: 'Shangri-La & Tibetan Culture',
      id: 'shangri-la-tibetan',
      content: [
        'Shangri-La (formerly Zhongdian), elevation 3,276 metres, serves as primary Yunnan hub for Tibetan cultural exploration. The town functions as regional capital for Tibetan communities spanning Yunnan, Sichuan, and Tibet. Songzanlin Temple, Tibet\'s largest lamasery outside Tibet, dominates the landscape with golden roofs visible for kilometres. The monastery houses approximately 700 monks maintaining active religious practice.',
        'Debating monks at Songzanlin Temple provide insights into Buddhist philosophical training. Visitors can observe afternoon debating sessions (weather permitting) where monks engage in rapid-fire philosophical discourse with physical gestures emphasising points. The monastic library preserves thousands of Tibetan Buddhist texts; workshops permit observation of thangka painting and manuscript illumination.',
        'Surrounding Shangri-La, Tibetan villages maintain traditional life patterns. Homestays permit cultural immersion: participating in daily activities, sharing meals, learning about pastoral economies and spiritual practices. Meili Snow Mountain, viewed from Shangri-La region, represents sacred peak in Tibetan Buddhism; pilgrims circumambulate the mountain circuit (3-5 days) seeking spiritual advancement.'
      ]
    },
    {
      title: 'Yunnan Cuisine & Cultural Diversity',
      id: 'cuisine-diversity',
      content: [
        'Yunnan cuisine reflects provincial diversity: influences from Sichuan spiciness, Southeast Asian herbs, Tibetan butter tea, and local agricultural abundance. Yunnan rice noodles (mixian across the province), prepared across the province with regional variations, represent iconic dishes. Cross-bridge noodles (guo qiao mi xian), originating in Yunnan, feature raw ingredients accompanying hot broth that cooks ingredients at table.',
        'Ethnic minority cuisines remain integral to Yunnan dining: Dai people\'s bamboo-wrapped sticky rice and herbs; Bai people\'s unique cheeses and preserved vegetables; Tibetan butter tea and barley bread; Hani people\'s smoked meats and forest herbs. Local markets overflowing with fresh produce, preserved goods, and foraged items indicate agricultural richness. Cooking classes in Dali and Lijiang teach traditional preparation techniques.',
        'Tea culture pervades Yunnan; the province produces significant pu-erh tea traded across China and globally. Tea tastings, visits to tea factories, and participation in tea ceremonies provide educational experiences. Many hotels and guesthouses maintain tea rooms where guests learn proper brewing techniques and tea appreciation.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Stone Forest (Shilin)',
      description: 'UNESCO limestone formations maze; geological marvel and Yi cultural landscape.',
      visitDuration: '3-4 hours',
      bestTime: 'Early morning for fewer crowds; afternoon for dramatic shadows',
      ticketInfo: '¥130 adults; ¥65 students; 80km from Kunming, transport ¥50-80'
    },
    {
      name: 'Dali Old Town',
      description: 'Ancient walled town preserving Ming-Qing architecture and Bai culture.',
      visitDuration: '2-3 days recommended',
      bestTime: 'Any season; spring flowers lovely; clear weather for mountain views',
      ticketInfo: 'Free to explore; accommodation and meals varying prices'
    },
    {
      name: 'Three Pagodas (Dali)',
      description: 'Tang Dynasty towers restored; iconic Dali skyline structures with cultural history.',
      visitDuration: '1 hour',
      bestTime: 'Sunrise or sunset for photography',
      ticketInfo: '¥75 adults; ¥37.50 students'
    },
    {
      name: 'Erhai Lake',
      description: 'Scenic mountain lake adjacent to Dali; cycling, boating, fishing village culture.',
      visitDuration: '4-6 hours',
      bestTime: 'Sunrise or golden hour; any season',
      ticketInfo: 'Free to visit; cycling ¥20-40 rental; boat tours ¥50-100'
    },
    {
      name: 'Lijiang Old Town',
      description: 'UNESCO World Heritage walled town preserving Naxi architectural heritage.',
      visitDuration: '2-3 days',
      bestTime: 'Any season; early mornings peaceful',
      ticketInfo: 'Free to explore; maintenance fee ¥80 for certain areas'
    },
    {
      name: 'Mu Residence (Lijiang)',
      description: 'Historic Naxi merchant mansion with gardens; architectural and cultural significance.',
      visitDuration: '1.5 hours',
      bestTime: 'Morning for good light',
      ticketInfo: '¥30 adults; ¥15 students'
    },
    {
      name: 'Songzanlin Tibetan Buddhist Temple',
      description: 'Tibet\'s largest lamasery outside Tibet; 700 monks, debate sessions, cultural centre.',
      visitDuration: '2-3 hours',
      bestTime: 'Afternoon for monk debates; morning for quieter atmosphere',
      ticketInfo: '¥115 adults; ¥57.50 students; located in Shangri-La'
    },
    {
      name: 'Meili Snow Mountain',
      description: 'Sacred Tibetan peak; pilgrimage site with trekking opportunities and mountain vistas.',
      visitDuration: '2-5 days depending on trekking',
      bestTime: 'Clear weather October-May; glacier viewing season varies',
      ticketInfo: '¥120 park entry; treks ¥400-1000+ depending on length'
    }
  ],
  practicalInfo: {
    transportation: 'Kunming Changshui International Airport connects to major cities (Beijing 3.5 hours, Shanghai 2.5 hours, Bangkok 3 hours). City has metro system; taxis/Didi ubiquitous. High-speed trains to Chengdu (6 hours), Beijing (12 hours). Regional travel relies on buses and hired vehicles; road infrastructure generally good. Lijiang and Shangri-La have airports; bus networks connect towns.',
    climate: 'Subtropical to temperate depending on elevation. Kunming mild year-round (10-25°C). Lijiang (2,400m elevation) cool (5-20°C); Shangri-La (3,276m) cold (-5 to 15°C). Rainy season May-October; dry season November-April. Yunnan remains most temperate province year-round.',
    bestTime: 'March to May (spring, flowers, mild weather) and September to November (autumn, clear skies, harvest season). December-February cool but clear; July-August warm and rainy.',
    budget: 'Street food ¥10-30; mid-range ¥40-120; upscale ¥120-300+. Accommodation: budget ¥80-200, mid-range ¥250-600, luxury ¥800+. Attractions ¥75-130 individually. Yunnan generally less expensive than coastal provinces.',
    language: 'Mandarin Chinese; regional dialects spoken locally. English present in Kunming, Dali, Lijiang tourist areas; less common in Shangri-La and villages. Translation apps essential for independent travel.',
    safety: 'Generally safe for tourists; standard urban and rural precautions apply. Higher elevations (Shangri-La) may cause altitude effects. Road travel sometimes challenging in monsoon season. Remote villages extremely safe with strong hospitality traditions.'
  },
  faqs: [
    {
      question: 'How many days should I spend in Yunnan?',
      answer: 'Minimum 5-6 days covers Kunming, Dali, Lijiang basics. Week-long itinerary adds Shangri-La or Stone Forest. 2-week trip permits comprehensive exploration: Stone Forest, Dali (2 days), Lijiang (2 days), Shangri-La (2 days), trekking. Extended stays (3+ weeks) allow deep cultural immersion and remote village visits.'
    },
    {
      question: 'Should I hire a guide in Yunnan?',
      answer: 'Guides highly beneficial for cultural context and language bridging. Local guides in Dali/Lijiang affordable (¥200-400 daily). Professional guides from cities cost more but offer historical depth. Many tours include guides; independent travellers can arrange through hotels or tour agencies.'
    },
    {
      question: 'What\'s the altitude concern in Shangri-La?',
      answer: 'Shangri-La (3,276m) causes altitude effects for some visitors: headaches, breathlessness, fatigue. Acclimatisation requires first day rest, light activity. Stay hydrated, avoid alcohol. Pre-trip acclimatisation in Dali (1,900m) or Lijiang (2,400m) helpful. Serious altitude concerns warrant skipping Shangri-La or flying directly.'
    },
    {
      question: 'Can I visit multiple Yunnan towns in one trip?',
      answer: 'Yes; regular bus connections link Kunming, Dali, and Lijiang (9-12 hours total travel). Most itineraries follow Kunming → Dali → Lijiang → Shangri-La sequence. High-speed rail connects Kunming to surrounding cities, reducing travel time. 10-14 days permits comfortable multi-town exploration.'
    },
    {
      question: 'What are traditional Yunnan souvenirs?',
      answer: 'Pu-erh tea (quality varies; purchase from reputable sellers), Naxi handicrafts and clothing, Bai silverwork, Tibetan thankas and crafts, locally-produced textiles. Old Town Dali and Lijiang feature numerous artisan shops; negotiate prices at markets. Avoid tourist-trap quality; seek authentic craftsmanship.'
    }
  ],
  relatedTourSlugs: ['colorful-yunnan-beijing-hub', 'yunnan-signature-cultural-landscape'],
  relatedGuideSlugs: ['lijiang-travel-guide', 'dali-travel-guide', 'shangri-la-travel-guide'],
  galleryImages: [
    `${TI}/yunnan-village.jpg`,
    `${TI}/shangri-la-monastery.jpg`,
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-21'
};

// ============================================================================
// SUB-DESTINATION: LIJIANG
// ============================================================================

export const lijangGuide: DestinationGuide = {
  id: 'guide-lijiang',
  slug: 'lijiang-travel-guide',
  destinationName: 'Lijiang',
  parentDestination: 'yunnan',
  metaTitle: 'Lijiang Travel Guide | Naxi Culture | Ancient Town | CTS Tours',
  metaDescription: 'Lijiang travel guide: Naxi heritage, UNESCO Old Town, Jade Dragon Snow Mountain. Explore Yunnan\'s cultural heart.',
  keywords: ['Lijiang', 'Naxi culture', 'Old Town', 'Jade Dragon Mountain', 'ancient architecture'],
  h1: 'Lijiang: Gateway to Naxi Culture & Yunnan Mountains',
  heroSubtitle: 'Ancient Town of Water, Stone & Cultural Heritage',
  heroImage: `${TI}/yunnan-village.jpg`,
  heroImageClassName: 'object-[center_35%]',
  introText: [
    'Lijiang sits on the Jinsha River at about 2,400 metres above sea level. The Naxi people have lived here for generations.',
    'The Old Town is a UNESCO site. Narrow lanes, wooden houses, and small canals define the streetscape.',
    'Naxi culture includes Dongba script, old music traditions, and hearty mountain food.',
    'You can day-trip to Jade Dragon Snow Mountain and nearby villages. Hotels and cafés cater to international guests.',
    'Many visitors stay longer than planned. The pace is relaxed, and the mountain air is clear in dry season.'
  ],
  sections: [
    {
      title: 'Naxi Culture & Living Heritage',
      id: 'naxi-culture',
      content: [
        'The Naxi people, numbering approximately 340,000, developed unique cultural traditions over centuries. Their written language—Dongba script—represents one of the world\'s oldest surviving pictographic writing systems still in use. Dongba religion, combining elements of Tibetan Buddhism, Taoism, and indigenous shamanism, shaped cultural practices and artistic expression. The Naxi music tradition (Dongjing opera, literally "Daoist music") performed by elderly musicians preserves centuries-old compositions using traditional instruments.',
        'Visiting a Naxi family home offers cultural immersion. Homestays permit participation in daily life: preparing traditional meals, learning about local customs, understanding household economies. Women traditionally dominated textile production; observing weaving practices reveals technical skill and artistic vision. Naxi cuisine emphasises local agriculture: mountain vegetables, preserved foods, and specialised dishes unavailable elsewhere.',
        'The Naxi language, spoken by most residents, differs significantly from Mandarin. Learning basic phrases enhances interactions. Translation apps permit communication; locals appreciate language learning efforts. Museums—particularly the Naxi Dongba Archaeology Museum—preserve cultural knowledge through artefacts, manuscripts, and research presentations.'
      ]
    },
    {
      title: 'Jade Dragon Snow Mountain',
      id: 'jade-dragon-mountain',
      content: [
        'Jade Dragon Snow Mountain (Yulong Snow Mountain), elevation 5,596 metres, dominates the landscape north of Lijiang. The peak—visible from town on clear days—holds spiritual significance in Naxi cosmology. The mountain\'s sacred status restricted climbing historically; contemporary access remains limited to cable car sections and lower hiking routes respecting cultural beliefs.',
        'The Glacier Cable Car ascends to 4,680 metres, permitting glacier viewing. The 15-minute cable car ride offers spectacular panoramic vistas as elevation increases. The glacier, receding due to climate change, remains impressive despite reduced mass. The high altitude creates physiological challenges; visitors should rest before and after cable car rides. Clear weather essential for views; morning visits increase clarity probability.',
        'Lower cable cars access 3,000-3,200 metre zones featuring mountain meadows and forest hiking. The Spruce Meadow offers moderate walking routes through alpine vegetation. Guides provide interpretation of alpine ecology and Naxi sacred mountain traditions.'
      ]
    },
    {
      title: 'Naxi Music Performances & Arts',
      id: 'music-arts',
      content: [
        'Elderly Naxi musicians perform traditional Dongjing opera most evenings in concert halls throughout Old Town. These performances—typically 60-90 minutes—feature 15-20 musicians playing traditional instruments. The compositions, passed through generations without written notation, represent living musical heritage. Audience members sit close to performers, creating intimate concert experience.',
        'Modern art initiatives coexist with traditional practices. Contemporary galleries display Naxi and international artists\' works. Calligraphy studios teach Dongba script (pictographic writing) to interested visitors. Photography exhibitions document historical Lijiang and contemporary Naxi life. The arts scene blends traditional knowledge preservation with contemporary creative expression.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Lijiang Old Town',
      description: 'UNESCO World Heritage walled town with Naxi architecture, water channels, and cultural heritage.',
      visitDuration: '2-3 days',
      bestTime: 'Early mornings for peaceful exploration; late afternoons for photography',
      ticketInfo: 'Free to explore; Old Town maintenance fee ¥80 for certain areas'
    },
    {
      name: 'Jade Dragon Snow Mountain',
      description: 'Sacred 5,596m peak with cable cars to glacier; Naxi spiritual significance.',
      visitDuration: '4-5 hours',
      bestTime: 'Early morning for clear weather; spring and autumn ideal',
      ticketInfo: '¥105 park entry; glacier cable car ¥75; high altitude considerations'
    },
    {
      name: 'Naxi Music Concerts',
      description: 'Elderly Naxi musicians performing traditional Dongjing opera; living heritage performances.',
      visitDuration: '1-1.5 hours',
      bestTime: 'Evening performances; book through hotel',
      ticketInfo: '¥40-60 per person; various venues in Old Town'
    },
    {
      name: 'Mu Residence',
      description: 'Historic Naxi merchant mansion with elaborate gardens; architectural masterpiece.',
      visitDuration: '1.5 hours',
      bestTime: 'Morning for good light and quiet atmosphere',
      ticketInfo: '¥30 adults; ¥15 students'
    },
    {
      name: 'Black Dragon Pool',
      description: 'Scenic garden with Jade Dragon reflection; temple and walkways.',
      visitDuration: '1 hour',
      bestTime: 'Early morning for Jade Dragon reflection; sunset photography',
      ticketInfo: 'Free entry'
    }
  ],
  practicalInfo: {
    transportation: 'Lijiang Sanyi Airport (28km) serves regional and national flights. Airport shuttle (¥20) or taxi (¥60-80) to town. High-speed trains to Kunming (10 hours); express buses to surrounding towns. Within Lijiang, walking Old Town primary; taxis for longer distances.',
    climate: 'Mountain elevation (2,400m) creates mild climate. Winters (December-February) cool (5-15°C), occasionally freezing. Summers (June-August) warm (15-25°C). Spring and autumn mild. Rainy season May-October.',
    bestTime: 'April-May (spring, flowers, mild) and September-November (autumn, clear skies, harvest). December-February cool but clear; July-August warm and rainy.',
    budget: 'Budget meals ¥20-50; mid-range ¥60-150; upscale ¥150-300+. Accommodation: budget ¥80-180, mid-range ¥250-500, luxury ¥700+. Attractions ¥30-105 individually.',
    language: 'Mandarin and Naxi spoken; English present in tourist areas, hotels. Translation apps helpful.',
    safety: 'Safe town with low crime; relaxed atmosphere. Altitude may affect some visitors; allow acclimatisation day. Mountain activities require reasonable fitness.'
  },
  faqs: [
    {
      question: 'How many days should I spend in Lijiang?',
      answer: 'Minimum 2 days explores Old Town and basic cultural sites. Three days permits Jade Dragon Mountain visit plus cultural immersion. Four+ days allows deeper exploration, villages, and relaxed pace.'
    },
    {
      question: 'Is the Jade Dragon cable car safe at high altitude?',
      answer: 'Cable cars are safe; altitude effects are primary concern. Breathlessness, headaches, fatigue common above 4,000m. Rest before and after cable car; descend if symptoms severe. Medical facilities available in Lijiang.'
    },
    {
      question: 'Can I experience Naxi culture authentically?',
      answer: 'Homestays offer genuine cultural immersion. Performances are commercial yet performed by knowledgeable practitioners. Museums and guides provide context. Respectful engagement valued by community; language learning efforts appreciated.'
    },
    {
      question: 'What are the best Naxi souvenirs?',
      answer: 'Dongba art (pictographic paintings), traditional textiles, silverwork, tea. Purchase from artisans directly or established shops. Avoid mass-produced tourist items; seek authentic craftsmanship.'
    }
  ],
  relatedTourSlugs: ['colorful-yunnan-beijing-hub', 'lijiang-signature-naxi-heritage'],
  relatedGuideSlugs: ['yunnan-travel-guide', 'dali-travel-guide'],
  galleryImages: [
    `${TI}/yunnan-rice-terraces.jpg`,
    `${TI}/shangri-la-monastery.jpg`,
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-21'
};

// ============================================================================
// ADDITIONAL SUB-DESTINATIONS (Condensed Format)
// ============================================================================

// Helper function exports follow guides
export const daliGuide: DestinationGuide = {
  id: 'guide-dali',
  slug: 'dali-travel-guide',
  destinationName: 'Dali',
  parentDestination: 'yunnan',
  metaTitle: 'Dali Travel Guide | Ancient Capital | Bai Culture | CTS Tours',
  metaDescription: 'Dali travel guide: Three Pagodas, Bai culture, Erhai Lake, ancient Silk Road capital.',
  keywords: ['Dali', 'Bai culture', 'Three Pagodas', 'Erhai Lake', 'Silk Road'],
  h1: 'Dali: Where Silk Road Dreams Meet Mountain Beauty',
  heroSubtitle: 'Ancient Nanzhao Kingdom Capital',
  heroImage: `${TI}/china-pagoda-night.jpg`,
  heroImageClassName: 'object-[center_30%]',
  introText: [
    'Dali served as capital of the Nanzhao Kingdom (738-1095 AD), a powerful state controlling southwestern China, parts of Burma, and Tibet. The kingdom\'s merchants, diplomats, and monks traversed the South Silk Road, bringing goods, ideas, and religions to this mountain valley. The Three Pagodas, visible across the valley, stand as physical testament to centuries of religious, political, and commercial importance.',
    'The modern town preserves Ming and Qing architecture within the walled Old Town. Bai ethnic people, numbering approximately 1.9 million and concentrated in Yunnan\'s Dali area, maintain distinctive cultural practices: traditional clothing, handicrafts, and architectural conventions visible throughout the town. Whitewashed buildings with dark tile roofs, ornate wooden doors, and intricate carvings reflect Bai aesthetic preferences.',
    'Dali functions as Yunnan hub within broader itineraries. The town\'s central location (accessible from Kunming 6 hours, Lijiang 3 hours) makes it ideal midpoint for multi-destination tours. Erhai Lake and surrounding villages offer day-trip possibilities; architectural heritage and cultural experiences reward extended stays.'
  ],
  sections: [
    {
      title: 'Three Pagodas & Nanzhao Legacy',
      id: 'three-pagodas',
      content: [
        'The Three Pagodas (Chongsheng Three Pagodas) comprise the central 16-metre-tall tower flanked by two smaller structures. Built during the Nanzhao era (9th century) and reconstructed multiple times, the pagodas represent architectural continuity across centuries. Recent restoration preserved historical character whilst enabling structural stability. The complex hosts a museum explaining political, religious, and architectural history.',
        'Reflections of the pagodas in the adjacent pool create iconic photography opportunity. Sunrise and sunset light enhance photogenic qualities. The surrounding temple grounds feature walking paths and meditation spaces. The site offers cultural context for understanding Dali\'s historical significance in southwestern Chinese history.'
      ]
    },
    {
      title: 'Erhai Lake & Regional Life',
      id: 'erhai-lake',
      content: [
        'Erhai Lake, Yunnan\'s second-largest lake, stretches north-south adjacent to Dali. The 130-kilometre shoreline features villages, fishing communities, and agricultural areas. Cycling around the lake offers rural immersion; partial circuits suit time-limited visitors. Fishermen\'s villages maintain traditional net-casting techniques; early morning sessions photographically dramatic. Island temples reached by boat provide spiritual exploration.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Three Pagodas',
      description: 'Tang Dynasty structures; iconic Dali skyline symbol with museum.',
      visitDuration: '1.5 hours',
      bestTime: 'Sunrise or golden hour for photography',
      ticketInfo: '¥75 adults; ¥37.50 students'
    },
    {
      name: 'Dali Old Town',
      description: 'Walled town preserving Bai architecture and cultural heritage.',
      visitDuration: '2 days minimum',
      bestTime: 'Any season; early mornings peaceful',
      ticketInfo: 'Free to explore'
    },
    {
      name: 'Erhai Lake',
      description: 'Mountain lake with fishing villages and scenic cycling routes.',
      visitDuration: '4-6 hours',
      bestTime: 'Early morning for fishermen; golden hour photography',
      ticketInfo: 'Free; cycling ¥20-40 rental'
    },
    {
      name: 'Bai Silver Workshop',
      description: 'Traditional silverwork studio; observation and purchase options.',
      visitDuration: '1-1.5 hours',
      bestTime: 'Morning when artisans working',
      ticketInfo: 'Free to observe; products for purchase'
    }
  ],
  practicalInfo: {
    transportation: 'Bus from Kunming (6 hours) or Lijiang (3 hours). Within Dali, walking Old Town primary. E-bikes and bicycles rental for Erhai Lake exploration.',
    climate: 'Subtropical mountain; cool winters (5-15°C), warm summers (20-28°C). Spring and autumn mild.',
    bestTime: 'April-May and September-November for weather.',
    budget: 'Budget meals ¥15-40; accommodation ¥80-250; attractions ¥75.',
    language: 'Mandarin; Bai dialect spoken. English in tourist areas.',
    safety: 'Safe town; standard precautions apply.'
  },
  faqs: [
    {
      question: 'How many days in Dali?',
      answer: '2-3 days for Old Town and Three Pagodas; 4+ days permit Erhai Lake exploration and villages.'
    },
    {
      question: 'Best Dali souvenirs?',
      answer: 'Bai silver jewellery, tie-dye textiles, pu-erh tea, local ceramics.'
    },
    {
      question: 'Can I visit both Dali and Lijiang?',
      answer: 'Yes; 3 hours between towns. Combined Dali-Lijiang trips require 4-5 days minimum.'
    },
    {
      question: 'Is Bai culture distinct?',
      answer: 'Yes; unique architecture, textiles, silverwork, cuisine distinguish Bai from other ethnic groups.'
    },
    {
      question: 'How do I reach Erhai Lake?',
      answer: 'Bicycle rental from Old Town (¥15-25 daily). Partial lake cycling accessible; full circuit 130km.'
    }
  ],
  relatedTourSlugs: ['colorful-yunnan-beijing-hub', 'dali-signature-silk-road'],
  relatedGuideSlugs: ['yunnan-travel-guide', 'lijiang-travel-guide'],
  galleryImages: [
    `${TI}/yunnan-rice-terraces.jpg`,
    `${TI}/yunnan-village.jpg`,
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-11'
};

export const kunmingGuide: DestinationGuide = {
  id: 'guide-kunming',
  slug: 'kunming-travel-guide',
  destinationName: 'Kunming',
  parentDestination: 'yunnan',
  metaTitle: 'Kunming Travel Guide | City of Eternal Spring | Yunnan Hub | CTS Tours',
  metaDescription: 'Kunming travel guide: Gateway to Yunnan, Stone Forest, temples, year-round mild climate.',
  keywords: ['Kunming', 'Stone Forest', 'eternal spring', 'Yunnan gateway', 'temples'],
  h1: 'Kunming: Yunnan\'s Gateway of Eternal Spring',
  heroSubtitle: 'Year-Round Mild Climate and Cultural Hub',
  heroImage: `${TI}/kunming-dianchi-lake.jpg`,
  heroImageClassName: 'object-[center_40%]',
  introText: [
    'Kunming, capital of Yunnan Province (population 4 million), earns the nickname "City of Eternal Spring" due to its consistently mild climate. The city functions as primary gateway to Yunnan for most international visitors, hosting international airport and serving as transport hub for rail and bus networks. Despite its modern development and urban scale, Kunming retains cultural character: temples, colonial-era architecture, vibrant markets, and proximity to natural attractions.',
    'The city\'s location at 1,891 metres elevation creates pleasant year-round weather. Winters rarely freeze; summers remain comfortable compared to coastal cities. This climatic stability, combined with agricultural abundance (Yunnan\'s location on Tropic of Cancer supports diverse crops), historically attracted merchants, pilgrims, and scholars to this region.',
    'Most visitors use Kunming as Yunnan base for 1-2 days before expanding to Dali, Lijiang, or Stone Forest. However, the city itself rewards exploration: museums housing ethnic minority artifacts and natural history, temples reflecting religious syncretism, night markets offering authentic street food experiences, and urban parks providing respite from city intensity.'
  ],
  sections: [
    {
      title: 'Stone Forest Gateway & Yunnan Geology',
      id: 'stone-forest-geology',
      content: [
        'Stone Forest, located 80km southeast of Kunming, represents the region\'s most famous geological formation. Regular shuttle buses and organised tours make it accessible day trip. The UNESCO World Heritage site combines geological marvel with Yi ethnic cultural presence. Guided tours navigate the labyrinthine limestone formations; independent exploration permits flexibility.'
      ]
    },
    {
      title: 'Kunming Temples & Cultural Sites',
      id: 'temples-culture',
      content: [
        'Yuantong Temple, Kunming\'s oldest and largest Buddhist monastery (dating 8th century), maintains active religious function with resident monks. The temple\'s octagonal pool features lotus flowers (historically significant Buddhist symbol); the surrounding courtyards demonstrate classical Buddhist architectural layout. Yuantong is significant pilgrimage site during important Buddhist holidays.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Stone Forest Day Trip',
      description: 'UNESCO limestone formations maze; primary Kunming excursion.',
      visitDuration: '8 hours (full day)',
      bestTime: 'Early departure for maximum time at site',
      ticketInfo: '¥130 entry; ¥150-200 organised tours'
    },
    {
      name: 'Yuantong Temple',
      description: 'Active Buddhist monastery; historical significance and peaceful gardens.',
      visitDuration: '1.5-2 hours',
      bestTime: 'Early morning for peaceful atmosphere',
      ticketInfo: '¥8 entry donation suggested'
    },
    {
      name: 'Green Lake Park',
      description: 'Urban park with water features, temples, and local recreational activity.',
      visitDuration: '1-2 hours',
      bestTime: 'Evening for sunset; morning tai chi scenes',
      ticketInfo: 'Free entry'
    },
    {
      name: 'Yunnan Ethnic Minorities Museum',
      description: 'Comprehensive museum of Yunnan\'s 25 ethnic groups; artifacts and cultural exhibits.',
      visitDuration: '2-3 hours',
      bestTime: 'Weekday mornings for quiet exploration',
      ticketInfo: 'Free with ID; book online 2+ hours ahead'
    }
  ],
  practicalInfo: {
    transportation: 'Kunming International Airport primary gateway. City metro system developing; taxis/Didi ubiquitous. Stone Forest: buses or organised tours from city. Regional buses connect to Dali, Lijiang, Shangri-La.',
    climate: 'Year-round mild; 10-25°C typical. Rarely freezing; rarely very hot. Rainy season May-October.',
    bestTime: 'March-May (flowers) and September-November (clear skies).',
    budget: 'Street food ¥10-25; mid-range ¥40-100; upscale ¥100-300+. Accommodation: budget ¥100-200, mid-range ¥300-600.',
    language: 'Mandarin; English in tourist areas.',
    safety: 'Safe city; standard precautions apply.'
  },
  faqs: [
    {
      question: 'How many days in Kunming?',
      answer: 'One day Stone Forest day trip, one day city exploration (temples, museums, markets). Two days ideal; more if deeper exploration desired.'
    },
    {
      question: 'Is Kunming worth visiting beyond Stone Forest?',
      answer: 'Yes; cultural sites, museums, night markets, parks worth exploring. Gateway city offers Yunnan context before travelling to specific regions.'
    },
    {
      question: 'How do I reach Stone Forest?',
      answer: 'Organised tours (¥150-200) simplest option. Independent: metro/bus from city centre (1.5 hours, ¥30-50).'
    },
    {
      question: 'What\'s the eternal spring climate?',
      answer: 'Kunming\'s elevation (1,891m) and southern latitude create mild year-round weather (10-25°C), hence the nickname.'
    },
    {
      question: 'Can I taste Yunnan tea in Kunming?',
      answer: 'Yes; tea shops throughout city offer tastings and purchases. Longjing, pu-erh, and local varieties available.'
    }
  ],
  relatedTourSlugs: ['colorful-yunnan-beijing-hub'],
  relatedGuideSlugs: ['yunnan-travel-guide', 'stone-forest-travel-guide'],
  galleryImages: [
    `${TI}/yunnan-rice-terraces.jpg`,
    `${TI}/china-pagoda-night.jpg`,
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-11'
};

export const shangrIlaGuide: DestinationGuide = {
  id: 'guide-shangri-la',
  slug: 'shangri-la-travel-guide',
  destinationName: 'Shangri-La',
  parentDestination: 'yunnan',
  metaTitle: 'Shangri-La Travel Guide | Tibetan Culture | Meili Snow Mountain | CTS Tours',
  metaDescription: 'Shangri-La travel guide: Tibetan Buddhist temples, ethnic culture, Meili Snow Mountain spiritual pilgrimage.',
  keywords: ['Shangri-La', 'Tibetan culture', 'Songzanlin Temple', 'Meili Mountain', 'high altitude'],
  h1: 'Shangri-La: Tibet\'s Gateway in Yunnan',
  heroSubtitle: 'Sacred Mountains & Tibetan Spiritual Traditions',
  heroImage: `${TI}/shangri-la-monastery.jpg`,
  heroImageClassName: 'object-[center_30%]',
  introText: [
    'Shangri-La (formerly Zhongdian), elevation 3,276 metres, serves as primary Yunnan gateway for Tibetan cultural exploration. The town functions as regional administrative centre for Tibetan communities spanning Yunnan, Sichuan, and Tibet provinces. Songzanlin Temple, Tibet\'s largest lamasery outside Tibet Autonomous Region, dominates the landscape with golden roofs visible for kilometres. Approximately 700 monks maintain active Buddhist practice, preserving philosophical knowledge and spiritual traditions.',
    'The high altitude creates physiological challenges for visitors not accustomed to thin air. Proper acclimatisation proves essential; most visitors spend first day resting. However, the altitude rewards visitors with dramatic mountain scenery, pristine ecosystems, and communities maintaining deep spiritual practices. Meili Snow Mountain, sacred peak in Tibetan Buddhism, looms to the northwest; pilgrims circumambulate the sacred circuit seeking spiritual advancement.',
    'Shangri-La functions as either standalone destination (3-4 days) or endpoint of extended Yunnan itinerary. Most visitors reach Shangri-La from Lijiang (3-4 hours, high mountain passes) or fly directly. The surrounding region offers trekking opportunities, homestay experiences, and profound cultural immersion for visitors with time and interest.'
  ],
  sections: [
    {
      title: 'Songzanlin Temple & Tibetan Buddhism',
      id: 'songzanlin-temple',
      content: [
        'Songzanlin Temple (Ganden Sumtseling Monastery) represents Tibet\'s largest lamasery outside Tibet, housing approximately 700 monks. Built 1679, the monastery follows Tibetan Buddhist architectural conventions: golden-roofed assembly halls, intricate thangka paintings, vast prayer wheels, and surrounding dormitory buildings. The monastery functions as living community rather than museum; visitors observe genuine religious practice.'
      ]
    },
    {
      title: 'Meili Snow Mountain & Sacred Pilgrimage',
      id: 'meili-mountain',
      content: [
        'Meili Snow Mountain (Kawagebo peak, 6,740 metres), located northwest of Shangri-La, holds sacred status in Tibetan Buddhism. Tibetan pilgrims undertake circumambulation treks (3-5 days) seeking spiritual merit. Climbing the peak remains prohibited out of religious respect. Viewers can access viewpoints (Feilai Monastery, Yak Meadow) offering distant peak perspectives across valleys.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Songzanlin Tibetan Buddhist Temple',
      description: 'Tibet\'s largest lamasery outside Tibet; 700 monks, golden architecture, spiritual practice.',
      visitDuration: '2-3 hours',
      bestTime: 'Afternoon for monk debates; morning for quieter atmosphere',
      ticketInfo: '¥115 adults; ¥57.50 students'
    },
    {
      name: 'Meili Snow Mountain',
      description: 'Sacred 6,740m peak; pilgrimage route and mountain viewing.',
      visitDuration: '2-5 days trekking, or day trip for viewpoints',
      bestTime: 'October-May for clear views; glacier season varies',
      ticketInfo: '¥120 park entry; treks ¥400-1000+ depending on length'
    },
    {
      name: 'Dukezong Old Town',
      description: 'Historic Tibetan village (rebuilt after 2014 fire); cultural preservation.',
      visitDuration: '1.5-2 hours',
      bestTime: 'Evening for atmospheric lighting',
      ticketInfo: 'Free to explore'
    }
  ],
  practicalInfo: {
    transportation: 'Shangri-La Airport (5km) connects to major cities. Town shuttle (¥20) or taxi (¥50). From Lijiang: 3-4 hours by bus/car. Mountain passes require careful driving. Internal transport: taxis, hire car, guided tours.',
    climate: 'High altitude (3,276m) creates cool climate: -5 to 15°C. Altitude effects common; acclimatisation essential. Thin air causes breathlessness. Clear, sunny days frequent; cold nights.',
    bestTime: 'October-May for clear mountain views; June-September rainy season. Altitude affects comfort year-round.',
    budget: 'Mid-range meals ¥40-100; accommodation ¥150-400. Attractions ¥115-120. Trekking guides ¥300-400 daily.',
    language: 'Mandarin and Tibetan spoken; English limited. Translation apps essential.',
    safety: 'Altitude is primary safety concern. Proper acclimatisation crucial. Remote trekking requires guides.'
  },
  faqs: [
    {
      question: 'Do I need medication for altitude?',
      answer: 'Consult physician. Rest day 1 essential; avoid exertion. Stay hydrated, avoid alcohol. Mild symptoms (headaches, fatigue) common; descend if severe.'
    },
    {
      question: 'Can I trek Meili Mountain?',
      answer: 'Pilgrimage circuit (3-5 days) trekked with guides. Peak climbing prohibited. Viewpoint day trips accessible without technical skills.'
    }
  ],
  relatedTourSlugs: ['colorful-yunnan-beijing-hub', 'shangri-la-signature-tibetan-culture'],
  relatedGuideSlugs: ['yunnan-travel-guide', 'meili-mountain-trek-guide'],
  galleryImages: [
    `${TI}/yunnan-rice-terraces.jpg`,
    `${TI}/yunnan-village.jpg`,
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-11'
};

export const greatWallGuide: DestinationGuide = {
  id: 'guide-great-wall',
  slug: 'great-wall-travel-guide',
  destinationName: 'Great Wall of China',
  parentDestination: 'beijing',
  metaTitle: 'Great Wall of China Tour | Beijing Day Trips & Guided Tours | CTS Tours',
  metaDescription: 'Plan your Great Wall of China tour from Beijing. Compare Badaling, Mutianyu & Simatai sections. Expert guided tours, practical tips, and Great Wall packages for New Zealand travellers.',
  keywords: ['Great Wall of China tour', 'Great Wall tour', 'Badaling tour', 'Mutianyu tour', 'Beijing day trips', 'Great Wall guided tour', 'Ming Dynasty wall'],
  h1: 'Great Wall of China Tour: Complete Visitor Guide',
  heroSubtitle: 'Guided Tours from Beijing · Badaling, Mutianyu & Simatai Sections Compared',
  heroImage: `${TI}/great-wall-mist.jpg`,
  heroImageClassName: 'object-[center_40%]',
  introText: [
    'The Great Wall of China represents humanity\'s most ambitious construction project, stretching over 21,000 kilometres across northern China. Built and rebuilt across millennia (7th century BC to 17th century AD), the wall served defensive purposes protecting Chinese kingdoms from northern invasions. Most surviving sections date from Ming Dynasty (1368-1644), rebuilt using brick and stone for greater durability than earlier rammed earth versions.',
    'The wall\'s construction required enormous labour, resources, and engineering sophistication. The architectural achievement transcends mere military functionality; the structure integrates into landscapes at grand scales. UNESCO recognised the Great Wall as World Heritage site, acknowledging both historical and aesthetic significance.',
    'For visitors based in Beijing, multiple wall sections offer accessible day-trip experiences. Badaling section (43km from city) represents most visited, fully-restored, and tourist-accessible option. Mutianyu (74km) offers fewer crowds and forested beauty. Simatai and Jinshanling appeal to serious hikers and photographers seeking unrestored, dramatic sections.'
  ],
  sections: [
    {
      title: 'Sections Near Beijing',
      id: 'sections-beijing',
      content: [
        'Badaling remains most accessible and popular section. Located just 43km northwest, a 90-minute drive reaches this fully-restored segment. Cable cars assist ascent; well-maintained paths permit leisurely walking. Most visitors spend 2-3 hours navigating wall sections.'
      ]
    },
    {
      title: 'Unrestored Sections for Hikers',
      id: 'unrestored-sections',
      content: [
        'Simatai and Jinshanling sections feature unrestored wall with dramatic angles and greater challenges. Located 120km northeast, these sections appeal to serious hikers. Simatai\'s steep gradients challenge experienced climbers; Jinshanling\'s moderate routes suit intermediate hikers. Sunrise hikes offer spectacular light and solitude.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Badaling Great Wall',
      description: 'Most accessible restored section; cable cars and well-maintained paths.',
      visitDuration: '3-4 hours',
      bestTime: 'Early morning to avoid crowds; spring/autumn for weather',
      ticketInfo: '¥40; cable car ¥100 return'
    },
    {
      name: 'Mutianyu Great Wall',
      description: 'Less crowded restored section with forest backdrop and cable car.',
      visitDuration: '4-5 hours',
      bestTime: 'Spring and autumn ideal; fewer tourists than Badaling',
      ticketInfo: '¥40; cable car ¥100; toboggan descent ¥50'
    },
    {
      name: 'Simatai Great Wall',
      description: 'Challenging unrestored section for experienced hikers; dramatic angles.',
      visitDuration: '5-6 hours; night hikes available',
      bestTime: 'Clear weather essential; sunrise hikes spectacular',
      ticketInfo: '¥40; guided night hike ¥100-150'
    }
  ],
  practicalInfo: {
    transportation: 'Organised tours from Beijing (¥150-300). Private car hire (¥400-600). Public transport: metro to terminus then shuttle buses. Most visitors use tour operators.',
    climate: 'Beijing climate applies. Spring and autumn ideal.',
    bestTime: 'April-May and September-October.',
    budget: 'Tour ¥150-300; entry ¥40-50; meals ¥50-100.',
    language: 'English on signs at Badaling; less common at remote sections.',
    safety: 'Sections safe with normal precautions. Unrestored sections require fitness and attention.'
  },
  faqs: [
    {
      question: 'Which Great Wall of China tour section should I visit?',
      answer: 'Badaling is best for first-time visitors — fully restored, accessible, and 43km from central Beijing. Mutianyu offers fewer crowds and forested scenery (74km from city). Simatai and Jinshanling suit serious hikers seeking unrestored, dramatic sections. Most CTS guided tours visit Mutianyu or Badaling as day trips from Beijing.'
    },
    {
      question: 'How long does a Great Wall of China tour take from Beijing?',
      answer: 'A typical guided Great Wall tour takes 6–8 hours including travel time from Beijing. Badaling and Mutianyu are 90 minutes each way by road. Most visitors spend 2–3 hours on the wall itself. CTS includes Great Wall visits in multi-day Beijing itineraries as a highlight day trip.'
    },
    {
      question: 'Can I book a guided Great Wall tour from New Zealand?',
      answer: 'Yes. CTS Tours (based in Auckland) includes Great Wall guided tours in our Beijing tour packages. Our local Beijing guides are English-speaking, expert, and included in all tour prices — no booking hassle on arrival. Contact our Auckland team to add a Great Wall day trip to your China itinerary.'
    },
    {
      question: 'What is the best time to visit the Great Wall of China?',
      answer: 'Spring (April–May) and autumn (September–October) offer mild weather, clear skies, and vivid colours. Summer is warm but can be hazy; winter is cold but crowd-free with dramatic snow-dusted scenery. Avoid Chinese public holidays (National Day in October, Labour Day in May) when crowds peak significantly.'
    }
  ],
  relatedTourSlugs: ['best-of-china-beijing-xian-hangzhou-puyuan', 'beijing-signature-imperial-heritage'],
  relatedGuideSlugs: ['beijing-travel-guide'],
  galleryImages: [
    `${TI}/great-wall-cloud-sea.jpg`,
    `${TI}/great-wall-green.jpg`,
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-11'
};

export const forbiddenCityGuide: DestinationGuide = {
  id: 'guide-forbidden-city',
  slug: 'forbidden-city-travel-guide',
  destinationName: 'Forbidden City',
  parentDestination: 'beijing',
  metaTitle: 'Forbidden City Travel Guide | Imperial Palace | UNESCO Site | CTS Tours',
  metaDescription: 'Forbidden City guide: 980 buildings, 24 emperors, world\'s largest palace complex. Beijing\'s premier attraction.',
  keywords: ['Forbidden City', 'imperial palace', 'UNESCO', 'Chinese architecture'],
  h1: 'Forbidden City: World\'s Largest Imperial Palace Complex',
  heroSubtitle: '980 Buildings Spanning 24 Imperial Dynasties',
  heroImage: `${TI}/forbidden-city-aerial.jpg`,
  heroImageClassName: 'object-[center_35%]',
  introText: [
    'The Forbidden City (Gugong Palace Museum), located at Beijing\'s heart, represents the world\'s largest and most intact imperial palace complex. Built 1406 during Ming Dynasty, the palace housed 24 emperors from Ming and Qing dynasties, governing the world\'s most populous empire. The 72-hectare walled complex contains 980 buildings arranged in symmetrical courtyards reflecting ancient Chinese cosmological principles.',
    'The architecture embodies imperial power and cosmic harmony. The symmetrical layout, with the emperor\'s residence at the symbolic centre, represents his role as link between heaven and earth. Golden roof tiles, imperial dragons, and symbolic colours (red for luck, gold for wealth, yellow for imperial authority) saturate every surface.',
    'UNESCO recognised the Forbidden City as World Heritage site, acknowledging architectural significance and cultural importance. The Palace Museum houses China\'s finest imperial collections: jade, bronzes, ceramics, scrolls, and manuscripts spanning centuries. Most visitors dedicate 3-4 hours for comprehensive exploration; repeat visits permit deeper discovery.'
  ],
  sections: [
    {
      title: 'Outer Court & Imperial Ceremonial Halls',
      id: 'outer-court',
      content: [
        'The three great halls (Hall of Supreme Harmony, Hall of Central Harmony, Hall of Preserving Harmony) dominate the Outer Court. The largest, Hall of Supreme Harmony, hosted imperial ceremonies and accommodated thousands of courtiers. The architectural grandeur conveys imperial majesty and cosmic importance.'
      ]
    },
    {
      title: 'Inner Quarters & Private Imperial Life',
      id: 'inner-quarters',
      content: [
        'The Inner Palaces reveal intimate court life: residential halls, concubine quarters, gardens, and private chambers. These spaces personalise the emperor, exposing preferences, family relationships, and daily routines. The contrast between public ceremonial grandeur and private simplicity illuminates imperial complexity.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Forbidden City Palace Museum',
      description: 'World\'s largest imperial palace with 980 buildings, museum collections, and historical exhibits.',
      visitDuration: '3-4 hours minimum',
      bestTime: 'Early morning (8:30-10am) before crowds; spring/autumn weather',
      ticketInfo: '¥60 adults; audio guide recommended'
    }
  ],
  practicalInfo: {
    transportation: 'Metro line 1, 6; bus 1, 2, 5, 20, 52; taxis throughout city.',
    climate: 'Beijing climate; spring/autumn ideal.',
    bestTime: 'April-May and September-October.',
    budget: '¥60 entry; lunch ¥50-100.',
    language: 'English audio guides available.',
    safety: 'Very safe; well-developed tourist infrastructure.'
  },
  faqs: [
    {
      question: 'Is a guide necessary?',
      answer: 'Audio guides (included in admission) comprehensive; hired guides (¥150-300) provide interpretation and skip-the-line access.'
    },
    {
      question: 'Can I see everything in one visit?',
      answer: 'No; highlights require 3-4 hours. Comprehensive exploration needs multiple visits or 6+ hours.'
    }
  ],
  relatedTourSlugs: ['best-of-china-beijing-xian-hangzhou-puyuan', 'beijing-signature-imperial-heritage'],
  relatedGuideSlugs: ['beijing-travel-guide', 'great-wall-travel-guide'],
  galleryImages: [
    `${TI}/beijing-temple.jpg`,
    galleryItem(`${TI}/forbidden-city-gold-lion.jpg`, 'object-top'),
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-11'
};

// ============================================================================
// REMAINING SUB-DESTINATIONS (Condensed Format)
// ============================================================================

export const terracottaWarriorsGuide: DestinationGuide = {
  id: 'guide-terracotta-warriors',
  slug: 'terracotta-warriors-travel-guide',
  destinationName: 'Terracotta Warriors',
  parentDestination: 'xian',
  metaTitle: 'Terracotta Warriors Travel Guide | Archaeological Marvel | CTS Tours',
  metaDescription: 'Terracotta Warriors: 8,000 life-sized soldiers guarding Qin emperor\'s mausoleum. World\'s greatest archaeological discovery.',
  keywords: ['Terracotta Warriors', 'Qin Dynasty', 'archaeological marvel', 'mausoleum'],
  h1: 'Terracotta Warriors: Greatest Archaeological Discovery',
  heroSubtitle: '8,000 Life-Sized Soldiers Guarding an Emperor',
  heroImage: `${TI}/xian-terracotta.jpg`,
  heroImageClassName: 'object-[center_25%]',
  introText: [
    'The Terracotta Army, discovered 1974 by local farmers, represents one of archaeology\'s greatest finds. Approximately 8,000 life-sized terracotta soldiers, accompanied by horses, chariots, and weapons, were crafted around 210 BC to guard Emperor Qin Shi Huang\'s mausoleum. Each warrior displays distinct facial features, hairstyles, and armour, suggesting individual portraiture. The scale and sophistication of this funerary complex illustrates imperial power and devotion to the afterlife.',
    'Three main pits have been excavated. Pit 1 contains the largest warrior concentration (approximately 6,000); Pit 2 houses mixed military units; Pit 3 contains higher-ranking officers. Visitors observe warriors at various archaeological states—some still partially buried, others fully restored. Ongoing excavation work demonstrates contemporary archaeological techniques. The site includes museums, restoration facilities, and exhibitions contextualising the Qin Dynasty.',
    'The Terracotta Army exemplifies both ancient technological achievement and contemporary archaeological methodology. Beyond the famous warriors, the mausoleum complex encompasses vast burial grounds, administrative structures, and ritual spaces. The emperor\'s mausoleum itself remains unexcavated, archaeologists deliberately preserving it for future generations with superior technologies.'
  ],
  sections: [
    {
      title: 'The Three Pits & Excavation',
      id: 'three-pits',
      content: [
        'Pit 1 showcases approximately 6,000 warriors in battle formation within a massive exhibition hall. Visitors walk elevated pathways observing the formation from multiple levels. The sheer scale creates overwhelming visual experience. Pit 2 contains mixed units (infantry, cavalry, chariots) representing complete army. Pit 3, the smallest, holds higher-ranking officers and command structures. Each pit reveals distinct military organisation principles.'
      ]
    },
    {
      title: 'Craftsmanship & Archaeological Significance',
      id: 'craftsmanship',
      content: [
        'The terracotta soldiers were hand-crafted using clay from local sources. Body parts (heads, arms, legs, torsos) were created separately then assembled. The craftsmanship demonstrates technical sophistication and artistic knowledge. Individual facial variations suggest portrait-making techniques. The scale of production—employing hundreds of craftspeople over decades—illustrates the emperor\'s commitment to this funerary project.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Terracotta Army Museum',
      description: '8,000+ warriors, horses, chariots; three excavated pits with ongoing archaeological work.',
      visitDuration: '3-4 hours',
      bestTime: 'Early morning (8am opening) before crowds',
      ticketInfo: '¥150 adults; 35km from Xi\'an'
    }
  ],
  practicalInfo: {
    transportation: 'Hire car (¥400-600), tour bus (¥50-80), metro + shuttle bus. Arrange through hotel.',
    climate: 'Xi\'an climate; spring/autumn ideal.',
    bestTime: 'April-May and September-November.',
    budget: '¥150 entry; transport ¥30-100.',
    language: 'English signage; guides enhance experience.',
    safety: 'Safe site with tourist infrastructure.'
  },
  faqs: [
    {
      question: 'How long does the visit take?',
      answer: '3-4 hours explores all three pits, museum, and restoration facilities. Allow 5+ hours for in-depth study.'
    },
    {
      question: 'Should I hire a guide?',
      answer: 'Audio guides (included) comprehensive; hired guides provide context and skip-the-line access.'
    }
  ],
  relatedTourSlugs: ['best-of-china-beijing-xian-hangzhou-puyuan', 'xian-signature-ancient-capitals'],
  relatedGuideSlugs: ['xian-travel-guide'],
  galleryImages: [
    `${TI}/silk-road-wall.jpg`,
    galleryItem(`${TI}/xian-terracotta-2.jpg`, 'object-top'),
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-11'
};

export const yangshuoGuide: DestinationGuide = {
  id: 'guide-yangshuo',
  slug: 'yangshuo-travel-guide',
  destinationName: 'Yangshuo',
  parentDestination: 'guilin',
  metaTitle: 'Yangshuo Travel Guide | Karst Landscape | Rock Climbing | CTS Tours',
  metaDescription: 'Yangshuo: riverside village hub, Li River, adventure activities, rural exploration base.',
  keywords: ['Yangshuo', 'Li River', 'karst', 'rock climbing', 'adventure'],
  h1: 'Yangshuo: Adventure Hub in Karst Country',
  heroSubtitle: 'Gateway to Dragon\'s Backbone & Li River',
  heroImage: '/images/tours/yangshuo-karst-aerial.jpg',
  introText: [
    'Yangshuo village, 83km downstream from Guilin, evolved from quiet riverside settlement to international adventure tourism hub whilst retaining authentic village character. The West Street area attracts backpackers and independent travellers with budget accommodation, language schools, and adventure operators. Surrounding countryside—featuring karst mountains, bamboo groves, agricultural fields, and traditional villages—offers exploration opportunities.',
    'Yangshuo functions as ideal base for multi-day Guilin region exploration. Bicycle rentals (¥10-20 daily) permit independent countryside discovery. Rock climbing, caving, hiking, and river activities cater to adventure seekers. The relaxed village atmosphere creates extended-stay appeal; many visitors arrive for 2-3 days and remain weeks.',
    'The town balances tourism infrastructure with authentic rural experience. Family-run restaurants serve regional cuisine; markets operate daily; traditional crafts persist alongside modern amenities. Evening explorations reveal local bars, cafes, and communities beyond tourist strips. The strong backpacker culture facilitates meeting international travellers; cultural exchanges blur tourist-local boundaries.'
  ],
  sections: [
    {
      title: 'Adventure Activities Hub',
      id: 'adventure-activities',
      content: [
        'Rock climbing dominates Yangshuo\'s activity offerings. Hundreds of routes across difficulty levels attract climbers internationally. Professional operators provide equipment, instruction, and guidance. Multi-pitch climbs challenge experienced climbers; single-pitch routes introduce beginners. The limestone formations provide high-quality climbing whilst contributing iconic landscape elements.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Yangshuo Village',
      description: 'Riverside adventure hub with accommodation, restaurants, climbing, and exploration base.',
      visitDuration: '2-7+ days',
      bestTime: 'Spring/autumn ideal; any season accessible',
      ticketInfo: 'Free to explore'
    },
    {
      name: 'Dragon\'s Backbone Rice Terraces',
      description: 'UNESCO-worthy agricultural sculptures; day-trip north from Yangshuo.',
      visitDuration: '4-5 hours',
      bestTime: 'Spring (filled) or autumn (golden)',
      ticketInfo: '¥80 entry; arrange transport via hotel'
    },
    {
      name: 'Rock Climbing',
      description: 'Hundreds of routes; professional operators; multi-level instruction.',
      visitDuration: '2-6 hours per session',
      bestTime: 'Any season; autumn ideal',
      ticketInfo: '¥150-300 day trips; ¥500+ multi-day'
    }
  ],
  practicalInfo: {
    transportation: 'Minibus from Guilin (1.5 hours, ¥20) or Li River cruise completion. Within Yangshuo: walking, bicycles, motorbikes.',
    climate: 'Subtropical; warm/humid most of year. Winter cool.',
    bestTime: 'April-May and September-November.',
    budget: 'Budget meals ¥15-30; accommodation ¥80-200; activities ¥150-300.',
    language: 'Mandarin and local dialect; English in tourist areas.',
    safety: 'Very safe; backpacker-friendly infrastructure.'
  },
  faqs: [
    {
      question: 'How long in Yangshuo?',
      answer: '2-3 days minimum; 5-7 days ideal for activities and villages. Open-ended stays common.'
    },
    {
      question: 'Is climbing necessary?',
      answer: 'No; hiking, cycling, caving, river activities equally appealing. Climbing offers unique experience but optional.'
    },
    {
      question: 'Can I climb without experience?',
      answer: 'Yes; professional guides offer instruction for all levels. Single-pitch routes suit beginners; multi-pitch routes challenge experienced climbers.'
    },
    {
      question: 'Is Yangshuo safe solo?',
      answer: 'Yes; backpacker-friendly with safety infrastructure. Solo female travellers, families thrive here. Language apps help communication.'
    },
    {
      question: 'What activities besides climbing?',
      answer: 'Hiking, cycling, caving, river kayaking, cormorant fishing tours, rice terrace treks, village explorations available.'
    }
  ],
  relatedTourSlugs: ['best-of-china-beijing-xian-hangzhou-puyuan', 'guilin-signature-karst-rivers'],
  relatedGuideSlugs: ['guilin-travel-guide', 'li-river-travel-guide'],
  galleryImages: [
    `${TI}/guilin-river-valley.jpg`,
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-11'
};

export const liRiverCruiseGuide: DestinationGuide = {
  id: 'guide-li-river-cruise',
  slug: 'li-river-travel-guide',
  destinationName: 'Li River Cruise',
  parentDestination: 'guilin',
  metaTitle: 'Li River Cruise Travel Guide | Scenic Journey | CTS Tours',
  metaDescription: 'Li River Cruise: 83km scenic journey through karst mountains, UNESCO landscape.',
  keywords: ['Li River', 'cruise', 'karst', 'scenic journey', 'Guilin'],
  h1: 'Li River Cruise: World\'s Most Scenic Boat Journey',
  heroSubtitle: '83km Through UNESCO Karst Landscape',
  heroImage: '/images/tours/li-river-karst-boats.jpg',
  introText: [
    'The Li River cruise from Guilin to Yangshuo comprises one of China\'s quintessential travel experiences. This 83-kilometre journey passes through karst landscapes so visually distinctive that they inspired classical Chinese painting aesthetics. The mountain formations—rising vertically from the river, featuring distinctive peak shapes, and framed by mist—create environmental drama unmatched elsewhere in China.',
    'Full-day cruises depart Guilin morning (8-9am), reaching Yangshuo evening (5-6pm), with stops for lunch and village visits. Shorter segments (4-hour cruises) compress the experience without sacrificing dramatic scenery. Private boats and bamboo rafting offer alternative perspectives. Water levels and weather influence visibility; optimal conditions occur spring and autumn.',
    'The cruise\'s significance extends beyond scenery. The river, flowing northward before turning eastward (unusual geography), historically served as trade route connecting Guilin to the Yangtze and south. Rural communities along the banks maintain traditional livelihoods: farming, fishing, and transportation. Modern tourism creates tension between development and preservation; sustainable practices emerge as conscious operators balance access with environmental stewardship.'
  ],
  sections: [
    {
      title: 'The Journey & Scenic Highlights',
      id: 'journey-highlights',
      content: [
        'The cruise\'s visual drama unfolds progressively. Initially, cultivated agriculture dominates: rice paddies and village activity. As the river flows deeper into protected areas, karst mountains increasingly dominate the landscape. The Liusanjie (Three Sisters) section features particularly dramatic peaks. The Herbalist Peak and other famously-named formations become recognisable as the journey progresses.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Li River Cruise',
      description: '83km scenic journey through UNESCO karst landscape; Guilin to Yangshuo full-day experience.',
      visitDuration: '8-9 hours',
      bestTime: 'April-May and September-October',
      ticketInfo: '¥350-500; includes lunch and transport'
    }
  ],
  practicalInfo: {
    transportation: 'Boats depart Guilin morning; shuttle transport from city. Shorter cruises available. Book through hotel or agent.',
    climate: 'Water levels affect navigation; rainy season (May-June) can flood. Sunny days optimal for photography.',
    bestTime: 'April-May and September-November.',
    budget: '¥350-500 per person inclusive.',
    language: 'Guides speak Mandarin; English guides available.',
    safety: 'River cruises safe; follow guide instructions.'
  },
  faqs: [
    {
      question: 'Should I book in advance?',
      answer: 'Advance booking (through hotel) ensures spot and permits price negotiation. Walk-up bookings available but pricier. Book 2-3 days ahead minimum.'
    },
    {
      question: 'Are shorter cruises worth it?',
      answer: 'Full journey Guilin-Yangshuo (8-9 hours) permits complete landscape immersion. Shorter 4-hour segments condense experience without sacrificing drama. Choose based on time availability.'
    },
    {
      question: 'What\'s included in cruise price?',
      answer: 'Boat transport, lunch, guide service, village visits. Private car transport not included; arrange separate or through tour.'
    },
    {
      question: 'Can I do the cruise solo?',
      answer: 'Yes; cruises accommodate individual tourists. Join groups or arrange private charters. Both options available at various price points.'
    },
    {
      question: 'What weather impacts the cruise?',
      answer: 'Rainy season (May-June) can cause flooding affecting water levels. Sunny conditions optimal for photography. Spring/autumn weather ideal.'
    }
  ],
  relatedTourSlugs: ['best-of-china-beijing-xian-hangzhou-puyuan', 'guilin-signature-karst-rivers'],
  relatedGuideSlugs: ['guilin-travel-guide', 'yangshuo-travel-guide'],
  galleryImages: [
    `${TI}/guilin-river-valley.jpg`,
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-11'
};

// Rapid-fire final guides: Hangzhou, Suzhou, Chongqing, Leshan Buddha, Tianmen Mountain

export const hangzhouGuide: DestinationGuide = {
  id: 'guide-hangzhou',
  slug: 'hangzhou-travel-guide',
  destinationName: 'Hangzhou',
  metaTitle: 'Hangzhou Travel Guide | West Lake | Silk Capital | CTS Tours',
  metaDescription: 'Hangzhou travel guide: West Lake, Song Dynasty history, tea culture, beautiful gardens.',
  keywords: ['Hangzhou', 'West Lake', 'silk', 'tea', 'gardens'],
  h1: 'Hangzhou: Silk Capital & West Lake Paradise',
  heroSubtitle: 'Where History & Natural Beauty Merge',
  heroImage: `${TI}/hangzhou-west-lake.jpg`,
  heroImageClassName: 'object-[center_50%]',
  introText: [
    'Hangzhou, located 180km south of Shanghai, served as capital of the Southern Song Dynasty (1127-1279). The city\'s reputation for beauty—particularly West Lake—inspired poets, painters, and scholars across centuries. The saying "Above there is paradise (heaven), below there is Hangzhou" reflects the city\'s legendary aesthetic charm. Modern Hangzhou combines heritage preservation with contemporary development, evident in its role as Chinese internet technology centre (Alibaba headquarters).',
    'West Lake (Hangzhou), a UNESCO World Heritage site, represents the primary attraction. The scenic lake—surrounded by temples, gardens, causeways, and misty mountains—creates one of China\'s most photographed landscapes. The "Ten Views of West Lake" define seasonal visiting patterns and classic beauty standards. Tea culture pervades Hangzhou; Longjing (Dragon Well) tea, grown on surrounding hillsides, represents premium Chinese tea.',
    'Hangzhou functions excellently as multi-day destination or Shanghai day trip (1-hour train ride). Most visitors allocate 2-3 days exploring West Lake, temples, gardens, and tea plantations. The city\'s accessibility and tourism infrastructure facilitate independent or guided exploration. The relaxed atmosphere contrasts with Shanghai\'s frenetic energy, offering respite within greater Yangtze Delta visits.'
  ],
  sections: [
    {
      title: 'West Lake & Scenic Beauty',
      id: 'west-lake',
      content: [
        'West Lake spans 6.3 square kilometres, surrounded by hills, temples, and gardens. Two causeways (Su Causeway and Bai Causeway) divide the lake into sections, creating distinct visual perspectives. The Ten Classic Views (identified during Song Dynasty) define optimal viewing locations and seasonal conditions. Walking or cycling around the lake (15km circuit) reveals diverse environments: urban gardens, temple precincts, residential areas, tea plantations, and wild shorelines.'
      ]
    }
  ],
  attractions: [
    {
      name: 'West Lake',
      description: 'UNESCO scenic landscape; temples, gardens, causeways, mountain backdrop.',
      visitDuration: '3-4 hours walking/cycling',
      bestTime: 'Early morning or late afternoon for light; any season beautiful',
      ticketInfo: 'Free to explore; boat tours ¥50-100'
    },
    {
      name: 'Longjing Tea Plantations',
      description: 'Dragon Well tea gardens with production demonstrations and tastings.',
      visitDuration: '2-3 hours',
      bestTime: 'Spring for fresh harvest; autumn for flowers',
      ticketInfo: 'Free to walk; tea ¥50-200 per purchase'
    },
    {
      name: 'Lingyin Temple',
      description: 'Ancient Buddhist temple with cave carvings and prayer halls.',
      visitDuration: '2 hours',
      bestTime: 'Early morning for peaceful atmosphere',
      ticketInfo: '¥60 entry'
    }
  ],
  practicalInfo: {
    transportation: 'Shanghai high-speed train (1 hour, ¥25). City metro; walking preferred around West Lake. Bicycle rentals ¥10-20.',
    climate: 'Subtropical; mild winters, warm summers, rainy spring.',
    bestTime: 'March-May and September-November.',
    budget: 'Budget meals ¥20-40; mid-range ¥60-150; luxury ¥150-400+. Accommodation ¥100-300. Attractions ¥40-80.',
    language: 'Mandarin; English in tourist areas.',
    safety: 'Very safe city.'
  },
  faqs: [
    {
      question: 'How many days should I spend in Hangzhou?',
      answer: '2-3 days: one day West Lake and temples, one day tea plantations and museums. 4+ days permit leisurely pace and neighbouring water towns.'
    },
    {
      question: 'Is West Lake a UNESCO site?',
      answer: 'Yes; recognised for exceptional aesthetic value and cultural significance in Chinese art and literature.'
    },
    {
      question: 'Can I visit Hangzhou as Shanghai day trip?',
      answer: 'Yes; high-speed train makes Hangzhou accessible day trip (2 hours total travel, ¥25). However, 2 days preferred for proper exploration.'
    },
    {
      question: 'What\'s Longjing tea?',
      answer: 'Dragon Well tea, premium green tea grown in Hangzhou hills. Complex flavour; valuable commodity; tastings available at plantations.'
    },
    {
      question: 'Are there tea ceremonies?',
      answer: 'Yes; hotels and specialty shops offer traditional tea ceremonies and tastings with local tea masters.'
    }
  ],
  relatedTourSlugs: ['best-of-china-beijing-xian-hangzhou-puyuan'],
  relatedGuideSlugs: ['shanghai-travel-guide'],
  galleryImages: [
    `${TI}/china-pagoda-night.jpg`,
    `${TI}/suzhou-canal.jpg`,
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-11'
};

export const suzhouGuide: DestinationGuide = {
  id: 'guide-suzhou',
  slug: 'suzhou-travel-guide',
  destinationName: 'Suzhou',
  metaTitle: 'Suzhou Travel Guide | Classical Gardens | Water Towns | CTS Tours',
  metaDescription: 'Suzhou travel guide: Ming and Qing gardens, canals, water towns, silk heritage.',
  keywords: ['Suzhou', 'gardens', 'water towns', 'silk', 'canals'],
  h1: 'Suzhou: Venice of China & Master Gardens',
  heroSubtitle: 'Classical Aesthetics in Compact Spaces',
  heroImage: `${TI}/suzhou-canal.jpg`,
  introText: [
    'Suzhou, located 100km west of Shanghai, represents the pinnacle of classical Chinese garden design. The city\'s historical gardens—created during Ming and Qing dynasties by wealthy merchants and scholars—exemplify Taoist philosophy of humans existing in harmony with compressed natural landscapes. UNESCO recognised Suzhou\'s classical gardens as World Heritage site, acknowledging their aesthetic and philosophical significance.',
    'The city earned the nickname "Venice of China" due to its extensive canal network. Narrow waterways lined with willow trees and traditional architecture traverse the city, creating romantic atmosphere. Modern Suzhou balances heritage preservation with contemporary development, maintaining the walled city core whilst expanding suburban areas. High-speed rail connections to Shanghai (25 minutes) make Suzhou ideal day trip or 1-2 day itinerary extension.',
    'Four classical gardens represent highlights: Humble Administrator\'s Garden (largest, Ming Dynasty), Lingering Garden (most visited, Ming Dynasty), Master of Nets Garden (smallest, Song Dynasty), and Surging Wave Pavilion (oldest, Song Dynasty). Each garden exemplifies distinct design principles and artistic vision. Water tours through city canals offer alternative perspectives on historical urban planning and contemporary Suzhou life.'
  ],
  sections: [
    {
      title: 'Classical Gardens & Design Philosophy',
      id: 'classical-gardens',
      content: [
        'Suzhou gardens demonstrate miniaturisation philosophy: compressing diverse landscapes (mountains, water, buildings, vegetation) into small areas. The gardens prioritise visual surprise and contemplative exploration. Every element—stone placements, water features, window views, pathway sequences—intentionally guides visitor attention and emotional responses. Visiting requires wandering without predetermined routes, discovering new perspectives continuously.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Humble Administrator\'s Garden',
      description: 'Largest Ming Dynasty garden (3 hectares); lakes, pavilions, landscaping masterpiece.',
      visitDuration: '2 hours',
      bestTime: 'Any season; early morning quietest',
      ticketInfo: '¥90 adults; ¥45 students'
    },
    {
      name: 'Lingering Garden',
      description: 'Most visited classical garden; intricate design and artistic composition.',
      visitDuration: '1.5 hours',
      bestTime: 'Late afternoon for light',
      ticketInfo: '¥90 adults; ¥45 students'
    },
    {
      name: 'Canal Water Tours',
      description: 'Boat rides through historic waterways; city perspective from water.',
      visitDuration: '1-2 hours',
      bestTime: 'Evening for romantic atmosphere',
      ticketInfo: '¥40-80'
    }
  ],
  practicalInfo: {
    transportation: 'Shanghai high-speed train (25 minutes, ¥20). City buses and metro. Walking for city centre.',
    climate: 'Subtropical; rainy spring, humid summer.',
    bestTime: 'March-May and September-November.',
    budget: 'Budget meals ¥20-40; accommodation ¥150-350; gardens ¥90.',
    language: 'Mandarin; English limited outside tourist areas.',
    safety: 'Safe city.'
  },
  faqs: [
    {
      question: 'How many days in Suzhou?',
      answer: '1-2 days for major gardens and city exploration. Gardens can be visited as Shanghai day trip (2.5 hours travel, ¥40).'
    },
    {
      question: 'Which garden should I prioritise?',
      answer: 'Humble Administrator\'s Garden (largest), Lingering Garden (most visited), or Master of Nets Garden (most intimate). All three UNESCO World Heritage sites warrant visits.'
    },
    {
      question: 'What\'s special about Suzhou gardens?',
      answer: 'They exemplify classical Chinese aesthetic philosophy: miniaturisation, feng shui, contemplative design. Each element intentionally guides emotional and visual responses.'
    },
    {
      question: 'Can I see everything in one day?',
      answer: 'Visiting all four major gardens requires full day. Viewing highlights from 2-3 gardens possible in half day with efficient planning.'
    },
    {
      question: 'Are gardens crowded?',
      answer: 'Popular gardens busy during peak times. Early morning (8-9am opening) and weekdays offer quieter experiences.'
    }
  ],
  relatedTourSlugs: ['best-of-china-beijing-xian-hangzhou-puyuan'],
  relatedGuideSlugs: ['shanghai-travel-guide', 'hangzhou-travel-guide'],
  galleryImages: [
    `${TI}/wuzhen-canal.jpg`,
  ],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-11'
};

export const chongqingGuide: DestinationGuide = {
  id: 'guide-chongqing',
  slug: 'chongqing-travel-guide',
  destinationName: 'Chongqing',
  metaTitle: 'Chongqing Travel Guide 2025 | Liziba Station, Hongyadong & Things To Do | CTS Tours NZ',
  metaDescription: 'Complete Chongqing travel guide: Liziba monorail through a building, Hongyadong cliffside lights, Dazu UNESCO carvings, hot pot, and the 8D cyberpunk city that went viral worldwide.',
  keywords: ['Chongqing travel guide', 'Liziba Station', 'Hongyadong', 'Chongqing things to do', 'Dazu Rock Carvings', 'Chongqing tour', 'cyberpunk Chongqing', 'Chongqing hot pot'],
  h1: 'Chongqing Travel Guide: The City That Went Viral',
  heroSubtitle: 'Liziba Monorail · Hongyadong · Dazu UNESCO · Hot Pot Capital',
  heroImage: migratedUnsplash('photo-1581252584837-95f73fd23574'),
  heroImageClassName: 'object-[center_42%]',
  introText: [
    'Chongqing is the city everyone has seen on their phone — the monorail that passes through a residential building, the Ghibli-esque cliffside complex glowing gold at night, the neon-drenched skyline stacked up a mountain above two rivers. It went viral on TikTok and Douyin for good reason: nowhere else in China looks like this.',
    'Built across dramatic limestone hills at the confluence of the Yangtze and Jialing Rivers, Chongqing is a city of vertical layers. Roads pass over rooftops. Skyscrapers sit beside ancient temples. A pedestrian bridge hangs at the 13th floor. The locals call it "8D Magic" — every angle reveals something impossible-looking.',
    'Beyond the viral moments, Chongqing rewards genuine exploration. The Dazu Rock Carvings (UNESCO World Heritage) contain 50,000 Buddhist sculptures that most Western visitors have never heard of. Ciqikou Ancient Town preserves a Song Dynasty street layout. And the hot pot here — the real Chongqing version, with beef tallow, dried chillies, and face-numbing Sichuan pepper — is among the most memorable meals in China.'
  ],
  sections: [
    {
      title: 'Liziba Station — The Monorail Through a Building',
      id: 'liziba-station',
      content: [
        'Liziba is the single most shareable moment in Chongqing — and possibly all of China. Chongqing Rail Transit Line 2 passes directly through the 6th to 8th floors of a 19-storey residential building in Yuzhong District. The station and building were constructed simultaneously in 2004; the rubber-tyred trains run quietly enough that residents above and below are barely disturbed.',
        'The best way to experience it: ride Line 2 through the building for the inside view, then watch from the street-level plaza below for the money shot. Trains run every few minutes. Allow 30–60 minutes — you will want to watch it multiple times and photograph it from every angle. It never stops being surreal.'
      ]
    },
    {
      title: 'Hongyadong — The Cliffside City at Night',
      id: 'hongyadong',
      content: [
        'Hongyadong is the hero image of Chongqing: an 11-storey stilted complex (diaojiaolou style) built directly into the cliff face above the Jialing River. At night, it is lit with thousands of red and golden lanterns, creating a glowing, layered spectacle that rises from the riverbank like a scene from a Miyazaki film.',
        'Visit after dark. The full lighting effect is only visible once the sun goes down, and the contrast between the illuminated complex and the dark river below is the most photographed angle in the city. Cross to the Qiansimen Bridge for the full panoramic view. The complex itself contains restaurants, bars, and tea houses across interconnected stairways — explore freely, entrance is free.'
      ]
    },
    {
      title: 'Dazu Rock Carvings — UNESCO Hidden Gem',
      id: 'dazu-rock-carvings',
      content: [
        'The Dazu Rock Carvings are one of the great surprises of Chinese travel: a UNESCO World Heritage Site (inscribed 1999) that most Western visitors have never heard of. Located 100km from Chongqing city, the site contains approximately 50,000 stone statues and over 100,000 characters of inscriptions carved between the 9th and 13th centuries.',
        'The carvings are extraordinary in scope and quality. The Baodingshan site features large-scale narrative Buddhist scenes including a 31-metre reclining Nirvana Buddha. Beishan contains earlier, more densely packed sculptures of outstanding aesthetic quality. Uniquely, the carvings synthesise Buddhism, Taoism, and Confucianism in a single artistic programme — a reflection of Song Dynasty religious culture that has no parallel elsewhere in China.',
        'Plan a full morning: the drive from Chongqing takes approximately 1.5 hours each way. A guided visit adds considerable context to what you are seeing.'
      ]
    },
    {
      title: 'Huguang Guild Hall & Ciqikou Ancient Town',
      id: 'historic-districts',
      content: [
        'The Huguang Guild Hall (built 1759, Qing Dynasty) is one of China\'s best-preserved guild hall complexes, built by merchants from Hubei and Hunan who came to Chongqing during the great population migration to Sichuan. The complex climbs a terraced hillside above the Yangtze River across 8,500 square metres of courtyards, opera theatres, and carved pavilions.',
        'Ciqikou Ancient Town, dating from the Song Dynasty, preserves the city\'s original street layout: narrow flagstone lanes, wooden teahouses, and street food stalls selling Sichuan snacks. It sits at the confluence of the Jialing River and a small tributary, and offers a vivid sensory contrast to the futuristic cityscape visible just beyond its rooftops.'
      ]
    },
    {
      title: 'Chongqing Hot Pot — The Real Thing',
      id: 'chongqing-hot-pot',
      content: [
        'Chongqing is the birthplace and undisputed capital of Chinese hot pot — significantly different from the versions served elsewhere. The traditional Chongqing version uses beef tallow, dried chillies, and Sichuan peppercorn (which numbs more than burns). The communal dining format is as much a cultural ritual as a meal.',
        'Order a split pot (鸳鸯锅) if your group has varying spice tolerance — half original broth, half mild. The classic items to order: thinly sliced beef, tripe, duck intestine, tofu skin, lotus root, and Mao blood curd (maoxuewang). A hot pot dinner here is one of the most memorable meals in China.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Liziba Station (李子坝站)',
      description: 'Chongqing Rail Transit Line 2 passes through the 6th–8th floors of a residential building. The most photographed railway station in China.',
      visitDuration: '30–60 minutes',
      bestTime: 'Any time — daytime for photography, evening for atmosphere',
      ticketInfo: 'Free to watch from street; small fare to ride Line 2 through the building'
    },
    {
      name: 'Hongyadong (洪崖洞)',
      description: '11-storey stilted cliffside complex above the Jialing River. Best experienced after dark when fully illuminated.',
      visitDuration: '1–2 hours',
      bestTime: 'After sunset (8pm onward for full lighting)',
      ticketInfo: 'Free to enter complex; restaurants/bars charge separately'
    },
    {
      name: 'Dazu Rock Carvings (大足石刻)',
      description: 'UNESCO World Heritage Site with 50,000 stone sculptures carved over 400 years. Located 100km from city.',
      visitDuration: '3–4 hours on site; full day with travel',
      bestTime: 'Weekdays; spring and autumn',
      ticketInfo: '¥115 Baodingshan; ¥70 Beishan'
    },
    {
      name: 'Huguang Guild Hall (湖广会馆)',
      description: 'Beautifully preserved Qing Dynasty merchant complex (1759) above the Yangtze River.',
      visitDuration: '1–1.5 hours',
      bestTime: 'Morning',
      ticketInfo: '¥30'
    },
    {
      name: 'Ciqikou Ancient Town (磁器口)',
      description: 'Song Dynasty market street with flagstone lanes, teahouses, and Sichuan street food.',
      visitDuration: '1–2 hours',
      bestTime: 'Morning or late afternoon to avoid peak crowds',
      ticketInfo: 'Free entry; individual vendors charge separately'
    },
    {
      name: 'Yangtze River Cableway (长江索道)',
      description: 'Iconic aerial tramway (opened 1987) crossing the Yangtze River. One of the last urban cable car commuter systems in China.',
      visitDuration: '30–45 minutes',
      bestTime: 'Early morning to avoid queues',
      ticketInfo: '¥25 single; ¥45 return'
    }
  ],
  practicalInfo: {
    transportation: 'Jiangbei Airport (CKG) connects to Auckland via Beijing or Shanghai. Chongqing Rail Transit (metro) covers all key tourist sites. Line 2 passes through Liziba Station.',
    climate: 'Hot, humid summers (June–August, up to 40°C). Mild winters. Spring and autumn are ideal. Chongqing is known as one of China\'s "Three Furnaces" — July and August are intense.',
    bestTime: 'April–May and September–October for comfortable temperatures and clear skies.',
    budget: 'Hot pot dinner ¥60–120/person; hotel ¥300–600/night; metro fare ¥2–10; Dazu day trip ¥200–400 with transport.',
    language: 'Mandarin. English is limited outside major hotels and tourist sites — a guide or translation app is strongly recommended.',
    safety: 'Safe city for tourists. Watch footing on steep hillside streets and stairs, especially after rain.'
  },
  faqs: [
    {
      question: 'How many days should I spend in Chongqing?',
      answer: '3–4 days is ideal to cover Liziba Station, Hongyadong, Dazu Rock Carvings, Ciqikou, and a proper hot pot dinner without rushing. On a tighter itinerary, 2 full days covers the key highlights.'
    },
    {
      question: 'What is the Liziba Station monorail through a building?',
      answer: 'Liziba is a station on Chongqing Rail Transit Line 2 where the train passes directly through the 6th to 8th floors of a 19-storey residential building. The station and building were constructed at the same time in 2004. It is completely real and operational — you can ride through the building on Line 2, or watch from the street-level viewing plaza below.'
    },
    {
      question: 'Is Chongqing safe and easy to navigate?',
      answer: 'Chongqing is safe for tourists. The metro system is modern and well-signposted. The main challenge is the city\'s dramatic vertical topography — steep steps, hillside streets, and elevated walkways can be tiring. A guided tour makes logistics significantly easier, especially for day trips to Dazu.'
    },
    {
      question: 'What is the best time of year to visit Chongqing?',
      answer: 'April–May and September–October offer the most comfortable temperatures. July and August can reach 40°C with high humidity — manageable but intense. Chongqing is often misty in winter, which actually adds to the atmospheric city photography.'
    },
    {
      question: 'Do New Zealanders need a visa to visit China?',
      answer: 'New Zealand passport holders currently benefit from China\'s visa-free entry policy (up to 15 days for tourism). For longer trips, a standard tourist visa is required. Check the latest requirements before travel, as policies can change.'
    },
    {
      question: 'Can I visit Chongqing as part of a tour from New Zealand?',
      answer: 'Yes — CTS Tours offers a dedicated Chongqing and Chengdu tour from New Zealand: China Discovery — Fire & Fuzz (10 days, from NZD $2,750). The tour combines 4 nights in Chongqing with 3 nights in Chengdu, connected by high-speed bullet train, with expert guide throughout.'
    }
  ],
  relatedTourSlugs: ['chongqing-chengdu'],
  relatedGuideSlugs: ['chengdu-travel-guide', 'yunnan-travel-guide'],
  galleryImages: [],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-25'
};

export const leshanBuddhaGuide: DestinationGuide = {
  id: 'guide-leshan-buddha',
  slug: 'leshan-buddha-travel-guide',
  destinationName: 'Leshan Giant Buddha',
  parentDestination: 'chengdu',
  metaTitle: 'Leshan Giant Buddha Travel Guide | World\'s Largest Buddha | CTS Tours',
  metaDescription: 'Visit Leshan Buddha\'s 71-meter stone carving & Mount Emei\'s sacred Buddhist temples. Expert travel guide for New Zealand visitors to this spiritual wonder.',
  keywords: ['Leshan Buddha', 'giant statue', 'sculpture', 'Buddhist site'],
  h1: 'Leshan Giant Buddha: World\'s Largest Stone Buddha',
  heroSubtitle: '71 Metres of Carved Devotion',
  heroImage: '/images/tours/leshan-buddha-statue.jpg',
  heroImageClassName: 'object-[center_40%]',
  introText: [
    'The Leshan Giant Buddha, carved into a riverside cliff (8th century), represents one of humanity\'s most ambitious sculptural achievements. At 71 metres tall, this colossal Buddha dwarfs all other stone Buddha statues globally. The construction spanned 90 years (713-803 AD), employing thousands of workers using hand tools. The scale, technical sophistication, and artistic vision embodied in this sculpture astound contemporary observers.',
    'The Buddha\'s face displays serene contemplation; drainage channels carved throughout prevent water damage and erosion. The scale becomes apparent only through comparison: visitors ascending the cliff face alongside the Buddha gradually comprehend the immense proportions. Boat tours provide full-figure perspective; cliff-side pathways permit intimate proximity to facial features and carved details.',
    'The site\'s religious significance persists: pilgrims visit seeking blessings; monks maintain adjacent temples; ceremonies occur during major Buddhist holidays. The surrounding mountains, monasteries, and scenic areas extend the visit duration. Most visitors allocate full day for Buddha viewing, temple exploration, and scenic area walks.'
  ],
  sections: [
    {
      title: 'The Sculpture & Artistic Achievement',
      id: 'sculpture-achievement',
      content: [
        'The Buddha was carved directly into sandstone cliff overhanging the Min River confluence. The scale required unprecedented engineering: drainage systems prevent water infiltration; structural integrity sustained eight centuries. The facial proportions convey serenity and compassion. The torso, hands, and feet demonstrate anatomical understanding combined with symbolic meanings. Every element of the sculpture embodies Buddhist religious art and technical mastery.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Leshan Giant Buddha',
      description: '71-meter carved stone Buddha; UNESCO site, pilgrimage destination.',
      visitDuration: '4-5 hours',
      bestTime: 'Clear weather for photography; morning light ideal',
      ticketInfo: '¥90 adults; boat tours ¥30 additional; 160km from Chengdu'
    }
  ],
  practicalInfo: {
    transportation: 'Hire car from Chengdu (¥400-600, 2.5 hours), tour bus (¥150-200), or public bus (¥30-50, 3-4 hours).',
    climate: 'Chengdu climate; spring/autumn ideal.',
    bestTime: 'April-May and September-October.',
    budget: '¥90 entry; transportation ¥30-200; lunch ¥50-100.',
    language: 'Mandarin; English guides available.',
    safety: 'Safe site; pathway climbing requires moderate fitness.'
  },
  faqs: [
    {
      question: 'How long does the visit take?',
      answer: '4-5 hours covers Buddha viewing, boat tours, temple exploration, and scenic area walks. Day trip feasible from Chengdu.'
    },
    {
      question: 'Can I climb alongside the Buddha?',
      answer: 'Yes; cliff-side pathways permit close proximity. Descending 217 steps alongside the Buddha offers intimate perspective.'
    },
    {
      question: 'Is boat tour worth it?',
      answer: 'Yes; river boats provide full-figure Buddha perspective. Boat tour (¥30 additional) recommended for complete experience.'
    },
    {
      question: 'When was the Buddha carved?',
      answer: '8th century (713-803 AD), during Tang Dynasty. Construction spanned 90 years using hand tools.'
    },
    {
      question: 'How many visitors daily?',
      answer: 'Thousands; popular site. Early morning (8-9am) or late afternoon (4-5pm) visiting avoids peak mid-day crowds.'
    }
  ],
  relatedTourSlugs: ['colorful-yunnan-beijing-hub', 'chengdu-signature-panda-culture'],
  relatedGuideSlugs: ['chengdu-travel-guide'],
  galleryImages: [],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-11'
};

export const tianmenMountainGuide: DestinationGuide = {
  id: 'guide-tianmen-mountain',
  slug: 'tianmen-mountain-travel-guide',
  destinationName: 'Tianmen Mountain',
  parentDestination: 'zhangjiajie',
  metaTitle: 'Tianmen Mountain Travel Guide | Heaven\'s Gate | Cable Car | CTS Tours',
  metaDescription: 'Experience Tianmen Mountain\'s cable cars, 999 steps & spiritual significance. Expert travel guide for New Zealand visitors to Zhangjiajie\'s sacred peak.',
  keywords: ['Tianmen Mountain', 'cable car', 'heaven gate', 'Zhangjiajie'],
  h1: 'Tianmen Mountain: Gateway to Heaven',
  heroSubtitle: 'World\'s Longest Cable Car & Sacred Peak',
  heroImage: '/images/tours/tianmen-mountain-glass-walkway.jpg',
  heroImageClassName: 'object-[center_30%]',
  introText: [
    'Tianmen Mountain (Tianmen Shan, Heaven\'s Gate Mountain), located near Zhangjiajie city (30km), features distinctive geography: a natural rock arch (Heaven\'s Gate) at the summit holds geomantic significance in Chinese cosmology. The world\'s longest non-stop cable car (7,455 metres) ascends 1,279 metres vertically, completing the journey in just 8 minutes. The cable car passage climbs through multiple elevation zones, offering dramatic aerial perspectives.',
    'The 999-step cliff staircase descent provides heart-pounding alternative to cable car return. Ancient emperors performed ceremonies at this site believing concentrated cosmic forces existed here. Modern visitors seek similar transformation through physical effort and mountain immersion. The cable car experience dominates most visits; hiking paths provide quieter alternatives for adventure-seekers.',
    'Buddhist temples at the summit maintain spiritual function. The plateau area offers observation decks, restaurants, and shops. A complete visit requires 5-6 hours including cable car rides, cliff exploration, and temple visits. The experience combines modern engineering spectacle with ancient geomantic significance, merging technological and spiritual dimensions.'
  ],
  sections: [
    {
      title: 'The Cable Car & Mountain Experience',
      id: 'cable-car',
      content: [
        'The cable car descent from Tianmen Mountain creates psychological intensity: passengers suspended above landscape growing smaller below. The experience combines engineering achievement with altitude exposure. Psychological responses vary from exhilaration to anxiety. The panoramic views compensate for any discomfort. The cable car remains primary attraction; hiking paths provide alternatives for thrill-averse visitors.'
      ]
    }
  ],
  attractions: [
    {
      name: 'Tianmen Mountain Cable Car & Summit',
      description: 'World\'s longest cable car with Heaven\'s Gate arch and cliff views.',
      visitDuration: '5-6 hours',
      bestTime: 'Morning for clearest views; calm weather essential',
      ticketInfo: '¥258 adults including cable cars and scenic area'
    }
  ],
  practicalInfo: {
    transportation: 'Shuttle bus from Zhangjiajie city (30km, 45 minutes). Include in multi-day Zhangjiajie itinerary.',
    climate: 'High altitude (1,279m) affects temperature. Cool year-round.',
    bestTime: 'April-May and September-October for weather.',
    budget: '¥258 entry; meals ¥50-100; transport ¥30-50.',
    language: 'Mandarin; English signage at cable car.',
    safety: 'Heights create psychological challenges; cable car fully safe. Descent stairs dangerous for unstable walkers.'
  },
  faqs: [
    {
      question: 'Is the cable car scary?',
      answer: 'Psychological response varies. World\'s longest cable car creates intensity; suspension creates psychological rather than actual danger. Safe engineering; psychological comfort varies.'
    },
    {
      question: 'Can I skip cable car and hike?',
      answer: 'Yes; alternative hiking paths available without glass-floor exposure. Cable car dominant visitor choice; hiking offers quieter alternative.'
    },
    {
      question: 'How long for complete visit?',
      answer: '5-6 hours includes cable cars, Heaven\'s Gate observation, temple visits, 999-step descent consideration.'
    },
    {
      question: 'Should I descend via 999 steps?',
      answer: 'Stairs optional; cable car return available. Stairs require moderate fitness and 30-45 minutes. Stair descent offers thrill and exertion alternative.'
    },
    {
      question: 'Does altitude affect visitors?',
      answer: 'At 1,279m, altitude effects minimal compared to Shangri-La (3,276m). Some visitors experience slight breathlessness; acclimatisation usually immediate.'
    }
  ],
  relatedTourSlugs: ['best-of-china-beijing-xian-hangzhou-puyuan', 'zhangjiajie-signature-mountains'],
  relatedGuideSlugs: ['zhangjiajie-travel-guide'],
  galleryImages: [],
  createdAt: '2026-01-01',
  updatedAt: '2026-04-11'
};

// ============================================================================
// EXPORT FUNCTIONS
// ============================================================================

export const allGuides: DestinationGuide[] = [
  beijingGuide,
  xianGuide,
  shanghaiGuide,
  chengduGuide,
  guilinGuide,
  zhangjiajieGuide,
  yunnanGuide,
  lijangGuide,
  daliGuide,
  kunmingGuide,
  shangrIlaGuide,
  greatWallGuide,
  forbiddenCityGuide,
  terracottaWarriorsGuide,
  yangshuoGuide,
  liRiverCruiseGuide,
  hangzhouGuide,
  suzhouGuide,
  chongqingGuide,
  leshanBuddhaGuide,
  tianmenMountainGuide
];

export function getAllGuides(): DestinationGuide[] {
  return allGuides;
}

export function getGuideBySlug(slug: string): DestinationGuide | undefined {
  return allGuides.find(guide => guide.slug === slug);
}

export function getGuidesByParent(parentDestination: string): DestinationGuide[] {
  return allGuides.filter(guide => guide.parentDestination === parentDestination);
}

export function getGuidesByRegion(region: 'north' | 'central' | 'south' | 'southwest' | 'east'): DestinationGuide[] {
  const regionMap: Record<string, string[]> = {
    north: ['beijing', 'great-wall', 'forbidden-city'],
    central: ['xian', 'terracotta-warriors', 'chongqing', 'leshan-buddha'],
    south: ['guilin', 'yangshuo', 'li-river-travel-guide', 'zhangjiajie', 'tianmen-mountain'],
    southwest: ['chengdu', 'yunnan', 'lijiang', 'dali', 'kunming', 'shangri-la'],
    east: ['shanghai', 'hangzhou', 'suzhou']
  };

  return allGuides.filter(guide => regionMap[region]?.includes(guide.slug));
}
