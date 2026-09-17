export interface BlogInlineImage {
  src: string;
  alt: string;
  caption: string;
  imageClassName?: string;
}

/**
 * Contextual article photography kept separate from hero imagery so the same
 * photograph is not reused as both the listing image and the in-article image.
 */
const INLINE_IMAGES: Record<string, BlogInlineImage[]> = {
  'first-time-china-travel-tips': [{
    src: '/images/blog/inline/first-time-bullet-train.webp',
    alt: 'A modern Chinese high-speed train at a railway platform',
    caption: 'China’s high-speed rail network makes multi-city journeys practical for first-time visitors.',
    imageClassName: 'object-[center_52%]',
  }],
  'beijing-xian-itinerary-10-days': [{
    src: '/images/blog/inline/beijing-hutong.webp',
    alt: 'Traditional Beijing hutong lane with historic courtyard architecture',
    caption: 'A balanced Beijing and Xi’an itinerary leaves room for neighbourhood life as well as headline monuments.',
    imageClassName: 'object-[center_55%]',
  }],
  'beijing-to-xian-high-speed-train': [{
    src: '/images/blog/inline/beijing-xian-train.webp',
    alt: 'Chinese high-speed train travelling between Beijing and Xi’an',
    caption: 'High-speed rail connects Beijing and Xi’an without the airport transfers required for a domestic flight.',
    imageClassName: 'object-center',
  }],
  'terracotta-warriors-guide-nz': [{
    src: '/images/blog/inline/terracotta-detail.webp',
    alt: 'Rows of Terracotta Warriors inside the archaeological excavation hall near Xi’an',
    caption: 'The warriors are viewed across several excavation pits, each revealing a different part of the ancient army.',
    imageClassName: 'object-[center_48%]',
  }],
  'xian-street-food-adventure': [{
    src: '/images/blog/inline/xian-muslim-quarter.webp',
    alt: "Food stalls and illuminated signs in Xi'an's Muslim Quarter",
    caption: 'Xi’an’s Muslim Quarter is most rewarding when you sample several small dishes rather than choosing one large meal.',
    imageClassName: 'object-[center_55%]',
  }],
  'shanghai-suzhou-hangzhou-itinerary': [{
    src: '/images/blog/inline/shanghai-nanjing-road.webp',
    alt: 'Evening lights and pedestrians on Shanghai’s Nanjing Road',
    caption: 'Shanghai’s urban energy makes a strong contrast with the gardens and waterways of Suzhou and Hangzhou.',
    imageClassName: 'object-[center_58%]',
  }],
  'west-lake-hangzhou-travel-guide': [{
    src: '/images/blog/inline/hangzhou-leifeng.webp',
    alt: 'Leifeng Pagoda rising above trees beside West Lake in Hangzhou',
    caption: 'Leifeng Pagoda is one of the landmarks that gives West Lake its layered skyline.',
    imageClassName: 'object-[center_48%]',
  }],
  'shanghai-10-days-itinerary': [{
    src: '/images/blog/inline/shanghai-huangpu-night.webp',
    alt: 'Shanghai skyline illuminated at night beside the Huangpu River',
    caption: 'Leave at least one Shanghai evening free for the Huangpu waterfront after the skyline lights come on.',
    imageClassName: 'object-[center_52%]',
  }],
  'china-water-towns-jiangnan-guide': [{
    src: '/images/blog/inline/jiangnan-water-town.webp',
    alt: 'Stone bridges and canal-side houses in a Jiangnan water town',
    caption: 'Jiangnan water towns are defined by canals, stone bridges and homes built directly along the water.',
    imageClassName: 'object-[center_52%]',
  }],
  'yangtze-river-cruise-from-chongqing': [{
    src: '/images/blog/inline/yangtze-gorges.webp',
    alt: 'Steep green cliffs rising above the Yangtze River through the Three Gorges',
    caption: 'The scenery changes from Chongqing’s dense riverfront to the steep landscapes of the Three Gorges.',
    imageClassName: 'object-center',
  }],
  'beijing-xian-tour-new-zealand': [{
    src: '/images/blog/inline/tiananmen.webp',
    alt: 'Tiananmen Gate in central Beijing under a clear sky',
    caption: 'Beijing and Xi’an connect two major chapters of imperial Chinese history in one straightforward route.',
    imageClassName: 'object-[center_52%]',
  }],
  'photography-guide-china-best-locations-hidden-gems': [{
    src: '/images/blog/inline/beijing-birds-nest.webp',
    alt: 'The lattice structure of Beijing’s National Stadium, known as the Bird’s Nest',
    caption: 'Modern architecture adds a different visual language to a China photography itinerary.',
    imageClassName: 'object-[center_48%]',
  }],
};

export function getBlogInlineImages(slug: string): BlogInlineImage[] {
  return INLINE_IMAGES[slug] ?? [];
}
