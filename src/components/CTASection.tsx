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
    <section className="py-20 md:py-28 bg-gradient-to-br from-warm-50 via-warm-100/50 to-warm-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-accent">{title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-primary rounded-full mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryButtonLink} className="btn-primary text-lg py-4 px-10">
              {primaryButtonText}
            </Link>
            <Link href={secondaryButtonLink} className="btn-secondary text-lg py-4 px-10">
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
