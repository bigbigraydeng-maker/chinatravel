import SectionHeading from './SectionHeading';
import { ACCENT_CLASSES } from '@/lib/ad-landing/accent';
import type { AccentId, CityStop } from '@/lib/ad-landing/types';

/** The itinerary as a numbered timeline: one stop per city, in the order the config gives. */
export default function CityLoop({ title, stops, accent }: { title: string; stops: CityStop[]; accent: AccentId }) {
  if (stops.length === 0) {
    return null;
  }

  return (
    <section id='stops' aria-labelledby='stops-heading' className='scroll-mt-24'>
      <SectionHeading id='stops-heading' title={title} accent={accent} />
      <ol className='mt-8'>
        {stops.map((stop, index) => (
          <li key={stop.city} className='relative pb-8 pl-14 last:pb-0'>
            {index < stops.length - 1 ? (
              <span aria-hidden='true' className='absolute left-[1.125rem] top-10 bottom-0 w-px bg-warm-200' />
            ) : null}
            <span
              aria-hidden='true'
              className={`absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full text-base font-semibold ${ACCENT_CLASSES[accent].dot}`}
            >
              {index + 1}
            </span>
            <h3 className='font-serif text-xl leading-9 text-gray-900'>{stop.city}</h3>
            <ul className='mt-1 space-y-2'>
              {stop.highlights.map((item) => (
                <li key={item.text} className='flex gap-3 text-base leading-relaxed text-gray-700'>
                  <span
                    aria-hidden='true'
                    className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${ACCENT_CLASSES[accent].rule}`}
                  />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
