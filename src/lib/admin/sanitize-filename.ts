/**
 * Build a filename that is safe as a Supabase Storage object key.
 *
 * Supabase rejects keys outside a narrow charset with "Invalid key". Stripping
 * only slashes and ".." — the original behaviour in the upload route — was
 * enough for traversal safety but not for storage: a macOS screenshot is named
 * `Screenshot 2026-08-28 at 2.49.05 AM.png`, where the gap before "AM" is
 * U+202F NARROW NO-BREAK SPACE rather than a plain space. That character sits
 * outside Supabase's allowed set, so every screenshot upload failed with
 * "Invalid key" — which reads like a permissions problem and sent us looking
 * in the wrong place.
 *
 * Rather than enumerate Supabase's charset (which can drift between versions),
 * collapse anything outside a conservative ASCII allowlist to a hyphen.
 * Traversal protection is preserved: "/", "\" and ".." runs cannot survive.
 */
export function sanitizeFilename(name: string): string {
  const base = name
    .replace(/[/\\]/g, '')
    .replace(/\.\./g, '')
    .replace(/[^A-Za-z0-9._-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^[-.]+/, '')
    .replace(/-+$/, '');
  return base.slice(0, 200) || 'upload.bin';
}
