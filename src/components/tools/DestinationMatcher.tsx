'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { DestinationGuide } from '@/lib/data/guides';
import { getAllGuides } from '@/lib/data/guides';
import type { TripInterest } from '@/lib/tools/trip-planner-logic';
import {
  MATCHER_FITNESS_OPTIONS,
  MATCHER_GROUP_OPTIONS,
  MATCHER_INTEREST_OPTIONS,
  MATCHER_STYLE_OPTIONS,
  type DestinationMatcherAnswers,
  type MatcherFitness,
  type MatcherGroup,
  type MatcherStyle,
  getMatchedDestinations,
  isDestinationMatcherComplete,
} from '@/lib/tools/destination-matcher-logic';

export interface DestinationMatcherProps {
  guides?: DestinationGuide[];
}

type Ctx = {
  answers: DestinationMatcherAnswers;
  step: number;
  guides: DestinationGuide[];
  setInterest: (v: TripInterest) => void;
  setFitness: (v: MatcherFitness) => void;
  setGroup: (v: MatcherGroup) => void;
  setStyle: (v: MatcherStyle) => void;
  setStep: (n: number) => void;
  goNext: () => void;
  goBack: () => void;
  reset: () => void;
};

const DestinationMatcherContext = createContext<Ctx | null>(null);

function useDestinationMatcher(): Ctx {
  const v = useContext(DestinationMatcherContext);
  if (!v) throw new Error('DestinationMatcher components must be used within provider');
  return v;
}

const initialAnswers = (): DestinationMatcherAnswers => ({
  interest: null,
  fitness: null,
  group: null,
  style: null,
});

function StarRow({ stars }: { stars: number }) {
  const full = '★'.repeat(stars);
  const empty = '☆'.repeat(5 - stars);
  return (
    <span className="text-amber-500" aria-label={`${stars} out of 5 stars`}>
      {full}
      {empty}
    </span>
  );
}

function MatcherSteps() {
  const { step, setStep, answers, setInterest, setFitness, setGroup, setStyle, goNext, goBack } =
    useDestinationMatcher();

  return (
    <>
      {step === 1 && (
        <fieldset>
          <legend className="mb-4 font-serif text-xl font-semibold text-accent">
            What excites you most?
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {MATCHER_INTEREST_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 ${
                  answers.interest === opt.id
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-warm-200 hover:border-primary/40'
                }`}
              >
                <input
                  type="radio"
                  name="interest"
                  className="h-4 w-4 accent-primary"
                  checked={answers.interest === opt.id}
                  onChange={() => setInterest(opt.id)}
                />
                <span className="font-medium text-accent">{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend className="mb-4 font-serif text-xl font-semibold text-accent">
            How do you like to move each day?
          </legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {MATCHER_FITNESS_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className={`flex cursor-pointer flex-col rounded-xl border-2 p-4 text-center ${
                  answers.fitness === opt.id
                    ? 'border-secondary bg-secondary/5 shadow-md'
                    : 'border-warm-200 hover:border-secondary/40'
                }`}
              >
                <input
                  type="radio"
                  name="fitness"
                  className="sr-only"
                  checked={answers.fitness === opt.id}
                  onChange={() => setFitness(opt.id)}
                />
                <span className="font-semibold text-accent">{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend className="mb-4 font-serif text-xl font-semibold text-accent">
            Who are you travelling with?
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {MATCHER_GROUP_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 ${
                  answers.group === opt.id
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-warm-200 hover:border-primary/40'
                }`}
              >
                <input
                  type="radio"
                  name="group"
                  className="h-4 w-4 accent-primary"
                  checked={answers.group === opt.id}
                  onChange={() => setGroup(opt.id)}
                />
                <span className="font-medium text-accent">{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 4 && (
        <fieldset>
          <legend className="mb-4 font-serif text-xl font-semibold text-accent">
            What is your travel style?
          </legend>
          <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-3">
            {MATCHER_STYLE_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className={`flex cursor-pointer flex-col rounded-xl border-2 p-4 ${
                  answers.style === opt.id
                    ? 'border-secondary bg-secondary/5 shadow-md'
                    : 'border-warm-200 hover:border-secondary/40'
                }`}
              >
                <input
                  type="radio"
                  name="style"
                  className="sr-only"
                  checked={answers.style === opt.id}
                  onChange={() => setStyle(opt.id)}
                />
                <span className="font-semibold text-accent">{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-8 flex flex-wrap justify-between gap-3">
        <button
          type="button"
          className="rounded-full border border-warm-300 px-6 py-2.5 font-medium text-accent hover:bg-warm-50"
          onClick={goBack}
          disabled={step === 1}
        >
          Back
        </button>
        {step < 4 ? (
          <button
            type="button"
            className="rounded-full bg-primary px-6 py-2.5 font-medium text-white shadow-md hover:bg-primary/90"
            onClick={goNext}
            disabled={
              (step === 1 && !answers.interest) ||
              (step === 2 && !answers.fitness) ||
              (step === 3 && !answers.group)
            }
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            className="rounded-full bg-gradient-to-r from-primary to-red-500 px-6 py-2.5 font-medium text-white shadow-md hover:opacity-95"
            onClick={() => setStep(5)}
            disabled={!answers.style}
          >
            See matches
          </button>
        )}
      </div>
    </>
  );
}

function MatcherResults() {
  const { answers, guides, reset } = useDestinationMatcher();
  const matches = useMemo(
    () => (isDestinationMatcherComplete(answers) ? getMatchedDestinations(answers, guides, 4) : []),
    [answers, guides]
  );

  return (
    <section aria-label="Destination matches" className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-bold text-accent">Your top destinations</h2>
        <button
          type="button"
          className="text-sm font-medium text-primary hover:underline"
          onClick={reset}
        >
          Start over
        </button>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {matches.map(({ guide, stars }) => (
          <article
            key={guide.id}
            className="overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-sm transition hover:shadow-lg"
          >
            <div className="relative h-52 w-full">
              <Image
                src={guide.heroImage}
                alt={guide.destinationName}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
            <div className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-xl font-semibold text-accent">{guide.destinationName}</h3>
                <StarRow stars={stars} />
              </div>
              <p className="mt-2 text-sm text-gray-600">{guide.heroSubtitle}</p>
              <p className="mt-3 line-clamp-3 text-sm text-gray-700">{guide.introText[0]}</p>
              <Link
                href={`/guide/${guide.slug}`}
                className="mt-4 inline-block font-semibold text-primary hover:underline"
              >
                Open travel guide
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DestinationMatcherLayout({ children }: { children: ReactNode }) {
  const { step, setStep } = useDestinationMatcher();
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Destination matcher</p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-accent md:text-4xl">
          Find your perfect China destination
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Four quick questions — we rank destinations using your interests, pace, travel party, and style.
        </p>
      </header>

      {step < 5 && (
        <nav aria-label="Matcher progress" className="mb-10">
          <ol className="flex flex-wrap justify-center gap-2">
            {[1, 2, 3, 4].map((n) => (
              <li key={n}>
                <button
                  type="button"
                  aria-current={step === n ? 'step' : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    step === n
                      ? 'bg-primary text-white shadow-md'
                      : step > n
                        ? 'bg-secondary/15 text-secondary'
                        : 'bg-warm-100 text-gray-500'
                  }`}
                  onClick={() => setStep(n)}
                >
                  Step {n}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {children}
    </div>
  );
}

export default function DestinationMatcher({ guides: guidesProp }: DestinationMatcherProps) {
  const guides = guidesProp ?? getAllGuides();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<DestinationMatcherAnswers>(initialAnswers);

  const setInterest = useCallback((v: TripInterest) => {
    setAnswers((p) => ({ ...p, interest: v }));
  }, []);
  const setFitness = useCallback((v: MatcherFitness) => {
    setAnswers((p) => ({ ...p, fitness: v }));
  }, []);
  const setGroup = useCallback((v: MatcherGroup) => {
    setAnswers((p) => ({ ...p, group: v }));
  }, []);
  const setStyle = useCallback((v: MatcherStyle) => {
    setAnswers((p) => ({ ...p, style: v }));
  }, []);

  const reset = useCallback(() => {
    setAnswers(initialAnswers());
    setStep(1);
  }, []);

  const goNext = useCallback(() => setStep((s) => Math.min(5, s + 1)), []);
  const goBack = useCallback(() => setStep((s) => Math.max(1, s - 1)), []);

  const value = useMemo(
    () => ({
      answers,
      step,
      guides,
      setInterest,
      setFitness,
      setGroup,
      setStyle,
      setStep,
      goNext,
      goBack,
      reset,
    }),
    [answers, step, guides, setInterest, setFitness, setGroup, setStyle, goNext, goBack, reset]
  );

  return (
    <DestinationMatcherContext.Provider value={value}>
      <DestinationMatcherLayout>
        {step < 5 && (
          <div className="rounded-2xl border border-warm-200 bg-white p-6 shadow-sm md:p-10">
            <MatcherSteps />
          </div>
        )}
        {step === 5 && <MatcherResults />}
      </DestinationMatcherLayout>
    </DestinationMatcherContext.Provider>
  );
}
