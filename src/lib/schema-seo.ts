// Schema.org generation for SEO pages
// Used for /china-tours, city hubs, and guide pages

import { Tour } from './data/tours';
import { getSiteUrl } from './site';
import { migratedUnsplash } from './site-media';

/**
 * Generate CollectionPage schema for tour hub pages
 * Used for /china-tours, /beijing-tours, etc.
 */
export const generateCollectionPageSchema = (
  title: string,
  description: string,
  url: string,
  tours: Tour[]
) => {
  const baseUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: description,
    url: `${baseUrl}${url}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: tours.length,
      itemListElement: tours.map((tour, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: tour.name,
          description: tour.shortDescription,
          image: tour.heroImage,
          offers: {
            '@type': 'Offer',
            price: tour.price.replace(/[^\d.]/g, ''), // Extract numeric price
            priceCurrency: 'NZD',
            availability: 'https://schema.org/InStock'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '200'
          }
        }
      }))
    }
  };
};

/**
 * Generate TouristDestination schema for city hub pages
 */
export const generateTouristDestinationSchema = (
  cityName: string,
  description: string,
  url: string,
  tours: Tour[]
) => {
  const baseUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: cityName,
    description: description,
    url: `${baseUrl}${url}`,
    containsPlace: [
      {
        '@type': 'TouristAttraction',
        name: `${cityName} Tours`,
        description: `Browse available tours in ${cityName}`
      }
    ],
    hasOffering: tours.map(tour => ({
      '@type': 'Offer',
      name: tour.name,
      description: tour.shortDescription,
      price: tour.price.replace(/[^\d.]/g, ''),
      priceCurrency: 'NZD',
      url: `${baseUrl}/tours/${tour.destination}/${tour.tier}/${tour.slug}`
    }))
  };
};

/**
 * Generate WebPage schema for geo-targeted pages (NZ, Auckland)
 */
export const generateWebPageSchema = (
  title: string,
  description: string,
  url: string,
  location?: { name: string; address: string }
) => {
  const baseUrl = getSiteUrl();

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: `${baseUrl}${url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'CTS Tours',
      url: baseUrl
    }
  };

  if (location) {
    schema.areaServed = {
      '@type': 'Country',
      name: location.name
    };
    schema.mainEntity = {
      '@type': 'TravelAgency',
      name: 'CTS Tours',
      description: 'China Travel Specialists for New Zealand travellers',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NZ',
        addressLocality: location.name,
        streetAddress: location.address
      }
    };
  }

  return schema;
};

/**
 * Generate Article schema for guide pages (best-time-to-visit, visa-guide)
 */
export const generateArticleSchema = (
  title: string,
  description: string,
  url: string,
  author = 'CTS Tours',
  datePublished = new Date().toISOString().split('T')[0],
  dateModified = new Date().toISOString().split('T')[0]
) => {
  const baseUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: migratedUnsplash('photo-1464817739973-0128fe77aaa1'), // Fallback hero (Supabase CDN)
    author: {
      '@type': 'Organization',
      name: author
    },
    datePublished: datePublished,
    dateModified: dateModified,
    publisher: {
      '@type': 'Organization',
      name: 'CTS Tours',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/cts-logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${url}`
    }
  };
};

/**
 * Generate FAQPage schema for pages with FAQs
 */
export const generateFAQPageSchema = (
  url: string,
  faqs: Array<{ question: string; answer: string }>
) => {
  const baseUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    })),
    url: `${baseUrl}${url}`
  };
};

/**
 * Generate BreadcrumbList schema
 */
export const generateBreadcrumbListSchema = (
  breadcrumbs: Array<{ name: string; url: string }>
) => {
  const baseUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.url}`
    }))
  };
};

/**
 * Combine multiple schemas into an array
 * Useful for pages with multiple schema types (e.g., Article + FAQPage + BreadcrumbList)
 */
export const combineSchemas = (...schemas: any[]) => {
  return schemas.filter(Boolean); // Filter out undefined/null
};
