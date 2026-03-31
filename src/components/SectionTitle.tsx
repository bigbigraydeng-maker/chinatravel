interface SectionTitleProps {
  subtitle?: string;
  title: string;
  center?: boolean;
}

const SectionTitle = ({ subtitle, title, center = false }: SectionTitleProps) => {
  return (
    <div className={`${center ? 'text-center' : ''} mb-16`}>
      {subtitle && (
        <p className="text-sm uppercase tracking-widest text-primary font-bold mb-3 flex items-center gap-3 justify-center">
          <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-primary rounded-full"></span>
          {subtitle}
          <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-primary rounded-full"></span>
        </p>
      )}
      <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif text-accent leading-tight">
        {title}
      </h2>
      <div className={`h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full ${center ? 'mx-auto' : ''} mb-6`} style={{ width: '80px' }}></div>
    </div>
  );
};

export default SectionTitle;
