import Image from 'next/image';

/**
 * Real CTS tour groups in China (photos supplied by CTS; see public/images/real-groups/README.md).
 * Captions name only the place that can be seen in each photo — no invented names, dates or quotes.
 */
const PHOTOS = [
  { src: '/images/real-groups/cts-group-shanghai-bund.jpg', place: 'The Bund, Shanghai' },
  { src: '/images/real-groups/cts-group-terracotta-museum.jpg', place: 'Terracotta Warriors Museum, Xi’an' },
  { src: '/images/real-groups/cts-group-xian-museum.jpg', place: 'Xi’an Museum' },
  { src: '/images/real-groups/cts-group-great-wall-2.jpg', place: 'Great Wall, Beijing' },
] as const;

export default function RealTravellers() {
  const [lead, ...rest] = PHOTOS;
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <figure className="relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:min-h-[420px]">
        <Image src={lead.src} alt={`A CTS tour group at the ${lead.place}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900">
          {lead.place}
        </figcaption>
      </figure>
      <div className="grid grid-cols-2 gap-3">
        {rest.map((p, i) => (
          <figure
            key={p.src}
            // An odd last photo spans both columns so the grid has no empty cell.
            className={`relative overflow-hidden rounded-2xl ${
              rest.length % 2 === 1 && i === rest.length - 1 ? 'col-span-2 aspect-[8/3]' : 'aspect-[4/3]'
            }`}
          >
            <Image src={p.src} alt={`A CTS tour group at the ${p.place}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
            <figcaption className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-gray-900">
              {p.place}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
