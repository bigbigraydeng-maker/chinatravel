'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { recommendCards, type BrochureCard, type Pace, type PickerAnswers, type TripLength } from '@/lib/brochure/picker';
import { VIEW_FLAG_COOKIE } from '@/lib/me-click-beacon';
import { CTS_PHONE_DISPLAY, CTS_PHONE_HREF } from '@/lib/site';
import { H2_SECTION, H3_CARD, PANEL } from '@/lib/ui/typography';

export interface BrochureClientProps {
  groups: Array<{ key: string; title: string; cards: BrochureCard[] }>;
  candidates: BrochureCard[];
  today: string;
  days: Array<{ value: string; label: string }>;
}

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

type CallWindow = 'morning' | 'afternoon' | 'evening';

const WINDOW_OPTIONS: Array<{ value: CallWindow; label: string }> = [
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening', label: 'Evening' },
];

function hasFlagCookie(): boolean {
  return document.cookie.split(';').some((c) => c.trim() === `${VIEW_FLAG_COOKIE}=1`);
}

const BUTTON_CLASSES =
  'mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white disabled:opacity-60';

const LINK_CLASSES = 'inline-flex min-h-[44px] items-center font-semibold text-primary underline';

function optionClasses(selected: boolean): string {
  return `flex min-h-[44px] cursor-pointer flex-col justify-center rounded-xl border-2 p-4 text-center text-base font-semibold text-accent focus-within:ring-2 focus-within:ring-primary ${
    selected ? 'border-primary bg-primary/5 shadow-md' : 'border-border hover:border-primary/40'
  }`;
}

export default function BrochureClient({ groups, candidates, days }: BrochureClientProps) {
  const [length, setLength] = useState<TripLength | null>(null);
  const [firstVisit, setFirstVisit] = useState<boolean | null>(null);
  const [pace, setPace] = useState<Pace | null>(null);

  const [flagOn, setFlagOn] = useState(false);
  useEffect(() => {
    setFlagOn(hasFlagCookie());
  }, []);

  const [panel, setPanel] = useState<{
    origin: string;
    tourPath: string | null;
    tourName: string;
  } | null>(null);

  const [day, setDay] = useState<string>(days[0]?.value ?? '');
  const [callWindow, setCallWindow] = useState<CallWindow>('morning');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const answers: PickerAnswers | null =
    length !== null && firstVisit !== null && pace !== null
      ? { length, firstVisit, pace }
      : null;
  const picks = answers ? recommendCards(answers, candidates) : [];

  function openPanel(origin: string, tourPath: string | null, tourName: string) {
    setPanel({ origin, tourPath, tourName });
    setStatus('idle');
  }

  async function confirm() {
    if (!panel) return;
    setStatus('sending');
    const quiz = answers
      ? {
          length: answers.length,
          firstVisit: answers.firstVisit,
          pace: answers.pace,
          picks: picks.map((c) => c.path),
        }
      : null;
    try {
      const res = await fetch('/api/me-callback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          date: day,
          window: callWindow,
          tourPath: panel.tourPath,
          quiz,
        }),
      });
      setStatus(res.status === 204 ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  function renderPanel() {
    if (!panel) return null;
    const dayLabel = days.find((d) => d.value === day)?.label ?? day;
    const windowLabel = (
      WINDOW_OPTIONS.find((w) => w.value === callWindow)?.label ?? ''
    ).toLowerCase();
    return (
      <div
        className="mt-4 rounded-xl border-2 border-primary bg-wash p-4"
        role="group"
        aria-label="Ask Baker to call me"
      >
        <p>
          Tour: <strong>{panel.tourName}</strong>
        </p>
        <label htmlFor="call-day" className="block font-semibold">
          Which day?
        </label>
        <select
          id="call-day"
          className="min-h-[44px] rounded-lg border border-border px-3 text-base"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          {days.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <fieldset className="mt-4">
          <legend className="mb-2 font-semibold">Which part of the day?</legend>
          <div className="grid gap-3 sm:grid-cols-3">
          {WINDOW_OPTIONS.map((opt) => (
            <label key={opt.value} className={optionClasses(callWindow === opt.value)}>
              <input
                type="radio"
                className="sr-only"
                name="callWindow"
                checked={callWindow === opt.value}
                onChange={() => setCallWindow(opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
          </div>
        </fieldset>
        <button type="button" disabled={status === 'sending' || status === 'done'} onClick={confirm} className={BUTTON_CLASSES}>
          Confirm
        </button>
        {status === 'done' && (
          <p role="status" className="mt-4 font-semibold">
            Thank you. Baker will call you on {dayLabel} ({windowLabel}).
          </p>
        )}
        {status === 'error' && (
          <p role="alert" className="mt-4 font-semibold">
            Sorry, that did not go through. Please call us on {CTS_PHONE_DISPLAY}.
          </p>
        )}
      </div>
    );
  }

  function renderCard(card: BrochureCard, origin: string) {
    return (
      <article key={origin} className={`${PANEL} space-y-2 p-5`}>
        <h3 className={H3_CARD}>{card.name}</h3>
        <p>{card.duration}</p>
        <p className="font-semibold">{card.price} per person, twin share</p>
        {card.departures.length > 0 ? (
          <p>
            Departures: {card.departures.join(', ')}
            {card.moreDepartures > 0 ? ` + ${card.moreDepartures} more` : ''}
          </p>
        ) : (
          <p>Ask us for upcoming dates</p>
        )}
        <Link href={card.path} className={LINK_CLASSES}>
          See this tour
        </Link>
        {flagOn ? (
          <>
            <button
              type="button"
              className={BUTTON_CLASSES}
              onClick={() => openPanel(origin, card.path, card.name)}
            >
              Ask Baker to call me about this tour
            </button>
            {panel?.origin === origin && renderPanel()}
          </>
        ) : (
          <a href={CTS_PHONE_HREF} className={BUTTON_CLASSES}>
            Call us
          </a>
        )}
      </article>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-base">
      <header>
        <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-md">
          <Image
            src="/images/baker-gu-portrait.jpg"
            alt="Baker Gu, China Travel Specialist"
            fill
            className="object-cover object-center"
            sizes="96px"
          />
        </div>
        <h1 className="mt-4 text-center font-serif text-3xl font-bold text-accent md:text-4xl">
          CTS Tours 2027 China tours
        </h1>
        <p className="mt-3 text-center text-lg text-gray-700">
          All our tours in one place, with prices and open dates. Questions? Call Baker on{' '}
          <a href={CTS_PHONE_HREF} className={LINK_CLASSES}>
            {CTS_PHONE_DISPLAY}
          </a>
          .
        </p>
      </header>

      <section aria-labelledby="help-me-choose" className="mt-10 space-y-6">
        <h2 id="help-me-choose" className={H2_SECTION}>
          Help me choose
        </h2>

        <fieldset>
          <legend className="mb-4 font-serif text-xl font-semibold text-accent">
            How long would you like to travel?
          </legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {LENGTH_OPTIONS.map((opt) => (
              <label key={opt.value} className={optionClasses(length === opt.value)}>
                <input
                  type="radio"
                  className="sr-only"
                  name="length"
                  checked={length === opt.value}
                  onChange={() => setLength(opt.value)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-4 font-serif text-xl font-semibold text-accent">
            Is this your first trip to China?
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {FIRST_OPTIONS.map((opt) => (
              <label key={String(opt.value)} className={optionClasses(firstVisit === opt.value)}>
                <input
                  type="radio"
                  className="sr-only"
                  name="firstVisit"
                  checked={firstVisit === opt.value}
                  onChange={() => setFirstVisit(opt.value)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-4 font-serif text-xl font-semibold text-accent">
            What pace suits you?
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {PACE_OPTIONS.map((opt) => (
              <label key={opt.value} className={optionClasses(pace === opt.value)}>
                <input
                  type="radio"
                  className="sr-only"
                  name="pace"
                  checked={pace === opt.value}
                  onChange={() => setPace(opt.value)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      {answers !== null && (
        <section aria-labelledby="our-suggestions" className="mt-10">
          <h2 id="our-suggestions" className={H2_SECTION}>
            Our suggestions for you
          </h2>
          {picks.length === 0 ? (
            <p>Please call us and Baker will suggest a tour.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {picks.map((c) => renderCard(c, `pick-${c.path}`))}
            </div>
          )}
          {flagOn ? (
            <>
              <button
                type="button"
                className={BUTTON_CLASSES}
                onClick={() => openPanel('quiz', null, 'Any tour')}
              >
                Ask Baker to call me
              </button>
              {panel?.origin === 'quiz' && renderPanel()}
            </>
          ) : (
            <a href={CTS_PHONE_HREF} className={BUTTON_CLASSES}>
              Call us
            </a>
          )}
        </section>
      )}

      {groups.map((g) =>
        g.cards.length === 0 ? null : (
          <section key={g.key} aria-labelledby={`group-${g.key}`} className="mt-10">
            <h2 id={`group-${g.key}`} className={H2_SECTION}>
              {g.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {g.cards.map((c) => renderCard(c, `${g.key}-${c.path}`))}
            </div>
          </section>
        )
      )}
    </div>
  );
}
