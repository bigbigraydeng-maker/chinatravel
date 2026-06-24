import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPlayQuizBySlug, getAllPlayQuizSlugs } from '@/lib/data/play-quizzes'

/**
 * Internal collage renderer for /play quiz Reel ads.
 *
 * Renders a fixed 1080×1920 collage of the quiz's 6 panels at /dev/quiz-collage/[slug].
 * The route is NOT linked from anywhere on the site and is set noindex below.
 *
 * Workflow:
 *  1. PM provides 6 panel images + caption data via play-quizzes.ts.
 *  2. Claude Code starts dev server, navigates to this route at a 1080×1920 viewport.
 *  3. Claude Preview MCP captures a screenshot of the rendered collage.
 *  4. The screenshot is saved as public/images/play/[slug]/collage.png (the Reel ad asset).
 *
 * The same renderer feeds every future spot-the-lie quiz — change the quiz spec, re-shoot.
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
  // (spot-the-odd-one-out's collage is rendered inline on /play/[slug] and
  // doesn't need this dedicated renderer.)
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
        backgroundColor: '#0A0A0A',
        overflow: 'hidden',
        fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
      data-collage-slug={quiz.slug}
    >
      {/* Hide cookie banner / newsletter popup / any body-level overlay so the
          screenshot captures only the collage. Root layout mounts those
          components outside ConditionalChrome, so our /dev/ skip doesn't cover
          them — we suppress them with CSS here instead. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body > div { display: none !important; }
            body { margin: 0 !important; padding: 0 !important; overflow: hidden !important; }
            html { background: #0A0A0A; }
          `,
        }}
      />
      {/* Top banner — y=0 to y=220 */}
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '220px',
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
            fontSize: '76px',
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            margin: 0,
          }}
        >
          5 TRUTHS &amp; <span style={{ color: '#E63946' }}>1 LIE</span>
        </h1>
        <p
          style={{
            fontSize: '30px',
            color: 'rgba(255,255,255,0.85)',
            fontWeight: 500,
            marginTop: '16px',
            marginBottom: 0,
          }}
        >
          Spot the lie about China 🇨🇳
        </p>
      </header>

      {/* 6-panel grid — y=220 to y=1720 (1500px tall) */}
      <section
        style={{
          position: 'absolute',
          top: '220px',
          left: '24px',
          right: '24px',
          height: '1500px',
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
              borderRadius: '14px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#000',
            }}
          >
            {/* Image — fills top 320px of the panel */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.altText}
              loading="eager"
              decoding="sync"
              style={{
                width: '100%',
                height: '320px',
                objectFit: 'cover',
                display: 'block',
                flexShrink: 0,
              }}
            />
            {/* Caption block — bottom 172px */}
            <div
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.92)',
                paddingInline: '16px',
                paddingBlock: '16px',
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  width: '56px',
                  height: '56px',
                  borderRadius: '10px',
                  backgroundColor: 'white',
                  color: '#0A0A0A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '30px',
                  lineHeight: 1,
                }}
              >
                {p.label}
              </span>
              <p
                style={{
                  color: 'white',
                  fontSize: '20px',
                  lineHeight: 1.35,
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {p.shortClaim ?? ''}
              </p>
            </div>
          </article>
        ))}
      </section>

      {/* Bottom CTA — y=1720 to y=1920 (200px tall) */}
      <footer
        style={{
          position: 'absolute',
          bottom: 0,
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
        <p
          style={{
            color: 'white',
            fontSize: '46px',
            fontWeight: 900,
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Comment the letter of the LIE 👇
        </p>
        <p
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '24px',
            fontWeight: 500,
            marginTop: '10px',
            marginBottom: 0,
          }}
        >
          Tap link to reveal the truth
        </p>
      </footer>
    </main>
  )
}
