interface TourCardMediaSource {
  slug: string;
  heroImage: string;
}

interface TourCardMedia {
  src: string;
  objectPosition: string;
}

/**
 * Card images need a wider, tighter composition than detail-page heroes.
 * Keep these overrides local to cards so a good full-page hero is not forced
 * into every 16:9 thumbnail crop.
 */
const CARD_MEDIA: Record<string, TourCardMedia> = {
  'beijing-xian': {
    src: '/images/tours/xian-terracotta-2.jpg',
    objectPosition: '50% 60%',
  },
  essentials: {
    src: '/images/tours/beijing-temple-2.jpg',
    objectPosition: '43% 57%',
  },
  'grand-tour': {
    src: '/images/tours/great-wall-green.jpg',
    objectPosition: '50% 50%',
  },
  landscapes: {
    src: '/images/tours/yunnan-terraced-fields-pavilion.jpg',
    objectPosition: '65% 50%',
  },
  'shanghai-surroundings': {
    src: '/images/tours/shanghai-yuyuan-night.jpg',
    objectPosition: '50% 55%',
  },
  'guangzhou-shenzhen': {
    src: '/images/tours/shenzhen-skyline.jpg',
    objectPosition: '50% 58%',
  },
  'shanghai-express': {
    src: '/images/tours/shanghai-skyline.jpg',
    objectPosition: '50% 52%',
  },
  chengdu: {
    src: '/images/tours/chengdu-pandas.jpg',
    objectPosition: '38% 46%',
  },
  'silk-road': {
    src: '/images/tours/silk-road-wall.jpg',
    objectPosition: '50% 56%',
  },
  'imperial-heritage': {
    src: '/images/tours/forbidden-city-aerial.jpg',
    objectPosition: '50% 54%',
  },
  'china-icons-collection': {
    src: '/images/campaigns/christmas-new-year/festive-china-og.webp',
    objectPosition: '50% 52%',
  },
  'china-icons-collection-christchurch': {
    src: '/images/tours/great-wall-mist.jpg',
    objectPosition: '50% 48%',
  },
};

export function getTourCardMedia(tour: TourCardMediaSource): TourCardMedia {
  return CARD_MEDIA[tour.slug] ?? {
    src: tour.heroImage,
    objectPosition: '50% 50%',
  };
}
