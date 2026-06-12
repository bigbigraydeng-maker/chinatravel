import { Metadata } from 'next';
import Link from 'next/link';
import NewsletterSubscribeForm from '@/components/newsletter/NewsletterSubscribeForm';
import { Icon, type IconName } from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: 'Subscribe to CTS Tours Newsletter | China Travel Tips & Offers',
  description:
    'Get weekly China travel guides, visa-free entry updates, and exclusive tour offers from New Zealand\'s China specialists. Join thousands of NZ travellers.',
  robots: { index: true, follow: true },
};

const benefits: { icon: IconName; title: string; desc: string }[] = [
  {
    icon: 'map',
    title: 'Destination deep-dives',
    desc: 'Expert guides to Beijing, Xi\'an, Shanghai, Guilin, Chengdu, and beyond — written by our on-the-ground specialists.',
  },
  {
    icon: 'plane',
    title: 'Visa & entry tips',
    desc: 'Stay up to date on China\'s visa-free entry for NZ passport holders, transit rules, and how to make the most of them.',
  },
  {
    icon: 'coins',
    title: 'Exclusive offers',
    desc: 'Subscriber-only tour discounts, early-bird departures, and last-minute availability — before they go public.',
  },
  {
    icon: 'calendar',
    title: 'Best time to travel',
    desc: 'Monthly travel intelligence: festivals, weather, crowd levels, and the ideal windows for each destination.',
  },
];

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-slate-900">
      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              CTS Travel Newsletter
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              China travel intel,<br />
              <span className="text-primary">straight to your inbox</span>
            </h1>

            <p className="text-gray-300 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Weekly guides, visa updates, and exclusive tour offers — from New Zealand&apos;s China specialists since 1928.
            </p>

            {/* Form */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm max-w-md mx-auto">
              <NewsletterSubscribeForm variant="footer" />
            </div>

            <p className="mt-4 text-gray-500 text-sm">
              One email per week at most. Unsubscribe instantly, anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-white text-2xl font-serif font-bold mb-3">
            What you&apos;ll get
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-lg mx-auto">
            Every issue is written by our team of China specialists — the same experts who design our tours.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-colors"
              >
                <Icon name={b.icon} className="w-8 h-8 mb-3 text-primary" />
                <h3 className="text-white font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="py-10 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
            <div>
              <p className="text-white font-bold text-3xl font-serif">98</p>
              <p className="text-gray-400 text-sm">Years in China</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/10"></div>
            <div>
              <p className="text-white font-bold text-3xl font-serif">10k+</p>
              <p className="text-gray-400 text-sm">Kiwis shown China</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/10"></div>
            <div>
              <p className="text-white font-bold text-3xl font-serif">Weekly</p>
              <p className="text-gray-400 text-sm">Editions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <div className="py-8 text-center border-t border-white/10">
        <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
          ← Back to CTS Tours
        </Link>
      </div>
    </div>
  );
}
