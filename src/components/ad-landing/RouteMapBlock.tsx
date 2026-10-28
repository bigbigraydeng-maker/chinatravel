import SectionHeading from './SectionHeading';
import { mapSize } from '@/lib/ad-landing/map-size';
import type { AccentId } from '@/lib/ad-landing/types';

export default function RouteMapBlock({
  title,
  caption,
  slug,
  tourName,
  accent,
}: {
  title: string;
  caption: string;
  slug: string;
  tourName: string;
  accent: AccentId;
}) {
  const desktop = mapSize(`${slug}.svg`);
  const mobile = mapSize(`${slug}-mobile.svg`);
  if (!desktop || !mobile) return null;

  const alt = `${tourName} route map — cities, transport and nights`;

  return (
    <section id='route' aria-labelledby='route-heading' className='scroll-mt-24'>
      <SectionHeading id='route-heading' title={title} accent={accent} />
      <figure className='mt-6'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/tour-maps/${slug}.svg`}
          alt={alt}
          width={desktop.width}
          height={desktop.height}
          loading='lazy'
          decoding='async'
          className='hidden h-auto w-full rounded-xl border border-warm-200 bg-white md:block'
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/tour-maps/${slug}-mobile.svg`}
          alt={alt}
          width={mobile.width}
          height={mobile.height}
          loading='lazy'
          decoding='async'
          className='block h-auto w-full rounded-xl border border-warm-200 bg-white md:hidden'
        />
        <figcaption className='mt-3 text-sm leading-relaxed text-gray-600'>{caption}</figcaption>
      </figure>
    </section>
  );
}
