/**
 * Frozen compliance copy on the homepage.
 *
 * Two of CTS's hard rules are copy rules, and until now nothing enforced them:
 * `grep -rl page-redesign src/__tests__/` returned nothing, so the homepage body
 * had no test at all. That was survivable while the page was only being
 * restyled. It stopped being survivable once whole sections started moving,
 * because the strings below live inside the sections that moved.
 *
 * 1. The brand red line. "1928" is when the CTS Group was founded in China. The
 *    New Zealand company is 25 years old (since 2000). Writing "Auckland since
 *    1928" merges the two into a claim CTS cannot make about its NZ entity.
 *    Nothing about the rendered page makes that error visible — the words look
 *    fine — so it can only be caught mechanically.
 *
 * 2. Three strings that have been signed off and must not be reworded while
 *    sections are rearranged around them. They may be MOVED; they may not be
 *    edited. Asserting the exact bytes is the whole point: a paraphrase that
 *    reads better is still a change to a compliance claim.
 *
 * This renders the real homepage body rather than asserting against source
 * text, so it also fails if a section is deleted or conditionally hidden.
 */

import { render } from '@testing-library/react';
import HomePageRedesign from '@/app/page-redesign';

// The hero search is a client component and calls useRouter on mount. Only its
// presence matters here; nothing in this file navigates.
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

describe('homepage frozen compliance copy', () => {
  function renderHomepage() {
    const { container } = render(<HomePageRedesign />);
    return container.textContent ?? '';
  }

  it('never claims the New Zealand company dates from 1928', () => {
    // The red line. 1928 = CTS Group in China; the NZ entity is since 2000.
    expect(renderHomepage()).not.toMatch(/Auckland\s+since\s+1928/i);
  });

  /**
   * Counts, not toContain. "Backed by CTS · Founded 1928" appears twice — once
   * in the hero trust row, once as a Why CTS feature heading — so a presence
   * check stays green when one of the two is deleted. Deleting the hero trust
   * row was tried against an earlier version of this file and it passed.
   */
  function occurrences(haystack: string, needle: string): number {
    return haystack.split(needle).length - 1;
  }

  it('keeps the NZ-tenure attribution, exactly once', () => {
    expect(
      occurrences(renderHomepage(), 'Auckland since 2000, backed by CTS (founded 1928)')
    ).toBe(1);
  });

  it('keeps the Why CTS lede, exactly once', () => {
    // Carries both the 25-year NZ claim and the 1928 parent claim in one
    // sentence, which is exactly why it is not to be reworded.
    expect(
      occurrences(
        renderHomepage(),
        'For 25 years CTS Tours NZ has crafted (parent CTS Group in the industry since 1928) exceptional travel experiences'
      )
    ).toBe(1);
  });

  it('keeps the founding attribution in both places it belongs', () => {
    // Hero trust row and Why CTS feature heading. If a redesign legitimately
    // drops one, change the number here deliberately rather than loosening the
    // assertion back to a presence check.
    expect(occurrences(renderHomepage(), 'Backed by CTS · Founded 1928')).toBe(2);
  });

  it('mentions 1928 only in the four approved formulations', () => {
    // The assertions above prove the approved strings are still PRESENT. This
    // one proves nothing else was ADDED — a new sentence pairing 1928 with the
    // NZ business would pass every check above.
    //
    // Deliberately an allowlist of exact strings rather than a proximity regex.
    // The first attempt here matched "1928" near "NZ/Kiwi/Auckland" and flagged
    // all four legitimate mentions, because the approved copy states both facts
    // in one breath on purpose — that is the whole point of the wording. A
    // proximity rule cannot separate the correct pairing from the wrong one.
    //
    // Adding a fifth mention is not forbidden; it just has to be looked at by a
    // person and added here, which is the intended cost.
    const APPROVED_1928_MENTIONS = [
      // Trust bar
      'Auckland since 2000, backed by CTS (founded 1928)',
      // Why CTS lede
      'For 25 years CTS Tours NZ has crafted (parent CTS Group in the industry since 1928) exceptional travel experiences',
      // Hero trust row + Why CTS feature heading (same string, two places)
      'Backed by CTS · Founded 1928',
      // Why CTS feature body
      "Backed by CTS — China's travel brand since 1928 — with 25 years of Kiwi-led NZ operations",
    ];

    let remaining = renderHomepage();
    for (const approved of APPROVED_1928_MENTIONS) {
      remaining = remaining.split(approved).join('');
    }
    expect(remaining).not.toContain('1928');
  });
});
