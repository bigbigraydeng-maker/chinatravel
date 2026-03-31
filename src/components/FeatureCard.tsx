interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="text-center p-8 rounded-2xl bg-white border border-warm-100/50 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
      {/* Colorful hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-secondary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-secondary/5 group-hover:to-primary/5 transition-all duration-500"></div>

      <div className="relative z-10">
        <div className="w-20 h-20 bg-gradient-to-br from-warm-100 to-warm-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-secondary/20">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 font-serif group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
