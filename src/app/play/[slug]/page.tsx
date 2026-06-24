import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SpotTheOddOneOutReveal from '../_components/SpotTheOddOneOutReveal'
import SpotTheLieReveal from '../_components/SpotTheLieReveal'
import { getAllPlayQuizSlugs, getPlayQuizBySlug } from '@/lib/data/play-quizzes'
import { buildCtsPageMetadata } from '@/lib/seo-metadata'

interface RouteParams {
  params: { slug: string }
}

/**
 * Static-generate every PlayQuiz at build time so /play/[slug] routes serve
 * pre-rendered HTML (good for SEO + Meta link preview cards).
 */
export function generateStaticParams() {
  return getAllPlayQuizSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const quiz = getPlayQuizBySlug(params.slug)
  if (!quiz) return { title: 'CTS Tours · Play' }
  return buildCtsPageMetadata({
    title: quiz.meta.title,
    description: quiz.meta.description,
    path: `/play/${quiz.slug}`,
    ogImagePath: quiz.hero.ogImage,
    ogImageAlt: quiz.hero.question,
    ogType: 'article',
  })
}

export default function PlayQuizPage({ params }: RouteParams) {
  const quiz = getPlayQuizBySlug(params.slug)
  if (!quiz) notFound()

  // New formats get their own renderer when added. Until then a single
  // switch makes the dispatch obvious.
  switch (quiz.format) {
    case 'spot-the-odd-one-out':
      return <SpotTheOddOneOutReveal quiz={quiz} />
    case 'spot-the-lie':
      return <SpotTheLieReveal quiz={quiz} />
    default:
      notFound()
  }
}
