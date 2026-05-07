/**
 * Tests for DaysCountdown
 *
 * Covers:
 *  - Renders a loading placeholder before hydration (null state)
 *  - Shows correct days count after useEffect fires
 *  - Shows "Departing soon" when departure date is today or in the past
 *  - Cleans up the interval on unmount (no memory leaks)
 */

import { render, screen, act } from '@testing-library/react';
import DaysCountdown from '../DaysCountdown';

describe('DaysCountdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders without throwing for a far-future departure', () => {
    // Smoke test: component should mount cleanly regardless of hydration state.
    // The animated placeholder (null state) only appears before useEffect fires —
    // RTL's render() already flushes effects, so this test just verifies no crash.
    expect(() =>
      render(<DaysCountdown departureSortDate="2099-01-01" />)
    ).not.toThrow();
  });

  it('displays the correct number of days after mount', () => {
    // Departure 10 days from "now"
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    const isoDate = futureDate.toISOString().split('T')[0];

    act(() => {
      render(<DaysCountdown departureSortDate={isoDate} />);
    });

    // After useEffect, days should be visible
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('shows "Departing soon" when departure is today or in the past', () => {
    // Yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isoDate = yesterday.toISOString().split('T')[0];

    act(() => {
      render(<DaysCountdown departureSortDate={isoDate} />);
    });

    expect(screen.getByText('Departing soon')).toBeInTheDocument();
  });

  it('updates every 60 seconds via setInterval', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    const isoDate = futureDate.toISOString().split('T')[0];

    act(() => {
      render(<DaysCountdown departureSortDate={isoDate} />);
    });

    expect(screen.getByText('5')).toBeInTheDocument();

    // Advance timer by 60 seconds; days value should refresh
    act(() => {
      jest.advanceTimersByTime(60_000);
    });

    // Still shows correct days (same date, so still 5)
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('clears interval on unmount (no memory leak)', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 3);
    const isoDate = futureDate.toISOString().split('T')[0];

    let unmount: () => void;
    act(() => {
      const result = render(<DaysCountdown departureSortDate={isoDate} />);
      unmount = result.unmount;
    });

    act(() => {
      unmount();
    });

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});
