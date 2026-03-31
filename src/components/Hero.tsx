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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>
      <div className="relative z-10 text-center text-white w-full max-w-5xl mx-auto px-4 py-20">
        <p className="text-secondary font-semibold uppercase tracking-widest mb-4 text-sm">Since 1928</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-serif tracking-tight">
          China Travel Specialists
        </h1>
        <p className="text-xl md:text-2xl mb-4 font-light">Discover China with experts who know it best.</p>
        <p className="text-base mb-10 font-light tracking-wide text-white/80">
          Direct China operations &bull; 98 years heritage &bull; Authentic access
        </p>

        {/* Search Bar */}
        <div className="mb-10">
          <SearchBar />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/explore" className="btn-primary text-lg py-4 px-8">Explore China</Link>
          <Link href="/tailor-made" className="btn-secondary bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-lg py-4 px-8">
            Tailor My Trip
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
