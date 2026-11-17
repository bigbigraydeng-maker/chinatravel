import Image from 'next/image';
import type { BrochureView } from '@/lib/brochure/view';
import { BTN_GOLD, BTN_ON_DARK, EYEBROW_GOLD, PDF_FILENAME, PDF_HREF, SERIF } from './styles';

const NUM_WORD = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

function countWord(n: number): string {
  const w = NUM_WORD[n] ?? String(n);
  return w.charAt(0).toUpperCase() + w.slice(1);
}

/** The intro sentence of the PDF cover, rebuilt from today's data. Parts without data are left out. */
export function coverIntro(view: BrochureView): string {
  const parts: string[] = [];
  if (view.guidedTours > 0) {
    const tours = `${countWord(view.guidedTours)} guided ${view.guidedTours === 1 ? 'tour' : 'tours'}`;
    const deps =
      view.guidedDepartures > 0
        ? ` with ${view.guidedDepartures} scheduled group ${view.guidedDepartures === 1 ? 'departure' : 'departures'} from Auckland`
        : '';
    const stops = view.stopoverCount > 0 ? `, plus ${view.stopoverCount} short China stopovers` : '';
    parts.push(`${tours}${deps}${stops}.`);
  }
  const prices: string[] = [];
  if (view.guidedFrom) prices.push(`Tours from ${view.guidedFrom} per person`);
  if (view.stopoverFrom) prices.push(`stopovers from ${view.stopoverFrom} per person`);
  if (prices.length > 0) parts.push(`${prices.join('; ')}, twin share.`);
  return parts.join(' ');
}

export default function CoverHero({ view, pdfSize }: { view: BrochureView; pdfSize: string | null }) {
  return (
    <header className="relative isolate flex min-h-[600px] items-end overflow-hidden bg-[#1A1815] text-white sm:min-h-[680px]">
      <Image
        src="/images/tours/great-wall-cloud-sea-1600.jpg"
        alt="The Great Wall above a sea of cloud"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[50%_35%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(20,18,16,.45)_0%,rgba(20,18,16,.30)_20%,rgba(20,18,16,.68)_40%,rgba(20,18,16,.94)_100%)]"
      />
      <div className="mx-auto w-full max-w-5xl px-4 pb-12 pt-32 sm:px-6 sm:pb-16">
        <p className={`${EYEBROW_GOLD} inline-block bg-[#1A1815]/80 px-3 py-1.5`}>China · 2027 departures</p>
        <div className="mb-5 mt-5 h-1.5 w-20 bg-secondary" aria-hidden="true" />
        <h1 className={`${SERIF} text-[2.75rem] font-bold leading-[1.04] tracking-[-0.015em] sm:text-7xl`}>
          Kiwi journeys to <span className="text-secondary">China</span> 2027
        </h1>
        <p className="mt-5 max-w-2xl text-[19px] leading-relaxed text-[#F3EDE5]">{coverIntro(view)}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#help-me-choose" className={BTN_GOLD}>
            Help me choose a tour
          </a>
          <a href={PDF_HREF} download={PDF_FILENAME} className={`${BTN_ON_DARK} flex-wrap`}>
            <span>Download the PDF brochure</span>
            {pdfSize && <span className="whitespace-nowrap text-[15px] font-normal text-white/80">(PDF · {pdfSize})</span>}
          </a>
        </div>
        <p className="mt-8 border-t border-white/30 pt-4 text-[16px] text-white/85">
          Auckland-based · TAANZ-bonded · Backed by China Travel Service
        </p>
      </div>
    </header>
  );
}
