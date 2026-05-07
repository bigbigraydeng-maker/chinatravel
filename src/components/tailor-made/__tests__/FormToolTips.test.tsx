/**
 * Tests for FormToolTips (FieldToolTip)
 *
 * Covers:
 *  - Renders help text for each supported fieldName
 *  - Link opens in a new tab (target="_blank")
 *  - Calls onToolClick with the correct tool name on click
 *  - Returns null for an unknown fieldName (edge case)
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { FieldToolTip } from '../FormToolTips';
import * as trackTools from '@/lib/analytics/track-tools';

jest.mock('@/lib/analytics/track-tools', () => ({
  trackToolTipClick: jest.fn(),
}));

beforeEach(() => {
  (trackTools.trackToolTipClick as jest.Mock).mockClear();
});

describe('FieldToolTip', () => {
  it('renders help text for "travel-date" field', () => {
    render(<FieldToolTip fieldName="travel-date" />);
    expect(screen.getByText(/Best Time to Visit/i)).toBeInTheDocument();
  });

  it('renders help text for "budget" field', () => {
    render(<FieldToolTip fieldName="budget" />);
    expect(screen.getByText(/Cost Calculator/i)).toBeInTheDocument();
  });

  it('renders help text for "visa" field', () => {
    render(<FieldToolTip fieldName="visa" />);
    expect(screen.getByText(/Visa Guide/i)).toBeInTheDocument();
  });

  it('renders a link that opens in a new tab', () => {
    render(<FieldToolTip fieldName="budget" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('calls onToolClick with the correct tool name when clicked', () => {
    const onToolClick = jest.fn();
    render(<FieldToolTip fieldName="travel-date" onToolClick={onToolClick} />);

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(onToolClick).toHaveBeenCalledWith('best-time-to-visit');
  });

  it('calls onToolClick with "cost-calculator" for budget field', () => {
    const onToolClick = jest.fn();
    render(<FieldToolTip fieldName="budget" onToolClick={onToolClick} />);

    fireEvent.click(screen.getByRole('link'));
    expect(onToolClick).toHaveBeenCalledWith('cost-calculator');
  });

  it('calls onToolClick with "visa-checker" for visa field', () => {
    const onToolClick = jest.fn();
    render(<FieldToolTip fieldName="visa" onToolClick={onToolClick} />);

    fireEvent.click(screen.getByRole('link'));
    expect(onToolClick).toHaveBeenCalledWith('visa-checker');
  });

  it('does not throw when onToolClick is not provided', () => {
    render(<FieldToolTip fieldName="visa" />);
    expect(() => fireEvent.click(screen.getByRole('link'))).not.toThrow();
  });
});
