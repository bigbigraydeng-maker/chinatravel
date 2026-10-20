// Why these tests exist: a landing page must only say what the tour data says,
// must never show a departure that has left or has no published price, and must
// never carry a claim the business has ruled out.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Tour } from '@/lib/data/tours';
import {
  buildHeroFacts,
  DEPOSIT_TEXT,
  selectFaqs,
  tourCorpus,
  AD_COPY_FORBIDDEN,
  findForbiddenCopy,
} from '@/lib/ad-landing/facts';

function makeTour(overrides: Partial<Tour> = {}): Tour {
  return {
    id: 't1',
    slug: 'test-tour',
    destination: 'china',
    tier: 'discovery',
    name: 'Test Tour',
    title: 'Test Tour',
    shortDescription: 'A test tour.',
    duration: '10 Days',
    price: 'NZD $2,699 per person',
    heroImage: '/hero.jpg',
    gallery: [],
    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    metaTitle: 'Test',
    metaDescription: 'Test',
    isActive: true,
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
    ...overrides,
  };
}

const TODAY = '2098-06-01';

const BOTH_DEPARTURES = {
  departureDates: ['5 February 2099', '3 August 2099'],
  departurePricing: {
    '5 February 2099': 'NZD $2,899',
    '3 August 2099': 'NZD $2,699',
  },
};

describe('buildHeroFacts', () => {
  it('reads price, date and return date from the first upcoming priced departure', () => {
    const facts = buildHeroFacts(makeTour(BOTH_DEPARTURES), TODAY);
    expect(facts.fromPrice).toBe('NZD $2,899');
    expect(facts.firstDeparture).toBe('5 February 2099');
    expect(facts.firstReturn).toBe('14 February 2099');
  });

  it('skips a departure that has no published price of its own', () => {
    const facts = buildHeroFacts(
      makeTour({
        departureDates: ['5 February 2099', '3 August 2099'],
        departurePricing: { '3 August 2099': 'NZD $2,699' },
      }),
      TODAY,
    );
    expect(facts.firstDeparture).toBe('3 August 2099');
    expect(facts.fromPrice).toBe('NZD $2,699');
  });

  it('skips departures that have already left', () => {
    const facts = buildHeroFacts(makeTour(BOTH_DEPARTURES), '2099-03-01');
    expect(facts.firstDeparture).toBe('3 August 2099');
  });

  it('returns nulls when nothing is bookable', () => {
    const facts = buildHeroFacts(makeTour(), TODAY);
    expect(facts.fromPrice).toBeNull();
    expect(facts.firstDeparture).toBeNull();
    expect(facts.firstReturn).toBeNull();
  });

  it('returns nulls for a sold-out tour', () => {
    const facts = buildHeroFacts(makeTour({ ...BOTH_DEPARTURES, soldOut: true }), TODAY);
    expect(facts.fromPrice).toBeNull();
    expect(facts.firstDeparture).toBeNull();
    expect(facts.firstReturn).toBeNull();
  });

  it('quotes the airfare inclusion word for word', () => {
    const withAirfares = buildHeroFacts(
      makeTour({
        inclusions: [
          'Hotel accommodation as specified in the itinerary',
          'International and domestic airfares',
          'English-speaking tour guide',
        ],
      }),
      TODAY,
    );
    expect(withAirfares.airfareLine).toBe('International and domestic airfares');

    const withFlights = buildHeroFacts(
      makeTour({ inclusions: ['Return international flights from Auckland'] }),
      TODAY,
    );
    expect(withFlights.airfareLine).toBe('Return international flights from Auckland');

    const withoutEither = buildHeroFacts(
      makeTour({ inclusions: ['Hotel accommodation', 'English-speaking tour guide'] }),
      TODAY,
    );
    expect(withoutEither.airfareLine).toBeNull();
  });
});

describe('selectFaqs', () => {
  const faqs = [
    { question: 'What is included in the price?', answer: 'Accommodation and meals.' },
    { question: 'Which hotels do we stay in?', answer: 'Four-star hotels.' },
    { question: 'How do I book?', answer: 'Reserve online.' },
  ];

  it('picks in pattern order, one FAQ per pattern, case-insensitively', () => {
    const picked = selectFaqs(faqs, ['HOW DO I BOOK', 'which hotels']);
    expect(picked.map((faq) => faq.question)).toEqual([
      'How do I book?',
      'Which hotels do we stay in?',
    ]);
  });

  it('never returns the same FAQ twice', () => {
    const picked = selectFaqs(faqs, ['book', 'how do i']);
    expect(picked).toHaveLength(1);
  });

  it('skips a pattern that matches nothing and returns [] without faqs', () => {
    expect(selectFaqs(faqs, ['visa'])).toEqual([]);
    expect(selectFaqs(undefined, ['visa'])).toEqual([]);
  });
});

describe('tourCorpus', () => {
  it('contains the highlights, itinerary words, inclusions, exclusions and FAQ text', () => {
    const tour = makeTour({
      highlights: ['Walk the Great Wall'],
      itinerary: [
        { day: 1, title: 'Arrive', description: 'Welcome dinner', meals: [] },
      ],
      inclusions: ['All breakfasts'],
      exclusions: ['Travel insurance'],
      faqs: [{ question: 'Do I need a visa?', answer: 'Yes, arrange it before you fly.' }],
    });
    const corpus = tourCorpus(tour);
    expect(corpus).toContain('Walk the Great Wall');
    expect(corpus).toContain('Arrive');
    expect(corpus).toContain('Welcome dinner');
    expect(corpus).toContain('All breakfasts');
    expect(corpus).toContain('Travel insurance');
    expect(corpus).toContain('Do I need a visa?');
    expect(corpus).toContain('Yes, arrange it before you fly.');
  });
});

describe('findForbiddenCopy', () => {
  it.each([
    'Small group departures',
    'a small-group tour',
    'max 16 guests',
    'Max. 18 on every departure',
    'maximum of 18',
    'only 12 travellers',
    'up to 18 people',
    'limited to 16 guests',
    'Wuzhen water town',
    'Message us on WhatsApp',
    'Pack light, luggage is limited',
    'Cross China by high-speed rail',
    'a bullet train between cities',
    'Guaranteed departure',
    'selling fast',
    'limited spots left',
  ])('flags "%s"', (phrase) => {
    expect(findForbiddenCopy(phrase).length).toBeGreaterThan(0);
  });

  it('allows the one approved transport phrase', () => {
    expect(
      findForbiddenCopy('Between cities: High-speed train and coach (see the map key).'),
    ).toEqual([]);
    expect(findForbiddenCopy('high-speed train and coach')).toEqual([]);
  });

  it.each([
    'Suzhou gardens',
    'Take afternoon tea in Xinshi Town.',
    'The single supplement is NZD $400',
    'Maximise your time in Hangzhou',
    'Deposits are due within 3 working days',
    'Up to 60 days before departure',
  ])('does not mistake "%s" for a claim', (phrase) => {
    expect(findForbiddenCopy(phrase)).toEqual([]);
  });

  it('reports the reason text', () => {
    expect(findForbiddenCopy('Small group tour')).toContain(AD_COPY_FORBIDDEN[0].reason);
  });

  it('has exactly eight rules and none is global', () => {
    expect(AD_COPY_FORBIDDEN).toHaveLength(8);
    for (const rule of AD_COPY_FORBIDDEN) {
      expect(rule.pattern.global).toBe(false);
    }
  });
});

describe('DEPOSIT_TEXT', () => {
  it('matches the booking terms block word for word', () => {
    const source = readFileSync(
      join(process.cwd(), 'src/components/tours/TourGoldenBlocks.tsx'),
      'utf8',
    ).replace(/\s+/g, ' ');
    expect(source).toContain(DEPOSIT_TEXT);
  });
});
