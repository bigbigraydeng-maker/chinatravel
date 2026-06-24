'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { PlayQuiz, PlayQuizPanel } from '@/lib/data/play-quizzes'
import TourDiscoveryFooter from './TourDiscoveryFooter'

/**
 * Reveal page for a `spot-the-lie` PlayQuiz.
 *
 * Funnel:
 *  1. Hero question + collage (matches the FB Reel ad creative).
 *  2. Letter picker (A–F) + reveal button — visitor commits before payoff.
 *  3. Per-panel cards with the full claim. Pre-reveal: claims look plausible
 *     side-by-side. Post-reveal: lie panel goes red w/ truth, truth panels
 *     go green w/ bonus fact.
 *  4. Answer banner + correct/wrong feedback.
 *  5. TourDiscoveryFooter — 6 flagship tours to keep traffic moving.
 *
 * Client component because the reveal interaction is stateful. Everything
 * still renders correctly on the first paint for SEO (panel cards visible
 * with claim text — only the "is it the lie?" highlight is gated).
 */
export default function SpotTheLieReveal({ quiz }: { quiz: PlayQuiz }) {
  const [guess, setGuess] = useState<PlayQuizPanel['label'] | null>(null)
  const [revealed, setRevealed] = useState(false)

  const liePanel = quiz.panels.find((p) => p.isLie)
  const guessedCorrectly = revealed && guess === liePanel?.label

  return (
    <article className="bg-white">
      {/* Hero — pre-reveal question */}
      <section className="bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-3">
            CTS · play · 5 truths &amp; 1 lie
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">
            {quiz.hero.question}
          </h1>
          <p className="text-base md:text-lg text-sky-100/90">{quiz.hero.subtitle}</p>
        </div>
      </section>

      {/* Pre-reveal 6-panel collage (matches the FB ad creative) */}
      <section className="bg-sky-50">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 max-w-5xl mx-auto">
            {quiz.panels.map((p) => (
              <div
                key={p.label}
                className="relative aspect-square overflow-hidden rounded-lg bg-warm-100"
              >
                <Image
                  src={p.image}
                  alt={p.altText}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 inline-flex items-center justify-center w-8 h-8 rounded-md bg-sky-900 text-white font-black text-base shadow">
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Letter picker + reveal — gates the payoff */}
      {!revealed && (
        <section className="bg-white border-y-4 border-amber-400">
          <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl text-center">
            <p className="text-xs uppercase tracking-widest text-amber-700 font-bold mb-3">
              Step 1 · pick your guess
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
              Which claim is the lie?
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              Read all six below first — then tap a letter and reveal the truth.
            </p>
            <div className="grid grid-cols-6 gap-2 md:gap-3 mb-6 max-w-md mx-auto">
              {quiz.panels.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setGuess(p.label)}
                  aria-pressed={guess === p.label}
                  className={`aspect-square rounded-lg font-black text-xl md:text-2xl border-2 transition ${
                    guess === p.label
                      ? 'bg-sky-900 text-white border-sky-900 scale-105'
                      : 'bg-white text-sky-900 border-sky-200 hover:border-sky-400'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setRevealed(true)}
              disabled={!guess}
              className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 disabled:bg-warm-200 disabled:text-warm-400 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-md transition text-base md:text-lg"
            >
              {guess ? `Reveal — was ${guess} the lie? 🤯` : 'Pick a letter first'}
            </button>
          </div>
        </section>
      )}

      {/* Answer banner — only after reveal */}
      {revealed && (
        <section className="bg-red-50 border-y-4 border-red-500">
          <div className="container mx-auto px-4 py-10 md:py-12 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              🚨 The lie revealed
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3 leading-tight">
              {quiz.answer.headline}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {quiz.answer.detail}
            </p>
            {guessedCorrectly ? (
              <p className="mt-5 text-base md:text-lg font-bold text-emerald-700">
                You spotted it. Most people don&apos;t. 🎯
              </p>
            ) : guess ? (
              <p className="mt-5 text-base md:text-lg font-bold text-amber-700">
                You guessed {guess}. The lie was actually {liePanel?.label}. Don&apos;t feel
                bad — it&apos;s in textbooks worldwide.
              </p>
            ) : null}
          </div>
        </section>
      )}

      {/* Read each claim — 6 panel cards */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3">
              {revealed ? 'The story behind every claim' : 'Read each claim carefully'}
            </h2>
            <p className="text-base text-gray-700">
              {revealed
                ? "Tap any tour link to see the trip that takes you there."
                : 'Five are true. One is a famous myth Westerners have believed for decades. Take your time.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            {quiz.panels.map((p) => (
              <PanelClaimCard
                key={p.label}
                panel={p}
                revealed={revealed}
                isGuess={guess === p.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Share callout — only after reveal */}
      {revealed && (
        <section className="bg-warm-50 border-t border-warm-100">
          <div className="container mx-auto px-4 py-10 max-w-2xl text-center">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-2">
              Test your friends 🇨🇳
            </h2>
            <p className="text-sm md:text-base text-gray-700">
              Most people get the Great Wall myth wrong. See if your friends do too.
            </p>
          </div>
        </section>
      )}

      {/* Flagship tour discovery */}
      <TourDiscoveryFooter />
    </article>
  )
}

function PanelClaimCard({
  panel,
  revealed,
  isGuess,
}: {
  panel: PlayQuizPanel
  revealed: boolean
  isGuess: boolean
}) {
  const isLie = panel.isLie ?? false
  const showLieReveal = revealed && isLie
  const showTruthReveal = revealed && !isLie

  return (
    <article
      data-panel={panel.label}
      data-is-lie={isLie ? 'true' : 'false'}
      data-revealed={revealed ? 'true' : 'false'}
      className={`bg-white rounded-2xl overflow-hidden border transition ${
        showLieReveal
          ? 'border-red-400 ring-2 ring-red-300 shadow-lg'
          : showTruthReveal
            ? 'border-emerald-200 shadow-sm'
            : isGuess
              ? 'border-sky-400 ring-2 ring-sky-200'
              : 'border-warm-100 shadow-sm'
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-warm-100">
        <Image
          src={panel.image}
          alt={panel.altText}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <span
          className={`absolute top-3 left-3 inline-flex items-center justify-center w-10 h-10 rounded-md font-black text-lg shadow ${
            showLieReveal ? 'bg-red-500 text-white' : 'bg-sky-900 text-white'
          }`}
        >
          {panel.label}
        </span>
        {showLieReveal && (
          <span className="absolute top-3 right-3 inline-flex items-center bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow">
            🚨 The lie
          </span>
        )}
        {showTruthReveal && (
          <span className="absolute top-3 right-3 inline-flex items-center bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow">
            ✓ True
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">
          {panel.location}
        </p>
        <p className="text-sm md:text-base text-gray-800 leading-relaxed mb-3 font-medium">
          {panel.longClaim}
        </p>

        {showLieReveal && panel.truth && (
          <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-400 rounded-r">
            <p className="text-xs uppercase tracking-wider text-red-700 font-bold mb-1">
              The truth
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">{panel.truth}</p>
          </div>
        )}

        {showTruthReveal && panel.factExpansion && (
          <div className="mt-3 p-3 bg-emerald-50 border-l-4 border-emerald-400 rounded-r">
            <p className="text-xs uppercase tracking-wider text-emerald-700 font-bold mb-1">
              Bonus fact
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">{panel.factExpansion}</p>
          </div>
        )}

        {panel.tourLink && (
          <Link
            href={panel.tourLink.href}
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary hover:text-primary/80 group"
          >
            {panel.tourLink.label}
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        )}
      </div>
    </article>
  )
}
