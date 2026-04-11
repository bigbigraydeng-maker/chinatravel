import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Tour } from '@/lib/data/tours';
import type { BlogPost } from '@/lib/data/blogs';
import type { DestinationGuide } from '@/lib/data/guides';
import TripPlanner from '../TripPlanner';
import {
  buildTourSearchBlob,
  durationBucketMatches,
  getRecommendedTours,
  getRelatedBlogPosts,
  getRelatedGuides,
  isTripPlannerComplete,
  parseTourDurationDays,
  scoreBudgetTier,
  scoreDurationFit,
  scoreInterestsInText,
  scoreSeasonHint,
  scoreTourForPlanner,
  tourDetailPath,
  TRIP_DURATION_OPTIONS,
  TRIP_INTEREST_OPTIONS,
  TRIP_BUDGET_OPTIONS,
  TRIP_SEASON_OPTIONS,
} from '@/lib/tools/trip-planner-logic';
import { migratedUnsplash } from '@/lib/site-media';

function mockTour(overrides: Partial<Tour> = {}): Tour {
  return {
    id: 't-mock',
    slug: 'mock-china',
    destination: 'china',
    tier: 'discovery',
    name: 'Mock China',
    title: 'Mock China Tour',
    shortDescription: 'Explore the Great Wall and ancient temples across Beijing.',
    duration: '10 Days',
    price: 'From NZD 5,000',
    heroImage: migratedUnsplash('photo-1508804185872-d7badad00f7d'),
    gallery: [],
    highlights: ['Great Wall', 'Temple of Heaven'],
    itinerary: [
      { day: 1, title: 'Beijing', description: 'Imperial history and temples.', meals: ['B', 'L', 'D'] },
    ],
    inclusions: [],
    exclusions: [],
    metaTitle: 'Mock',
    metaDescription: 'Mock',
    isActive: true,
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
    tags: ['Culture', 'History'],
    ...overrides,
  };
}

function mockBlog(overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    id: 'b1',
    slug: 'blog-one',
    title: 'History along the Silk Road',
    excerpt: 'Ancient temples and museums.',
    content: 'x',
    author: 'A',
    authorRole: 'R',
    category: 'destination',
    tags: ['History', 'Culture'],
    heroImage: migratedUnsplash('photo-1569949381669-ecf31ae8e613'),
    publishedAt: '2026-01-01',
    readTime: '5 min',
    ...overrides,
  };
}

function mockGuide(overrides: Partial<DestinationGuide> = {}): DestinationGuide {
  return {
    id: 'g1',
    slug: 'beijing-travel-guide',
    destinationName: 'Beijing',
    metaTitle: 'Beijing',
    metaDescription: 'Beijing guide',
    keywords: ['temple', 'great wall'],
    h1: 'Beijing Guide',
    heroSubtitle: 'Imperial capital',
    heroImage: migratedUnsplash('photo-1528127269322-539801943592'),
    introText: ['Temples and the Great Wall await.'],
    sections: [],
    attractions: [],
    practicalInfo: {
      transportation: '',
      climate: '',
      bestTime: '',
      budget: '',
      language: '',
      safety: '',
    },
    faqs: [],
    relatedTourSlugs: [],
    relatedGuideSlugs: [],
    galleryImages: [],
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
    ...overrides,
  };
}

describe('trip planner logic', () => {
  describe('parseTourDurationDays', () => {
    it('parses standard day string', () => {
      expect(parseTourDurationDays('17 Days')).toBe(17);
    });
    it('parses single digit', () => {
      expect(parseTourDurationDays('3 Days')).toBe(3);
    });
    it('returns 0 when no number', () => {
      expect(parseTourDurationDays('TBC')).toBe(0);
    });
    it('uses first number when multiple present', () => {
      expect(parseTourDurationDays('10–12 Days')).toBe(10);
    });
  });

  describe('durationBucketMatches', () => {
    it('matches 5-7 bucket', () => {
      expect(durationBucketMatches(6, '5-7')).toBe(true);
      expect(durationBucketMatches(4, '5-7')).toBe(false);
    });
    it('matches 8-10 bucket', () => {
      expect(durationBucketMatches(9, '8-10')).toBe(true);
    });
    it('matches 11-14 bucket', () => {
      expect(durationBucketMatches(12, '11-14')).toBe(true);
    });
    it('matches 15+ bucket', () => {
      expect(durationBucketMatches(18, '15+')).toBe(true);
      expect(durationBucketMatches(14, '15+')).toBe(false);
    });
    it('returns false for non-positive days', () => {
      expect(durationBucketMatches(0, '5-7')).toBe(false);
    });
  });

  describe('scoreDurationFit', () => {
    it('gives max when bucket matches', () => {
      expect(scoreDurationFit(10, '8-10')).toBe(40);
    });
    it('reduces score when far from bucket', () => {
      expect(scoreDurationFit(3, '15+')).toBeLessThan(25);
    });
    it('partial credit near center of 5-7', () => {
      expect(scoreDurationFit(7, '5-7')).toBe(40);
    });
    it('handles 11-14 center', () => {
      expect(scoreDurationFit(13, '11-14')).toBe(40);
    });
  });

  describe('scoreInterestsInText', () => {
    it('scores history keywords', () => {
      const s = scoreInterestsInText(['history'], 'forbidden city and terracotta warriors museum');
      expect(s).toBeGreaterThan(0);
    });
    it('returns 0 when no overlap', () => {
      expect(scoreInterestsInText(['adventure'], 'only generic text')).toBe(0);
    });
    it('combines multiple interests', () => {
      const s = scoreInterestsInText(
        ['nature', 'food'],
        'zhangjiajie scenic landscape and sichuan hot pot cuisine'
      );
      expect(s).toBeGreaterThan(5);
    });
  });

  describe('scoreBudgetTier', () => {
    it('prefers stopover for economy', () => {
      expect(scoreBudgetTier('economy', 'stopover')).toBeGreaterThan(scoreBudgetTier('economy', 'signature'));
    });
    it('prefers signature for luxury', () => {
      expect(scoreBudgetTier('luxury', 'signature')).toBeGreaterThan(scoreBudgetTier('luxury', 'stopover'));
    });
    it('mid favours discovery', () => {
      expect(scoreBudgetTier('mid', 'discovery')).toBeGreaterThanOrEqual(15);
    });
  });

  describe('scoreSeasonHint', () => {
    it('detects spring hints', () => {
      expect(scoreSeasonHint('spring', 'best in march and april blossom')).toBeGreaterThan(0);
    });
    it('returns 0 without hints', () => {
      expect(scoreSeasonHint('winter', 'no seasonal words here')).toBe(0);
    });
  });

  describe('buildTourSearchBlob', () => {
    it('concatenates searchable fields', () => {
      const t = mockTour({ title: 'UniqueXYZTitle' });
      expect(buildTourSearchBlob(t)).toContain('uniquexyztitle');
    });
  });

  describe('scoreTourForPlanner', () => {
    const baseAnswers = {
      duration: '8-10' as const,
      interests: ['history' as const],
      budget: 'mid' as const,
      season: 'spring' as const,
    };
    it('returns 0 when incomplete answers', () => {
      expect(scoreTourForPlanner({ ...baseAnswers, duration: null }, mockTour())).toBe(0);
    });
    it('returns positive score for complete answers', () => {
      expect(scoreTourForPlanner(baseAnswers, mockTour())).toBeGreaterThan(0);
    });
  });

  describe('getRecommendedTours', () => {
    const answers = {
      duration: '8-10' as const,
      interests: ['history' as const, 'nature' as const],
      budget: 'mid' as const,
      season: 'autumn' as const,
    };
    it('returns at most 3 tours', () => {
      const list = Array.from({ length: 10 }, (_, i) =>
        mockTour({ id: `x${i}`, slug: `slug-${i}`, tier: 'discovery' })
      );
      expect(getRecommendedTours(answers, list, 3)).toHaveLength(3);
    });
    it('fills from fallback when scores tie low', () => {
      const t1 = mockTour({ id: 'a', slug: 'a', duration: '2 Days' });
      const t2 = mockTour({ id: 'b', slug: 'b', duration: '3 Days' });
      const out = getRecommendedTours(answers, [t1, t2], 3);
      expect(out.length).toBeGreaterThan(0);
    });
  });

  describe('getRelatedBlogPosts', () => {
    it('returns limited posts', () => {
      const posts = [mockBlog({ id: '1' }), mockBlog({ id: '2' }), mockBlog({ id: '3' })];
      expect(getRelatedBlogPosts(['history'], posts, 2)).toHaveLength(2);
    });
    it('falls back to first posts when no tag overlap', () => {
      const posts = [mockBlog({ tags: [], title: 'No match' })];
      expect(getRelatedBlogPosts(['adventure'], posts, 2)[0].id).toBe('b1');
    });
  });

  describe('getRelatedGuides', () => {
    it('returns guides matching interests', () => {
      const g = mockGuide({ keywords: ['temple', 'great wall'] });
      const out = getRelatedGuides(['history'], [g], 2);
      expect(out[0].slug).toBe('beijing-travel-guide');
    });
    it('falls back when no score', () => {
      const g = mockGuide({ keywords: [], introText: ['zzz'] });
      const out = getRelatedGuides(['adventure'], [g], 1);
      expect(out).toHaveLength(1);
    });
  });

  describe('isTripPlannerComplete', () => {
    it('false when missing duration', () => {
      expect(
        isTripPlannerComplete({
          duration: null,
          interests: ['history'],
          budget: 'mid',
          season: 'spring',
        })
      ).toBe(false);
    });
    it('false when no interests', () => {
      expect(
        isTripPlannerComplete({
          duration: '8-10',
          interests: [],
          budget: 'mid',
          season: 'spring',
        })
      ).toBe(false);
    });
    it('true when all set', () => {
      expect(
        isTripPlannerComplete({
          duration: '8-10',
          interests: ['history'],
          budget: 'mid',
          season: 'spring',
        })
      ).toBe(true);
    });
  });

  describe('tourDetailPath', () => {
    it('builds tour url', () => {
      expect(tourDetailPath(mockTour({ destination: 'china', tier: 'signature', slug: 'imperial' }))).toBe(
        '/tours/china/signature/imperial'
      );
    });
  });

  describe('getRecommendedTours deduplication', () => {
    it('does not duplicate same tier and slug', () => {
      const t = mockTour({ slug: 'same', tier: 'discovery' });
      const answers = {
        duration: '8-10' as const,
        interests: ['history' as const],
        budget: 'mid' as const,
        season: 'spring' as const,
      };
      const out = getRecommendedTours(answers, [t, { ...t, id: 'other' }], 3);
      expect(out.filter((x) => x.slug === 'same')).toHaveLength(1);
    });
  });

  describe('parseTourDurationDays edge', () => {
    it('handles empty string', () => {
      expect(parseTourDurationDays('')).toBe(0);
    });
  });

  describe('scoreBudgetTier numeric', () => {
    it('economy stopover beats signature', () => {
      expect(scoreBudgetTier('economy', 'stopover')).toBe(18);
      expect(scoreBudgetTier('economy', 'signature')).toBe(5);
    });
  });

  describe('option lists', () => {
    it('exports four duration buckets', () => {
      expect(TRIP_DURATION_OPTIONS).toHaveLength(4);
    });
    it('exports five interest themes', () => {
      expect(TRIP_INTEREST_OPTIONS).toHaveLength(5);
    });
    it('exports three budget bands', () => {
      expect(TRIP_BUDGET_OPTIONS).toHaveLength(3);
    });
    it('exports four seasons', () => {
      expect(TRIP_SEASON_OPTIONS).toHaveLength(4);
    });
    it('detects summer seasonal hints', () => {
      expect(scoreSeasonHint('summer', 'june and july summer heat')).toBeGreaterThan(0);
    });
  });
});

describe('TripPlanner component', () => {
  const tours = [
    mockTour({
      id: 't1',
      slug: 't-one',
      title: 'Alpha Great Wall Tour',
      duration: '10 Days',
      tier: 'discovery',
    }),
    mockTour({
      id: 't2',
      slug: 't-two',
      title: 'Beta Nature Route',
      duration: '12 Days',
      shortDescription: 'zhangjiajie scenic nature',
      tier: 'signature',
    }),
    mockTour({
      id: 't3',
      slug: 't-three',
      title: 'Gamma Stopover',
      duration: '3 Days',
      tier: 'stopover',
    }),
  ];
  const blogs = [
    mockBlog({ id: 'b1', slug: 'post-a', title: 'History Post', tags: ['History'] }),
    mockBlog({ id: 'b2', slug: 'post-b', title: 'Nature Post', tags: ['Nature'] }),
  ];
  const guides = [
    mockGuide({ id: 'g1', slug: 'guide-a', destinationName: 'Beijing' }),
    mockGuide({ id: 'g2', slug: 'guide-b', destinationName: 'Guilin', keywords: ['river', 'scenic'] }),
  ];

  it('renders hero heading', () => {
    render(<TripPlanner tours={tours} blogPosts={blogs} guides={guides} />);
    expect(screen.getByRole('heading', { name: /Build your China itinerary style/i })).toBeInTheDocument();
  });

  it('renders progress steps', () => {
    render(<TripPlanner tours={tours} blogPosts={blogs} guides={guides} />);
    expect(screen.getByRole('button', { name: 'Duration' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Interests' })).toBeInTheDocument();
  });

  it('advances from duration to interests', async () => {
    const user = userEvent.setup();
    render(<TripPlanner tours={tours} blogPosts={blogs} guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /8–10 days/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText(/What are you most interested in/i)).toBeInTheDocument();
  });

  it('requires interest selection before next', async () => {
    const user = userEvent.setup();
    render(<TripPlanner tours={tours} blogPosts={blogs} guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /8–10 days/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    await user.click(screen.getByRole('checkbox', { name: /History & heritage/i }));
    expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
  });

  it('completes flow and shows recommendations', async () => {
    const user = userEvent.setup();
    render(<TripPlanner tours={tours} blogPosts={blogs} guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /8–10 days/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('checkbox', { name: /History & heritage/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: 'Mid-range' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Spring/i }));
    await user.click(screen.getByRole('button', { name: 'See recommendations' }));
    expect(screen.getByRole('heading', { name: /Your personalised picks/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Plan your custom trip/i })).toHaveAttribute('href', '/contact');
  });

  it('start over resets to step 1', async () => {
    const user = userEvent.setup();
    render(<TripPlanner tours={tours} blogPosts={blogs} guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /8–10 days/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('checkbox', { name: /History & heritage/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: 'Mid-range' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Autumn/i }));
    await user.click(screen.getByRole('button', { name: 'See recommendations' }));
    await user.click(screen.getByRole('button', { name: 'Start over' }));
    expect(screen.getByText(/How long do you want to travel/i)).toBeInTheDocument();
  });

  it('shows tour cards with links', async () => {
    const user = userEvent.setup();
    render(<TripPlanner tours={tours} blogPosts={blogs} guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /11–14 days/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('checkbox', { name: /Nature & scenery/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: 'Luxury' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Summer/i }));
    await user.click(screen.getByRole('button', { name: 'See recommendations' }));
    const links = screen.getAllByRole('link', { name: /View tour/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0].getAttribute('href')).toMatch(/\/tours\/china\//);
  });

  it('lists blog and guide sections', async () => {
    const user = userEvent.setup();
    render(<TripPlanner tours={tours} blogPosts={blogs} guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /8–10 days/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('checkbox', { name: /Food & culture/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: 'Economy' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Winter/i }));
    await user.click(screen.getByRole('button', { name: 'See recommendations' }));
    expect(screen.getByRole('heading', { name: /From our blog/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Destination guides/i })).toBeInTheDocument();
  });

  it('back button moves to previous step', async () => {
    const user = userEvent.setup();
    render(<TripPlanner tours={tours} blogPosts={blogs} guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /8–10 days/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Back' }));
    const fieldset = screen.getByRole('group', { name: /How long do you want to travel/i });
    expect(within(fieldset).getByRole('radio', { name: /8–10 days/i })).toBeChecked();
  });

  it('disables next on step 1 without duration', () => {
    render(<TripPlanner tours={tours} blogPosts={blogs} guides={guides} />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('disables see recommendations until season selected', async () => {
    const user = userEvent.setup();
    render(<TripPlanner tours={tours} blogPosts={blogs} guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /8–10 days/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('checkbox', { name: /History & heritage/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: 'Mid-range' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('button', { name: 'See recommendations' })).toBeDisabled();
  });
});
