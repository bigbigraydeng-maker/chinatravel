import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  content: string;
  image_url: string;
  slug: string;
}

const ArticleCard = ({ title, content, image_url, slug }: ArticleCardProps) => {
  return (
    <Link href={`/guide/${slug}`} className="block group">
      <div className="overflow-hidden rounded-2xl shadow-md mb-5 border border-warm-100/30">
        <img
          src={image_url}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3 font-serif group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-500 mb-4 leading-relaxed">{content.substring(0, 100)}...</p>
        <div className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
          Read More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
