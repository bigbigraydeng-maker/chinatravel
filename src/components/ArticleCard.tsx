import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  content: string;
  image_url: string;
}

const ArticleCard = ({ title, content, image_url }: ArticleCardProps) => {
  return (
    <div className="group">
      <div className="overflow-hidden rounded-lg shadow-md mb-4">
        <img 
          src={image_url} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3 font-serif">{title}</h3>
        <p className="text-gray-600 mb-4">{content.substring(0, 100)}...</p>
        <Link href="/guide" className="text-primary hover:underline inline-flex items-center gap-2">
          Read More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;