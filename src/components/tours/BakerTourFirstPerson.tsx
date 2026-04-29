import Image from 'next/image';
import Link from 'next/link';
import { getBakerVoiceForTour, BAKER_RELATED_BLOG_LABELS } from '@/lib/data/baker-tour-intros';
import { migratedSite } from '@/lib/site-media';

interface BakerTourFirstPersonProps {
  tourSlug: string;
  tourName: string;
  destination: string;
}

/**
 * Baker Gu first-person note for China tour + campaign pages.
 * Anchor: #baker-voice
 */
export default function BakerTourFirstPerson({ tourSlug, tourName, destination }: BakerTourFirstPersonProps) {
  const voice = getBakerVoiceForTour(tourSlug, tourName, destination);
  if (!voice) return null;

  const blogLabel =
    voice.relatedBlogSlug && BAKER_RELATED_BLOG_LABELS[voice.relatedBlogSlug]
      ? BAKER_RELATED_BLOG_LABELS[voice.relatedBlogSlug]
      : voice.relatedBlogSlug
        ? 'Related article'
        : null;

  return (
    <section
      id="baker-voice"
      className="scroll-mt-24 border-b border-warm-200 bg-gradient-to-r from-warm-50/90 to-white"
      aria-labelledby="baker-tour-voice-heading"
    >
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="mx-auto flex max-w-4xl flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
          <div className="relative mx-auto h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md sm:mx-0">
            <Image
              src={migratedSite('baker-gu-portrait.jpg')}
              alt="Baker Gu, China Travel Specialist"
              fill
              className="object-cover object-center"
              sizes="96px"
            />
          </div>
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <h2
              id="baker-tour-voice-heading"
              className="font-serif text-lg font-bold text-accent md:text-xl"
            >
              From Baker — why I stand behind this tour
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-700">{voice.intro}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm sm:justify-start">
              <Link href="/experts/baker-gu" className="font-semibold text-primary hover:underline">
                My profile
              </Link>
              {voice.relatedBlogSlug ? (
                <Link
                  href={`/blog/${voice.relatedBlogSlug}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {blogLabel} →
                </Link>
              ) : null}
              <Link href="/blog" className="font-medium text-gray-600 hover:text-primary hover:underline">
                Travel blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
