import Image from 'next/image';
import { CUSTOMER_TRIP_PHOTOS } from '@/app/china-tours/_components/CustomerTripPhotos';
import type { AccentId } from '@/lib/ad-landing/types';
import SectionHeading from './SectionHeading';

/**
 * Real photos from CTS travellers' trips. Nothing is said about who took them or where unless the photo library
 * says so; the credit line is shown exactly as the library has it, and no quote is ever attached to a photo.
 */
export default function TripPhotos({ title, note, accent }: { title: string; note: string; accent: AccentId }) {
  return (
    <section id="trip-photos" aria-labelledby="trip-photos-heading" className="scroll-mt-24">
      <SectionHeading id="trip-photos-heading" title={title} accent={accent} />
      <p className="mt-4 text-base leading-relaxed text-gray-700">{note}</p>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {CUSTOMER_TRIP_PHOTOS.map((photo) => (
          <li key={photo.image}>
            <figure className="relative aspect-square overflow-hidden rounded-xl bg-warm-100">
              <Image
                src={photo.image}
                alt={photo.altText}
                fill
                sizes="(min-width: 640px) 14rem, 45vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-black/65 p-3 text-white">
                {photo.location ? <p className="text-sm font-semibold leading-snug">{photo.location}</p> : null}
                <p className="text-xs text-white/90">{photo.credit}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
