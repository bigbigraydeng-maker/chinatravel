'use client';

import { useEffect } from 'react';
import { fireViewContent } from '@/lib/analytics/view-content';

/**
 * Fires Meta Pixel `ViewContent` once per page view of a tour page.
 *
 * The call lives in an effect (not in render) so server rendering never fires
 * it — only the browser, after hydration, sends the event.
 */
export default function ViewContentTracker({
  contentId,
  value,
}: {
  contentId: string;
  value: number | null;
}) {
  useEffect(() => {
    fireViewContent({ contentId, value });
  }, [contentId, value]);

  return null;
}
