import {
  dobProblem,
  parseDepartureDate,
  parseIsoDate,
  passportExpiryProblem,
  passportStatus,
  toIsoDate,
  upcomingDates,
} from '@/lib/traveller-form';

const today = new Date(Date.UTC(2026, 9, 9));

describe('parseDepartureDate', () => {
  it('reads the date format used in the tour data', () => {
    expect(parseDepartureDate('13 May 2027')?.toISOString()).toBe('2027-05-13T00:00:00.000Z');
  });
  it('rejects dates without a year or with impossible days', () => {
    expect(parseDepartureDate('25 August')).toBeNull();
    expect(parseDepartureDate('31 February 2027')).toBeNull();
  });
});

describe('passportStatus', () => {
  const departure = parseDepartureDate('13 May 2027');

  it('is ok when valid for 6+ months after departure', () => {
    expect(passportStatus('2027-11-13', departure, today)).toBe('ok');
  });
  it('is short when valid at departure but under 6 months after', () => {
    expect(passportStatus('2027-09-01', departure, today)).toBe('short');
  });
  it('is expired when it ends before departure', () => {
    expect(passportStatus('2027-05-12', departure, today)).toBe('expired');
  });
  it('falls back to today when no departure is chosen', () => {
    expect(passportStatus('2027-01-01', null, today)).toBe('short');
    expect(passportStatus('2026-10-01', null, today)).toBe('expired');
  });
  it('is unknown for an empty or malformed date', () => {
    expect(passportStatus('', departure, today)).toBe('unknown');
    expect(passportStatus('13/05/2027', departure, today)).toBe('unknown');
  });
});

describe('upcomingDates', () => {
  it('drops past departures and unreadable entries', () => {
    expect(upcomingDates(['13 August 2026', '28 May 2027', 'TBC'], today)).toEqual(['28 May 2027']);
  });
  it('handles tours without dates', () => {
    expect(upcomingDates(undefined, today)).toEqual([]);
  });
});

describe('dobProblem', () => {
  const dobToday = new Date(Date.UTC(2026, 9, 10));

  it('accepts empty input', () => {
    expect(dobProblem('', dobToday)).toBeNull();
  });
  it('accepts a normal date of birth', () => {
    expect(dobProblem('1960-07-08', dobToday)).toBeNull();
  });
  it('rejects an unparseable date', () => {
    expect(dobProblem('275760-07-08', dobToday)).toBe('Please enter a real date of birth, e.g. 08/07/1960.');
  });
  it('rejects an impossible calendar date', () => {
    expect(dobProblem('2024-02-31', dobToday)).toBe('Please enter a real date of birth, e.g. 08/07/1960.');
  });
  it('rejects a future date', () => {
    expect(dobProblem('2026-10-11', dobToday)).toBe('Date of birth cannot be in the future.');
  });
  it('accepts today', () => {
    expect(dobProblem('2026-10-10', dobToday)).toBeNull();
  });
  it('rejects a year before 1900', () => {
    expect(dobProblem('1899-12-31', dobToday)).toBe('Please check the year of birth.');
  });
  it('accepts the earliest allowed date', () => {
    expect(dobProblem('1900-01-01', dobToday)).toBeNull();
  });
});

describe('passportExpiryProblem', () => {
  const expiryToday = new Date(Date.UTC(2026, 9, 10));

  it('accepts empty input', () => {
    expect(passportExpiryProblem('', expiryToday)).toBeNull();
  });
  it('accepts a plausible future expiry', () => {
    expect(passportExpiryProblem('2031-05-01', expiryToday)).toBeNull();
  });
  it('accepts a past expiry', () => {
    expect(passportExpiryProblem('2020-01-01', expiryToday)).toBeNull();
  });
  it('rejects an unparseable date', () => {
    expect(passportExpiryProblem('275760-01-01', expiryToday)).toBe('Please enter a real expiry date.');
  });
  it('rejects a year before 1990', () => {
    expect(passportExpiryProblem('1980-01-01', expiryToday)).toBe('Please check the year of the expiry date.');
  });
  it('rejects a date more than 10 years ahead', () => {
    expect(passportExpiryProblem('2040-01-01', expiryToday)).toBe('Please check the year — a passport is valid for 10 years at most.');
  });
});

describe('toIsoDate', () => {
  it('formats a UTC date as yyyy-mm-dd', () => {
    expect(toIsoDate(new Date(Date.UTC(2026, 0, 5)))).toBe('2026-01-05');
  });
});
