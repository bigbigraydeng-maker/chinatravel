import { findYearlessMonthDepartures } from '@/lib/data/past-departure-scan';

// Why this exists: a customer must not be told about departures in a month
// that no tour actually has. Wording like "October Discovery departures"
// cannot be date-checked, so the repo-wide check bans the shape outright.

describe('findYearlessMonthDepartures — month, product word, departures', () => {
  it('flags the wording that slipped into a blog excerpt', () => {
    const found = findYearlessMonthDepartures(
      'I compare the two gateways and how October Discovery departures fit a visa-free trip.',
    );

    expect(found).toHaveLength(1);
    expect(found[0].phrase).toBe('October Discovery departures');
    expect(found[0].line).toBe(1);
  });

  it.each<[string, string]>([
    ['Join our March small-group departure.', 'March small-group departure'],
    ['## November Golden China Departures', 'November Golden China Departures'],
    ['See the September Stopover departure for details.', 'September Stopover departure'],
    ['Book an October guided departure.', 'October guided departure'],
    ['Our June Signature tours departures are open.', 'June Signature tours departures'],
  ])('flags "%s"', (text, expectedPhrase) => {
    const found = findYearlessMonthDepartures(text);

    expect(found.map((f) => f.phrase)).toEqual([expectedPhrase]);
  });

  it('reports the line of the month in the original text', () => {
    const found = findYearlessMonthDepartures(
      'Intro.\n\nOur October Discovery departures are open.',
    );

    expect(found.map((f) => f.line)).toEqual([3]);
  });

  it('returns both shapes in text order', () => {
    const found = findYearlessMonthDepartures(
      ['October Discovery departures are open.', 'The group departs in March.'].join('\n'),
    );

    expect(found.map((f) => f.line)).toEqual([1, 2]);
  });

  it('does not flag a dated departure', () => {
    expect(
      findYearlessMonthDepartures('The 15 October Discovery departure is open.'),
    ).toEqual([]);
    expect(
      findYearlessMonthDepartures('The 3rd October Discovery departure is open.'),
    ).toEqual([]);
    expect(
      findYearlessMonthDepartures('See our March 2027 Discovery departures.'),
    ).toEqual([]);
  });

  it('does not read the modal verb "may" as a month', () => {
    expect(
      findYearlessMonthDepartures('You may group departures by week in the planner.'),
    ).toEqual([]);
  });

  it('does not flag a month with no product word (known gap)', () => {
    expect(
      findYearlessMonthDepartures(
        'Contact us to register interest in a future October departure.',
      ),
    ).toEqual([]);
  });

  it('lets explained history through', () => {
    expect(
      findYearlessMonthDepartures('The October Discovery departures have sold out.'),
    ).toEqual([]);
  });
});
