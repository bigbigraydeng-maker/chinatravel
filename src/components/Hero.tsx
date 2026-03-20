import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/tours/great-wall-mist.jpg"
          alt="Great Wall of China"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif tracking-tight">China Travel Specialists</h1>
        <p className="text-xl md:text-2xl mb-6 font-light">Discover China with experts who know it best.</p>
        <p className="text-lg mb-10 font-light tracking-wide">Direct China operations • 98 years heritage • authentic access</p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/explore" className="btn-primary text-lg py-4 px-8">Explore China</Link>
          <Link href="/contact" className="btn-secondary bg-white text-primary hover:bg-gray-50 text-lg py-4 px-8">Speak to a Specialist</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;