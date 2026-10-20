import { Check, Minus } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { ACCENT_CLASSES } from '@/lib/ad-landing/accent';
import type { AccentId } from '@/lib/ad-landing/types';

export default function InclusionsBlock({
  title,
  included,
  excluded,
  accent,
}: {
  title: string;
  included: string[];
  excluded: string[];
  accent: AccentId;
}) {
  if (included.length === 0) return null;

  return (
    <section id='inclusions' aria-labelledby='inclusions-heading' className='scroll-mt-24'>
      <SectionHeading id='inclusions-heading' title={title} accent={accent} />
      <div className='mt-8 grid gap-6 md:grid-cols-2'>
        <div className='rounded-2xl border border-warm-200 bg-white p-6'>
          <h3 className='font-serif text-xl text-gray-900'>Included in the price</h3>
          <ul className='mt-4 space-y-3'>
            {included.map((item) => (
              <li key={item} className='flex gap-3 text-base leading-relaxed text-gray-700'>
                <Check aria-hidden='true' className={`mt-1 h-5 w-5 shrink-0 ${ACCENT_CLASSES[accent].text}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        {excluded.length > 0 && (
          <div className='rounded-2xl border border-warm-200 bg-warm-50 p-6'>
            <h3 className='font-serif text-xl text-gray-900'>Not included</h3>
            <ul className='mt-4 space-y-3'>
              {excluded.map((item) => (
                <li key={item} className='flex gap-3 text-base leading-relaxed text-gray-700'>
                  <Minus aria-hidden='true' className='mt-1 h-5 w-5 shrink-0 text-gray-400' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
