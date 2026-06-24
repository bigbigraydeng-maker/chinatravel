import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PLAY_QUIZZES } from '@/lib/data/play-quizzes'
import { buildCtsPageMetadata } from '@/lib/seo-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'Play · Travel quizzes from CTS Tours',
    description:
      'Quick travel quizzes about China + Asia, with the CTS tour that takes you there. Test your eye for landscapes, food and culture.',
    path: '/play',
    ogImagePath:
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg',
    ogImageAlt: 'CTS Tours travel quizzes',
    ogType: 'website',
  })
}

export default function PlayIndexPage() {
  return (
    <article className="bg-white">
      <section className="bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-3">
            CTS · play
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">
            Travel quizzes, China-flavoured
          </h1>
          <p className="text-base md:text-lg text-sky-100/90">
            Quick visual quizzes about places you can actually visit on a CTS tour.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLAY_QUIZZES.map(q => (
              <Link
                key={q.slug}
                href={`/play/${q.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-warm-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-warm-100">
                  <Image
                    src={q.hero.ogImage}
                    alt={q.hero.question}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-serif font-bold text-lg text-gray-900 mb-2 leading-snug">
                    {q.hero.question}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">{q.hero.subtitle}</p>
                  <p className="mt-3 text-sm font-bold text-primary group-hover:translate-x-0.5 transition-transform">
                    See the answer →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
