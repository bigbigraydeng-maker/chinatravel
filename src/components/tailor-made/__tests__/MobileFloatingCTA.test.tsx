/**
 * Tests for MobileFloatingCTA
 *
 * Covers:
 *  - Renders the CTA button with correct accessible label
 *  - Calls trackMobileFloatingCTAClick on click
 *  - Calls onCTAClick prop callback on click
 *  - Attempts scrollIntoView on the target element
 *  - Does not throw when target element does not exist in DOM
 */

import { render, screen, fireEvent } from '@testing-library/react';
import MobileFloatingCTA from '../MobileFloatingCTA';
import * as trackTools from '@/lib/analytics/track-tools';

jest.mock('@/lib/analytics/track-tools', () => ({
  trackMobileFloatingCTAClick: jest.fn(),
}));

const mockTrackMobileFloatingCTAClick = trackTools.trackMobileFloatingCTAClick as jest.Mock;

beforeEach(() => {
  mockTrackMobileFloatingCTAClick.mockClear();
});

describe('MobileFloatingCTA', () => {
  it('renders a button with the correct accessible label', () => {
    render(<MobileFloatingCTA />);
    expect(
      screen.getByRole('button', { name: /free planning tools/i })
    ).toBeInTheDocument();
  });

  it('renders "Free planning tools" button text', () => {
    render(<MobileFloatingCTA />);
    expect(screen.getByText(/Free planning tools/i)).toBeInTheDocument();
  });

  it('calls trackMobileFloatingCTAClick when button is clicked', () => {
    render(<MobileFloatingCTA />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockTrackMobileFloatingCTAClick).toHaveBeenCalledTimes(1);
  });

  it('fires onCTAClick prop when button is clicked', () => {
    const onCTAClick = jest.fn();
    render(<MobileFloatingCTA onCTAClick={onCTAClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onCTAClick).toHaveBeenCalledTimes(1);
  });

  it('calls scrollIntoView on the target section element when it exists', () => {
    const mockScrollIntoView = jest.fn();
    const fakeSection = document.createElement('div');
    fakeSection.id = 'tools-banner';
    fakeSection.scrollIntoView = mockScrollIntoView;
    document.body.appendChild(fakeSection);

    render(<MobileFloatingCTA targetSectionId="tools-banner" />);
    fireEvent.click(screen.getByRole('button'));

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });

    document.body.removeChild(fakeSection);
  });

  it('does not throw when target section element does not exist', () => {
    render(<MobileFloatingCTA targetSectionId="non-existent-id" />);
    expect(() => fireEvent.click(screen.getByRole('button'))).not.toThrow();
  });

  it('does not throw when onCTAClick is not provided', () => {
    render(<MobileFloatingCTA />);
    expect(() => fireEvent.click(screen.getByRole('button'))).not.toThrow();
  });
});
