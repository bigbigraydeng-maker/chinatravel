/**
 * Tests for ToolsRecommendationBanner
 *
 * Covers:
 *  - Renders all 3 tool cards with correct titles and links
 *  - Links open in a new tab (target="_blank")
 *  - onToolClick callback fires with the correct tool name
 *  - GA4 trackToolClick is called on click
 */

import { render, screen, fireEvent } from '@testing-library/react';
import ToolsRecommendationBanner from '../ToolsRecommendationBanner';
import * as trackTools from '@/lib/analytics/track-tools';

jest.mock('@/lib/analytics/track-tools', () => ({
  trackToolClick: jest.fn(),
}));

const mockTrackToolClick = trackTools.trackToolClick as jest.Mock;

beforeEach(() => {
  mockTrackToolClick.mockClear();
});

describe('ToolsRecommendationBanner', () => {
  it('renders all 3 tool cards', () => {
    render(<ToolsRecommendationBanner />);

    expect(screen.getByText('Best Time to Visit China')).toBeInTheDocument();
    expect(screen.getByText('China Trip Cost Calculator')).toBeInTheDocument();
    expect(screen.getByText('Visa Requirement Checker')).toBeInTheDocument();
  });

  it('renders tool links that open in a new tab', () => {
    render(<ToolsRecommendationBanner />);

    // Only the 3 tool card links (aria-label "Open … in a new tab") must open in a new tab.
    // The bottom "#enquiry-form" anchor is an in-page scroll link and intentionally excluded.
    const toolLinks = screen.getAllByRole('link', { name: /open .+ in a new tab/i });
    expect(toolLinks).toHaveLength(3);
    toolLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('calls trackToolClick with the correct tool name when a card is clicked', () => {
    render(<ToolsRecommendationBanner />);

    const bestTimeLink = screen.getByLabelText(/Best Time to Visit China/i);
    fireEvent.click(bestTimeLink);

    expect(mockTrackToolClick).toHaveBeenCalledWith(
      'best-time-to-visit',
      'tailor-made-banner'
    );
  });

  it('fires onToolClick prop callback with the tool name', () => {
    const onToolClick = jest.fn();
    render(<ToolsRecommendationBanner onToolClick={onToolClick} />);

    const visaLink = screen.getByLabelText(/Visa Requirement Checker/i);
    fireEvent.click(visaLink);

    expect(onToolClick).toHaveBeenCalledWith('visa-checker');
  });

  it('renders step numbers 1, 2, 3 on the cards', () => {
    render(<ToolsRecommendationBanner />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders without crashing when onToolClick is not provided', () => {
    expect(() => render(<ToolsRecommendationBanner />)).not.toThrow();
  });
});
