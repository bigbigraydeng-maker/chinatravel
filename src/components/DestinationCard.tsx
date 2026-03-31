import Link from 'next/link';

interface DestinationCardProps {
  name: string;
  description: string;
  image_url: string;
  slug: string;
}

const DestinationCard = ({ name, description, image_url, slug }: DestinationCardProps) => {
  return (
    <div className="group">
      <div className="overflow-hidden rounded-2xl shadow-md mb-5 border border-warm-100/30">
        <img
          src={image_url}
          alt={name}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 font-serif group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-gray-500 mb-4 leading-relaxed">{description}</p>
        <Link href={`/explore/${slug}`} className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
          Explore More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
