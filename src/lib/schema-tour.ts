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

/** Resolves FAQs for a tour: uses `tour.faqs` when present, otherwise generic destination FAQs. */
export function getTourPageFaqsForTour(
  tour: Tour,
  destinationLabel: string
): Array<{ question: string; answer: string }> {
  if (tour.faqs && tour.faqs.length > 0) {
    return tour.faqs;
  }
  return getTourPageFaqs(destinationLabel);
}

/** Default FAQs for tour detail pages (NZ audience, GEO-friendly). */
export function getTourPageFaqs(destinationLabel: string): Array<{ question: string; answer: string }> {
  return [
    {
      question: 'Do New Zealand passport holders need a visa for China?',
      answer:
        'Most leisure trips qualify for visa-free entry: NZ ordinary passport holders can usually stay up to 30 days without a tourist visa under current policy (published to 31 December 2026). Bring a valid passport, return or onward travel, and hotel or tour documentation. If your trip exceeds 30 days or is for work, study, or other restricted purposes, you may need a traditional visa — CTS can point you to current requirements and our NZ entry guide.',
    },
    {
      question: 'What is typically included in the tour price?',
      answer:
        'Our tours include return international airfares from New Zealand, hotel accommodation as specified in the itinerary, English-speaking tour guide, entrance fees and meals as specified, and all land transfers. Each tour page lists the full inclusions and exclusions — check the Inclusions section on this page for details.',
    },
    {
      question: `When is the best time to visit ${destinationLabel}?`,
      answer:
        'It depends on the regions on your itinerary and whether you prefer mild weather, festivals, or fewer crowds. Our consultants can recommend seasons based on this exact route and your travel style.',
    },
    {
      question: 'Are international flights from New Zealand included?',
      answer:
        'Yes. Return international airfares from New Zealand are included in our tour prices. We arrange the most convenient routing from your nearest New Zealand airport. Check the Inclusions section on each tour page for confirmation.',
    },
    {
      question: 'How do I book and what payment options are available?',
      answer:
        'Submit an enquiry via this page or call 0800 CTS 888 (0800 287 888). Our team will confirm availability, finalise details, and outline deposit and balance payment steps.',
    },
  ];
}
