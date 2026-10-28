import { ChevronDown } from 'lucide-react';
import SectionHeading from './SectionHeading';
import type { AccentId } from '@/lib/ad-landing/types';

export interface FaqAccordionItem {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

export default function FaqAccordion({
  title,
  items,
  accent,
}: {
  title: string;
  items: FaqAccordionItem[];
  accent: AccentId;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section id='faq' aria-labelledby='faq-heading' className='scroll-mt-24'>
      <SectionHeading id='faq-heading' title={title} accent={accent} />
      <div className='mt-8 divide-y divide-warm-200 rounded-2xl border border-warm-200 bg-white'>
        {items.map((item) => (
          <details key={item.question} className='group px-5 py-4 md:px-6'>
            <summary className='flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-left font-serif text-lg text-gray-900 [&::-webkit-details-marker]:hidden'>
              <span>{item.question}</span>
              <ChevronDown
                aria-hidden='true'
                className='h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180'
              />
            </summary>
            <div className='pt-3 text-base leading-relaxed text-gray-700'>
              {item.answer
                .split(/\n+/)
                .filter((paragraph) => paragraph.trim() !== '')
                .map((paragraph, index) => (
                  <p key={`${index}-${paragraph}`} className='mt-2 first:mt-0'>
                    {paragraph}
                  </p>
                ))}
              {item.link ? (
                <p className='mt-3'>
                  <a href={item.link.href} className='font-semibold text-primary underline'>
                    {item.link.label}
                  </a>
                </p>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
