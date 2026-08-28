/**
 * Anchor contract test — Phase 0 v3.1 §4.9
 *
 * CLAUDE.md pins four anchor ids used by cross-page nav (`#visa-nudge`,
 * `#faq`, `#trust-signals`, `#planning-resources`). Each id lives in exactly
 * one component. If the Ceepii shell rewrite drops the id, or renames the
 * component's root element, this test fails immediately instead of us
 * discovering it days later on staging.
 *
 * We assert against the component in isolation (rather than a full page
 * render) so the test stays cheap and doesn't need Supabase / image loader
 * mocks. Shared-blocks contract — "each consumer page still imports these
 * components" — is covered by src/__tests__/shared-blocks.test.ts.
 */

import { render } from '@testing-library/react';
import ChinaVisaNudge from '@/components/tours/ChinaVisaNudge';
import FAQSection from '@/components/FAQSection';
import TourTrustSignals from '@/components/tours/TourTrustSignals';
import TourSupportingContentLinks from '@/components/tours/TourSupportingContentLinks';

// TourSupportingContentLinks returns null when the supporting-links helper
// yields an empty list — mock it to always return the anchor block so we can
// assert against the id, independent of real tour-data fixtures.
jest.mock('@/lib/tour-supporting-links', () => ({
  getTourSupportingLinks: () => [
    { label: 'Test link', href: '/test' },
  ],
}));

describe('anchor id contract (CLAUDE.md)', () => {
  it('ChinaVisaNudge renders #visa-nudge with scroll-mt-24', () => {
    const { container } = render(<ChinaVisaNudge />);
    const el = container.querySelector('#visa-nudge');
    expect(el).not.toBeNull();
    expect(el?.className ?? '').toContain('scroll-mt-24');
  });

  it('FAQSection renders #faq with scroll-mt-24', () => {
    // FAQSection accepts `faqs` prop — pass a minimal valid list so it renders.
    const { container } = render(
      <FAQSection
        faqs={[{ question: 'Test?', answer: 'Yes.' }]}
      />
    );
    const el = container.querySelector('#faq');
    expect(el).not.toBeNull();
    expect(el?.className ?? '').toContain('scroll-mt-24');
  });

  it('TourTrustSignals renders #trust-signals with scroll-mt-24', () => {
    const { container } = render(<TourTrustSignals />);
    const el = container.querySelector('#trust-signals');
    expect(el).not.toBeNull();
    expect(el?.className ?? '').toContain('scroll-mt-24');
  });

  it('TourSupportingContentLinks renders #planning-resources with scroll-mt-24', () => {
    // Cast: the component only reads what the mocked helper needs, so a
    // minimal stub tour is enough to render.
    const stubTour = { slug: 'test-tour' } as unknown as Parameters<typeof TourSupportingContentLinks>[0]['tour'];
    const { container } = render(<TourSupportingContentLinks tour={stubTour} />);
    const el = container.querySelector('#planning-resources');
    expect(el).not.toBeNull();
    expect(el?.className ?? '').toContain('scroll-mt-24');
  });
});
