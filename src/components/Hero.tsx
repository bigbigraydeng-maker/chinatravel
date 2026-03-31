import Link from 'next/link';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/tours/great-wall-mist.jpg"
          alt="Great Wall of China"
          className="w-full h-full object-cover"
        />
        {/* Warm overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-accent/80"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/10"></div>
      </div>
      <div className="relative z-10 text-center text-white w-full max-w-5xl mx-auto px-4 py-20">
        <div className="inline-block bg-secondary/20 backdrop-blur-sm rounded-full px-5 py-1.5 mb-6">
          <p className="text-secondary font-semibold uppercase tracking-widest text-sm">Since 1928</p>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-5 font-serif tracking-tight leading-tight">
          China Travel<br />Specialists
        </h1>
        <p className="text-xl md:text-2xl mb-3 font-light text-white/95">Discover China with experts who know it best.</p>
        <p className="text-base mb-10 font-light tracking-wide text-white/70">
          Direct China operations &bull; 98 years heritage &bull; Authentic access
        </p>

        {/* Search Bar */}
        <div className="mb-10">
          <SearchBar />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/explore" className="bg-gradient-to-r from-primary to-primary/90 text-white text-lg py-4 px-10 rounded-full hover:shadow-lg transition-all font-medium">
            Explore China
          </Link>
          <Link href="/tailor-made" className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 text-lg py-4 px-10 rounded-full hover:bg-white/20 transition-all font-medium">
            Tailor My Trip
          </Link>
        </div>
      </div>

      {/* Warm bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-warm-50 to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
