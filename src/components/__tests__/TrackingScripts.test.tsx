/**
 * Locks the two-dataset Meta Pixel contract.
 *
 * The ad account that runs CTS's campaigns (2775766642787274) can only read
 * META_PIXEL_ADS; the client-owned history lives in META_PIXEL_OWNED. Dropping
 * either init silently blinds one of them — which is exactly what happened
 * between 2026-05-05 and 2026-08-19. See src/lib/analytics/meta-pixels.ts.
 */
import { render } from '@testing-library/react';
import TrackingScripts from '../TrackingScripts';
import { META_PIXEL_ADS, META_PIXEL_IDS, META_PIXEL_OWNED } from '@/lib/analytics/meta-pixels';

jest.mock('next/script', () => ({
  __esModule: true,
  default: ({ id, src, dangerouslySetInnerHTML }: {
    id?: string;
    src?: string;
    dangerouslySetInnerHTML?: { __html: string };
  }) => <script data-testid={id ?? src} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />,
}));

jest.mock('@/lib/utils/utm-parser', () => ({ persistUtmParams: jest.fn() }));

function metaPixelSnippet(): string {
  const { container } = render(<TrackingScripts />);
  const script = container.querySelector('[data-testid="meta-pixel"]');
  return script?.innerHTML ?? '';
}

describe('TrackingScripts — Meta Pixel', () => {
  it('initialises the client-owned dataset', () => {
    expect(metaPixelSnippet()).toContain(`fbq('init', '${META_PIXEL_OWNED}')`);
  });

  it('initialises the dataset the live ad account can read', () => {
    expect(metaPixelSnippet()).toContain(`fbq('init', '${META_PIXEL_ADS}')`);
  });

  it('initialises every declared dataset before tracking PageView', () => {
    const snippet = metaPixelSnippet();
    const initOrder = [...snippet.matchAll(/fbq\('init', '(\d+)'\)/g)].map((m) => m[1]);
    expect(initOrder).toEqual([...META_PIXEL_IDS]);
    // PageView must come last so it fans out to all of them.
    expect(snippet.indexOf("fbq('track', 'PageView')")).toBeGreaterThan(
      snippet.lastIndexOf("fbq('init'")
    );
  });

  it('declares two distinct datasets', () => {
    expect(new Set(META_PIXEL_IDS).size).toBe(2);
    expect(META_PIXEL_OWNED).not.toBe(META_PIXEL_ADS);
  });
});
