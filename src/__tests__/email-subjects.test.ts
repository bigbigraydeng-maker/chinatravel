import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { itineraryEmailSubject, travellerDetailsSubject } from '@/lib/email-subjects';

const CJK = /[㐀-鿿＀-￯]/;

describe('email subjects are English (staff mailbox rules and customers rely on it)', () => {
  it('traveller details subject is English and carries name + booking ref', () => {
    const s = travellerDetailsSubject('Test Person', 'CTS-0001');
    expect(s).toBe('Traveller details form — Test Person (CTS-0001)');
    expect(CJK.test(s)).toBe(false);
  });

  it('traveller details subject omits the ref when there is none', () => {
    expect(travellerDetailsSubject('Test Person')).toBe('Traveller details form — Test Person');
  });

  it('itinerary subject uses English destination names, and falls back to the raw key', () => {
    expect(itineraryEmailSubject(5, 'queenstown')).toBe('Your 5-day Queenstown itinerary');
    expect(CJK.test(itineraryEmailSubject(3, 'unknown-place'))).toBe(false);
  });

  it('no API route sets a subject containing Chinese', () => {
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        if (statSync(p).isDirectory()) walk(p);
        else if (/\.(ts|tsx)$/.test(name)) files.push(p);
      }
    };
    walk(join(process.cwd(), 'src', 'app', 'api'));
    const offenders = files.filter((f) =>
      readFileSync(f, 'utf8')
        .split('\n')
        .some((line) => /\bsubject\b/.test(line) && CJK.test(line))
    );
    expect(offenders).toEqual([]);
  });
});
