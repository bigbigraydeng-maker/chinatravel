import Link from 'next/link';
import Image from 'next/image';

interface TourTierCardProps {
  title: string;
  description: string;
  duration: string;
  price: string;
  image_url: string;
  slug: string;
  tier: 'signature' | 'discovery' | 'stopover';
  destination?: string;
  isPremium?: boolean;
  route?: string[];
  departure?: string;
  /** When set, card links here (e.g. campaign LP) instead of the default tour URL */
  href?: string;
  /** Homepage Spotlight — heat + strong recommendation styling */
  spotlightFeatured?: boolean;
}

const tierColors = {
  signature: { tag: 'from-amber-400 to-orange-500', glow: 'group-hover:shadow-amber-200/30' },
  discovery: { tag: 'from-emerald-400 to-teal-500', glow: 'group-hover:shadow-emerald-200/30' },
  stopover: { tag: 'from-sky-400 to-blue-500', glow: 'group-hover:shadow-sky-200/30' },
};

const tierCTA = {
  signature: 'Explore This Journey →',
  discovery: 'See the Itinerary →',
  stopover: 'View Details →',
};

const TourTierCard = ({
  title,
  description,
  duration,
  price,
  image_url,
  slug,
  tier,
  destination = 'china',
  isPremium = false,
  route = [],
  departure,
  href,
  spotlightFeatured = false,
}: TourTierCardProps) => {
  const colors = tierColors[tier];
  const tourHref = href ?? `/tours/${destination}/${tier}/${slug}`;

  return (
    <Link href={tourHref} className="block min-w-0 group">
      <div
        className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl ${colors.glow} transition-all duration-500 border hover:-translate-y-2 ${
          spotlightFeatured
            ? 'border-primary/35 ring-2 ring-primary/25 ring-offset-2 ring-offset-amber-50/30 shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/15'
            : 'border-warm-100/50'
        }`}
      >
        <div className="relative aspect-[16/10] w-full min-h-[10rem] shrink-0 overflow-hidden bg-warm-100 sm:min-h-[12rem]">
          <Image
            src={image_url}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay — always visible at bottom for route strip */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
          {spotlightFeatured && (
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-400/15 via-transparent to-red-600/10"
              aria-hidden
            />
          )}

          {spotlightFeatured && (
            <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
              <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-primary px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg ring-2 ring-white/40">
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2c0 4-2 6-2 10 0 2.5 1.5 4.5 3.5 5.5-.5-2 .5-4 2-5.5 1 1.5 1 3.5 0 5 3-1.5 5-5 5-9.5 0-4-2-6-2-10-1.5 2.5-3 4-4.5 5.5z" />
                </svg>
                Hot pick
              </div>
              <div className="rounded-full border border-white/50 bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary shadow-md backdrop-blur-sm">
                Highly recommended
              </div>
            </div>
          )}

          {/* Tier badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className={`bg-gradient-to-r ${colors.tag} text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg`}>
              {tier}
            </div>
            {departure && (
              <div className="bg-white/95 backdrop-blur-sm text-accent text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {departure}
              </div>
            )}
          </div>

          {/* Route strip — pinned to bottom of image */}
          {route.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
              <div className="flex items-center gap-1 flex-wrap">
                {route.map((city, i) => (
                  <span key={city} className="flex items-center gap-1">
                    <span className="text-white text-xs font-semibold tracking-wide drop-shadow">{city}</span>
                    {i < route.length - 1 && (
                      <svg className="w-3 h-3 text-white/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="p-6">
          {spotlightFeatured && (
            <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" aria-hidden />
              Trending · Limited October departures
            </p>
          )}
          <h3 className="text-xl font-semibold mb-2 font-serif group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-gray-500 mb-5 leading-relaxed text-sm">{description}</p>
          <div className="flex justify-between items-center mb-5">
            <span className="text-gray-600 flex items-center gap-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {duration}
            </span>
            <span className="text-primary font-bold text-lg">{price}</span>
          </div>
          <div
            className={`inline-block w-full text-center py-3 rounded-full font-medium transition-all duration-300 ${
              isPremium
                ? `bg-gradient-to-r ${colors.tag} text-white group-hover:shadow-lg group-hover:scale-[1.02]`
                : 'border-2 border-primary text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-[1.02]'
            }`}
          >
            {tierCTA[tier]}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourTierCard;
