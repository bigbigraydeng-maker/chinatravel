// Hero section for SEO hub pages (china-tours, beijing-tours, etc.)

import React from 'react';

interface HubHeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

const HubHero: React.FC<HubHeroProps> = ({
  title,
  subtitle,
  backgroundImage = 'linear-gradient(135deg, #8B5A3C 0%, #D4A574 100%)'
}) => {
  return (
    <section
      className="relative h-96 md:h-[500px] flex items-center justify-center text-center text-white overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #8B5A3C 0%, #D4A574 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl font-light text-white/90">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default HubHero;
