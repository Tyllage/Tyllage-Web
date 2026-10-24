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
    title: 'Tyllage — AI-Assisted Farm Sales & Operational Intelligence',
    description:
      'Tyllage is a Singapore AgriTech software venture developing AI-assisted sales and operational intelligence that connects harvest availability with customer demand.',
  },
  about: {
    path: '/about',
    title: 'About Us' + suffix,
    description:
      'Meet Tyllage LLP, a Singapore-registered AgriTech software venture. Our story, mission, vision, values and founding partners.',
  },
  platform: {
    path: '/platform',
    title: 'Our Platform' + suffix,
    description:
      'Explore the emerging Tyllage farm intelligence platform: Demand Radar, Harvest Batch Management, AI Campaign Advisor, Harvest Pre-Orders and more.',
  },
  projects: {
    path: '/projects',
    title: 'Projects & Pilots' + suffix,
    description:
      'Tyllage project workstreams: the MEOD Farm prototype for AI-assisted farm operations, and ComCrop, a proposed demand-coordination workstream.',
  },
  technology: {
    path: '/technology',
    title: 'Technology & Innovation' + suffix,
    description:
      'How Tyllage approaches artificial intelligence, cloud computing, workflow automation, responsible AI, and data security and privacy.',
  },
  contact: {
    path: '/contact',
    title: 'Partner With Us' + suffix,
    description:
      'Partner with Tyllage. We welcome enquiries from farms, agricultural businesses, wholesale buyers, technology partners, schools, investors and mentors.',
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
    logo: `${company.siteUrl}/favicon.svg`,
    description: `${company.description} ${company.longDescription}`,
    slogan: company.tagline,
    address: {
      '@type': 'PostalAddress',
      addressCountry: company.countryCode,
      ...(company.contact.address ? { streetAddress: company.contact.address } : {}),
    },
    ...(company.contact.email ? { email: company.contact.email } : {}),
    ...(company.contact.phone ? { telephone: company.contact.phone } : {}),
    founder: company.founders.map((f) => ({ '@type': 'Person', name: f.name })),
    sameAs: configuredSocialUrls(),
  };
}
