import Link from 'next/link';
import Image from 'next/image';

interface ArticleCardProps {
  title: string;
  content: string;
  image_url: string;
  slug: string;
}

const ArticleCard = ({ title, content, image_url, slug }: ArticleCardProps) => {
  return (
    <Link href={`/guide/${slug}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-warm-100/30 transition-all duration-500 hover:-translate-y-2">
        <div className="overflow-hidden relative h-52">
          <Image
            src={image_url}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Guide
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-3 font-serif group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-gray-500 mb-4 leading-relaxed text-sm">{content.substring(0, 100)}...</p>
          <div className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
