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
  secondaryButtonLink 
}: CTASectionProps) => {
  return (
    <section className="section bg-light">
      <div className="container text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">{title}</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
          </div>
          <p className="text-xl mb-10 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href={primaryButtonLink} className="btn-primary text-lg py-4 px-8">
              {primaryButtonText}
            </Link>
            <Link href={secondaryButtonLink} className="btn-secondary text-lg py-4 px-8">
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;