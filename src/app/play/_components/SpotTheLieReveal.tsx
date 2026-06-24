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
      {/* Hero — mirrors the FB Reel collage exactly so visitors arriving from
          the ad see a continuous visual: same headline shape, same subtitle,
          same CTS-accent red on "1 LIE". Colours follow CTS master_brief
          vi_colors: #1a1a1a primary / #d4af37 heritage gold / Tailwind `primary`
          (#B61E2E ≈ master_brief #c41e3a) for the accent red — matches the
          rest of the CTS site so quiz red and "Plan Your Journey" red agree. */}
      <section className="bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-5">
            CTS · play · spot the lie
          </p>
          <h1 className="font-serif font-black uppercase tracking-tight leading-[0.95] text-5xl md:text-7xl mb-3">
            5 Truths &amp; <span className="text-primary">1 Lie</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium mb-5">
            Spot the lie about China 🇨🇳
          </p>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            {quiz.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Pre-reveal 6-panel collage (matches the FB ad creative — black bed,
          gold chips for heritage palette continuity from the hero). */}
      <section className="bg-[#1a1a1a]">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 max-w-5xl mx-auto">
            {quiz.panels.map((p) => (
              <div
                key={p.label}
                className="relative aspect-square overflow-hidden rounded-lg bg-black/40"
              >
                <Image
                  src={p.image}
                  alt={p.altText}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 inline-flex items-center justify-center w-8 h-8 rounded-md bg-[#d4af37] text-[#1a1a1a] font-black text-base shadow">
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Letter picker + reveal — gates the payoff. CTS gold rule, CTS red CTA. */}
      {!revealed && (
        <section className="bg-white border-y-4 border-[#d4af37]">
          <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl text-center">
            <p className="text-xs uppercase tracking-widest text-[#1a1a1a]/70 font-bold mb-3">
              Step 1 · pick your guess
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a1a1a] mb-2">
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
                      ? 'bg-[#1a1a1a] text-[#d4af37] border-[#1a1a1a] scale-105'
                      : 'bg-white text-[#1a1a1a] border-warm-200 hover:border-[#d4af37]'
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
              className="w-full md:w-auto bg-primary hover:bg-primary/90 disabled:bg-warm-200 disabled:text-warm-400 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-md transition text-base md:text-lg"
            >
              {guess ? `Reveal — was ${guess} the lie? 🤯` : 'Pick a letter first'}
            </button>
          </div>
        </section>
      )}

      {/* Answer banner — only after reveal. CTS accent red over soft warm bed. */}
      {revealed && (
        <section className="bg-primary/5 border-y-4 border-primary">
          <div className="container mx-auto px-4 py-10 md:py-12 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              🚨 The lie revealed
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a1a1a] mb-3 leading-tight">
              {quiz.answer.headline}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {quiz.answer.detail}
            </p>
            {guessedCorrectly ? (
              <p className="mt-5 text-base md:text-lg font-bold text-[#1a1a1a]">
                <span className="text-[#d4af37]">★</span> You spotted it. Most people don&apos;t.
              </p>
            ) : guess ? (
              <p className="mt-5 text-base md:text-lg font-bold text-[#1a1a1a]/80">
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
          ? 'border-primary ring-2 ring-primary/30 shadow-lg'
          : isGuess && !revealed
            ? 'border-[#d4af37] ring-2 ring-[#d4af37]/40'
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
            showLieReveal ? 'bg-primary text-white' : 'bg-[#d4af37] text-[#1a1a1a]'
          }`}
        >
          {panel.label}
        </span>
        {showLieReveal && (
          <span className="absolute top-3 right-3 inline-flex items-center bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow">
            🚨 The lie
          </span>
        )}
        {/* No badge on truth panels — absence of red is the signal, keeps the
            palette to two accents (gold/red) per CTS master_brief. */}
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-wider text-[#1a1a1a]/65 font-semibold mb-2">
          {panel.location}
        </p>
        <p className="text-sm md:text-base text-gray-800 leading-relaxed mb-3 font-medium">
          {panel.longClaim}
        </p>

        {showLieReveal && panel.truth && (
          <div className="mt-3 p-3 bg-primary/5 border-l-4 border-primary rounded-r">
            <p className="text-xs uppercase tracking-wider text-primary font-bold mb-1">
              The truth
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">{panel.truth}</p>
          </div>
        )}

        {showTruthReveal && panel.factExpansion && (
          <div className="mt-3 p-3 bg-[#fdf8ec] border-l-4 border-[#d4af37] rounded-r">
            <p className="text-xs uppercase tracking-wider text-[#1a1a1a] font-bold mb-1">
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
