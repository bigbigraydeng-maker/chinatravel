import Image from 'next/image';
import { Camera, Coffee, Landmark, Leaf, Mountain, Ship, type LucideIcon } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { ACCENT_CLASSES } from '@/lib/ad-landing/accent';
import type { AccentId, FeatureCard } from '@/lib/ad-landing/types';

const ICONS: Record<NonNullable<FeatureCard['icon']>, LucideIcon> = {
  leaf: Leaf,
  coffee: Coffee,
  landmark: Landmark,
  ship: Ship,
  mountain: Mountain,
  camera: Camera,
};

/** A row of cards: a picture or an icon tile, a title and the sentences the config gives. */
export default function FeatureCards({ title, cards, accent }: { title: string; cards: FeatureCard[]; accent: AccentId }) {
  if (cards.length === 0) {
    return null;
  }

  return (
    <section id='highlights' aria-labelledby='highlights-heading' className='scroll-mt-24'>
      <SectionHeading id='highlights-heading' title={title} accent={accent} />
      <ul className='-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0'>
        {cards.map((card) => {
          const Icon = card.icon ? ICONS[card.icon] : undefined;

          return (
            <li
              key={card.title}
              className='w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl border border-warm-200 bg-white sm:w-[46%] lg:w-auto'
            >
              {card.image ? (
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  width={card.image.width}
                  height={card.image.height}
                  sizes='(min-width: 1024px) 22rem, 80vw'
                  className='h-56 w-full object-cover'
                />
              ) : (
                <div
                  className={`flex h-56 items-center justify-center ${ACCENT_CLASSES[accent].soft} ${ACCENT_CLASSES[accent].text}`}
                >
                  {Icon ? <Icon aria-hidden='true' className='h-14 w-14' strokeWidth={1.5} /> : null}
                </div>
              )}
              <div className='p-5'>
                <h3 className='font-serif text-xl text-gray-900'>{card.title}</h3>
                {card.body.map((item) => (
                  <p key={item.text} className='mt-2 text-base leading-relaxed text-gray-700'>
                    {item.text}
                  </p>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
