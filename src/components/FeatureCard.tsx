interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="text-center p-8 rounded-2xl bg-white border border-warm-100/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-20 h-20 bg-gradient-to-br from-warm-50 to-warm-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 font-serif">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
