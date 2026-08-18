import {
  computeReturnDate,
  getDepartureReturnPairs,
  parseDepartureDate,
  parseDurationDays,
} from '@/lib/data/tour-dates';

describe('tour-dates', () => {
  /**
   * WHY: tours have different durations (10 days vs 27 days), so a shared
   * "add N days" constant would be wrong for most tours. Each computation
   * must read the specific tour's duration.
   */
  it('computes the return date from the tour\'s own duration, not a fixed offset', () => {
    expect(computeReturnDate('13 May 2027', '10 Days')).toBe('22 May 2027');
    expect(computeReturnDate('13 May 2027', '18 Days')).toBe('30 May 2027');
  });

  it('treats day 1 of the itinerary as the departure day, not day 0', () => {
    // A 3-day tour departing on the 1st returns on the 3rd, not the 4th.
    expect(computeReturnDate('1 January 2027', '3 Days')).toBe('3 January 2027');
  });

  it('rolls over month and year boundaries correctly', () => {
    expect(computeReturnDate('25 December 2026', '10 Days')).toBe('3 January 2027');
  });

  it('returns null instead of guessing when the departure date has no year', () => {
    // Silently assuming a year would risk showing a wrong return date to a customer.
    expect(computeReturnDate('25 August', '10 Days')).toBeNull();
  });

  it('returns null for an unparseable duration', () => {
    expect(computeReturnDate('13 May 2027', 'Tailor-made')).toBeNull();
  });

  it('rejects calendar-invalid dates like 31 April instead of silently rolling into May', () => {
    expect(parseDepartureDate('31 April 2027')).toBeNull();
  });

  it('parses the leading day count out of a duration string', () => {
    expect(parseDurationDays('10 Days')).toBe(10);
    expect(parseDurationDays('27 Days')).toBe(27);
  });

  /**
   * WHY: the departure schedule block lists many tours side by side, each
   * with its own duration — the pairing must stay per-tour, not global.
   */
  it('pairs each departure date with a return date computed for that tour', () => {
    const pairs = getDepartureReturnPairs(['13 May 2027', '21 October 2027'], '18 Days');
    expect(pairs).toEqual([
      { departure: '13 May 2027', returnDate: '30 May 2027' },
      { departure: '21 October 2027', returnDate: '7 November 2027' },
    ]);
  });
});
