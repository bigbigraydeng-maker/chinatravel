'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import type { Tour } from '@/lib/data/tours';
import type { BlogPost } from '@/lib/data/blogs';
import type { DestinationGuide } from '@/lib/data/guides';
import { getAllBlogPosts } from '@/lib/data/blogs';
import { getAllGuides } from '@/lib/data/guides';
import { getAllChinaTours } from '@/lib/data/tours';
import {
  TRIP_BUDGET_OPTIONS,
  TRIP_DURATION_OPTIONS,
  TRIP_INTEREST_OPTIONS,
  TRIP_SEASON_OPTIONS,
  type TripBudget,
  type TripDurationBucket,
  type TripInterest,
  type TripPlannerAnswers,
  type TripSeason,
  getRecommendedTours,
  getRelatedBlogPosts,
  getRelatedGuides,
  isTripPlannerComplete,
  tourDetailPath,
} from '@/lib/tools/trip-planner-logic';

export interface TripPlannerProps {
  tours?: Tour[];
  blogPosts?: BlogPost[];
  guides?: DestinationGuide[];
}

const initialAnswers = (): TripPlannerAnswers => ({
  duration: null,
  interests: [],
  budget: null,
  season: null,
});

export default function TripPlanner({
  tours: toursProp,
  blogPosts: blogPostsProp,
  guides: guidesProp,
}: TripPlannerProps) {
  const tours = toursProp ?? getAllChinaTours();
  const blogPosts = blogPostsProp ?? getAllBlogPosts();
  const guides = guidesProp ?? getAllGuides();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<TripPlannerAnswers>(initialAnswers);

  const complete = isTripPlannerComplete(answers);

  const recommendedTours = useMemo(
    () => (complete ? getRecommendedTours(answers, tours, 3) : []),
    [answers, complete, tours]
  );

  const relatedBlogs = useMemo(
    () => (complete ? getRelatedBlogPosts(answers.interests, blogPosts, 3) : []),
    [answers.interests, blogPosts, complete]
  );

  const relatedGuides = useMemo(
    () => (complete ? getRelatedGuides(answers.interests, guides, 4) : []),
    [answers.interests, complete, guides]
  );

  const toggleInterest = useCallback((id: TripInterest) => {
    setAnswers((prev) => {
      const has = prev.interests.includes(id);
      return {
        ...prev,
        interests: has ? prev.interests.filter((x) => x !== id) : [...prev.interests, id],
      };
    });
  }, []);

  const reset = useCallback(() => {
    setAnswers(initialAnswers());
    setStep(1);
  }, []);

  const goResults = useCallback(() => {
    if (isTripPlannerComplete(answers)) setStep(5);
  }, [answers]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Trip planner</p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-accent md:text-4xl">
          Build your China itinerary style
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Answer four quick questions. We will match tours, articles, and destination guides to your
          preferences.
        </p>
      </header>

      <nav aria-label="Planner progress" className="mb-10">
        <ol className="flex flex-wrap justify-center gap-2 md:gap-4">
          {[1, 2, 3, 4].map((n) => (
            <li key={n}>
              <button
                type="button"
                aria-current={step === n ? 'step' : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  step === n
                    ? 'bg-primary text-white shadow-md'
                    : step > n
                      ? 'bg-secondary/15 text-secondary'
                      : 'bg-warm-100 text-gray-500'
                }`}
                onClick={() => setStep(n)}
              >
                {n === 1 && 'Duration'}
                {n === 2 && 'Interests'}
                {n === 3 && 'Budget'}
                {n === 4 && 'Season'}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {step < 5 && (
        <div className="rounded-2xl border border-warm-200 bg-white p-6 shadow-sm md:p-10">
          {step === 1 && (
            <fieldset>
              <legend className="mb-4 font-serif text-xl font-semibold text-accent">
                How long do you want to travel?
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {TRIP_DURATION_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                      answers.duration === opt.id
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-warm-200 hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="duration"
                      className="h-4 w-4 accent-primary"
                      checked={answers.duration === opt.id}
                      onChange={() =>
                        setAnswers((p) => ({ ...p, duration: opt.id as TripDurationBucket }))
                      }
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
                What are you most interested in? (choose any)
              </legend>
              <p id="interests-hint" className="mb-3 text-sm text-gray-600">
                Select one or more themes — we use them to rank tours and guides.
              </p>
              <div
                className="grid gap-3 sm:grid-cols-2"
                role="group"
                aria-labelledby="interests-hint"
              >
                {TRIP_INTEREST_OPTIONS.map((opt) => {
                  const checked = answers.interests.includes(opt.id);
                  return (
                    <label
                      key={opt.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                        checked
                          ? 'border-secondary bg-secondary/5 shadow-md'
                          : 'border-warm-200 hover:border-secondary/40'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-secondary"
                        checked={checked}
                        onChange={() => toggleInterest(opt.id as TripInterest)}
                        aria-label={opt.label}
                      />
                      <span className="font-medium text-accent">{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <fieldset>
              <legend className="mb-4 font-serif text-xl font-semibold text-accent">
                What is your budget comfort level?
              </legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {TRIP_BUDGET_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer flex-col rounded-xl border-2 p-4 text-center transition-all ${
                      answers.budget === opt.id
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-warm-200 hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="budget"
                      className="sr-only"
                      checked={answers.budget === opt.id}
                      onChange={() =>
                        setAnswers((p) => ({ ...p, budget: opt.id as TripBudget }))
                      }
                    />
                    <span className="font-semibold text-accent">{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {step === 4 && (
            <fieldset>
              <legend className="mb-4 font-serif text-xl font-semibold text-accent">
                When do you hope to travel?
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {TRIP_SEASON_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                      answers.season === opt.id
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-warm-200 hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="season"
                      className="h-4 w-4 accent-primary"
                      checked={answers.season === opt.id}
                      onChange={() =>
                        setAnswers((p) => ({ ...p, season: opt.id as TripSeason }))
                      }
                    />
                    <span className="font-medium text-accent">{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-8 flex flex-wrap justify-between gap-3">
            <button
              type="button"
              className="rounded-full border border-warm-300 px-6 py-2.5 font-medium text-accent transition-colors hover:bg-warm-50"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              Back
            </button>
            {step < 4 ? (
              <button
                type="button"
                className="rounded-full bg-primary px-6 py-2.5 font-medium text-white shadow-md transition hover:bg-primary/90"
                onClick={() => setStep((s) => s + 1)}
                disabled={
                  (step === 1 && !answers.duration) ||
                  (step === 2 && answers.interests.length === 0) ||
                  (step === 3 && !answers.budget)
                }
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                className="rounded-full bg-gradient-to-r from-primary to-red-500 px-6 py-2.5 font-medium text-white shadow-md transition hover:opacity-95"
                onClick={goResults}
                disabled={!answers.season}
              >
                See recommendations
              </button>
            )}
          </div>
        </div>
      )}

      {step === 5 && complete && (
        <section aria-label="Your recommendations" className="space-y-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-bold text-accent">Your personalised picks</h2>
            <button
              type="button"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              onClick={reset}
            >
              Start over
            </button>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-xl font-semibold text-accent">Recommended tours</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {recommendedTours.map((tour) => (
                <article
                  key={`${tour.tier}-${tour.slug}`}
                  className="flex flex-col overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="relative h-44 w-full">
                    <Image
                      src={tour.heroImage}
                      alt={tour.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h4 className="font-serif text-lg font-semibold text-accent">{tour.title}</h4>
                    <p className="mt-2 line-clamp-3 text-sm text-gray-600">{tour.shortDescription}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      {tour.duration} · {tour.price}
                    </p>
                    <Link
                      href={tourDetailPath(tour)}
                      className="mt-auto pt-4 text-sm font-semibold text-primary hover:underline"
                    >
                      View tour
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-xl font-semibold text-accent">From our blog</h3>
            <ul className="grid gap-4 md:grid-cols-3">
              {relatedBlogs.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block rounded-xl border border-warm-200 bg-warm-50/50 p-4 transition hover:border-primary/40 hover:shadow-md"
                  >
                    <span className="font-medium text-accent">{post.title}</span>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-xl font-semibold text-accent">Destination guides</h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {relatedGuides.map((g) => (
                <li key={g.id}>
                  <Link
                    href={`/guide/${g.slug}`}
                    className="flex gap-4 rounded-xl border border-warm-200 bg-white p-3 transition hover:border-secondary/40 hover:shadow-md"
                  >
                    <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={g.heroImage}
                        alt={g.destinationName}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-accent">{g.destinationName}</span>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-600">{g.heroSubtitle}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 text-center">
            <p className="font-serif text-xl font-semibold text-accent">Ready for a bespoke itinerary?</p>
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-full bg-accent px-8 py-3 font-medium text-white transition hover:bg-accent/90"
            >
              Plan your custom trip
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
