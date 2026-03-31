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
    <section className="py-20 md:py-28 bg-gradient-to-br from-warm-50 via-white to-warm-100/50 relative overflow-hidden">
      {/* Colorful decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary/10 to-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-float-slow"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-primary/8 to-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-float" style={{ animationDelay: '3s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <div className="md:w-2/5">
            <div className="relative group">
              {/* Colorful decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-secondary/50 rounded-2xl transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-primary/20 via-secondary/15 to-primary/10 rounded-2xl transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1"></div>
              <img
                src={image_url}
                alt={name}
                className="rounded-2xl shadow-xl w-full relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Experience badge */}
              <div className="absolute -bottom-3 -right-3 z-20 bg-gradient-to-br from-primary to-red-600 text-white rounded-2xl px-5 py-3 shadow-xl">
                <p className="text-2xl font-bold leading-none">20+</p>
                <p className="text-xs font-medium text-white/80">Years</p>
              </div>
            </div>
          </div>
          <div className="md:w-3/5">
            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-widest text-primary font-bold mb-3 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary rounded-full"></span>
                Our Expert
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-accent">
                Meet <span className="text-primary">{name}</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-secondary via-primary to-secondary rounded-full mt-4 mb-6"></div>
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
            <Link href="/experts/baker-gu" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-red-500 text-white px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-1 hover:scale-105 font-medium">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertHighlight;
