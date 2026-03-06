import Link from 'next/link';

interface TourTierCardProps {
  title: string;
  description: string;
  duration: string;
  price: string;
  image_url: string;
  isPremium?: boolean;
}

const TourTierCard = ({ title, description, duration, price, image_url, isPremium = false }: TourTierCardProps) => {
  return (
    <div className="card group">
      <div className="overflow-hidden">
        <img 
          src={image_url} 
          alt={title} 
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h4 className="text-xl font-semibold mb-3 font-serif">{title}</h4>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-700 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </span>
          <span className="text-primary font-semibold">{price}</span>
        </div>
        <Link 
          href="/tours" 
          className={`inline-block w-full text-center transition-colors ${
            isPremium 
              ? 'btn-primary group-hover:bg-primary/95' 
              : 'btn-secondary group-hover:bg-primary/10'
          }`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TourTierCard;