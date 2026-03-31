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
    <section className="py-20 md:py-28 bg-gradient-to-br from-warm-50 via-light to-warm-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <div className="md:w-2/5">
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-full h-full border-2 border-secondary/40 rounded-2xl"></div>
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-gradient-to-br from-secondary/20 to-primary/10 rounded-2xl"></div>
              <img
                src={image_url}
                alt={name}
                className="rounded-2xl shadow-xl w-full relative z-10"
              />
            </div>
          </div>
          <div className="md:w-3/5">
            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-widest text-secondary font-semibold mb-3">Our Expert</h3>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-accent">Meet {name}</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-secondary to-primary rounded-full mt-4 mb-6"></div>
            </div>
            <h3 className="text-xl text-primary mb-4 font-semibold">{title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              {description}
            </p>
            {fullDescription && (
              <p className="text-gray-500 mb-8 leading-relaxed">
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
