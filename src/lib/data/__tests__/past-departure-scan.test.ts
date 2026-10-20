// Why this exists: a customer must never be told that a departure which has
// already left is still coming. This is the detector behind the repo-wide
// check that scans tour copy for past departures still being advertised.
import { findPastDepartureMentions } from '@/lib/data/past-departure-scan';

const TODAY = '2026-10-20';

describe('findPastDepartureMentions', () => {
  it('flags a departure word followed by a past date', () => {
    const mentions = findPastDepartureMentions(
      'Departs 15 October 2026 & 18 March 2027.',
      TODAY,
    );
    expect(mentions).toHaveLength(1);
    expect(mentions[0].date).toBe('15 October 2026');
    expect(mentions[0].line).toBe(1);
  });

  it('reads the date through JSX and markdown markup', () => {
    const jsx = findPastDepartureMentions(
      'Departures <strong>15 October 2026</strong> &amp; 18 March 2027.',
      TODAY,
    );
    expect(jsx).toHaveLength(1);
    expect(jsx[0].date).toBe('15 October 2026');

    const markdown = findPastDepartureMentions(
      'departing **14 October 2026**.',
      TODAY,
    );
    expect(markdown).toHaveLength(1);
    expect(markdown[0].date).toBe('14 October 2026');
  });

  it('reports every past date in a list', () => {
    const mentions = findPastDepartureMentions(
      'Departures: 13 August 2026, 15 October 2026 and 28 May 2027.',
      TODAY,
    );
    expect(mentions.map((m) => m.date)).toEqual([
      '13 August 2026',
      '15 October 2026',
    ]);
  });

  it('skips filler words between the word and the date', () => {
    const mentions = findPastDepartureMentions(
      'departing from Auckland on 14 October 2026',
      TODAY,
    );
    expect(mentions).toHaveLength(1);
  });

  it('a departure on today is not past, the day after is', () => {
    expect(
      findPastDepartureMentions('Departs 20 October 2026', TODAY),
    ).toEqual([]);
    const mentions = findPastDepartureMentions(
      'Departs 20 October 2026',
      '2026-10-21',
    );
    expect(mentions).toHaveLength(1);
  });

  it('does not flag future dates', () => {
    expect(
      findPastDepartureMentions(
        'Departs 18 March 2027 and 10 June 2027.',
        TODAY,
      ),
    ).toEqual([]);
  });

  it('month-year dates are past only once the month is over', () => {
    expect(
      findPastDepartureMentions('Departs October 2026 from Auckland.', TODAY),
    ).toEqual([]);
    const mentions = findPastDepartureMentions(
      'Departs October 2026 from Auckland.',
      '2026-11-01',
    );
    expect(mentions).toHaveLength(1);
    expect(mentions[0].date).toBe('October 2026');
  });

  it('reads abbreviated months', () => {
    const oct = findPastDepartureMentions('Departs 15 Oct 2026', TODAY);
    expect(oct).toHaveLength(1);

    const sept = findPastDepartureMentions('Departs 1 Sept 2026', TODAY);
    expect(sept).toHaveLength(1);
  });

  it('lets explained history through', () => {
    expect(
      findPastDepartureMentions(
        'Departs 14 October 2026 — this departure has sold out.',
        TODAY,
      ),
    ).toEqual([]);
    expect(
      findPastDepartureMentions(
        'Departing 14 October 2026 is fully booked.',
        TODAY,
      ),
    ).toEqual([]);
    expect(
      findPastDepartureMentions('Departure 13 August 2026 has passed.', TODAY),
    ).toEqual([]);
  });

  it('judges each sentence on its own', () => {
    const mentions = findPastDepartureMentions(
      'Departs 14 October 2026. The 25 March 2027 departure has sold out.',
      TODAY,
    );
    expect(mentions).toHaveLength(1);
    expect(mentions[0].date).toBe('14 October 2026');
  });

  it('does not read the date-before-word wording', () => {
    expect(
      findPastDepartureMentions(
        'The 15 October 2026 departure is open for booking.',
        TODAY,
      ),
    ).toEqual([]);
  });

  it('does not read dates without a year', () => {
    expect(
      findPastDepartureMentions(
        'The group leaves Auckland on 15 October.',
        TODAY,
      ),
    ).toEqual([]);
  });

  it('ignores words that only contain "depart"', () => {
    expect(
      findPastDepartureMentions(
        'Department of Tourism notice 15 October 2026',
        TODAY,
      ),
    ).toEqual([]);
    expect(
      findPastDepartureMentions("departureDates: ['13 August 2026']", TODAY),
    ).toEqual([]);
  });

  it('reports the line of the departure word in the original text', () => {
    const text = [
      'Golden China',
      'A grand journey.',
      'Departs 15 October 2026',
      'Book now.',
    ].join('\n');
    const mentions = findPastDepartureMentions(text, TODAY);
    expect(mentions).toHaveLength(1);
    expect(mentions[0].line).toBe(3);
  });

  it('returns several mentions in text order without duplicates', () => {
    const text = ['Departs 15 October 2026', 'Departing 13 August 2026'].join(
      '\n',
    );
    const mentions = findPastDepartureMentions(text, TODAY);
    expect(mentions).toHaveLength(2);
    expect(mentions.map((m) => m.date)).toEqual([
      '15 October 2026',
      '13 August 2026',
    ]);
    expect(mentions.map((m) => m.line)).toEqual([1, 2]);
  });

  it('a sold-out note on a neighbouring line of a data file does not hide a stale sentence', () => {
    const text = [
      "metaDescription: 'Golden China. Departing Auckland 16 November 2026 from NZD $4,999.',",
      'isActive: true, // the 25 March 2027 departure has sold out',
    ].join('\n');

    const mentions = findPastDepartureMentions(text, '2026-11-17');

    expect(mentions.map((m) => m.date)).toEqual(['16 November 2026']);
  });

  it('the end of a quoted string ends the sentence even without a full stop', () => {
    const text = "title: 'Departing Auckland 16 November 2026',\nnote: 'sold out',";

    expect(findPastDepartureMentions(text, '2026-11-17')).toHaveLength(1);
  });

  it('an apostrophe inside a word does not end the sentence', () => {
    expect(findPastDepartureMentions("Departs 15 October 2026 for Xi'an, which has sold out.", TODAY)).toEqual([]);
  });

  it('puts the whole sentence in the mention', () => {
    const mentions = findPastDepartureMentions(
      'Join us. Departs 15 October 2026 from Auckland. Book now.',
      TODAY,
    );
    expect(mentions).toHaveLength(1);
    expect(mentions[0].sentence).toBe(
      'Departs 15 October 2026 from Auckland.',
    );
  });
});
