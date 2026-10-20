import Image from 'next/image';
import SectionHeading from './SectionHeading';
import type { AdContentItem } from '@/lib/ad-landing/content-feed';
import type { AccentId } from '@/lib/ad-landing/types';

function formatPublished(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-NZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default function LatestContent({
  title,
  item,
  accent,
}: {
  title: string;
  item: AdContentItem | null;
  accent: AccentId;
}) {
  if (item === null) {
    return null;
  }

  return (
    <section id='latest' aria-labelledby='latest-heading' className='scroll-mt-24'>
      <SectionHeading id='latest-heading' title={title} accent={accent} />
      <figure className='mt-6 overflow-hidden rounded-2xl border border-warm-200 bg-white'>
        {item.videoSrc ? (
          <video
            controls
            playsInline
            preload='none'
            poster={item.poster.src}
            width={item.poster.width}
            height={item.poster.height}
            aria-label={item.poster.alt}
            className='h-auto w-full bg-black'
          >
            <source src={item.videoSrc} type='video/mp4' />
          </video>
        ) : (
          <Image
            src={item.poster.src}
            alt={item.poster.alt}
            width={item.poster.width}
            height={item.poster.height}
            sizes='(min-width: 1024px) 44rem, 100vw'
            className='h-auto w-full'
          />
        )}
        <figcaption className='p-5'>
          <p className='text-base leading-relaxed text-gray-800'>{item.caption}</p>
          <p className='mt-2 text-sm text-gray-500'>
            Posted {formatPublished(item.publishedAt)}
            {item.permalink ? (
              <>
                {' · '}
                <a
                  href={item.permalink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-semibold text-primary underline'
                >
                  View the original post
                </a>
              </>
            ) : null}
          </p>
        </figcaption>
      </figure>
    </section>
  );
}
