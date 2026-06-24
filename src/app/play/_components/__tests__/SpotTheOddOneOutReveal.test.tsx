/**
 * SpotTheOddOneOutReveal tests
 *
 * Pins the contract the /play funnel relies on:
 *  - Pre-reveal collage renders all 6 panel labels (matches the FB creative).
 *  - Answer banner displays the correct headline + detail (no gate — instant payoff).
 *  - Per-panel story grid renders 6 cards, marking the odd-one panel via
 *    `data-odd-one="true"` so QA / future analytics can pin it without text.
 *  - Each non-odd panel surfaces its CTS tour link as an anchor with the
 *    advertised href; the odd-one panel surfaces a cross-sell note instead.
 *  - Closing CTA points at /china-tours.
 */
import { render, screen } from '@testing-library/react';
import SpotTheOddOneOutReveal from '../SpotTheOddOneOutReveal';
import type { PlayQuiz } from '@/lib/data/play-quizzes';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  default: (props: any) => <img {...props} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

const QUIZ: PlayQuiz = {
  slug: 'test-quiz',
  format: 'spot-the-odd-one-out',
  hero: {
    question: 'Spot the odd one out?',
    subtitle: 'Five of six are from China — one sneaked in.',
    ogImage: '/og.jpg',
  },
  panels: [
    { label: 'A', image: '/a.jpg', altText: 'A', location: 'Suzhou, China', isCorrectAnswer: false, story: 'A story.', tourLink: { label: 'Shanghai tour', href: '/tours/china/discovery/shanghai-surroundings' } },
    { label: 'B', image: '/b.jpg', altText: 'B', location: 'Seoul, South Korea', isCorrectAnswer: true,  story: 'Korea story.', crossSellNote: 'Not in our lineup — talk to us.' },
    { label: 'C', image: '/c.jpg', altText: 'C', location: 'Beijing, China', isCorrectAnswer: false, story: 'C story.', tourLink: { label: 'Best of China', href: '/campaigns/best-of-china' } },
    { label: 'D', image: '/d.jpg', altText: 'D', location: 'Guilin, China', isCorrectAnswer: false, story: 'D story.', tourLink: { label: 'Discovery', href: '/tours/china/discovery' } },
    { label: 'E', image: '/e.jpg', altText: 'E', location: 'Lijiang, China', isCorrectAnswer: false, story: 'E story.', tourLink: { label: 'Yunnan', href: '/tours/china/discovery/yunnan-explorer' } },
    { label: 'F', image: '/f.jpg', altText: 'F', location: 'Zhangjiajie, China', isCorrectAnswer: false, story: 'F story.', tourLink: { label: 'Zhangjiajie', href: '/tours/china/stopover/zhangjiajie' } },
  ],
  answer: {
    correctLabel: 'B',
    headline: 'B is the odd one out — that is Seoul.',
    detail: 'Korean hanok roofs + cherry blossom + Namsan Tower silhouette gives it away.',
  },
  meta: { title: 't', description: 'd' },
};

describe('SpotTheOddOneOutReveal', () => {
  it('renders the hero question + subtitle', () => {
    render(<SpotTheOddOneOutReveal quiz={QUIZ} />);
    expect(screen.getByRole('heading', { level: 1, name: /Spot the odd one out/i })).toBeInTheDocument();
    expect(screen.getByText(/Five of six are from China/i)).toBeInTheDocument();
  });

  it('renders the pre-reveal collage with all 6 panel labels A-F', () => {
    render(<SpotTheOddOneOutReveal quiz={QUIZ} />);
    // Each label appears in both the collage AND its story card — 2 each = 12 total.
    for (const label of ['A', 'B', 'C', 'D', 'E', 'F']) {
      const occurrences = screen.getAllByText(label);
      expect(occurrences.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('reveals the answer banner with headline + detail (no gating)', () => {
    render(<SpotTheOddOneOutReveal quiz={QUIZ} />);
    expect(screen.getByText(/B is the odd one out/i)).toBeInTheDocument();
    expect(screen.getByText(/Korean hanok roofs/i)).toBeInTheDocument();
  });

  it('renders exactly 6 panel story cards', () => {
    render(<SpotTheOddOneOutReveal quiz={QUIZ} />);
    const cards = document.querySelectorAll('[data-panel]');
    expect(cards).toHaveLength(6);
  });

  it('marks the odd-one panel via data-odd-one="true" and only that panel', () => {
    render(<SpotTheOddOneOutReveal quiz={QUIZ} />);
    const oddOnes = document.querySelectorAll('[data-odd-one="true"]');
    expect(oddOnes).toHaveLength(1);
    expect(oddOnes[0]).toHaveAttribute('data-panel', 'B');
  });

  it('renders the tour link with the configured href on non-odd panels', () => {
    render(<SpotTheOddOneOutReveal quiz={QUIZ} />);
    expect(screen.getByRole('link', { name: /Best of China/i })).toHaveAttribute(
      'href',
      '/campaigns/best-of-china',
    );
    expect(screen.getByRole('link', { name: /Shanghai tour/i })).toHaveAttribute(
      'href',
      '/tours/china/discovery/shanghai-surroundings',
    );
  });

  it('surfaces the crossSellNote on the odd-one panel instead of a tour link', () => {
    render(<SpotTheOddOneOutReveal quiz={QUIZ} />);
    expect(screen.getByText(/Not in our lineup — talk to us/i)).toBeInTheDocument();
  });

  it('closing CTA points at /china-tours', () => {
    render(<SpotTheOddOneOutReveal quiz={QUIZ} />);
    const cta = screen.getByRole('link', { name: /Browse all China tours/i });
    expect(cta).toHaveAttribute('href', '/china-tours');
  });
});
