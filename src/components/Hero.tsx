import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/tours/great-wall-mist.jpg"
          alt="Great Wall of China"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        {/* Colorful vibrant overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-primary/20 to-accent/80"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/25 via-transparent to-secondary/20"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-secondary/20 rounded-full animate-float-slow z-10"></div>
      <div className="absolute top-40 right-16 w-12 h-12 bg-secondary/10 rounded-full animate-float z-10" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-8 h-8 bg-white/10 rounded-full animate-float z-10" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 text-center text-white w-full max-w-5xl mx-auto px-4 py-20">
        <div className="inline-block bg-gradient-to-r from-secondary/30 to-secondary/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 animate-fade-in-up border border-secondary/30">
          <p className="text-secondary font-semibold uppercase tracking-widest text-sm flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
            Since 1928
            <span className="inline-block w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
          </p>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-5 font-serif tracking-tight leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          China Travel<br />
          <span className="bg-gradient-to-r from-white via-secondary/90 to-white bg-clip-text text-transparent">Specialists</span>
        </h1>
        <p className="text-xl md:text-2xl mb-3 font-light text-white/95 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Discover China with experts who know it best.
        </p>
        <p className="text-base mb-10 font-light tracking-wide text-white/70 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          Direct China operations &bull; 98 years heritage &bull; Authentic access
        </p>

        {/* Search Bar */}
        <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <SearchBar />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <Link href="/explore" className="bg-gradient-to-r from-primary via-primary to-red-500 text-white text-lg py-4 px-10 rounded-full hover:shadow-2xl hover:shadow-primary/30 transition-all font-medium hover:-translate-y-1 hover:scale-105 animate-pulse-glow">
            Explore China
          </Link>
          <Link href="/tailor-made" className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 text-lg py-4 px-10 rounded-full hover:bg-white/25 hover:border-secondary/50 transition-all font-medium hover:-translate-y-1">
            Tailor My Trip
          </Link>
        </div>
      </div>

      {/* Colorful bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-warm-50 via-warm-50/50 to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
