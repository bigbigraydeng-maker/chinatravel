import type { Destination, Tour } from '@/lib/data/tours';
import { getCtsTravelAgencySchema, getSiteUrl } from '@/lib/site';

const PRICE_CURRENCY = 'NZD';

function parsePriceAmount(price: string): number {
  const n = parseFloat(price.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

export function generateTourSchema(tour: Tour, destination: Destination) {
  const price = parsePriceAmount(tour.price);
  const agency = getCtsTravelAgencySchema();

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.shortDescription,
    image: tour.heroImage.startsWith('http')
      ? tour.heroImage
      : `${getSiteUrl()}${tour.heroImage.startsWith('/') ? '' : '/'}${tour.heroImage}`,
    touristType: {
      '@type': 'Audience',
      audienceType: 'Travelers from New Zealand',
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: PRICE_CURRENCY,
      availability: 'https://schema.org/InStock',
      url: `${getSiteUrl()}/tours/${tour.destination}/${tour.tier}/${tour.slug}`,
      seller: agency,
    },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: tour.itinerary.map((day, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'TouristAttraction',
          name: day.title,
          description: day.description,
        },
      })),
    },
    provider: agency,
    duration: tour.duration,
    touristAttraction: {
      '@type': 'TouristAttraction',
      name: destination.name,
      address: {
        '@type': 'PostalAddress',
        addressCountry: destination.name,
      },
    },
  };
}

export function generateProductSchema(tour: Tour) {
  const price = parsePriceAmount(tour.price);
  const agency = getCtsTravelAgencySchema();

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: tour.title,
    description: tour.shortDescription,
    image: tour.heroImage.startsWith('http')
      ? tour.heroImage
      : `${getSiteUrl()}${tour.heroImage.startsWith('/') ? '' : '/'}${tour.heroImage}`,
    brand: {
      '@type': 'Brand',
      name: 'CTS Tours',
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: PRICE_CURRENCY,
      availability: 'https://schema.org/InStock',
      url: `${getSiteUrl()}/tours/${tour.destination}/${tour.tier}/${tour.slug}`,
      seller: agency,
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Duration',
        value: tour.duration,
      },
      {
        '@type': 'PropertyValue',
        name: 'Tour Type',
        value: tour.tier,
      },
      {
        '@type': 'PropertyValue',
        name: 'Destination',
        value: tour.destination,
      },
    ],
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  baseUrl: string = getSiteUrl()
) {
  const base = baseUrl.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${base}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
  };
}

/** Default FAQs for tour detail pages (NZ audience, GEO-friendly). */
export function getTourPageFaqs(destinationLabel: string): Array<{ question: string; answer: string }> {
  return [
    {
      question: 'How do I apply for a China visa from New Zealand?',
      answer:
        'Requirements change over time. CTS can guide you on current visa categories and documents. For the latest rules, check the Chinese Visa Application Service Centre (New Zealand) and plan ahead — we recommend starting the process as soon as you have firm travel dates.',
    },
    {
      question: 'What is typically included in the tour price?',
      answer:
        'Each tour lists specific inclusions and exclusions on this page (accommodation style, meals, guiding, transport between cities, and entries where stated). International flights to/from New Zealand are usually not included unless clearly noted — ask us for a quote if you need flights bundled.',
    },
    {
      question: `When is the best time to visit ${destinationLabel}?`,
      answer:
        'It depends on the regions on your itinerary and whether you prefer mild weather, festivals, or fewer crowds. Our consultants can recommend seasons based on this exact route and your travel style.',
    },
    {
      question: 'Are international flights from New Zealand included?',
      answer:
        'Unless explicitly stated on the tour page, airfare is not included. CTS Auckland can help arrange competitive airfares and connect them with your land package.',
    },
    {
      question: 'How do I book and what payment options are available?',
      answer:
        'Submit an enquiry via this page or call 0800 CTS 888 (0800 287 888). Our team will confirm availability, finalise details, and outline deposit and balance payment steps.',
    },
  ];
}
