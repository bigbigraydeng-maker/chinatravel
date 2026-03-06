interface SectionTitleProps {
  subtitle?: string;
  title: string;
  center?: boolean;
}

const SectionTitle = ({ subtitle, title, center = false }: SectionTitleProps) => {
  return (
    <div className={`${center ? 'text-center' : ''} mb-16`}>
      {subtitle && (
        <h3 className="text-sm uppercase tracking-wider text-secondary font-semibold mb-2">
          {subtitle}
        </h3>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
        {title}
      </h2>
      <div className={`w-24 h-1 bg-secondary ${center ? 'mx-auto' : ''} mb-6`}></div>
    </div>
  );
};

export default SectionTitle;