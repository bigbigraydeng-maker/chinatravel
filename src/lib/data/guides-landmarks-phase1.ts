import type { DestinationGuide } from '@/lib/data/guides';

const UPDATED = '2026-09-17';

export const templeOfHeavenGuide: DestinationGuide = {
  id: 'guide-temple-of-heaven',
  slug: 'temple-of-heaven-travel-guide',
  destinationName: 'Temple of Heaven',
  parentDestination: 'Beijing',
  metaTitle: 'Temple of Heaven Beijing Guide',
  metaDescription: 'Plan a visit to Beijing\'s Temple of Heaven: key halls, morning park life, photography tips and how to combine it with a wider Beijing itinerary.',
  keywords: ['Temple of Heaven Beijing', 'Temple of Heaven guide', 'things to do in Beijing', 'Temple of Heaven visit tips'],
  h1: 'Temple of Heaven Travel Guide',
  heroSubtitle: 'Imperial ritual architecture and the morning rhythms of Beijing',
  heroImage: '/images/guides/temple-of-heaven/hero.webp',
  heroImageClassName: 'object-[center_58%]',
  introText: [
    'The Temple of Heaven is one of Beijing\'s most recognisable landmarks, but the experience is larger than its famous blue-roofed hall. The complex was designed for imperial ceremonies that connected the emperor, the harvest and the order of the cosmos. Its axial paths, circular terraces and cypress groves make the ideas behind the architecture easy to feel even before you know the history.',
    'For travellers, the best visit combines the ceremonial buildings with the surrounding park. Arrive in the morning to see local residents practising tai chi, dancing, playing music and gathering beneath the trees, then continue through the Hall of Prayer for Good Harvests, Imperial Vault of Heaven and Circular Mound Altar. Allow at least two hours, and longer if you enjoy architecture or photography.'
  ],
  quickAnswer: 'Allow two to three hours for a first Temple of Heaven visit. Arrive on a weekday morning, walk north to south through the ceremonial complex, and leave time for the surrounding park where Beijing residents gather before the main crowds arrive.',
  visitPlanning: { recommendedVisitLength: '2–3 hours', bestFor: 'Imperial history, architecture and morning park life', combineWith: 'Forbidden City, Tiananmen Square or Qianmen' },
  sections: [
    {
      title: 'Why the Temple of Heaven Matters',
      id: 'why-it-matters',
      content: [
        'Ming and Qing emperors came here to perform rites for good harvests. The layout expresses traditional Chinese cosmology: round forms represent heaven, while square walls and courtyards represent earth. The scale and symmetry were intended to show that imperial authority depended on harmony between the human and celestial worlds.',
        'The Hall of Prayer for Good Harvests is the visual centrepiece. Its colours, columns and tiers carry symbolic meaning. Walking south reveals how the site progresses from enclosed halls to the open Circular Mound Altar, where sound and space become part of the experience.'
      ]
    },
    {
      title: 'A Simple Route Through the Complex',
      id: 'walking-route',
      content: [
        'A north-to-south route gives the clearest story. Begin around the Hall of Prayer for Good Harvests, follow the raised Danbi Bridge toward the Imperial Vault of Heaven, and finish at the Circular Mound Altar. This direction moves from the most ornate architecture toward the open ceremonial platform.',
        'If your schedule allows, leave time for the quieter side gardens and long corridors. The park is large, so choose your entrance with your onward plans in mind. A guide adds useful context because many architectural details are symbolic rather than explained visually.'
      ]
    },
    {
      title: 'Best Time for Atmosphere and Photos',
      id: 'best-time',
      content: [
        'Morning is best for local park life and softer light. Later in the day the main halls can become busy, especially on weekends and public holidays. Clear autumn days often offer crisp colour, while spring brings fresh greenery around the ancient cypresses.',
        'For photographs, step back from the central axis and use doorways, balustrades and cypress branches to frame the Hall of Prayer for Good Harvests. The complex rewards patient observation more than a quick front-on photograph.'
      ]
    }
  ],
  attractions: [
    { name: 'Hall of Prayer for Good Harvests', description: 'The triple-gabled circular hall that defines the Temple of Heaven skyline.', visitDuration: '30-45 minutes', bestTime: 'Morning for softer light' },
    { name: 'Imperial Vault of Heaven', description: 'A smaller circular hall surrounded by the famous Echo Wall.', visitDuration: '20-30 minutes', bestTime: 'Before peak group arrivals' },
    { name: 'Circular Mound Altar', description: 'An open marble terrace used for ceremonies at the winter solstice.', visitDuration: '20-30 minutes', bestTime: 'Clear weather' },
    { name: 'Temple of Heaven Park', description: 'Cypress groves and public spaces where Beijing residents gather each morning.', visitDuration: '45-60 minutes', bestTime: 'Early morning' }
  ],
  practicalInfo: {
    transportation: 'The park is served by Beijing Metro and taxis. Choose the east, north or south entrance according to your planned walking direction.',
    climate: 'The grounds are exposed in places. Carry sun protection in summer and warm layers in winter.',
    bestTime: 'Early morning on a weekday for local park life and lighter crowds.',
    budget: 'Entry options can cover the park only or the principal ceremonial buildings. Check the current official ticket arrangement before visiting.',
    language: 'English signage is available at the main monuments; a guide provides much richer historical context.',
    safety: 'Paths are well maintained, but the complex involves substantial walking and stone steps.'
  },
  faqs: [
    { question: 'How long do I need at the Temple of Heaven?', answer: 'Allow two to three hours for the main ceremonial route and time in the park. A short visit can cover the headline buildings in about 90 minutes.' },
    { question: 'Is the Temple of Heaven worth visiting in the morning?', answer: 'Yes. Morning adds a second layer to the visit because local residents practise tai chi, dance, sing and socialise throughout the park.' },
    { question: 'Can I combine it with the Forbidden City?', answer: 'Yes, but both are large sites. Many travellers visit the Temple of Heaven early, then continue to Tiananmen Square and the Forbidden City with a lunch break between them.' },
    { question: 'Do I need to reserve tickets?', answer: 'Reservation and identity requirements can change. Confirm the current official rules before travel; CTS arranges included admissions for its escorted groups.' }
  ],
  relatedTourSlugs: ['essentials', 'beijing-xian'],
  relatedGuideSlugs: ['beijing-travel-guide', 'forbidden-city-travel-guide', 'great-wall-travel-guide'],
  relatedBlogSlugs: ['first-time-china-travel-tips', 'beijing-xian-itinerary-10-days', 'photography-guide-china-best-locations-hidden-gems'],
  galleryImages: [
    { src: '/images/guides/temple-of-heaven/detail.webp', imgClass: 'object-[center_58%]', alt: 'Hall of Prayer for Good Harvests at the Temple of Heaven in Beijing', caption: 'The Hall of Prayer for Good Harvests anchors the northern end of the ceremonial route.' },
    { src: '/images/guides/temple-of-heaven/gallery.webp', imgClass: 'object-[center_55%]', alt: 'Architectural detail at Beijing’s Temple of Heaven complex', caption: 'Colour, symmetry and layered roofs express the ceremonial design of the complex.' }
  ],
  sources: [{ label: 'UNESCO World Heritage Centre — Temple of Heaven', href: 'https://whc.unesco.org/en/list/881' }],
  createdAt: UPDATED,
  updatedAt: UPDATED
};

export const xianCityWallGuide: DestinationGuide = {
  id: 'guide-xian-city-wall',
  slug: 'xian-city-wall-travel-guide',
  destinationName: "Xi'an City Wall",
  parentDestination: "Xi'an",
  metaTitle: "Xi'an City Wall Guide | Cycling & Visit Tips",
  metaDescription: "Plan your Xi'an City Wall visit: the best gates, cycling route, sunset timing and how to combine the wall with Xi'an's historic centre.",
  keywords: ["Xi'an City Wall", "Xi'an City Wall cycling", "things to do in Xi'an", "Xi'an attractions"],
  h1: "Xi'an City Wall Travel Guide",
  heroSubtitle: 'Walk or cycle above one of China\'s best-preserved ancient city walls',
  heroImage: '/images/guides/xian-city-wall/hero.webp',
  heroImageClassName: 'object-[center_55%]',
  introText: [
    "Xi'an City Wall forms a complete rectangle around the historic centre and offers a rare chance to experience an old Chinese capital from above. Watchtowers, gatehouses and broad ramparts frame views of temple roofs on one side and the modern city on the other.",
    'The wall works equally well as a relaxed walk, a cycling circuit or a sunset stop. Most first-time visitors begin at the South Gate, where the architecture is most ceremonial and access is straightforward. Even a short section gives a strong sense of scale; completing the full circuit requires more time and energy.'
  ],
  quickAnswer: "Allow about 90 minutes to two and a half hours for Xi'an City Wall. Start at South Gate, walk a short section or cycle the complete circuit, and visit in late afternoon if you want daylight, sunset and illuminated gate towers in one experience.",
  visitPlanning: { recommendedVisitLength: '1.5–2.5 hours', bestFor: 'Cycling, city views and sunset photography', combineWith: 'Muslim Quarter or Big Wild Goose Pagoda' },
  sections: [
    { title: 'Walk, Cycle or Ride', id: 'ways-to-explore', content: ['The broad top of the wall is easy to follow. Walking lets you study the brickwork and towers slowly, while cycling is the most practical way to experience the full circuit. Surface conditions can be uneven, so choose a comfortable pace.', 'A partial route from the South Gate toward the East or West Gate suits travellers with limited time. The full loop is better treated as a dedicated activity rather than squeezed between museums.'] },
    { title: 'Choosing the Right Gate', id: 'best-gates', content: ['The South Gate is the most popular starting point because of its restored ceremonial buildings, evening lighting and convenient position near the central city. Other gates can be quieter and useful if they fit your hotel or itinerary.', 'Check the current access points before setting out, as bicycle rental and opening arrangements may vary by gate and season.'] },
    { title: 'Sunset and Evening Views', id: 'sunset', content: ['Late afternoon gives warm light across the tiled roofs and city skyline. Staying into early evening reveals illuminated gate towers and red lanterns, creating a different atmosphere from the daytime.', 'In hot weather, evening is also more comfortable. Allow time to descend before your next booking because distances along the wall are longer than they appear.'] }
  ],
  attractions: [
    { name: 'South Gate (Yongning Gate)', description: 'The grandest and most convenient entrance for a first visit.', visitDuration: '30-45 minutes', bestTime: 'Late afternoon' },
    { name: 'Rampart Cycling Route', description: 'A wide circuit linking the four principal gates and corner towers.', visitDuration: '1.5-2.5 hours', bestTime: 'Morning or late afternoon' },
    { name: 'Arrow Towers and Gatehouses', description: 'Layered defensive structures that explain how the wall protected the old capital.', visitDuration: '30 minutes', bestTime: 'Daylight' },
    { name: 'Night Illumination', description: 'Lanterns and architectural lighting around the principal gates.', visitDuration: '30-60 minutes', bestTime: 'After sunset' }
  ],
  practicalInfo: {
    transportation: 'The South Gate is easy to reach by metro or taxi from central Xi\'an. Other gates may be more convenient depending on your hotel.',
    climate: 'There is little shade on the ramparts. Summer sun and winter wind can both be strong.',
    bestTime: 'Late afternoon into sunset, or early morning for a quieter circuit.',
    budget: 'Admission and bicycle rental are separate. Confirm current prices, deposits and return points before hiring.',
    language: 'Major entrances have English signage; keep the Chinese name of your chosen gate available for taxi drivers.',
    safety: 'Wear stable shoes, carry water and allow extra braking distance when cycling on uneven bricks.'
  },
  faqs: [
    { question: "How long does it take to cycle Xi'an City Wall?", answer: 'Most visitors need about 90 minutes to two hours for the full circuit, depending on stops, crowds and riding pace.' },
    { question: 'Which gate is best for first-time visitors?', answer: 'South Gate is the easiest choice because it has the most impressive ceremonial setting and good access from the city centre.' },
    { question: 'Can I visit without cycling?', answer: 'Yes. A one-hour walk from South Gate gives excellent views and avoids committing to the full circuit.' },
    { question: 'Is the wall suitable for children?', answer: 'Families can enjoy the wall, but supervise children closely around bicycles and steps. Bike size and rental rules should be checked on arrival.' }
  ],
  relatedTourSlugs: ['beijing-xian', 'essentials'],
  relatedGuideSlugs: ['xian-travel-guide', 'terracotta-warriors-travel-guide', 'big-wild-goose-pagoda-travel-guide'],
  relatedBlogSlugs: ['beijing-xian-itinerary-10-days', 'terracotta-warriors-guide-nz', 'xian-street-food-adventure'],
  galleryImages: [],
  sources: [{ label: "Xi'an City Wall Scenic Area — official website", href: 'https://www.chinaxiancitywall.com/' }],
  createdAt: UPDATED,
  updatedAt: UPDATED
};

export const bigWildGoosePagodaGuide: DestinationGuide = {
  id: 'guide-big-wild-goose-pagoda',
  slug: 'big-wild-goose-pagoda-travel-guide',
  destinationName: 'Big Wild Goose Pagoda',
  parentDestination: "Xi'an",
  metaTitle: "Big Wild Goose Pagoda Guide | Xi'an",
  metaDescription: "Plan a meaningful Big Wild Goose Pagoda visit in Xi'an with Tang history, Xuanzang's story, Da Ci'en Temple, walking routes and evening ideas.",
  keywords: ['Big Wild Goose Pagoda', "Xi'an pagoda", "Xi'an attractions", 'Da Cien Temple', 'Xuanzang', 'Tang dynasty Xi’an'],
  h1: 'Big Wild Goose Pagoda Travel Guide',
  heroSubtitle: 'Tang dynasty Buddhist heritage at the heart of modern Xi’an',
  heroImage: '/images/guides/big-wild-goose-pagoda/hero.webp',
  heroImageClassName: 'object-[center_48%]',
  introText: [
    "The Big Wild Goose Pagoda is one of Xi'an's clearest links to the cosmopolitan Tang dynasty. It was first built in 652 under the guidance of the monk, traveller and translator Xuanzang to preserve Buddhist scriptures, images and relics brought back from his journey to India. More than a city landmark, the tower represents a period when Chang'an stood at the eastern end of the Silk Roads and ideas travelled alongside merchants and diplomats.",
    'The pagoda rises inside Da Ci’en Temple, an active religious complex with halls, courtyards, incense and a history that extends beyond the tower itself. Outside the temple walls, large public squares and a cultural promenade show how modern Xi’an has built a new evening district around its Tang heritage. Experiencing both sides gives the visit more meaning: the temple explains why the monument exists, while the surrounding neighbourhood shows how that history continues to shape the city.',
    'For a first visit, arrive in mid or late afternoon. Explore the temple while its buildings are open, study the pagoda from several courtyards, and then remain in the district as the light changes. Travellers who only photograph the tower from the square miss the strongest part of the story: Xuanzang’s work, the translation of Buddhist texts and the role of Chang’an in connecting China with Central and South Asia.'
  ],
  quickAnswer: 'Plan at least 90 minutes for Da Ci’en Temple and the Big Wild Goose Pagoda, or three hours if you want the surrounding Tang-themed district after dark. Arrive in late afternoon, visit the temple first, then stay for the illuminated squares and cultural promenade.',
  visitPlanning: { recommendedVisitLength: '1.5–3 hours', bestFor: 'Tang history, Buddhist heritage and evening atmosphere', combineWith: "Xi'an City Wall or the Muslim Quarter" },
  sections: [
    {
      title: 'Why Xuanzang’s Story Matters',
      id: 'xuanzang',
      content: [
        'Xuanzang left Chang’an in the seventh century and travelled through Central Asia to India in search of Buddhist teachings and reliable Sanskrit texts. His journey took many years and later inspired one of East Asia’s best-known literary traditions. When he returned, he brought manuscripts, sacred images and knowledge gathered across a vast network of cultures.',
        'Da Ci’en Temple became an important centre for the work that followed. Xuanzang and other scholars translated Sanskrit texts into Chinese, a task that required religious learning as well as extraordinary care with language and meaning. The pagoda provided a place to preserve material connected with that work, so its significance comes from scholarship and cultural exchange as much as from architecture.',
        'This context changes how the building reads. Its brick mass is deliberately restrained compared with the richly painted halls around it. Rather than functioning as a palace or watchtower, it marked a centre of learning whose influence extended far beyond Tang China. That is why the site forms part of UNESCO’s Silk Roads: Chang’an–Tianshan Corridor World Heritage property.'
      ]
    },
    {
      title: 'From Tang Chang’an to the Seven-Storey Pagoda',
      id: 'history-and-architecture',
      content: [
        'The first pagoda was constructed in 652 during the Tang dynasty under Xuanzang’s supervision. The monument changed through later rebuilding, earthquake damage and repair before reaching the seven-storey form seen today. Its survival makes it one of the most visible structures connecting modern Xi’an with the ancient capital of Chang’an.',
        'Look closely at the strong square plan, narrowing levels and rhythmic brick openings. The design feels solid and vertical rather than highly decorated. From a distance, the slight taper gives the tower its calm profile; from the temple courtyards, the scale becomes clearer as the pagoda rises behind roofs, incense burners and old trees.',
        'The surrounding city has changed almost completely, which makes the tower’s continued presence especially powerful. It is useful to imagine the much larger Tang-period temple precinct and the scholars who worked there rather than judging the site only by the boundaries of the present complex.'
      ]
    },
    {
      title: 'A Meaningful Route Through Da Ci’en Temple',
      id: 'walking-route',
      content: [
        'Begin at the southern approach and pause by the Xuanzang statue before entering the temple. It establishes the human story behind the monument and creates a direct sightline toward the pagoda. Inside, move through the main halls and courtyards rather than heading immediately to the tower. The sequence helps explain that the pagoda belongs to a living temple complex.',
        'Allow time for architectural details, devotional spaces and the changing views created by gates and rooflines. The strongest photographs often come from within the courtyards, where the brick tower appears behind painted timber buildings. Respect worshippers, avoid blocking entrances and follow any photography restrictions displayed inside individual halls.',
        'Access to the pagoda interior or upper levels can change because of conservation, capacity or operating arrangements. Treat a climb as an optional addition. The essential experience remains available from ground level: the tower’s form, the temple setting and the historical relationship between Xuanzang, the scriptures and Chang’an.'
      ]
    },
    {
      title: 'What the World Heritage Listing Means',
      id: 'world-heritage',
      content: [
        'The Big Wild Goose Pagoda is one component of the transnational Silk Roads: the Routes Network of Chang’an–Tianshan Corridor, inscribed on the UNESCO World Heritage List in 2014. The corridor links sites across China, Kazakhstan and Kyrgyzstan that document movement, trade, belief and cultural exchange over long distances.',
        'At this site, the Silk Road story is expressed through ideas rather than a marketplace. Texts travelled from India to Chang’an; scholars translated them; Buddhist teachings then circulated in new languages and forms. The pagoda therefore gives visitors a way to understand the Silk Roads as a network for knowledge as well as silk, horses and luxury goods.',
        'This broader view also connects the pagoda with other Xi’an sights. The city wall reflects the later Ming city, the Terracotta Warriors belong to the Qin empire, and the pagoda represents Tang-era internationalism. Visiting all three helps separate distinct periods that are often compressed into a single idea of “ancient Xi’an”.'
      ],
      image: {
        src: '/images/guides/big-wild-goose-pagoda/terracotta-context.webp',
        alt: 'Terracotta Warriors standing in the excavated pits outside Xi’an',
        caption: 'The Terracotta Warriors represent Qin imperial history; the Big Wild Goose Pagoda belongs to Xi’an’s later Tang and Silk Road story.',
        imageClassName: 'object-[center_48%]'
      }
    },
    {
      title: 'Daylight, Blue Hour and the Evening District',
      id: 'day-or-night',
      content: [
        'Daylight is essential if you want to understand the temple and see the brickwork, painted halls and courtyard details clearly. Morning can be quieter, while late afternoon gives warmer light and creates the easiest transition into the evening. Check the temple’s current last-entry time before planning a late arrival.',
        'After the temple visit, walk through the public squares and continue toward the Tang-themed cultural promenade. The atmosphere becomes more theatrical after dark, with illuminated buildings, performances on some evenings and large numbers of local visitors. It is a contemporary interpretation of Tang identity rather than an untouched historical quarter, but that distinction is part of what makes the area interesting.',
        'Photographers should keep both wide and compressed views in mind. The tower works well as a distant anchor above the square, while gates, trees and temple roofs create stronger foregrounds from inside the complex. Blue hour often balances the remaining colour in the sky with the district’s architectural lighting.'
      ],
      image: {
        src: '/images/guides/big-wild-goose-pagoda/muslim-quarter-night.webp',
        alt: 'Lantern-lit evening streets in Xi’an’s Muslim Quarter',
        caption: 'For a different Xi’an evening, the Muslim Quarter combines lantern-lit streets, Hui heritage and local food inside the city walls.',
        imageClassName: 'object-[center_42%]'
      }
    },
    {
      title: 'How to Fit It into an Xi’an Itinerary',
      id: 'xian-itinerary',
      content: [
        'The pagoda pairs naturally with the Shaanxi History Museum because both sit south of the city centre and build a strong Tang-dynasty narrative. Museum reservations and opening arrangements can be restrictive, so confirm those first and let the fixed booking determine the order of your day.',
        'For a broader contrast, visit Xi’an City Wall earlier and come to the pagoda district in late afternoon. The wall presents the defensive structure of the later city, while Da Ci’en Temple opens a window onto religion, travel and scholarship. The Muslim Quarter can follow on another evening if you want food and street life rather than another major monument.',
        'Travellers returning from the Terracotta Warriors may also use the pagoda as an evening stop, provided the day has not become too long. This combination spans Qin and Tang history, but it involves substantial travel and walking. A slower itinerary gives the pagoda its own half-day with the museum or nearby cultural district.'
      ],
      image: {
        src: '/images/guides/big-wild-goose-pagoda/beijing-xian-train.webp',
        alt: 'High-speed train travelling on railway tracks in China',
        caption: 'High-speed rail makes Xi’an an easy second chapter after Beijing, with the journey forming part of the experience.',
        imageClassName: 'object-[center_58%]'
      }
    }
  ],
  attractions: [
    { name: 'Big Wild Goose Pagoda', description: 'The seven-storey brick tower associated with monk and translator Xuanzang.', visitDuration: '30-45 minutes', bestTime: 'Late afternoon' },
    { name: 'Da Ci’en Temple', description: 'The active temple complex surrounding the pagoda.', visitDuration: '45-60 minutes', bestTime: 'Daylight hours' },
    { name: 'Xuanzang Statue', description: 'A prominent monument linking the site to Silk Road scholarship.', visitDuration: '10-15 minutes', bestTime: 'Early evening' },
    { name: 'Cultural District and Squares', description: 'Pedestrian areas, landscaped plazas and evening activity around the temple precinct.', visitDuration: '1-2 hours', bestTime: 'After sunset' }
  ],
  practicalInfo: {
    transportation: 'Dayanta metro station serves the wider precinct, and taxis can drop visitors near the main approaches. Confirm your chosen entrance because the temple, northern square and southern cultural promenade cover a sizeable area.',
    climate: 'Temple courtyards provide some shade, but the public squares are exposed. Carry water and sun protection in summer; winter evenings can feel much colder once the sun drops.',
    bestTime: 'Late afternoon offers the best all-round visit: temple detail in daylight, softer photography and the surrounding district after dark. A weekday morning is better if your priority is quiet contemplation.',
    budget: 'The surrounding public squares can be explored freely. Da Ci’en Temple and any pagoda access may use separate tickets, and arrangements can change, so confirm current official information shortly before visiting.',
    language: 'Key areas have some English interpretation, but the importance of translation, Buddhist history and Silk Road exchange is easier to understand with a knowledgeable guide.',
    safety: 'The area is well visited but can become crowded after dark. Agree on a meeting point, watch for bicycles and service vehicles in pedestrian areas, and allow extra time when leaving after performances.'
  },
  faqs: [
    { question: 'Why is the Big Wild Goose Pagoda famous?', answer: 'It was first built in 652 under Xuanzang’s guidance to preserve Buddhist scriptures, images and relics associated with his journey to India. The site represents Tang-dynasty scholarship and the movement of ideas along the Silk Roads.' },
    { question: 'How much time should I allow?', answer: 'Allow at least 90 minutes for Da Ci’en Temple and the pagoda precinct. Two and a half to three hours is more comfortable if you want to read the interpretation, take photographs and continue into the surrounding district after dark.' },
    { question: 'Is it better by day or at night?', answer: 'The temple should be experienced in daylight, while the public squares and cultural promenade are livelier after dark. Arriving in late afternoon lets you see both without making two separate visits.' },
    { question: 'Can visitors climb the Big Wild Goose Pagoda?', answer: 'Interior and upper-level access can change because of conservation and operating arrangements. Check the current official rules before visiting and plan the trip so it remains worthwhile even if climbing is unavailable.' },
    { question: 'Is the Big Wild Goose Pagoda the same as the Small Wild Goose Pagoda?', answer: 'No. They are separate Tang-dynasty monuments in different parts of Xi’an. The Big Wild Goose Pagoda stands inside Da Ci’en Temple and is closely associated with Xuanzang; the Small Wild Goose Pagoda forms part of the Xi’an Museum precinct.' },
    { question: 'Can it be combined with Xi’an City Wall?', answer: 'Yes. Visit the City Wall earlier in the day, then move to Da Ci’en Temple in late afternoon and remain near the pagoda for the evening atmosphere. This also shows two different periods of Xi’an’s history.' }
  ],
  relatedTourSlugs: ['beijing-xian', 'essentials'],
  relatedGuideSlugs: ['xian-travel-guide', 'xian-city-wall-travel-guide', 'terracotta-warriors-travel-guide'],
  relatedBlogSlugs: [
    'why-silk-road-should-be-your-next-adventure',
    'beijing-xian-itinerary-10-days',
    'beijing-to-xian-high-speed-train',
    'terracotta-warriors-guide-nz',
    'xian-street-food-adventure',
    'first-time-china-beijing-xian'
  ],
  galleryImages: [],
  sources: [
    { label: 'UNESCO World Heritage Centre — Silk Roads: Chang’an-Tianshan Corridor', href: 'https://whc.unesco.org/en/list/1442' },
    { label: "Xi'an Municipal Government — Giant Wild Goose Pagoda", href: 'https://en.xa.gov.cn/CultureTravel/Attractions/1691691504798126082.html' },
    { label: "Xi'an Local Chronicles Office — Big Wild Goose Pagoda", href: 'https://xadfz.xa.gov.cn/xadq/rwxa/1802954373708996609.html' }
  ],
  createdAt: UPDATED,
  updatedAt: UPDATED
};

export const westLakeGuide: DestinationGuide = {
  id: 'guide-west-lake',
  slug: 'west-lake-travel-guide',
  destinationName: 'West Lake',
  parentDestination: 'Hangzhou',
  metaTitle: 'West Lake Hangzhou Guide | Walks & Boats',
  metaDescription: 'Plan a West Lake visit in Hangzhou with scenic walks, boat ideas, key viewpoints, seasonal advice and links to nearby tea country.',
  keywords: ['West Lake Hangzhou', 'West Lake guide', 'things to do in Hangzhou', 'Hangzhou boat ride'],
  h1: 'West Lake Travel Guide',
  heroSubtitle: 'Causeways, temples and reflections in the heart of Hangzhou',
  heroImage: '/images/guides/west-lake/hero.webp',
  heroImageClassName: 'object-[center_52%]',
  introText: [
    'West Lake is not a single viewpoint but a landscape designed to unfold slowly. Causeways divide the water into changing scenes, while pagodas, gardens, bridges and wooded hills appear and disappear as you move around the shore.',
    'A good visit combines a lakeside walk with a boat crossing or short cruise. Rather than attempting the entire perimeter, choose one or two sections that suit the season and your pace, then connect the lake with Longjing tea country or Hangzhou’s historic streets.'
  ],
  quickAnswer: 'Give West Lake at least half a day. Choose one causeway, take a short boat crossing and add one temple, pagoda or garden rather than trying to walk the entire shoreline. A full day works well when combined with Longjing tea country.',
  visitPlanning: { recommendedVisitLength: 'Half day to full day', bestFor: 'Scenic walks, boats, gardens and photography', combineWith: 'Longjing tea fields or central Hangzhou' },
  sections: [
    { title: 'How to Experience the Lake', id: 'how-to-explore', content: ['Walking gives the best sense of detail, especially along the Bai and Su causeways. Boats reveal the wider composition and make it easier to connect opposite shores without retracing your steps.', 'A balanced half-day might combine a causeway walk, a short boat ride and one temple or garden. A full day allows slower photography, tea and time away from the busiest waterfront sections.'] },
    { title: 'Classic Views and Quieter Corners', id: 'classic-views', content: ['The lake’s celebrated scenic views are linked to seasons, weather and time of day. Broken Bridge, Leifeng Pagoda, Three Pools Mirroring the Moon and the Su Causeway are useful anchors, but smaller pavilions and wooded paths often create the most memorable moments.', 'Move a little beyond the main arrival points to find calmer stretches of shore. Mist and light rain can enhance the atmosphere rather than spoil it.'] },
    { title: 'West Lake and Longjing Tea', id: 'tea-country', content: ['Longjing village and the surrounding tea fields sit in the hills west of the lake. Combining them shows two sides of Hangzhou: the composed urban lake and a working agricultural landscape.', 'Spring is famous for fresh tea, while autumn offers clear skies and colour. Tea visits are best arranged with a trusted guide or producer so the tasting feels informative rather than sales-led.'] }
  ],
  attractions: [
    { name: 'Su Causeway', description: 'A long tree-lined route crossing the western lake.', visitDuration: '1-2 hours', bestTime: 'Early morning' },
    { name: 'Three Pools Mirroring the Moon', description: 'Small stone pagodas and an island landscape reached by boat.', visitDuration: '45-60 minutes', bestTime: 'Calm weather' },
    { name: 'Leifeng Pagoda View', description: 'A landmark on the southern shore with broad lake panoramas.', visitDuration: '45-60 minutes', bestTime: 'Late afternoon' },
    { name: 'Bai Causeway and Broken Bridge', description: 'An accessible northern route with classic lake and skyline views.', visitDuration: '1 hour', bestTime: 'Morning or evening' }
  ],
  practicalInfo: {
    transportation: 'Metro, bus and taxi services reach different sides of the lake. Traffic can be slow on busy weekends, so walking and boats are often more efficient.',
    climate: 'Hangzhou is humid in summer and can be cool and damp in winter. Light rain is common and suits the lake’s atmosphere.',
    bestTime: 'Weekday mornings in spring or autumn; late afternoon is excellent for reflections and warmer light.',
    budget: 'Lakeside walking is free. Boats, pagodas, temples and gardens have separate charges that vary by route.',
    language: 'Major sights have bilingual signs; boat routes are easier to navigate with the Chinese destination name saved on your phone.',
    safety: 'Paths are busy and can be slippery after rain. Take care near water and when boarding boats.'
  },
  faqs: [
    { question: 'How long do I need at West Lake?', answer: 'A half-day covers a causeway, one boat ride and a major viewpoint. A full day suits travellers who want temples, tea or a slower circuit.' },
    { question: 'Do I need to walk around the whole lake?', answer: 'No. The full perimeter is long. Choose one or two scenic sections and use a boat or taxi to connect them.' },
    { question: 'Is West Lake worth visiting in rain?', answer: 'Yes. Mist and light rain are part of West Lake’s traditional appeal, though waterproof shoes and an umbrella make the experience easier.' },
    { question: 'Can I combine West Lake with Longjing tea fields?', answer: 'Yes. They are close enough to combine in one day, and the contrast between the lakeside and tea hills is one of Hangzhou’s best experiences.' }
  ],
  relatedTourSlugs: ['shanghai-surroundings', 'essentials'],
  relatedGuideSlugs: ['hangzhou-travel-guide', 'shanghai-travel-guide', 'suzhou-travel-guide'],
  relatedBlogSlugs: ['west-lake-hangzhou-travel-guide', 'shanghai-suzhou-hangzhou-itinerary', 'china-water-towns-jiangnan-guide'],
  galleryImages: [
    { src: '/images/guides/west-lake/causeway.webp', imgClass: 'object-[center_52%]', alt: 'Tree-lined causeway and reflective water at West Lake in Hangzhou', caption: 'Causeways divide West Lake into a sequence of changing views.' },
    { src: '/images/guides/west-lake/gallery.webp', imgClass: 'object-[center_48%]', alt: 'Traditional pavilion surrounded by water and trees at West Lake', caption: 'Pavilions, gardens and wooded shorelines reward a slower route around the lake.' }
  ],
  sources: [{ label: 'UNESCO World Heritage Centre — West Lake Cultural Landscape of Hangzhou', href: 'https://whc.unesco.org/en/list/1334' }],
  createdAt: UPDATED,
  updatedAt: UPDATED
};

export const yuGardenGuide: DestinationGuide = {
  id: 'guide-yu-garden',
  slug: 'yu-garden-travel-guide',
  destinationName: 'Yu Garden',
  parentDestination: 'Shanghai',
  metaTitle: 'Yu Garden Shanghai Guide | Highlights',
  metaDescription: 'Explore Shanghai’s Yu Garden: classical garden design, pavilions, rockeries, nearby Old City streets and practical advice for a rewarding visit.',
  keywords: ['Yu Garden Shanghai', 'Yuyuan Garden guide', 'Shanghai Old City', 'things to do in Shanghai'],
  h1: 'Yu Garden Travel Guide',
  heroSubtitle: 'Classical garden design inside Shanghai’s historic Old City',
  heroImage: '/images/guides/yu-garden/hero.webp',
  heroImageClassName: 'object-[center_58%]',
  introText: [
    'Yu Garden is a compact world of pavilions, ponds, rockeries and framed views hidden within central Shanghai. Its design turns a relatively small site into a sequence of changing scenes, using zigzag paths, moon gates and carefully placed windows to slow the visitor down.',
    'The garden is often confused with the busy bazaar surrounding it. Both are worth seeing, but they offer different experiences: enter the formal garden for architecture and landscape design, then explore the neighbouring Old City lanes, food stalls and teahouses. Keeping those two areas distinct makes the visit easier to pace and gives the quieter garden enough time before the commercial streets.'
  ],
  quickAnswer: 'Allow about 90 minutes inside Yu Garden and another hour for the surrounding Old City and bazaar. Visit the ticketed garden near opening, then continue to the busier lanes outside; the Bund is close enough to form a strong half-day route.',
  visitPlanning: { recommendedVisitLength: '1.5–2.5 hours', bestFor: 'Classical gardens, architecture and Old City atmosphere', combineWith: 'The Bund or Shanghai Old City' },
  sections: [
    { title: 'How to Read a Classical Chinese Garden', id: 'garden-design', content: ['Yu Garden is designed as a journey rather than a single panorama. Walls divide the site into rooms, while openings reveal partial views that encourage you to keep moving.', 'Rocks suggest mountains, ponds suggest larger bodies of water, and pavilions create places to pause. Looking through doors and lattice windows often produces a more interesting view than standing in the middle of a courtyard.'] },
    { title: 'Garden First, Bazaar Second', id: 'garden-and-bazaar', content: ['Visit the ticketed garden before the surrounding bazaar becomes crowded. Inside, move slowly through the rockeries and pavilions; outside, expect a much livelier commercial atmosphere.', 'The nearby zigzag bridge and teahouse are iconic photographs, but peak periods can be congested. An early start keeps the contrast enjoyable rather than overwhelming.'] },
    { title: 'Pairing Yu Garden with the Bund', id: 'pairing-the-bund', content: ['Yu Garden and the Bund show two very different chapters of Shanghai history and sit close enough to combine. Start with the garden in the morning, walk or drive toward the river, and finish with the Bund skyline.', 'This route creates a clear progression from enclosed Ming-style spaces to the open waterfront and modern Pudong towers.'] }
  ],
  attractions: [
    { name: 'Great Rockery', description: 'A dramatic composition of stone that creates the feeling of a miniature mountain landscape.', visitDuration: '20 minutes', bestTime: 'Soon after opening' },
    { name: 'Pavilions and Moon Gates', description: 'Layered rooms and framed views that demonstrate classical garden design.', visitDuration: '45-60 minutes', bestTime: 'Morning' },
    { name: 'Exquisite Jade Rock', description: 'A celebrated porous stone valued for its unusual form and texture.', visitDuration: '10-15 minutes', bestTime: 'Daylight' },
    { name: 'Old City Bazaar', description: 'Busy lanes, snacks and traditional-style shopfronts surrounding the garden.', visitDuration: '1-2 hours', bestTime: 'Before lunch or early evening' }
  ],
  practicalInfo: {
    transportation: 'Yu Garden is served by Shanghai Metro and is a short taxi ride from the Bund and People’s Square.',
    climate: 'The garden offers some shade but can feel humid in summer. Rain creates reflections and enriches the stone and greenery.',
    bestTime: 'Arrive near opening on a weekday to experience the narrow paths before larger groups.',
    budget: 'The surrounding bazaar is free to enter; the formal garden requires a ticket. Confirm current booking requirements.',
    language: 'Basic English signs identify major features; a guide helps explain the symbolism and garden composition.',
    safety: 'Paths include uneven stones, narrow bridges and steps. Move carefully in rain and during crowded periods.'
  },
  faqs: [
    { question: 'Is Yu Garden the same as Yuyuan Bazaar?', answer: 'No. Yu Garden is the ticketed classical garden, while the bazaar is the surrounding commercial district. They are adjacent and easy to visit together.' },
    { question: 'How long should I spend at Yu Garden?', answer: 'Allow 90 minutes for the garden and another hour or more for the bazaar and nearby Old City streets.' },
    { question: 'When is Yu Garden least crowded?', answer: 'Weekday mornings near opening are usually the calmest. Weekends and public holidays can be very busy.' },
    { question: 'Can I walk from Yu Garden to the Bund?', answer: 'Yes. The distance is manageable for many travellers and creates a useful Old City-to-waterfront route, though a taxi is easy if mobility or weather is a concern.' }
  ],
  relatedTourSlugs: ['shanghai-surroundings', 'essentials'],
  relatedGuideSlugs: ['shanghai-travel-guide', 'the-bund-travel-guide', 'suzhou-travel-guide'],
  relatedBlogSlugs: ['shanghai-10-days-itinerary', 'shanghai-suzhou-hangzhou-itinerary', 'china-water-towns-jiangnan-guide'],
  galleryImages: [
    { src: '/images/guides/yu-garden/pavilion.webp', imgClass: 'object-[center_58%]', alt: 'Classical pavilion, pond and rockery inside Yu Garden in Shanghai', caption: 'Pavilions, ponds and rockeries turn the compact garden into a sequence of scenes.' },
    { src: '/images/guides/yu-garden/gallery.webp', imgClass: 'object-[center_55%]', alt: 'Traditional covered walkway and garden architecture at Yu Garden', caption: 'Covered corridors frame views and guide visitors through the garden.' }
  ],
  sources: [{ label: 'Official Shanghai China Travel Website — Yuyuan Garden', href: 'https://www.meet-in-shanghai.net/en/tourist-attraction/yuyuan-garden-998246/' }],
  createdAt: UPDATED,
  updatedAt: UPDATED
};

export const theBundGuide: DestinationGuide = {
  id: 'guide-the-bund',
  slug: 'the-bund-travel-guide',
  destinationName: 'The Bund',
  parentDestination: 'Shanghai',
  metaTitle: 'The Bund Shanghai Guide | Skyline & Visit Tips',
  metaDescription: 'Plan a visit to Shanghai’s Bund: the best skyline viewpoints, historic buildings, morning and night experiences, and nearby places to explore.',
  keywords: ['The Bund Shanghai', 'Shanghai skyline view', 'Bund travel guide', 'things to do in Shanghai'],
  h1: 'The Bund Travel Guide',
  heroSubtitle: 'Shanghai’s historic waterfront facing the towers of Pudong',
  heroImage: '/images/guides/the-bund/hero.webp',
  heroImageClassName: 'object-[center_55%]',
  introText: [
    'The Bund is Shanghai’s defining city view: a line of early twentieth-century commercial buildings on one bank of the Huangpu River and the futuristic towers of Pudong on the other. The contrast explains Shanghai’s modern identity in a single panorama.',
    'The waterfront changes through the day. Mornings belong to walkers and local exercise groups, late afternoon brings softer light, and evening turns both banks into an illuminated cityscape. A strong visit includes the promenade, selected historic façades and at least one view from the Pudong side or the river.'
  ],
  quickAnswer: 'Allow 90 minutes to three hours for the Bund, depending on whether you add historic architecture, a river crossing or a cruise. Arrive before sunset to see the waterfront in daylight, blue hour and evening illumination during one visit.',
  visitPlanning: { recommendedVisitLength: '1.5–3 hours', bestFor: 'Skyline views, architecture and evening photography', combineWith: 'Yu Garden, Nanjing Road or Pudong' },
  sections: [
    { title: 'Two Skylines, One River', id: 'two-skylines', content: ['The western bank presents stone façades built during Shanghai’s era as an international trading port. Across the river, Lujiazui’s towers represent the city’s rapid transformation since the 1990s.', 'Stand back from the railings to appreciate both the river traffic and the full Pudong skyline. Then cross the road to study the historic buildings individually rather than treating them as a backdrop.'] },
    { title: 'Morning, Sunset or Night', id: 'best-time', content: ['Early morning is calm and local, with clearer walking space and softer haze. Sunset can produce dramatic colour behind the historic bank, while night delivers the famous illuminated panorama.', 'If you only visit once, arrive before dusk and stay through the lighting transition. Weather and seasonal lighting schedules vary, so allow flexibility.'] },
    { title: 'Extending the Waterfront Walk', id: 'extend-the-walk', content: ['Continue north toward the confluence around the historic bridge and river views, or move south toward the Old City and Yu Garden. A ferry or metro ride to Pudong gives the reverse view back toward the Bund.', 'A river cruise offers the broadest perspective, but the public ferry can provide a short, practical crossing. Choose according to time and the kind of experience you want rather than assuming the longer cruise is always necessary.'] }
  ],
  attractions: [
    { name: 'Bund Promenade', description: 'The elevated waterfront walk with uninterrupted views across the Huangpu River.', visitDuration: '1-2 hours', bestTime: 'Sunset into evening' },
    { name: 'Historic Architecture', description: 'Former banks, trading houses and hotels in a range of early modern styles.', visitDuration: '45-60 minutes', bestTime: 'Daylight' },
    { name: 'Pudong Skyline View', description: 'The classic panorama of the Oriental Pearl Tower and Lujiazui skyscrapers.', visitDuration: '30-60 minutes', bestTime: 'Blue hour' },
    { name: 'Huangpu River Crossing', description: 'A ferry or cruise perspective linking the city’s two major banks.', visitDuration: '20-90 minutes', bestTime: 'Late afternoon or evening' }
  ],
  practicalInfo: {
    transportation: 'Several metro stations serve the wider area, followed by a walk to the river. Taxis may be slow during evening peaks.',
    climate: 'The waterfront is exposed to wind, summer heat and winter cold. Haze can affect long skyline views.',
    bestTime: 'Arrive before sunset and remain through blue hour for both daylight architecture and night illumination.',
    budget: 'The promenade is free. Ferries are inexpensive; cruises and observation decks vary widely in price.',
    language: 'The main district is easy to navigate, and building names are commonly shown in English and Chinese.',
    safety: 'The promenade is busy but well managed. Watch for cyclists and traffic when crossing the roads behind the waterfront.'
  },
  faqs: [
    { question: 'What is the best time to visit the Bund?', answer: 'Late afternoon through evening gives the greatest variety: historic façades in daylight, sunset over the river and the illuminated Pudong skyline.' },
    { question: 'Is the Bund free?', answer: 'Yes. Walking the promenade is free. River cruises, ferries and observation decks are optional extras.' },
    { question: 'How long should I spend there?', answer: 'Allow at least 90 minutes. Two to three hours works better if you want architecture, sunset photographs or a river crossing.' },
    { question: 'Can I combine the Bund with Yu Garden?', answer: 'Yes. They form one of Shanghai’s strongest half-day combinations, contrasting the Old City’s enclosed garden spaces with the open riverfront skyline.' }
  ],
  relatedTourSlugs: ['shanghai-surroundings', 'essentials'],
  relatedGuideSlugs: ['shanghai-travel-guide', 'yu-garden-travel-guide', 'hangzhou-travel-guide'],
  relatedBlogSlugs: ['shanghai-10-days-itinerary', 'shanghai-suzhou-hangzhou-itinerary', 'china-water-towns-jiangnan-guide'],
  galleryImages: [
    { src: '/images/guides/the-bund/skyline.webp', imgClass: 'object-[center_48%]', alt: 'Pudong skyline viewed across the Huangpu River from central Shanghai', caption: 'The eastern bank presents Shanghai’s modern skyline across the Huangpu River.' },
    { src: '/images/guides/the-bund/night.webp', imgClass: 'object-[center_50%]', alt: 'Historic Bund buildings illuminated beside the Huangpu River at night', caption: 'Evening lighting reveals the architectural character of the historic western bank.' }
  ],
  sources: [{ label: 'Official Shanghai China Travel Website — The Bund', href: 'https://www.meet-in-shanghai.net/en/huangpu-district/the-bund-648313/' }],
  createdAt: UPDATED,
  updatedAt: UPDATED
};

export const phase1LandmarkGuides: DestinationGuide[] = [
  templeOfHeavenGuide,
  xianCityWallGuide,
  bigWildGoosePagodaGuide,
  westLakeGuide,
  yuGardenGuide,
  theBundGuide
];
