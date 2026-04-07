import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { DestinationGuide } from '@/lib/data/guides';
import DestinationMatcher from '../DestinationMatcher';
import {
  buildGuideBlob,
  getMatchedDestinations,
  isDestinationMatcherComplete,
  MATCHER_FITNESS_OPTIONS,
  MATCHER_GROUP_OPTIONS,
  MATCHER_INTEREST_OPTIONS,
  MATCHER_STYLE_OPTIONS,
  scoreFitnessFit,
  scoreGroupBoost,
  scoreGuideForMatcher,
  scoreStyleFit,
  scoreToStars,
} from '@/lib/tools/destination-matcher-logic';

function mockGuide(overrides: Partial<DestinationGuide> = {}): DestinationGuide {
  return {
    id: 'g-mock',
    slug: 'beijing-travel-guide',
    destinationName: 'Beijing',
    metaTitle: 'Beijing',
    metaDescription: 'd',
    keywords: ['imperial', 'unesco'],
    h1: 'Beijing Guide',
    heroSubtitle: 'Capital',
    heroImage: '/images/guides/shanghai/hero.jpg',
    introText: ['Walk the Great Wall and explore the Forbidden City.'],
    sections: [
      {
        title: 'Imperial',
        id: 'imp',
        content: ['Classic landmark sights and museums.'],
      },
    ],
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

describe('destination matcher logic', () => {
  const fullAnswers = {
    interest: 'history' as const,
    fitness: 'moderate' as const,
    group: 'family' as const,
    style: 'classic' as const,
  };

  describe('buildGuideBlob', () => {
    it('includes destination and section text', () => {
      const g = mockGuide();
      expect(buildGuideBlob(g)).toContain('beijing');
      expect(buildGuideBlob(g)).toContain('imperial');
    });
  });

  describe('scoreFitnessFit', () => {
    it('scores easy keywords', () => {
      expect(scoreFitnessFit('easy', 'relax by the river on a gentle cruise')).toBeGreaterThan(0);
    });
    it('scores challenge keywords', () => {
      expect(scoreFitnessFit('challenge', 'steep hike to the summit trail')).toBeGreaterThan(0);
    });
    it('returns 0 when no fitness words', () => {
      expect(scoreFitnessFit('moderate', 'zzz')).toBe(0);
    });
  });

  describe('scoreStyleFit', () => {
    it('matches immersive style', () => {
      expect(scoreStyleFit('immersive', 'immerse in local culture and heritage')).toBeGreaterThan(0);
    });
    it('matches hidden gems style', () => {
      expect(scoreStyleFit('hidden', 'quiet village off the beaten path')).toBeGreaterThan(0);
    });
    it('matches classic style', () => {
      expect(scoreStyleFit('classic', 'unesco iconic must-see forbidden city')).toBeGreaterThan(0);
    });
  });

  describe('scoreGroupBoost', () => {
    it('boosts family Chengdu', () => {
      expect(scoreGroupBoost('family', 'chengdu-travel-guide')).toBe(14);
    });
    it('returns 0 for unknown slug', () => {
      expect(scoreGroupBoost('solo', 'unknown-slug')).toBe(0);
    });
  });

  describe('scoreGuideForMatcher', () => {
    it('returns 0 when incomplete', () => {
      expect(
        scoreGuideForMatcher(mockGuide(), { ...fullAnswers, interest: null })
      ).toBe(0);
    });
    it('returns positive when complete', () => {
      expect(scoreGuideForMatcher(mockGuide(), fullAnswers)).toBeGreaterThan(0);
    });
  });

  describe('scoreToStars', () => {
    it('maps low scores to 1', () => {
      expect(scoreToStars(0)).toBe(1);
    });
    it('caps at 5', () => {
      expect(scoreToStars(500)).toBe(5);
    });
    it('maps mid scores', () => {
      expect(scoreToStars(36)).toBe(2);
    });
  });

  describe('getMatchedDestinations', () => {
    it('returns up to limit guides', () => {
      const g1 = mockGuide({ id: '1', slug: 'beijing-travel-guide' });
      const g2 = mockGuide({ id: '2', slug: 'xian-travel-guide', destinationName: "Xi'an" });
      const out = getMatchedDestinations(fullAnswers, [g1, g2], 4);
      expect(out.length).toBeLessThanOrEqual(4);
    });
    it('fallback when no positive scores', () => {
      const g = mockGuide({ introText: ['zzz'], keywords: [], sections: [] });
      const out = getMatchedDestinations(fullAnswers, [g], 2);
      expect(out.length).toBeGreaterThan(0);
    });
  });

  describe('isDestinationMatcherComplete', () => {
    it('false without interest', () => {
      expect(isDestinationMatcherComplete({ ...fullAnswers, interest: null })).toBe(false);
    });
    it('true when all fields set', () => {
      expect(isDestinationMatcherComplete(fullAnswers)).toBe(true);
    });
  });
});

describe('destination matcher logic — extra cases', () => {
  it('scoreFitnessFit moderate picks walk', () => {
    expect(scoreFitnessFit('moderate', 'moderate walk and steps each day')).toBeGreaterThan(0);
  });

  it('scoreGroupBoost honeymoon Lijiang', () => {
    expect(scoreGroupBoost('honeymoon', 'lijiang-travel-guide')).toBe(14);
  });

  it('scoreGroupBoost friends Zhangjiajie', () => {
    expect(scoreGroupBoost('friends', 'zhangjiajie-travel-guide')).toBe(12);
  });

  it('getMatchedDestinations sorts by score', () => {
    const low = mockGuide({
      id: 'low',
      slug: 'low-guide',
      destinationName: 'Low',
      introText: ['zzz plain'],
      keywords: [],
      sections: [],
    });
    const high = mockGuide({
      id: 'high',
      slug: 'beijing-travel-guide',
      destinationName: 'High',
      introText: ['forbidden city imperial unesco classic'],
      keywords: ['unesco', 'imperial'],
    });
    const answers = {
      interest: 'history' as const,
      fitness: 'easy' as const,
      group: 'family' as const,
      style: 'classic' as const,
    };
    const out = getMatchedDestinations(answers, [low, high], 2);
    expect(out[0].guide.destinationName).toBe('High');
  });

  it('scoreGuideForMatcher uses group boost', () => {
    const chengdu = mockGuide({
      id: 'cd',
      slug: 'chengdu-travel-guide',
      destinationName: 'Chengdu',
      introText: ['pandas and family friendly'],
      keywords: ['culture'],
    });
    const a = {
      interest: 'nature' as const,
      fitness: 'easy' as const,
      group: 'family' as const,
      style: 'immersive' as const,
    };
    expect(scoreGuideForMatcher(chengdu, a)).toBeGreaterThan(0);
  });

  it('exports matcher option counts', () => {
    expect(MATCHER_INTEREST_OPTIONS).toHaveLength(5);
    expect(MATCHER_FITNESS_OPTIONS).toHaveLength(3);
    expect(MATCHER_GROUP_OPTIONS).toHaveLength(4);
    expect(MATCHER_STYLE_OPTIONS).toHaveLength(3);
  });

  it('scoreToStars returns 3 for moderate score', () => {
    expect(scoreToStars(54)).toBe(3);
  });

  it('scoreGroupBoost solo Shanghai', () => {
    expect(scoreGroupBoost('solo', 'shanghai-travel-guide')).toBe(12);
  });

  it('buildGuideBlob lowercases content', () => {
    expect(buildGuideBlob(mockGuide({ destinationName: 'BEIJING' }))).toContain('beijing');
  });

  it('getMatchedDestinations respects limit of 3', () => {
    const many = Array.from({ length: 10 }, (_, i) =>
      mockGuide({ id: `g${i}`, slug: `slug-${i}`, destinationName: `Place ${i}` })
    );
    const answers = {
      interest: 'history' as const,
      fitness: 'moderate' as const,
      group: 'friends' as const,
      style: 'classic' as const,
    };
    expect(getMatchedDestinations(answers, many, 3)).toHaveLength(3);
  });
});

describe('DestinationMatcher component', () => {
  const guides = [
    mockGuide({ id: 'g1', slug: 'beijing-travel-guide', destinationName: 'Beijing' }),
    mockGuide({
      id: 'g2',
      slug: 'guilin-travel-guide',
      destinationName: 'Guilin',
      introText: ['River scenery.'],
      keywords: ['river', 'scenic'],
    }),
  ];

  it('renders main heading', () => {
    render(<DestinationMatcher guides={guides} />);
    expect(
      screen.getByRole('heading', { name: /Find your perfect China destination/i })
    ).toBeInTheDocument();
  });

  it('shows step buttons', () => {
    render(<DestinationMatcher guides={guides} />);
    expect(screen.getByRole('button', { name: 'Step 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Step 4' })).toBeInTheDocument();
  });

  it('advances through questions', async () => {
    const user = userEvent.setup();
    render(<DestinationMatcher guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /History & heritage/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText(/How do you like to move each day/i)).toBeInTheDocument();
  });

  it('shows results after final step', async () => {
    const user = userEvent.setup();
    render(<DestinationMatcher guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /Nature & scenery/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Relaxed pace/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Family/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Iconic must-see/i }));
    await user.click(screen.getByRole('button', { name: 'See matches' }));
    expect(screen.getByRole('heading', { name: /Your top destinations/i })).toBeInTheDocument();
  });

  it('links to guide pages', async () => {
    const user = userEvent.setup();
    render(<DestinationMatcher guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /Food & culture/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Moderate walking/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Friends/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Hidden gems/i }));
    await user.click(screen.getByRole('button', { name: 'See matches' }));
    const link = screen.getAllByRole('link', { name: /Open travel guide/i })[0];
    expect(link.getAttribute('href')).toMatch(/^\/guide\//);
  });

  it('start over returns to questionnaire', async () => {
    const user = userEvent.setup();
    render(<DestinationMatcher guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /History & heritage/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Active & challenging/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Solo traveller/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Deep cultural immersion/i }));
    await user.click(screen.getByRole('button', { name: 'See matches' }));
    await user.click(screen.getByRole('button', { name: 'Start over' }));
    expect(screen.getByText(/What excites you most/i)).toBeInTheDocument();
  });

  it('disables next on step 1 without interest', () => {
    render(<DestinationMatcher guides={guides} />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('back button disabled on step 1', () => {
    render(<DestinationMatcher guides={guides} />);
    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
  });
});

describe('DestinationMatcher component — flows', () => {
  const guides = [
    mockGuide({ id: 'a', slug: 'beijing-travel-guide', destinationName: 'Beijing' }),
    mockGuide({ id: 'b', slug: 'shanghai-travel-guide', destinationName: 'Shanghai' }),
  ];

  it('enables next after selecting interest', async () => {
    const user = userEvent.setup();
    render(<DestinationMatcher guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /Relaxation & leisure/i }));
    expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
  });

  it('step 2 requires fitness', async () => {
    const user = userEvent.setup();
    render(<DestinationMatcher guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /Adventure/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    await user.click(screen.getByRole('radio', { name: /Moderate walking/i }));
    expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
  });

  it('navigates back between steps', async () => {
    const user = userEvent.setup();
    render(<DestinationMatcher guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /History & heritage/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByText(/What excites you most/i)).toBeInTheDocument();
  });

  it('displays star rating label in results', async () => {
    const user = userEvent.setup();
    render(<DestinationMatcher guides={guides} />);
    await user.click(screen.getByRole('radio', { name: /History & heritage/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Relaxed pace/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Honeymoon/i }));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('radio', { name: /Iconic must-see/i }));
    await user.click(screen.getByRole('button', { name: 'See matches' }));
    expect(screen.getAllByLabelText(/out of 5 stars/i).length).toBeGreaterThan(0);
  });
});
