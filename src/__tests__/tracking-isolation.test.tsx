/**
 * Tracking isolation contract — Phase 0 v3.1 §4.2
 *
 * GA4 and GTM are env-driven (src/lib/env.ts), so a staging build simply
 * resolves them to undefined. The Google Ads tag and both Meta Pixels in
 * TrackingScripts are NOT env-driven — they are hardcoded production
 * properties. Without an explicit guard, the staging build loads the live ad
 * pixels, and a test enquiry on staging fires a real Google Ads conversion and
 * a real Meta Pixel Lead, corrupting campaign data.
 *
 * This was caught on the first staging deploy: the served HTML contained
 * `<link rel="preload" href="https://www.googletagmanager.com/gtag/js?id=AW-...">`.
 *
 * These tests pin both directions — silent on staging, live everywhere else —
 * so re-adding a hardcoded pixel without an env guard turns CI red.
 */

import { render } from '@testing-library/react';
import TrackingScripts from '@/components/TrackingScripts';

// next/script renders its children/attributes differently per strategy; a
// passthrough keeps the assertion about *what we emit*, not about how Next
// schedules it.
jest.mock('next/script', () => ({
  __esModule: true,
  default: ({ src, dangerouslySetInnerHTML }: {
    src?: string;
    dangerouslySetInnerHTML?: { __html: string };
  }) => (
    <script data-src={src} data-inline={dangerouslySetInnerHTML?.__html ?? ''} />
  ),
}));

jest.mock('@/lib/utils/utm-parser', () => ({
  persistUtmParams: jest.fn(),
}));

const ORIGINAL_ENV = process.env.NEXT_PUBLIC_ENV;

afterEach(() => {
  process.env.NEXT_PUBLIC_ENV = ORIGINAL_ENV;
});

function renderedMarkup(): string {
  const { container } = render(<TrackingScripts />);
  return container.innerHTML;
}

describe('TrackingScripts environment isolation', () => {
  it('emits no ad pixels when NEXT_PUBLIC_ENV=staging', () => {
    process.env.NEXT_PUBLIC_ENV = 'staging';
    const html = renderedMarkup();

    expect(html).not.toContain('googletagmanager');
    expect(html).not.toContain('AW-');
    expect(html).not.toContain('connect.facebook.net');
    expect(html).not.toContain('fbq(');
    expect(html).toBe('');
  });

  it('emits the Google Ads tag and Meta Pixels in production', () => {
    process.env.NEXT_PUBLIC_ENV = 'production';
    const html = renderedMarkup();

    expect(html).toContain('googletagmanager.com/gtag/js?id=AW-');
    expect(html).toContain('connect.facebook.net');
    expect(html).toContain('fbq(');
  });

  it('emits ad pixels when NEXT_PUBLIC_ENV is unset (local/dev parity with prod)', () => {
    delete process.env.NEXT_PUBLIC_ENV;
    const html = renderedMarkup();

    // Only `staging` suppresses tracking. An unset env must never silently
    // disable pixels — that would hide a misconfigured production deploy.
    expect(html).toContain('googletagmanager.com/gtag/js?id=AW-');
  });
});
