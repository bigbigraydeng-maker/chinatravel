import { render, screen } from '@testing-library/react';
import CityLoop from '@/components/ad-landing/CityLoop';
import FeatureCards from '@/components/ad-landing/FeatureCards';
import type { CityStop, FeatureCard } from '@/lib/ad-landing/types';

/**
 * These blocks print exactly the sentences a page config gives them, in the order given, and must never print an
 * empty block. The tests pin that: the order of cities and cards, the numbering, the accent colour, the picture or
 * icon tile, and the fact that an empty list renders nothing at all.
 */

const STOPS: CityStop[] = [
  {
    city: 'Alpha',
    highlights: [
      { text: 'First thing', source: 'x' },
      { text: 'Second thing', source: 'x' },
    ],
  },
  {
    city: 'Beta',
    highlights: [{ text: 'Third thing', source: 'x' }],
  },
];

const CARDS: FeatureCard[] = [
  {
    title: 'With a picture',
    body: [{ text: 'Picture body', source: 'x' }],
    image: { src: '/images/a.webp', alt: 'A calm lake', width: 1080, height: 1620 },
  },
  {
    title: 'With an icon',
    body: [
      { text: 'Icon body one', source: 'x' },
      { text: 'Icon body two', source: 'x' },
    ],
    icon: 'camera',
  },
  {
    title: 'With neither',
    body: [{ text: 'Plain body', source: 'x' }],
  },
];

describe('CityLoop', () => {
  it('prints the title as a level-2 heading and each city as a level-3 heading in order', () => {
    render(<CityLoop title='Where you go' stops={STOPS} accent='teal' />);

    expect(screen.getByRole('heading', { level: 2, name: 'Where you go' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)).toEqual([
      'Alpha',
      'Beta',
    ]);
  });

  it('numbers the stops and prints every highlight', () => {
    render(<CityLoop title='Where you go' stops={STOPS} accent='teal' />);

    const [outer] = screen.getAllByRole('list');
    expect(outer.tagName).toBe('OL');
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('First thing')).toBeInTheDocument();
    expect(screen.getByText('Second thing')).toBeInTheDocument();
    expect(screen.getByText('Third thing')).toBeInTheDocument();
  });

  it('draws a connector between stops but not after the last one', () => {
    const { container } = render(<CityLoop title='Where you go' stops={STOPS} accent='teal' />);

    const list = container.querySelector('ol');
    expect(list).not.toBeNull();
    const connectors = Array.from(list?.querySelectorAll('span') ?? []).filter((span) =>
      span.className.includes('w-px'),
    );
    expect(connectors).toHaveLength(1);
  });

  it('uses the accent colour of the page', () => {
    const teal = render(<CityLoop title='Where you go' stops={STOPS} accent='teal' />);
    expect(teal.getByText('1').className).toContain('bg-teal-600');
    teal.unmount();

    const slate = render(<CityLoop title='Where you go' stops={STOPS} accent='slate' />);
    expect(slate.getByText('1').className).toContain('bg-slate-700');
  });

  it('renders nothing without stops', () => {
    const { container } = render(<CityLoop title='Where you go' stops={[]} accent='teal' />);

    expect(container.firstChild).toBeNull();
  });
});

describe('FeatureCards', () => {
  it('prints a heading and one list item per card, in order', () => {
    render(<FeatureCards title='What stands out' cards={CARDS} accent='teal' />);

    expect(screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)).toEqual([
      'With a picture',
      'With an icon',
      'With neither',
    ]);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('shows the picture with its description when the card has one', () => {
    render(<FeatureCards title='What stands out' cards={CARDS} accent='teal' />);

    expect(screen.getByAltText('A calm lake')).toBeInTheDocument();
  });

  it('shows an icon tile instead of a picture when there is none', () => {
    render(<FeatureCards title='What stands out' cards={CARDS} accent='teal' />);

    const iconCard = screen.getByRole('heading', { level: 3, name: 'With an icon' }).closest('li');
    expect(iconCard).not.toBeNull();
    expect(iconCard?.querySelector('svg[aria-hidden="true"]')).not.toBeNull();
    expect(iconCard?.querySelector('img')).toBeNull();

    const plainCard = screen.getByRole('heading', { level: 3, name: 'With neither' }).closest('li');
    expect(plainCard).not.toBeNull();
    expect(plainCard?.querySelector('svg')).toBeNull();
    expect(plainCard?.querySelector('img')).toBeNull();
  });

  it('prints every sentence of the card body', () => {
    render(<FeatureCards title='What stands out' cards={CARDS} accent='teal' />);

    expect(screen.getByText('Picture body')).toBeInTheDocument();
    expect(screen.getByText('Icon body one')).toBeInTheDocument();
    expect(screen.getByText('Icon body two')).toBeInTheDocument();
    expect(screen.getByText('Plain body')).toBeInTheDocument();
  });

  it('renders nothing without cards', () => {
    const { container } = render(<FeatureCards title='What stands out' cards={[]} accent='teal' />);

    expect(container.firstChild).toBeNull();
  });
});
