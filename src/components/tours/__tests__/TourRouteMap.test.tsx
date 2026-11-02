import { readFileSync } from 'fs';
import { join } from 'path';
import { render, screen } from '@testing-library/react';
import TourRouteMap from '@/components/tours/TourRouteMap';

/**
 * The tour page shows a route map only for tours whose slug is registered in TourRouteMap AND whose two
 * drawings exist in public/tour-maps. A registered slug without its files would render two broken images.
 */
describe('TourRouteMap', () => {
  it('shows the desktop and phone drawing of China Unveiled', () => {
    render(<TourRouteMap slug="china-unveiled" tourName="China Unveiled" />);
    const images = screen.getAllByRole('img');
    expect(images.map((i) => i.getAttribute('src'))).toEqual([
      '/tour-maps/china-unveiled.svg',
      '/tour-maps/china-unveiled-mobile.svg',
    ]);
  });

  it('renders nothing for a tour that has no map', () => {
    const { container } = render(<TourRouteMap slug="not-a-mapped-tour" tourName="x" />);
    expect(container).toBeEmptyDOMElement();
  });

  it.each(['china-unveiled.svg', 'china-unveiled-mobile.svg'])('%s is a valid drawing with a viewBox up front', (file) => {
    const svg = readFileSync(join(process.cwd(), 'public', 'tour-maps', file), 'utf8');
    // the page reserves the drawing size from the first 600 characters (src/lib/ad-landing/map-size.ts)
    expect(svg.slice(0, 600)).toMatch(/<svg viewBox="0 0 \d+ \d+"/);
    expect(svg).toContain('CHINA UNVEILED');
    for (const city of ['Guangzhou', 'Guilin', 'Yangshuo', 'Zhangjiajie', 'Fenghuang', 'Chongqing']) {
      expect(svg).toContain(`>${city}</text>`);
    }
  });
});
