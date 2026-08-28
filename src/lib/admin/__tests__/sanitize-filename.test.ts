/**
 * Regression tests for the admin image-upload filename sanitiser.
 *
 * Origin: uploading a macOS screenshot through /admin/images/upload failed with
 *   Failed
 *   Invalid key: uploads/1787933710191-Screenshot 2026-08-28 at 2.49.05 AM.png
 *
 * "Invalid key" comes from Supabase Storage, not from our code — which also
 * proves the Supabase credentials were fine and the request reached Supabase.
 * The real cause is that macOS screenshot filenames contain U+202F (narrow
 * no-break space) before AM/PM, and the old sanitiser only stripped "/" and
 * "..", passing everything else straight into the object key.
 */

import { sanitizeFilename } from '@/lib/admin/sanitize-filename';

const NNBSP = ' '; // narrow no-break space — what macOS puts before AM/PM

describe('sanitizeFilename', () => {
  it('handles the exact macOS screenshot name that broke uploads', () => {
    const macosName = `Screenshot 2026-08-28 at 2.49.05${NNBSP}AM.png`;
    const out = sanitizeFilename(macosName);

    expect(out).toBe('Screenshot-2026-08-28-at-2.49.05-AM.png');
    expect(out).not.toContain(NNBSP);
    expect(out).not.toContain(' ');
  });

  it('produces only Supabase-safe characters for messy input', () => {
    const messy = 'photo (1) — 中文 & "quotes" @ 100%.JPG';
    const out = sanitizeFilename(messy);

    // Conservative allowlist: letters, digits, dot, underscore, hyphen.
    expect(out).toMatch(/^[A-Za-z0-9._-]+$/);
    expect(out).toContain('.JPG');
  });

  it('still blocks directory traversal', () => {
    expect(sanitizeFilename('../../etc/passwd')).not.toContain('..');
    expect(sanitizeFilename('../../etc/passwd')).not.toContain('/');
    expect(sanitizeFilename('a/b/c.png')).not.toContain('/');
    expect(sanitizeFilename('a\\b\\c.png')).not.toContain('\\');
  });

  it('leaves already-clean names untouched', () => {
    expect(sanitizeFilename('great-wall-mist.jpg')).toBe('great-wall-mist.jpg');
    expect(sanitizeFilename('hero_2026.webp')).toBe('hero_2026.webp');
  });

  it('collapses hyphen runs and trims edges rather than emitting them', () => {
    expect(sanitizeFilename('  spaced   out  .png')).toBe('spaced-out-.png');
    expect(sanitizeFilename('!!!weird!!!.png')).toBe('weird-.png');
  });

  it('never returns an empty key', () => {
    expect(sanitizeFilename('...')).toBe('upload.bin');
    expect(sanitizeFilename('///')).toBe('upload.bin');
    expect(sanitizeFilename('')).toBe('upload.bin');
    expect(sanitizeFilename('中文')).toBe('upload.bin');
  });

  it('caps length so long names cannot blow the key limit', () => {
    expect(sanitizeFilename('a'.repeat(500)).length).toBe(200);
  });
});
