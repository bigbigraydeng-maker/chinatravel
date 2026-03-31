import Link from 'next/link';
import Image from 'next/image';

interface DestinationCardProps {
  name: string;
  description: string;
  image_url: string;
  slug: string;
}

const DestinationCard = ({ name, description, image_url, slug }: DestinationCardProps) => {
  return (
    <Link href={`/explore/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-72">
        <Image
          src={image_url}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Colorful gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-secondary/0 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-500"></div>

        {/* Content overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-1 font-serif group-hover:text-secondary transition-colors duration-300 drop-shadow-lg">{name}</h3>
          <p className="text-white/80 text-sm mb-3">{description}</p>
          <div className="flex items-center gap-2 text-secondary font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            Explore More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-4 right-4 w-10 h-10 border-2 border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm bg-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
