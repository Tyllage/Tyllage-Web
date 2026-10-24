import { company, configuredSocialUrls } from './company';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** Excluded from the sitemap and marked noindex (e.g. the 404 page). */
  noindex?: boolean;
}

const suffix = ' | Tyllage';

export const pages = {
  home: {
    path: '/',
    title: 'Tyllage — Growing Smarter. Selling Better. | Singapore AgriTech',
    description:
      'Tyllage is a Singapore-based, female-founded AgriTech startup developing practical AI that helps farms manage sales, enquiries, upcoming harvests and marketing outreach.',
  },
  about: {
    path: '/about',
    title: 'About Us' + suffix,
    description:
      'From classrooms to cultivating change: the story of Tyllage LLP, a Singapore AgriTech startup founded by Felicia Tan and Shernell Ho. Our mission, vision and values.',
  },
  platform: {
    path: '/platform',
    title: 'Our Platform' + suffix,
    description:
      'The practical tools Tyllage is developing for farm businesses: Demand Radar, Harvest Batch Management, AI Campaign Advisor, Harvest Pre-Orders and more — with farm staff always in control.',
  },
  projects: {
    path: '/projects',
    title: 'Projects & Pilots' + suffix,
    description:
      'Tyllage — MEOD Farm: an evolving prototype exploring AI-assisted farm operations, customer engagement, harvest pre-orders and learning-journey support.',
  },
  technology: {
    path: '/technology',
    title: 'Technology & Innovation' + suffix,
    description:
      'How Tyllage uses practical AI, cloud software and workflow automation to help farms — explained in plain language, with responsible AI and privacy at the core.',
  },
  contact: {
    path: '/contact',
    title: 'Partner With Us' + suffix,
    description:
      'Partner with Tyllage. Contact us at tyllage.co@gmail.com — we welcome farm owners, agricultural businesses, technology partners, schools, industry collaborators, mentors and investors.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy' + suffix,
    description: 'How Tyllage LLP handles personal data submitted through this website.',
  },
  terms: {
    path: '/terms',
    title: 'Terms of Use' + suffix,
    description: 'Terms governing the use of the Tyllage LLP website.',
  },
  notFound: {
    path: '/404',
    title: 'Page Not Found' + suffix,
    description: 'The page you were looking for could not be found.',
    noindex: true,
  },
} satisfies Record<string, PageMeta>;

export const OG_IMAGE = '/images/og-image.png';

export function canonicalUrl(path: string): string {
  return path === '/' ? `${company.siteUrl}/` : `${company.siteUrl}${path}`;
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.brandName,
    legalName: company.legalName,
    url: `${company.siteUrl}/`,
    logo: `${company.siteUrl}/logo/tyllage-logo-512.png`,
    description: `${company.description} ${company.longDescription}`,
    slogan: company.tagline,
    address: {
      '@type': 'PostalAddress',
      addressCountry: company.countryCode,
      ...(company.contact.address ? { streetAddress: company.contact.address } : {}),
    },
    ...(company.contact.uen
      ? { identifier: { '@type': 'PropertyValue', propertyID: 'UEN', value: company.contact.uen } }
      : {}),
    ...(company.contact.email ? { email: company.contact.email } : {}),
    ...(company.contact.phone ? { telephone: company.contact.phone } : {}),
    founder: company.founders.map((f) => ({ '@type': 'Person', name: f.name })),
    sameAs: configuredSocialUrls(),
  };
}
