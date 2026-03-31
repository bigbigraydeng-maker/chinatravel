import Link from 'next/link';

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
}

const TourTierCard = ({
  title,
  description,
  duration,
  price,
  image_url,
  slug,
  tier,
  destination = 'china',
  isPremium = false
}: TourTierCardProps) => {
  return (
    <Link href={`/tours/${destination}/${tier}/${slug}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-warm-100/50 hover:-translate-y-1">
        <div className="overflow-hidden relative">
          <img
            src={image_url}
            alt={title}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {isPremium && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-secondary to-secondary/80 text-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Signature
            </div>
          )}
        </div>
        <div className="p-6">
          <h4 className="text-xl font-semibold mb-3 font-serif group-hover:text-primary transition-colors">{title}</h4>
          <p className="text-gray-500 mb-5 leading-relaxed">{description}</p>
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
            className={`inline-block w-full text-center py-3 rounded-full font-medium transition-all ${
              isPremium
                ? 'bg-gradient-to-r from-primary to-primary/90 text-white group-hover:shadow-lg'
                : 'border-2 border-primary text-primary group-hover:bg-primary group-hover:text-white'
            }`}
          >
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourTierCard;
