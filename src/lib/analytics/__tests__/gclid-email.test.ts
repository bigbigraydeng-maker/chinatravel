/**
 * WHY — the enquiry email is the only lead record; Google's click id (gclid) used to be
 * dropped even though the browser sent it, so Google Ads leads could not be matched back to
 * their ad click later; the id must reach the email, but only when it looks like a click id.
 */
import { sanitizeGclid, gclidEmailRow } from '@/lib/analytics/attribution';

describe('sanitizeGclid', () => {
  it('accepts a real-looking gclid and trims it', () => {
    expect(sanitizeGclid('  Cj0KCQjw_abc-DEF123  ')).toBe('Cj0KCQjw_abc-DEF123');
  });

  it('rejects anything that is not a string', () => {
    for (const v of [undefined, null, 5, {}, ['a']]) {
      expect(sanitizeGclid(v)).toBeNull();
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
      expect(sanitizeGclid(v)).toBeNull();
    }
    expect(sanitizeGclid('a'.repeat(255))).toBe('a'.repeat(255));
  });
});

describe('gclidEmailRow', () => {
  it('renders one row labelled Google click ID with the value', () => {
    const row = gclidEmailRow('Cj0KCQjw_x');
    expect(row).toContain('Google click ID');
    expect(row).toContain('Cj0KCQjw_x');
    expect(row.startsWith('<tr>')).toBe(true);
    expect(row.endsWith('</tr>')).toBe(true);
  });

  it('renders nothing when there is no gclid', () => {
    expect(gclidEmailRow(null)).toBe('');
  });

  it('is not labelled as the Facebook row', () => {
    expect(gclidEmailRow('Cj0KCQjw_x')).not.toContain('Facebook');
  });

  it('escapes the value even if a caller forgot to sanitize it', () => {
    const row = gclidEmailRow('a"b<c>&d');
    expect(row).toContain('a&quot;b&lt;c&gt;&amp;d');
    expect(row).not.toContain('<c>');
  });
});
