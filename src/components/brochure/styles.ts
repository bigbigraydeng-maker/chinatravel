// Shared class strings for the online brochure. Colours, type and rules follow the PDF brochure's stylesheet
// (brochure-source build.py): crimson #B61E2E, gold #D6A756, ink #23201C, muted #5A554F, surface #FBF7F0,
// line #E6DFD4, Georgia display type. Gold text on light paper uses a darker gold so it stays readable.

export const PDF_HREF = '/brochures/CTS-Tours-2026-2027-Brochure.pdf';
export const PDF_FILENAME = 'CTS-Tours-2026-2027-Brochure.pdf';

export const SERIF = "font-['Georgia','Times_New_Roman',serif]";
export const GOLD_ON_LIGHT = 'text-[#8A6420]';
export const LINE = 'border-[#E6DFD4]';

export const EYEBROW = 'text-[13px] font-bold uppercase tracking-[0.22em]';
export const EYEBROW_RED = `${EYEBROW} text-primary`;
export const EYEBROW_GOLD = `${EYEBROW} text-secondary`;

export const TITLE = `${SERIF} text-[2.25rem] font-bold leading-[1.1] tracking-[-0.01em] text-ink sm:text-5xl`;
export const LEDE = 'max-w-2xl text-[19px] leading-relaxed text-ink-muted';
export const SECT = 'mb-3 font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-primary';

const BTN = 'inline-flex min-h-[48px] items-center justify-center gap-2 rounded px-5 py-3 text-[17px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
export const BTN_RED = `${BTN} bg-primary text-white hover:bg-[#9A1826] focus-visible:outline-primary disabled:opacity-60`;
export const BTN_GOLD = `${BTN} bg-secondary text-[#2A2009] hover:bg-[#C9974A] focus-visible:outline-secondary`;
export const BTN_OUTLINE = `${BTN} border-2 border-primary bg-white text-primary hover:bg-[#FBF0EF] focus-visible:outline-primary`;
export const BTN_ON_DARK = `${BTN} border-2 border-white/80 text-white hover:bg-white/10 focus-visible:outline-white`;

export const LINK = 'font-semibold text-primary underline underline-offset-4 hover:text-[#9A1826]';

export const WRAP = 'mx-auto w-full max-w-5xl px-4 sm:px-6';
