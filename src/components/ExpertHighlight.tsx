import Link from 'next/link';

interface ExpertHighlightProps {
  name: string;
  title: string;
  description: string;
  image_url: string;
  fullDescription?: string;
}

const ExpertHighlight = ({ name, title, description, image_url, fullDescription }: ExpertHighlightProps) => {
  return (
    <section className="section bg-light">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-2/5">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-secondary"></div>
              <img 
                src={image_url} 
                alt={name} 
                className="rounded-lg shadow-xl w-full relative z-10"
              />
            </div>
          </div>
          <div className="md:w-3/5">
            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider text-secondary font-semibold mb-2">Our Expert</h3>
              <h2 className="text-3xl md:text-4xl font-bold font-serif">Meet {name}</h2>
              <div className="w-16 h-1 bg-secondary mt-4 mb-6"></div>
            </div>
            <h3 className="text-xl text-primary mb-4 font-semibold">{title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {description}
            </p>
            {fullDescription && (
              <p className="text-gray-600 mb-8 leading-relaxed">
                {fullDescription}
              </p>
            )}
            <Link href="/experts/baker-gu" className="btn-primary inline-block">Learn More</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertHighlight;