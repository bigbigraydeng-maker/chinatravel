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

      <div className="relative z-10 text-center text-white w-full max-w-5xl mx-auto px-4 py-20">
        <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 animate-fade-in-up border border-white/20">
          <p className="text-white/90 font-medium tracking-widest text-sm uppercase">
            New Zealand's China Specialists &nbsp;·&nbsp; Since 1928
          </p>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-serif tracking-tight leading-[1.05] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          China.<br />
          <span className="text-secondary">All of it.</span>
        </h1>
        <p className="text-xl md:text-2xl mb-4 font-light text-white/90 max-w-2xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.4s' }}>
          Ancient dynasties. Electric cities. Misty mountains.<br className="hidden md:block" />
          The China that takes your breath away — we'll take you there.
        </p>
        <p className="text-sm mb-10 font-light tracking-widest text-white/50 uppercase animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          Direct operations &nbsp;·&nbsp; Small groups &nbsp;·&nbsp; Authentic access
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
