/**
 * Meta Pixel `ViewContent` firing for CTS Tours tour pages.
 *
 * ViewContent tells Meta which tour page a visitor looked at, so retargeting
 * audiences can be built from it (e.g. "viewed tour X, did not enquire").
 * `content_ids` is the tour slug; `value`/`currency` are the tour's per-person
 * starting price in NZD. When the price cannot be read the event is sent
 * WITHOUT value/currency — never a made-up number (a fake value would mislead
 * value-based bidding).
 *
 * fbq is installed by <TrackingScripts> with strategy="afterInteractive", so it
 * may not exist yet on the first attempt. We poll for it for a few seconds and
 * fire exactly once, then stop. A missing fbq simply skips the event without
 * throwing.
 */

type FbqFn = (...args: unknown[]) => void;

function fbq(): FbqFn | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as Window & { fbq?: FbqFn }).fbq;
}

const MAX_ATTEMPTS = 20; // retry for ~3s (20 × 150ms) while fbq finishes loading
const RETRY_MS = 150;

export interface ViewContentInput {
  /** Tour slug, sent as Meta's content_ids. */
  contentId: string;
  /** Per-person starting price in NZD, or null when it cannot be read. */
  value: number | null;
}

export function fireViewContent({ contentId, value }: ViewContentInput): void {
  if (typeof window === 'undefined') return;

  const eventId = `cts-viewcontent-${contentId}-${Date.now()}`;
  let attempts = 0;

  const tick = () => {
    const f = fbq();
    if (f) {
      const params = {
        content_ids: [contentId],
        content_type: 'product',
        ...(value !== null ? { value, currency: 'NZD' } : {}),
      };
      f('track', 'ViewContent', params, { eventID: eventId });
      return;
    }
    if (++attempts >= MAX_ATTEMPTS) return;
    setTimeout(tick, RETRY_MS);
  };

  tick();
}
