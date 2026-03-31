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
}: TourTierCardProps) => {
  const colors = tierColors[tier];

  return (
    <Link href={`/tours/${destination}/${tier}/${slug}`} className="block group">
      <div className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl ${colors.glow} transition-all duration-500 border border-warm-100/50 hover:-translate-y-2`}>
        <div className="overflow-hidden relative h-64">
          <Image
            src={image_url}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay — always visible at bottom for route strip */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

          {/* Tier badge */}
          <div className={`absolute top-4 left-4 bg-gradient-to-r ${colors.tag} text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg`}>
            {tier}
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
          <h4 className="text-xl font-semibold mb-2 font-serif group-hover:text-primary transition-colors">{title}</h4>
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
