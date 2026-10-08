import {
  parseDepartureDate,
  parseIsoDate,
  passportStatus,
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
