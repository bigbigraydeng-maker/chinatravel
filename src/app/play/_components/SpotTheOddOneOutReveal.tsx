import Image from 'next/image'
import Link from 'next/link'
import type { PlayQuiz, PlayQuizPanel } from '@/lib/data/play-quizzes'

/**
 * Reveal page for a `spot-the-odd-one-out` PlayQuiz.
 *
 * Above the fold: hero question + the 6-panel collage (re-rendered, so the
 * visitor coming from the FB ad sees exactly the image they clicked).
 *
 * Below the fold: the answer banner (no gate — PM wants instant payoff),
 * then a 6-card grid pairing each panel with its background story + the
 * CTS tour link that takes the visitor there. The odd-one-out card uses
 * a softer cross-sell line instead of a tour link.
 *
 * Bottom: a single CTA back to /china-tours so quiz-driven traffic can
 * continue browsing the full lineup.
 */
export default function SpotTheOddOneOutReveal({ quiz }: { quiz: PlayQuiz }) {
  return (
    <article className="bg-white">
      {/* Hero — pre-reveal question */}
      <section className="bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-3">
            CTS · play · spot the odd one out
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
                <span className="absolute top-2 left-2 inline-flex items-center justify-center w-8 h-8 rounded-md bg-sky-800 text-white font-black text-base shadow">
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Answer banner — instant reveal, no gate */}
      <section className="bg-amber-50 border-y-4 border-amber-400">
        <div className="container mx-auto px-4 py-10 md:py-12 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-amber-300">
            ✓ Answer
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3 leading-tight">
            {quiz.answer.headline}
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">{quiz.answer.detail}</p>
        </div>
      </section>

      {/* Per-panel story + tour link grid */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3">
              The story behind every photo
            </h2>
            <p className="text-base text-gray-700">
              Tap any tour link below to see itinerary, departures, and what&apos;s included.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {quiz.panels.map((p) => (
              <PanelStoryCard key={p.label} panel={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-warm-50 border-t border-warm-100">
        <div className="container mx-auto px-4 py-12 md:py-14 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3">
            See the full CTS China lineup
          </h2>
          <p className="text-base text-gray-700 mb-5">
            Signature, Discovery, Stopover — all Auckland-departing, NZD pricing,
            visa-free for NZ passports until 31 Dec 2026.
          </p>
          <Link
            href="/china-tours"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-md transition-colors"
          >
            Browse all China tours →
          </Link>
        </div>
      </section>
    </article>
  )
}

function PanelStoryCard({ panel }: { panel: PlayQuizPanel }) {
  const isOddOne = panel.isCorrectAnswer
  return (
    <article
      data-panel={panel.label}
      data-odd-one={isOddOne ? 'true' : 'false'}
      className={`bg-white rounded-2xl overflow-hidden border ${
        isOddOne ? 'border-amber-300 ring-1 ring-amber-300' : 'border-warm-100 shadow-sm'
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-warm-100">
        <Image
          src={panel.image}
          alt={panel.altText}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <span
          className={`absolute top-3 left-3 inline-flex items-center justify-center w-9 h-9 rounded-md font-black text-base shadow ${
            isOddOne ? 'bg-amber-500 text-white' : 'bg-sky-800 text-white'
          }`}
        >
          {panel.label}
        </span>
        {isOddOne && (
          <span className="absolute top-3 right-3 inline-flex items-center bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow">
            Odd one
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-1">
          {panel.location}
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">{panel.story}</p>
        {panel.tourLink ? (
          <Link
            href={panel.tourLink.href}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 group"
          >
            {panel.tourLink.label}
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        ) : panel.crossSellNote ? (
          <p className="text-sm text-gray-600 italic border-l-2 border-amber-300 pl-3">
            {panel.crossSellNote}
          </p>
        ) : null}
      </div>
    </article>
  )
}
