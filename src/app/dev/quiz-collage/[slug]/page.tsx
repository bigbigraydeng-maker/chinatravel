import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPlayQuizBySlug, getAllPlayQuizSlugs } from '@/lib/data/play-quizzes'

/**
 * Internal collage renderer for /play quiz Reel ads.
 *
 * Renders a fixed 1080×1920 collage of the quiz's 6 panels at /dev/quiz-collage/[slug].
 * The route is NOT linked from anywhere on the site and is set noindex below.
 *
 * Layout follows the Meta Reel safe-zone discipline learned from the first
 * shipped collage (whose banner + CTA fell inside the FB UI overlay):
 *   - y=0   to y=270   : TOP DEAD ZONE   (phone status bar + back arrow + 3-dot)
 *   - y=270 to y=450   : Banner          (180px — title + subtitle)
 *   - y=450 to y=1230  : 6-panel grid    (780px — 3 rows × 252px + gaps)
 *   - y=1248 to y=1920 : BOTTOM DEAD ZONE (~672px — caption + side rail + comment box)
 *
 * Critical content (title, panel labels, captions) MUST sit inside the
 * y=270 to y=1248 band — that's the only area guaranteed visible after
 * FB / IG Reel UI overlays cover the rest. The Reel's CTA ("Comment your
 * guess") is handled by the post caption, NOT the collage — so we don't
 * put a CTA on the image at all.
 *
 * Workflow:
 *  1. PM provides 6 panel images + caption data via play-quizzes.ts.
 *  2. Run scripts/render-quiz-collage.sh <slug> against a running dev server.
 *  3. Headless Chrome saves a 1080×1920 PNG to public/images/play/<slug>/collage.png.
 */

export const dynamic = 'force-static'

export function generateStaticParams() {
  return getAllPlayQuizSlugs().map((slug) => ({ slug }))
}

export const metadata: Metadata = {
  title: 'Quiz Collage Renderer (internal) | CTS',
  robots: { index: false, follow: false, nocache: true },
}

interface RouteParams {
  params: { slug: string }
}

export default function QuizCollagePage({ params }: RouteParams) {
  const quiz = getPlayQuizBySlug(params.slug)
  if (!quiz) notFound()

  // Only spot-the-lie quizzes use the collage with shortClaim captions.
  if (quiz.format !== 'spot-the-lie') {
    return (
      <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
        <p>
          Collage renderer only supports <code>spot-the-lie</code> quizzes. This quiz format is{' '}
          <code>{quiz.format}</code>.
        </p>
      </main>
    )
  }

  return (
    <main
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '1080px',
        height: '1920px',
        backgroundColor: '#1a1a1a',
        overflow: 'hidden',
        fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
      data-collage-slug={quiz.slug}
    >
      {/* Hide cookie banner / newsletter popup / any body-level overlay so the
          screenshot captures only the collage. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body > div { display: none !important; }
            body { margin: 0 !important; padding: 0 !important; overflow: hidden !important; }
            html { background: #1a1a1a; }
          `,
        }}
      />

      {/* Banner — y=270 to y=470 (inside the safe zone, just below the FB
          status bar / back arrow dead zone). 200px tall — sized for a 35-70
          audience: title 92pt, subtitle 38pt. */}
      <header
        style={{
          position: 'absolute',
          top: '270px',
          left: 0,
          right: 0,
          height: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingInline: '24px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '92px',
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            margin: 0,
          }}
        >
          5 TRUTHS &amp; <span style={{ color: '#B61E2E' }}>1 LIE</span>
        </h1>
        <p
          style={{
            fontSize: '38px',
            color: 'rgba(255,255,255,0.95)',
            fontWeight: 500,
            marginTop: '16px',
            marginBottom: 0,
          }}
        >
          Spot the lie about China 🇨🇳
        </p>
      </header>

      {/* 6-panel grid — y=470 to y=1230 (760px tall). Inside the safe zone.
          Each panel is image-full-bleed; the letter chip sits in the top-left
          corner of the image, and the short caption rides a bottom gradient
          overlay. Type is sized for a 35-70 audience reading at phone
          distance: 60px chips, 28pt captions. */}
      <section
        style={{
          position: 'absolute',
          top: '470px',
          left: '24px',
          right: '24px',
          height: '760px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr 1fr',
          gap: '12px',
        }}
      >
        {quiz.panels.map((p) => (
          <article
            key={p.label}
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#000',
            }}
          >
            {/* Full-bleed image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.altText}
              loading="eager"
              decoding="sync"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Bottom gradient + caption overlay — sized for older eyes at
                phone distance (28pt, 2-line capacity, deep gradient base). */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '130px',
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.97) 100%)',
                padding: '16px 16px 14px 16px',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              <p
                style={{
                  color: 'white',
                  fontSize: '28px',
                  lineHeight: 1.2,
                  fontWeight: 600,
                  margin: 0,
                  width: '100%',
                }}
              >
                {p.shortClaim ?? ''}
              </p>
            </div>

            {/* Letter chip — top-left corner. Bumped to 60×60 + 36pt for
                readability on phone-sized Reel previews. */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                width: '60px',
                height: '60px',
                borderRadius: '10px',
                backgroundColor: '#d4af37', // CTS heritage gold (master_brief vi_colors.secondary)
                color: '#1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '36px',
                lineHeight: 1,
                boxShadow: '0 2px 12px rgba(0,0,0,0.6)',
              }}
            >
              {p.label}
            </span>
          </article>
        ))}
      </section>

      {/* y=1248 onwards is the FB Reel bottom dead zone — covered by the
          post caption + side rail + comment box. We deliberately leave it
          empty (the "Comment your guess" CTA lives in the post caption,
          not on the creative). */}
    </main>
  )
}
