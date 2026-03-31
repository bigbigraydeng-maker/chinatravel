interface SectionTitleProps {
  subtitle?: string;
  title: string;
  center?: boolean;
}

const SectionTitle = ({ subtitle, title, center = false }: SectionTitleProps) => {
  return (
    <div className={`${center ? 'text-center' : ''} mb-16`}>
      {subtitle && (
        <h3 className="text-sm uppercase tracking-widest text-secondary font-semibold mb-3">
          {subtitle}
        </h3>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-accent">
        {title}
      </h2>
      <div className={`w-20 h-1 bg-gradient-to-r from-secondary to-primary rounded-full ${center ? 'mx-auto' : ''} mb-6`}></div>
    </div>
  );
};

export default SectionTitle;
