import { render, screen } from '@testing-library/react';
import RouteMapBlock from '@/components/ad-landing/RouteMapBlock';
import InclusionsBlock from '@/components/ad-landing/InclusionsBlock';

/**
 * The route map is the official map of the tour: it is lazy loaded with its
 * drawing size reserved up front so the page does not jump while it loads, and
 * it swaps to a phone-shaped drawing below md. The inclusion lists are printed
 * exactly as the tour data gives them, in order, with the "Not included" card
 * only appearing when there is something to list.
 */
describe('RouteMapBlock', () => {
  it('shows the desktop and the phone map of the tour, lazy loaded, with their drawing size', () => {
    render(
      <RouteMapBlock
        title='Route'
        caption='The route'
        slug='shanghai-surroundings'
        tourName='Test Tour'
        accent='teal'
      />,
    );

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);

    const [desktop, mobile] = images;
    expect(desktop).toHaveAttribute('src', '/tour-maps/shanghai-surroundings.svg');
    expect(desktop).toHaveAttribute('width', '1200');
    expect(desktop).toHaveAttribute('height', '850');
    expect(desktop).toHaveAttribute('loading', 'lazy');
    expect(desktop).toHaveAttribute('alt', 'Test Tour route map — cities, transport and nights');

    expect(mobile).toHaveAttribute('src', '/tour-maps/shanghai-surroundings-mobile.svg');
    expect(mobile).toHaveAttribute('width', '800');
    expect(mobile).toHaveAttribute('height', '1616');
    expect(mobile).toHaveAttribute('loading', 'lazy');
    expect(mobile).toHaveAttribute('alt', 'Test Tour route map — cities, transport and nights');
  });

  it('prints the title as a heading and the caption under the map', () => {
    const { container } = render(
      <RouteMapBlock
        title='Route'
        caption='The route'
        slug='shanghai-surroundings'
        tourName='Test Tour'
        accent='teal'
      />,
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Route' })).toBeInTheDocument();

    const caption = container.querySelector('figcaption');
    expect(caption).not.toBeNull();
    expect(caption).toHaveTextContent('The route');
  });

  it('shows the desktop map only from md and the phone map only below md', () => {
    render(
      <RouteMapBlock
        title='Route'
        caption='The route'
        slug='shanghai-surroundings'
        tourName='Test Tour'
        accent='teal'
      />,
    );

    const [desktop, mobile] = screen.getAllByRole('img');
    expect(desktop.className).toContain('hidden');
    expect(desktop.className).toContain('md:block');
    expect(mobile.className).toContain('block');
    expect(mobile.className).toContain('md:hidden');
  });

  it('renders nothing when the tour has no map files', () => {
    const { container } = render(
      <RouteMapBlock title='Route' caption='The route' slug='no-such-tour' tourName='Test Tour' accent='teal' />,
    );

    expect(container.firstChild).toBeNull();
  });
});

describe('InclusionsBlock', () => {
  it('lists what is included and what is not, in order', () => {
    render(
      <InclusionsBlock
        title='What is included'
        included={['Airfares', 'Hotels']}
        excluded={['Travel insurance']}
        accent='teal'
      />,
    );

    expect(screen.getByRole('heading', { level: 3, name: 'Included in the price' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Not included' })).toBeInTheDocument();

    const items = screen.getAllByRole('listitem').map((item) => item.textContent);
    expect(items).toEqual(['Airfares', 'Hotels', 'Travel insurance']);
  });

  it('leaves out the "Not included" card when nothing is excluded', () => {
    render(
      <InclusionsBlock title='What is included' included={['Airfares', 'Hotels']} excluded={[]} accent='teal' />,
    );

    expect(screen.queryByRole('heading', { level: 3, name: 'Not included' })).toBeNull();
  });

  it('renders nothing without inclusions', () => {
    const { container } = render(
      <InclusionsBlock title='What is included' included={[]} excluded={['Travel insurance']} accent='teal' />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('marks its icons as decoration', () => {
    const { container } = render(
      <InclusionsBlock
        title='What is included'
        included={['Airfares', 'Hotels']}
        excluded={['Travel insurance']}
        accent='teal'
      />,
    );

    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
    icons.forEach((icon) => {
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
