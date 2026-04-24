import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import Link from 'next/link';
import MermaidDiagram from '@/components/MermaidDiagram';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'Site Architecture & Navigation Map',
    description: 'Visual map of all CTS Tours pages and how they connect internally. Understand our information architecture and explore the complete site structure.',
    path: '/site-map',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-mist.jpg',
    ogImageAlt: 'CTS Tours site architecture map',
    keywords: ['site map', 'site structure', 'navigation', 'site architecture', 'page relationships'],
    ogType: 'website',
  });
}

const mermaidDiagram = `flowchart TD
    NAV["🧭 Global Navigation<br/>(Navbar & Footer)"]

    HOME["🏠 / Homepage"]
    TOURS["📋 /tours<br/>All Tours Hub"]
    CHINA["🇨🇳 /china-tours<br/>Commercial Hub"]
    TAILOR["✏️ /tailor-made<br/>Custom Inquiry"]
    CONTACT["📞 /contact"]

    NAV -->|Links to main pages| HOME
    NAV -->|Links to main pages| TOURS
    NAV -->|Links to main pages| CHINA
    NAV -->|Links to main pages| TAILOR

    HOME -->|Destination Cards| CITY_HUBS
    HOME -->|Featured Tours| TOUR_DETAIL
    HOME -->|Blog Articles| SEO_HUB
    HOME -->|CTA| TAILOR
    HOME -->|CTA| TOURS

    TOURS -->|Tour Categories| TOUR_DETAIL
    TOURS -->|Internal Links| CHINA
    TOURS -->|CTA| CONTACT

    CHINA -->|Tour Links| TOUR_DETAIL
    CHINA -->|Breadcrumb| HOME
    CHINA -->|Related Content| SEO_HUB
    CHINA -->|CTA| TAILOR

    CITY_HUBS["🏙️ 7 City Hubs<br/>/beijing-tours<br/>/xian-tours<br/>/shanghai-tours<br/>/chengdu-tours<br/>/guilin-tours<br/>/zhangjiajie-tours<br/>/yunnan-tours"]

    CITY_HUBS -->|Bidirectional ↔| GUIDES_CITY
    CITY_HUBS -->|Tour Cards| TOUR_DETAIL
    CITY_HUBS -->|Breadcrumb| CHINA

    GUIDES_CITY["📖 7 Main Guides<br/>/beijing-travel-guide<br/>/xian-travel-guide<br/>/shanghai-travel-guide<br/>/chengdu-travel-guide<br/>/guilin-travel-guide<br/>/zhangjiajie-travel-guide<br/>/yunnan-travel-guide"]

    GUIDES_SUB["📖 14 Sub-Guides<br/>Great Wall<br/>Forbidden City<br/>Terracotta<br/>Leshan Buddha<br/>Lijiang, Dali, Kunming<br/>Shangri-La<br/>Yangshuo, Li River<br/>Hangzhou, Suzhou<br/>Chongqing<br/>Tianmen Mountain"]

    GUIDES_CITY -->|Related Guides| GUIDES_CITY
    GUIDES_CITY -->|Related Guides| GUIDES_SUB
    GUIDES_SUB -->|Related Guides| GUIDES_CITY
    GUIDES_SUB -->|Related Guides| GUIDES_SUB

    GUIDES_CITY -->|Featured Tours| TOUR_DETAIL
    GUIDES_SUB -->|Featured Tours| TOUR_DETAIL
    GUIDES_CITY -->|Hub Link| CITY_HUBS
    GUIDES_CITY -->|CTA| TAILOR
    GUIDES_SUB -->|CTA| TAILOR

    TOUR_DETAIL["🎫 Tour Details<br/>/tours/china/[tier]/[slug]<br/>(22 tour pages)"]

    TOUR_DETAIL -->|Related Tours| TOUR_DETAIL
    TOUR_DETAIL -->|Breadcrumb| CHINA
    TOUR_DETAIL -->|CTA| CONTACT
    TOUR_DETAIL -->|Print| PRINT["🖨️ /print<br/>Printable Itinerary"]

    SEO_HUB["🔍 SEO Hub Pages<br/>/best-time-to-visit-china<br/>/china-visa-guide-for-nzers<br/>/china-tours-from-new-zealand<br/>/china-tours-from-auckland"]

    SEO_HUB -->|Internal Links| CITY_HUBS
    SEO_HUB -->|CTA| TAILOR
    SEO_HUB -->|Breadcrumb| HOME

    style HOME fill:#E8A87C,stroke:#333,color:#fff
    style TOURS fill:#E8A87C,stroke:#333,color:#fff
    style CHINA fill:#E8A87C,stroke:#333,color:#fff
    style TAILOR fill:#E8A87C,stroke:#333,color:#fff
    style CONTACT fill:#E8A87C,stroke:#333,color:#fff
    style CITY_HUBS fill:#4CAF50,stroke:#333,color:#fff
    style GUIDES_CITY fill:#4CAF50,stroke:#333,color:#fff
    style GUIDES_SUB fill:#4CAF50,stroke:#333,color:#fff
    style TOUR_DETAIL fill:#1A2B4B,stroke:#333,color:#fff
    style SEO_HUB fill:#4CAF50,stroke:#333,color:#fff
    style NAV fill:#999,stroke:#333,color:#fff
    style PRINT fill:#ccc,stroke:#333,color:#333`;

export default function SiteMapPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent via-accent to-accent/80 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Site Architecture</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Explore how all pages and destinations connect across the CTS Tours website.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Legend */}
          <div className="mb-12 p-6 bg-warm-50 rounded-xl border border-warm-100">
            <h2 className="text-2xl font-serif font-bold text-accent mb-4">Understanding the Map</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="font-semibold">Main Pages</span>
                </div>
                <p className="text-gray-600">Core website destinations (Homepage, Tours, Tailor-Made)</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span className="font-semibold">Hub Pages</span>
                </div>
                <p className="text-gray-600">City/region tour hubs and destination guides</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="font-semibold">Detail Pages</span>
                </div>
                <p className="text-gray-600">Individual tour details and guide content</p>
              </div>
            </div>
          </div>

          {/* Mermaid Diagram */}
          <MermaidDiagram diagram={mermaidDiagram} />

          {/* Key Statistics */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-warm-50 rounded-xl border border-warm-100">
              <div className="text-4xl font-bold text-primary mb-2">78</div>
              <div className="text-sm text-gray-600">Total Pages</div>
            </div>
            <div className="text-center p-6 bg-warm-50 rounded-xl border border-warm-100">
              <div className="text-4xl font-bold text-secondary mb-2">21</div>
              <div className="text-sm text-gray-600">Destination Guides</div>
            </div>
            <div className="text-center p-6 bg-warm-50 rounded-xl border border-warm-100">
              <div className="text-4xl font-bold text-accent mb-2">22</div>
              <div className="text-sm text-gray-600">Tour Products</div>
            </div>
            <div className="text-center p-6 bg-warm-50 rounded-xl border border-warm-100">
              <div className="text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-sm text-gray-600">Internal Links</div>
            </div>
          </div>

          {/* Navigation Insights */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-serif font-bold text-accent mb-4">Entry Points</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span><strong>Navbar</strong> - Always accessible global navigation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span><strong>Homepage</strong> - Destination cards, featured tours, blog posts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span><strong>/tours</strong> - Tour browser and destination selector</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span><strong>City Hubs</strong> - Curated destination pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span><strong>SEO Pages</strong> - Blog-style entry points from Google</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-accent mb-4">Conversion Flows</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="p-3 bg-warm-50 rounded">
                  <div className="font-semibold text-primary mb-1">High Intent Path</div>
                  <div className="text-sm">/tours → City Hub → Related Tours → Tour Detail → /contact</div>
                </li>
                <li className="p-3 bg-warm-50 rounded">
                  <div className="font-semibold text-secondary mb-1">Discovery Path</div>
                  <div className="text-sm">SEO Page → City Guide → Related Guides → Featured Tour → /tailor-made</div>
                </li>
                <li className="p-3 bg-warm-50 rounded">
                  <div className="font-semibold text-accent mb-1">Research Path</div>
                  <div className="text-sm">Homepage → Best Time to Visit → Visa Guide → /china-tours</div>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
            <h3 className="text-xl font-serif font-bold text-accent mb-6">Quick Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/" className="p-3 bg-white rounded border border-warm-100 hover:border-primary hover:shadow-md transition text-sm font-medium text-accent">
                🏠 Homepage
              </Link>
              <Link href="/tours" className="p-3 bg-white rounded border border-warm-100 hover:border-primary hover:shadow-md transition text-sm font-medium text-accent">
                📋 All Tours
              </Link>
              <Link href="/china-tours" className="p-3 bg-white rounded border border-warm-100 hover:border-primary hover:shadow-md transition text-sm font-medium text-accent">
                🇨🇳 China Tours
              </Link>
              <Link href="/beijing-tours" className="p-3 bg-white rounded border border-warm-100 hover:border-primary hover:shadow-md transition text-sm font-medium text-accent">
                🏙️ Beijing Hub
              </Link>
              <Link href="/beijing-travel-guide" className="p-3 bg-white rounded border border-warm-100 hover:border-primary hover:shadow-md transition text-sm font-medium text-accent">
                📖 Beijing Guide
              </Link>
              <Link href="/best-time-to-visit-china" className="p-3 bg-white rounded border border-warm-100 hover:border-primary hover:shadow-md transition text-sm font-medium text-accent">
                📅 Best Time
              </Link>
              <Link href="/tailor-made" className="p-3 bg-white rounded border border-warm-100 hover:border-primary hover:shadow-md transition text-sm font-medium text-accent">
                ✏️ Custom Trip
              </Link>
              <Link href="/contact" className="p-3 bg-white rounded border border-warm-100 hover:border-primary hover:shadow-md transition text-sm font-medium text-accent">
                📞 Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to Explore China?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Start your journey by browsing our tours, reading destination guides, or planning a custom trip.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition"
            >
              Browse Tours
            </Link>
            <Link
              href="/tailor-made"
              className="inline-block px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-accent transition"
            >
              Plan Custom Trip
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
