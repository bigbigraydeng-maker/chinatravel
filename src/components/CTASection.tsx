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
    <section className="section-space-xl bg-gradient-to-br from-primary via-red-600 to-primary relative overflow-hidden">
      {/*
        Phase A W2: dropped four animated blur blobs that floated over this
        band. Ceepii's closing sections are flat colour — the type carries
        them. They were also four always-running CSS animations on a section
        that appears on 13 pages. The dot pattern below stays: it is static and
        reads as texture rather than motion.
      */}

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
