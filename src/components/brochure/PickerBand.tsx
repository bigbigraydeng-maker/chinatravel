'use client';

import Link from 'next/link';
import type { BrochureCard, Pace, TripLength } from '@/lib/brochure/picker';
import { shortTourName } from '@/lib/brochure/view';
import { CallAction, OpenPanel, optionClasses, type CallMeState, type QuizPayload } from './CallMe';
import { BTN_ON_DARK, BTN_RED, LINK, SERIF, WRAP } from './styles';

const LENGTH_OPTIONS: Array<{ value: TripLength; label: string }> = [
  { value: '10', label: 'About 10 days' },
  { value: '15', label: 'About 2 weeks' },
  { value: '17', label: '3 weeks or more' },
];
const FIRST_OPTIONS: Array<{ value: boolean; label: string }> = [
  { value: true, label: 'Yes, first time' },
  { value: false, label: "I've been before" },
];
const PACE_OPTIONS: Array<{ value: Pace; label: string }> = [
  { value: 'easy', label: 'Take it easy' },
  { value: 'full', label: 'See as much as I can' },
];

function Question<T>({ legend, name, options, value, onChange, cols }: {
  legend: string;
  name: string;
  options: Array<{ value: T; label: string }>;
  value: T | null;
  onChange: (v: T) => void;
  cols: string;
}) {
  return (
    <fieldset>
      <legend className={`${SERIF} mb-3 text-[1.35rem] font-bold text-white`}>{legend}</legend>
      <div className={`grid gap-3 ${cols}`}>
        {options.map((opt) => (
          <label key={opt.label} className={optionClasses(value === opt.value, true)}>
            <input type="radio" className="sr-only" name={name} checked={value === opt.value} onChange={() => onChange(opt.value)} />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function PickCard({ card, call, quiz }: { card: BrochureCard; call: CallMeState; quiz: QuizPayload | null }) {
  const origin = `pick-${card.path}`;
  return (
    <article className="flex flex-col bg-white p-5 text-ink">
      <h3 className={`${SERIF} text-[1.4rem] font-bold leading-tight`}>{shortTourName(card.name)}</h3>
      <p className="mt-2 text-[17px]">
        {card.duration} · from <b className="text-primary">{card.price}</b> per person, twin share
      </p>
      <p className="mt-2 text-[17px] text-ink-muted">
        {card.departures.length > 0
          ? `Departures: ${card.departures.join(', ')}${card.moreDepartures > 0 ? ` + ${card.moreDepartures} more` : ''}`
          : 'Ask us for upcoming dates'}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link href={card.path} className={`inline-flex min-h-[44px] items-center text-[17px] ${LINK}`}>
          See this tour
        </Link>
        <CallAction call={call} origin={origin} tourPath={card.path} tourName={card.name} label="Ask Baker to call me about this tour" buttonClass={BTN_RED} />
      </div>
      <OpenPanel call={call} origin={origin} quiz={quiz} />
    </article>
  );
}

export interface PickerBandProps {
  length: TripLength | null;
  firstVisit: boolean | null;
  pace: Pace | null;
  setLength: (v: TripLength) => void;
  setFirstVisit: (v: boolean) => void;
  setPace: (v: Pace) => void;
  answered: boolean;
  picks: BrochureCard[];
  call: CallMeState;
  quiz: QuizPayload | null;
}

export default function PickerBand(p: PickerBandProps) {
  return (
    <section id="help-me-choose" aria-labelledby="help-me-choose-title" className="scroll-mt-24 bg-primary py-14 text-white sm:py-20">
      <div className={WRAP}>
        <h2 id="help-me-choose-title" className={`${SERIF} text-[2.25rem] font-bold leading-tight sm:text-5xl`}>
          Still deciding?
        </h2>
        <p className="mt-4 max-w-2xl text-[19px] leading-relaxed text-white/90">
          Answer three questions and we will suggest two tours.
        </p>
        <div className="mt-10 space-y-8">
          <Question legend="How long would you like to travel?" name="length" options={LENGTH_OPTIONS} value={p.length} onChange={p.setLength} cols="sm:grid-cols-3" />
          <Question legend="Is this your first trip to China?" name="firstVisit" options={FIRST_OPTIONS} value={p.firstVisit} onChange={p.setFirstVisit} cols="sm:grid-cols-2" />
          <Question legend="What pace suits you?" name="pace" options={PACE_OPTIONS} value={p.pace} onChange={p.setPace} cols="sm:grid-cols-2" />
        </div>
        {p.answered && (
          <section aria-labelledby="our-suggestions" className="mt-12 border-t border-white/30 pt-10">
            <h2 id="our-suggestions" className={`${SERIF} text-[1.9rem] font-bold leading-tight`}>
              Our suggestions for you
            </h2>
            {p.picks.length === 0 ? (
              <p className="mt-4 text-[17px]">Please call us and Baker will suggest a tour.</p>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {p.picks.map((c) => (
                  <PickCard key={c.path} card={c} call={p.call} quiz={p.quiz} />
                ))}
              </div>
            )}
            <div className="mt-6">
              <CallAction call={p.call} origin="quiz" tourPath={null} tourName="Any tour" label="Ask Baker to call me" buttonClass={BTN_ON_DARK} />
              <OpenPanel call={p.call} origin="quiz" quiz={p.quiz} />
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
