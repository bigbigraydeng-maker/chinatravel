import Link from 'next/link';

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

const CTASection = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: CTASectionProps) => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-red-600 to-primary relative overflow-hidden">
      {/* Animated decorative elements */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-10 right-10 w-20 h-20 border border-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-10 left-10 w-14 h-14 border border-secondary/20 rounded-full animate-float-slow"></div>

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '30px 30px'
      }}></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-6 border border-white/20">
            <p className="text-secondary text-sm font-semibold tracking-wider uppercase">Start Your Adventure</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif text-white leading-tight">{title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-white/50 rounded-full mx-auto mb-8"></div>
          <p className="text-lg text-white/85 mb-10 leading-relaxed max-w-2xl mx-auto">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryButtonLink} className="bg-white text-primary text-lg py-4 px-10 rounded-full hover:shadow-2xl hover:shadow-white/20 font-bold transition-all hover:-translate-y-1 hover:scale-105">
              {primaryButtonText}
            </Link>
            <Link href={secondaryButtonLink} className="border-2 border-white/50 text-white text-lg py-4 px-10 rounded-full hover:bg-white/10 hover:border-white transition-all font-medium hover:-translate-y-1">
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
