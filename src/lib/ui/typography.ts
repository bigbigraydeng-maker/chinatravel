/**
 * Shared typography and surface class strings — Phase A W2 (Ceepii reskin).
 *
 * The 38 content pages render through three templates that each grew their own
 * heading, eyebrow and card treatments: DestinationGuide alone carried three
 * h2 variants and six h3 variants, with body text at text-[17px], text-[16px],
 * text-[15px] and text-sm. Converging that furniture is the actual prize of
 * week 2 — more than any single Ceepii flourish.
 *
 * These are plain string constants rather than a component. A component would
 * mean touching JSX structure in templates that emit schema, anchor ids and
 * conditional renders; swapping a className keeps the diff provably
 * presentational.
 *
 * Tokens used here all landed in W1 (`border`, `card`, `wash`, `subtle`,
 * `foreground`, `muted-foreground`). Brand tokens — primary, secondary,
 * accent, warm-* — are untouched.
 */

/**
 * Ceepii's italic accent, ported to Tailwind 3.
 *
 * Usage: apply to a heading, then wrap one word:
 *   <h2 className={H2_SECTION}>Frequently <span data-slot="italic">Asked</span> Questions</h2>
 *
 * Ceepii writes this as `*:data-[slot=italic]:italic` (Tailwind 4). Do NOT
 * copy that spelling here — Tailwind 3.4 compiles it to
 *   .class[data-slot=italic] > *
 * i.e. it expects the marker on the heading itself and styles every child.
 * Verified by compiling both forms and reading the generated CSS. The v4
 * spelling fails silently: no error, no italic, just no accent.
 *
 * The explicit arbitrary selector below compiles to what we actually want:
 *   .class > [data-slot=italic]
 */
function ITALIC_ACCENT_CLASSES(): string {
  return (
    '[&>[data-slot=italic]]:font-serif ' +
    '[&>[data-slot=italic]]:font-normal ' +
    '[&>[data-slot=italic]]:italic'
  );
}

/** Standalone form, for headings that do not use one of the presets below. */
export const ITALIC_ACCENT = ITALIC_ACCENT_CLASSES();

/**
 * Section heading with the underline rule, used for the major bands inside a
 * guide or hub page.
 *
 * font-medium rather than font-bold: at Playfair Display's weight range 700 is
 * heavy enough to compete with the h1, which is the single biggest reason the
 * current pages read as denser than Ceepii's.
 *
 * `tracking-[-0.01em]` is the Tailwind 3 spelling of Ceepii's `tracking-[-1%]`
 * (percentage tracking is a v4 feature).
 *
 * ITALIC_ACCENT below is Ceepii's accent pattern: wrap one word in
 * `<span data-slot="italic">` and it renders as italic serif at normal weight.
 */
export const H2_SECTION =
  'text-2xl sm:text-[1.75rem] font-serif font-medium tracking-[-0.01em] text-accent ' +
  'mb-6 pb-3 border-b border-border ' +
  ITALIC_ACCENT_CLASSES();

/** Same scale, no underline rule — for headings inside coloured bands. */
export const H2_BAND =
  'text-2xl sm:text-3xl font-serif font-medium tracking-[-0.01em] ' +
  ITALIC_ACCENT_CLASSES();

/** Card and list-item headings. Replaces six near-identical h3 treatments. */
export const H3_CARD = 'text-base font-semibold text-foreground leading-snug';

/**
 * Small uppercase label above a group. Replaces four drifting variants that
 * disagreed on tracking (wide vs widest) and on whether to uppercase at all.
 */
export const EYEBROW =
  'text-xs font-semibold uppercase tracking-widest text-muted-foreground';

/**
 * Ceepii's card language: hairline border, generous radius, no resting shadow,
 * and a background shift on hover rather than a lift. The existing cards mix
 * hover:shadow-md, hover:-translate-y-1 and border-colour changes; this is the
 * single treatment they converge on.
 */
export const CARD =
  'rounded-2xl border border-border bg-card transition-colors hover:bg-wash';

/** Card variant for panels that are not interactive. */
export const PANEL = 'rounded-2xl border border-border bg-card';

/**
 * Anchored sections need a scroll offset or the sticky nav covers the heading
 * you jumped to. The nav settled at ~84px in W1, so 24 (6rem) clears it.
 * FAQSection already used scroll-mt-24; this is the value everything else
 * converges on.
 */
export const ANCHOR_OFFSET = 'scroll-mt-24';
