/**
 * WHY these tests exist:
 *
 * A departure that has already left must never be shown to a customer. The
 * `tour.departureDates` list is read by every page, card, schedule block, feed
 * and structured-data offer, so it must only ever contain departures that are
 * still ahead. That filtering has to be worked out when the list is read (using
 * the current Auckland calendar day), not frozen once when the module loads —
 * otherwise a long-running server would keep advertising departures that have
 * already gone.
 */

import { aucklandToday, upcomingDepartureLabels, parseDepartureDate } from '@/lib/data/tour-dates';
import { getTourBySlug, tours } from '@/lib/data/tours';
import { CHINA_DISCOVERY_DEPARTURES, CHINA_SIGNATURE_DEPARTURES } from '@/lib/data/departure-schedule';

afterEach(() => {
  jest.useRealTimers();
});

describe('upcomingDepartureLabels', () => {
  it('drops departures before today and keeps today and later', () => {
    const labels = ['13 August 2026', '15 October 2026', '28 May 2027'];

    expect(upcomingDepartureLabels(labels, '2026-10-15')).toEqual([
      '15 October 2026',
      '28 May 2027',
    ]);
    expect(upcomingDepartureLabels(labels, '2026-10-16')).toEqual(['28 May 2027']);
  });

  it('keeps the order it was given', () => {
    const labels = ['10 June 2027', '18 March 2027'];

    expect(upcomingDepartureLabels(labels, '2026-01-01')).toEqual(labels);
  });

  it('keeps a label that is not a calendar date and returns [] for []', () => {
    expect(upcomingDepartureLabels(['TBC'], '2026-01-01')).toEqual(['TBC']);
    expect(upcomingDepartureLabels([], '2026-01-01')).toEqual([]);
  });

  it('uses the Auckland day of the clock when no second argument is given', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2027-05-28T00:00:00Z').getTime());

    // 28 May 00:00 UTC is already 12:00 on 28 May in Auckland.
    expect(upcomingDepartureLabels(['27 May 2027', '28 May 2027'])).toEqual(['28 May 2027']);
  });
});

describe('aucklandToday', () => {
  it('moves to the next Auckland day once it is past midnight there (winter time, UTC+12)', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-09-17T13:00:00Z').getTime());

    expect(aucklandToday()).toBe('2026-09-18');
  });

  it('handles the New Zealand summer time boundary (UTC+13)', () => {
    jest.useFakeTimers();

    jest.setSystemTime(new Date('2026-12-31T10:59:59Z').getTime());
    expect(aucklandToday()).toBe('2026-12-31');

    jest.setSystemTime(new Date('2026-12-31T11:00:00Z').getTime());
    expect(aucklandToday()).toBe('2027-01-01');
  });
});

describe('tour departure lists never contain a departure that has left', () => {
  it('Legacy of China lists no 2026 departure', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-10-20T00:00:00Z').getTime());

    const tour = getTourBySlug('china', 'signature', 'imperial-heritage');
    expect(tour?.departureDates).toBeDefined();

    for (const label of tour?.departureDates ?? []) {
      expect(label).toContain('2027');
    }
  });

  it('at any day, every listed departure is today or later', () => {
    const clocks = [
      '2026-10-20T00:00:00Z',
      '2027-03-12T00:00:00Z',
      '2027-06-01T00:00:00Z',
      '2027-12-01T00:00:00Z',
    ];

    const offenders: string[] = [];

    for (const clock of clocks) {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(clock).getTime());

      const today = aucklandToday();

      for (const tour of tours) {
        for (const label of tour.departureDates ?? []) {
          const parsed = parseDepartureDate(label);
          if (parsed === null) {
            offenders.push(`${clock} ${tour.slug}: unparseable "${label}"`);
            continue;
          }
          const iso = parsed.toISOString().slice(0, 10);
          if (iso < today) {
            offenders.push(`${clock} ${tour.slug}: "${label}" (${iso}) < ${today}`);
          }
        }
      }
    }

    expect(offenders).toEqual([]);
  });

  it('the list shrinks as time passes', () => {
    jest.useFakeTimers();

    jest.setSystemTime(new Date('2026-10-20T00:00:00Z').getTime());
    const earlierCount = tours.reduce(
      (total, tour) => total + (tour.departureDates ?? []).length,
      0,
    );

    jest.setSystemTime(new Date('2027-06-01T00:00:00Z').getTime());
    const laterCount = tours.reduce(
      (total, tour) => total + (tour.departureDates ?? []).length,
      0,
    );

    expect(laterCount).toBeLessThan(earlierCount);
  });

  it('nothing is left far in the future', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2035-01-01T00:00:00Z').getTime());

    for (const tour of tours) {
      expect((tour.departureDates ?? []).length).toBe(0);
    }
  });

  it('is worked out when read, not when the module loads', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-10-20T00:00:00Z').getTime());

    const tour = tours.find((t) => (t.departureDates ?? []).length > 0);
    expect(tour).toBeDefined();

    const before = [...(tour?.departureDates ?? [])];
    expect(before.length).toBeGreaterThan(0);

    jest.setSystemTime(new Date('2035-01-01T00:00:00Z').getTime());

    expect(tour?.departureDates).toEqual([]);
    expect(before.length).toBeGreaterThan(0);
  });
});

describe('departure schedule rows', () => {
  it('read their dates when the block renders', () => {
    const rows = [...CHINA_SIGNATURE_DEPARTURES, ...CHINA_DISCOVERY_DEPARTURES];

    jest.useFakeTimers();
    jest.setSystemTime(new Date('2035-01-01T00:00:00Z').getTime());
    for (const row of rows) {
      expect(row.dates).toEqual([]);
    }

    jest.setSystemTime(new Date('2026-10-20T00:00:00Z').getTime());
    const nonEmpty = rows.filter((row) => row.dates.length > 0);
    expect(nonEmpty.length).toBeGreaterThan(0);
  });
});
