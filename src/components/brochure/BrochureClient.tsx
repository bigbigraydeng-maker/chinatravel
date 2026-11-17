'use client';

// The online brochure: a web version of the CTS PDF brochure, with the three-question picker and the
// cookie-gated "Ask Baker to call me" panel. Layout and wording follow the PDF; all values come from `view`.

import { useState } from 'react';
import { recommendCards, type BrochureCard, type Pace, type PickerAnswers, type TripLength } from '@/lib/brochure/picker';
import type { BrochureView, TourPage } from '@/lib/brochure/view';
import { useCallMe, type QuizPayload } from './CallMe';
import ClosingBand from './ClosingBand';
import CoverHero from './CoverHero';
import FourWays from './FourWays';
import PickerBand from './PickerBand';
import { AsiaCards, Stopovers } from './StopoversAsia';
import { LEDE, SERIF, WRAP } from './styles';
import TourPageSection from './TourPageSection';

export interface BrochureClientProps {
  view: BrochureView;
  candidates: BrochureCard[];
  days: Array<{ value: string; label: string }>;
  pdfSize: string | null;
}

const COLLECTIONS: Array<{ id: string; name: string; lede: string }> = [
  { id: 'discovery-collection', name: 'Discovery Collection', lede: 'The classic routes. This is where most first trips to China start.' },
  { id: 'signature-collection', name: 'Signature Collection', lede: 'Longer and further, with river cruises and first-class high-speed rail on selected journeys.' },
];

export default function BrochureClient({ view, candidates, days, pdfSize }: BrochureClientProps) {
  const [length, setLength] = useState<TripLength | null>(null);
  const [firstVisit, setFirstVisit] = useState<boolean | null>(null);
  const [pace, setPace] = useState<Pace | null>(null);
  const call = useCallMe(days);

  const answers: PickerAnswers | null =
    length !== null && firstVisit !== null && pace !== null ? { length, firstVisit, pace } : null;
  const picks = answers ? recommendCards(answers, candidates) : [];
  const quiz: QuizPayload | null = answers
    ? { length: answers.length, firstVisit: answers.firstVisit, pace: answers.pace, picks: picks.map((c) => c.path) }
    : null;

  const byCollection = (name: string): TourPage[] => view.tourPages.filter((t) => t.collection === name);

  return (
    <div className="bg-surface text-[17px] text-ink">
      <CoverHero view={view} pdfSize={pdfSize} />
      <FourWays view={view} />
      <PickerBand
        length={length}
        firstVisit={firstVisit}
        pace={pace}
        setLength={setLength}
        setFirstVisit={setFirstVisit}
        setPace={setPace}
        answered={answers !== null}
        picks={picks}
        call={call}
        quiz={quiz}
      />
      {COLLECTIONS.map((c) => {
        const tours = byCollection(c.name);
        if (tours.length === 0) return null;
        return (
          <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className={`${WRAP} scroll-mt-24 pt-14 sm:pt-20`}>
            <h2 id={`${c.id}-title`} className={`${SERIF} text-[2.25rem] font-bold leading-tight text-ink sm:text-5xl`}>
              {c.name}
            </h2>
            <p className={`${LEDE} mt-3`}>
              {tours.length} {tours.length === 1 ? 'tour' : 'tours'}. {c.lede}
            </p>
            <div className="mt-8 space-y-10">
              {tours.map((t) => (
                <TourPageSection key={t.anchor} tour={t} call={call} quiz={quiz} />
              ))}
            </div>
          </section>
        );
      })}
      <Stopovers rows={view.stopovers} />
      <AsiaCards cards={view.asia} />
      <ClosingBand pdfSize={pdfSize} />
    </div>
  );
}
