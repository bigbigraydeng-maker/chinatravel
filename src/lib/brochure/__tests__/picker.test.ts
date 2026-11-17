// Why this exists: the brochure picker must always return two real, bookable China tours for any
// combination of answers, and the card list must never drift from the tour list it is built from.
import type { Tour } from '@/lib/data/tours';
import {
  groupTours,
  recommend,
  recommendCards,
  scoreTour,
  toBrochureCard,
  type PickerAnswers,
  type TripLength,
  type Pace,
} from '@/lib/brochure/picker';

const TODAY = '2026-11-17';

function makeTour(over: Partial<Tour> & Pick<Tour, 'slug' | 'name' | 'duration'>): Tour {
  return {
    id: over.slug,
    destination: 'china',
    tier: 'discovery',
    title: over.name,
    shortDescription: '',
    price: 'From NZD $3,000',
    heroImage: '',
    gallery: [],
    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    metaTitle: '',
    metaDescription: '',
    isActive: true,
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
    departureDates: ['10 March 2027'],
    tourCities: ['Beijing', "Xi'an", 'Shanghai'],
    ...over,
  };
}

const ALL_ANSWERS: PickerAnswers[] = (() => {
  const lengths: TripLength[] = ['10', '15', '17'];
  const firstVisits = [true, false];
  const paces: Pace[] = ['easy', 'full'];
  const out: PickerAnswers[] = [];
  for (const length of lengths) {
    for (const firstVisit of firstVisits) {
      for (const pace of paces) {
        out.push({ length, firstVisit, pace });
      }
    }
  }
  return out;
})();

describe('groupTours', () => {
  it('buckets tours by length, tier and destination in a fixed order', () => {
    const tours: Tour[] = [
      makeTour({ slug: 'twelve', name: 'Twelve', duration: '12 Days' }),
      makeTour({ slug: 'sixteen', name: 'Sixteen', duration: '16 Days' }),
      makeTour({ slug: 'thirteen', name: 'Thirteen', duration: '13 Days' }),
      makeTour({ slug: 'seventeen', name: 'Seventeen', duration: '17 Days' }),
      makeTour({
        slug: 'stop',
        name: 'Stop',
        duration: '4 Days',
        tier: 'stopover',
      }),
      makeTour({
        slug: 'japan',
        name: 'Japan',
        duration: '10 Days',
        destination: 'japan',
      }),
      makeTour({ slug: 'tailor', name: 'Tailor', duration: 'Tailor made' }),
    ];

    const groups = groupTours(tours);
    expect(groups.map((g) => g.key)).toEqual([
      'about10',
      'about15',
      'over17',
      'stopover',
      'asia',
    ]);

    const about15 = groups.find((g) => g.key === 'about15');
    expect(about15?.tours.map((t) => t.slug)).toEqual(['tailor', 'thirteen', 'sixteen']);
  });

  it('leaves out empty groups', () => {
    const groups = groupTours([
      makeTour({ slug: 'twelve', name: 'Twelve', duration: '12 Days' }),
    ]);
    expect(groups).toHaveLength(1);
    expect(groups[0].key).toBe('about10');
    expect(groups[0].title).toBe('About 10 days');
  });
});

describe('scoreTour', () => {
  it('scores a tour with only past departures as 0 for every answer', () => {
    const past = makeTour({
      slug: 'past',
      name: 'Past',
      duration: '10 Days',
      departureDates: ['10 March 2025'],
    });
    for (const answers of ALL_ANSWERS) {
      expect(scoreTour(answers, past, TODAY)).toBe(0);
      expect(recommend(answers, [past], TODAY)).toEqual([]);
    }
  });

  it('always scores stopover and japan tours as 0', () => {
    const stopover = makeTour({
      slug: 'stop',
      name: 'Stop',
      duration: '10 Days',
      tier: 'stopover',
    });
    const japan = makeTour({
      slug: 'japan',
      name: 'Japan',
      duration: '10 Days',
      destination: 'japan',
    });
    for (const answers of ALL_ANSWERS) {
      expect(scoreTour(answers, stopover, TODAY)).toBe(0);
      expect(scoreTour(answers, japan, TODAY)).toBe(0);
    }
  });
});

describe('recommend', () => {
  const fixtures: Tour[] = [
    makeTour({
      slug: 'a',
      name: 'A',
      duration: '10 Days',
      tier: 'discovery',
      tourCities: ['Beijing', "Xi'an", 'Shanghai'],
    }),
    makeTour({
      slug: 'b',
      name: 'B',
      duration: '12 Days',
      tier: 'signature',
      tourCities: ['Beijing', 'Shanghai'],
    }),
    makeTour({
      slug: 'c',
      name: 'C',
      duration: '14 Days',
      tier: 'discovery',
      tourCities: ['Beijing', "Xi'an", 'Shanghai', 'Guilin'],
    }),
    makeTour({
      slug: 'd',
      name: 'D',
      duration: '15 Days',
      tier: 'signature',
      tourCities: ['Beijing', "Xi'an", 'Shanghai', 'Guilin', 'Chengdu'],
    }),
    makeTour({
      slug: 'e',
      name: 'E',
      duration: '18 Days',
      tier: 'discovery',
      tourCities: ['Beijing', "Xi'an", 'Shanghai', 'Guilin', 'Chengdu', 'Lhasa'],
    }),
    makeTour({
      slug: 'f',
      name: 'F',
      duration: '21 Days',
      tier: 'signature',
      tourCities: ['Beijing', "Xi'an", 'Shanghai', 'Guilin', 'Chengdu', 'Lhasa', 'Kashgar'],
    }),
    makeTour({
      slug: 'stop',
      name: 'Stop',
      duration: '4 Days',
      tier: 'stopover',
    }),
    makeTour({
      slug: 'japan',
      name: 'Japan',
      duration: '10 Days',
      destination: 'japan',
    }),
  ];

  it('returns exactly two bookable China tours for every answer combination, deterministically', () => {
    for (const answers of ALL_ANSWERS) {
      const first = recommend(answers, fixtures, TODAY);
      expect(first).toHaveLength(2);
      for (const tour of first) {
        expect(tour.destination).toBe('china');
        expect(tour.tier).not.toBe('stopover');
      }
      const second = recommend(answers, fixtures, TODAY);
      expect(second.map((t) => t.slug)).toEqual(first.map((t) => t.slug));
    }
  });

  it('length comes first: a guest asking for about 10 days is not offered a 16-day tour ahead of a 10-day one', () => {
    const tenDay = makeTour({ slug: 'ten', name: 'Ten', duration: '10 Days', tier: 'discovery', tourCities: ['Suzhou', 'Wuxi', 'Xinshi', 'Hangzhou', 'Shanghai'] });
    const longSignature = makeTour({ slug: 'long', name: 'Long', duration: '16 Days', tier: 'signature', tourCities: ['Shanghai', 'Yichang', 'Chongqing', 'Chengdu', 'Zhangjiajie'] });
    const picks = recommend({ length: '10', firstVisit: false, pace: 'easy' }, [longSignature, tenDay], TODAY);
    expect(picks.map((t) => t.slug)).toEqual(['ten', 'long']);
  });

  it('recommendCards returns the same paths as recommend for every answer combination', () => {
    const cards = fixtures.map((t) => toBrochureCard(t, TODAY));
    for (const answers of ALL_ANSWERS) {
      const cardPaths = recommendCards(answers, cards).map((c) => c.path);
      const tourPaths = recommend(answers, fixtures, TODAY).map(
        (t) => '/tours/' + t.destination + '/' + t.tier + '/' + t.slug
      );
      expect(cardPaths).toEqual(tourPaths);
    }
  });
});

describe('toBrochureCard', () => {
  it('caps departures at four and reports the remainder', () => {
    const tour = makeTour({
      slug: 'many',
      name: 'Many',
      duration: '10 Days',
      departureDates: [
        '10 March 2027',
        '20 April 2027',
        '15 May 2027',
        '12 June 2027',
        '8 July 2027',
        '3 August 2027',
      ],
    });
    const card = toBrochureCard(tour, TODAY);
    expect(card.departures).toHaveLength(4);
    expect(card.moreDepartures).toBe(2);
  });

  it('normalises the stored price to the site headline format', () => {
    const tour = makeTour({ slug: 'price', name: 'Price', duration: '10 Days' });
    expect(toBrochureCard(tour, TODAY).price).toBe('NZD $3,000');
  });
});
