/**
 * WHY — the enquiry email used to drop the ad click id even though the browser sent it, so
 * Meta-attributed leads could not be matched back to an ad click later; the id must reach the
 * email, but only when it really looks like a click id.
 */
import { sanitizeFbclid, fbclidEmailRow } from '@/lib/analytics/attribution';

describe('sanitizeFbclid', () => {
  it('accepts a real-looking fbclid and trims it', () => {
    expect(sanitizeFbclid('  IwAR2x_abc-DEF.123  ')).toBe('IwAR2x_abc-DEF.123');
  });

  it('rejects anything that is not a string', () => {
    for (const v of [undefined, null, 5, {}, ['a']]) {
      expect(sanitizeFbclid(v)).toBeNull();
    }
  });

  it('rejects empty, whitespace-only, over-long and unsafe values', () => {
    for (const v of [
      '',
      '   ',
      'a'.repeat(256),
      'abc def',
      '<script>alert(1)</script>',
      'abc"onload="x',
      'ab\ncd',
    ]) {
      expect(sanitizeFbclid(v)).toBeNull();
    }
    expect(sanitizeFbclid('a'.repeat(255))).toBe('a'.repeat(255));
  });
});

describe('fbclidEmailRow', () => {
  it('renders one row labelled Facebook click ID with the value', () => {
    const row = fbclidEmailRow('IwAR_x');
    expect(row).toContain('Facebook click ID');
    expect(row).toContain('IwAR_x');
    expect(row.startsWith('<tr>')).toBe(true);
    expect(row.endsWith('</tr>')).toBe(true);
  });

  it('renders nothing when there is no fbclid', () => {
    expect(fbclidEmailRow(null)).toBe('');
  });
});
