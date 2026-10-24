/**
 * Single source of truth for verified company information.
 *
 * Only add details here once they are confirmed. Optional fields left as
 * `null` are simply not rendered anywhere on the site (no broken links,
 * no placeholder buttons).
 */

export interface Founder {
  name: string;
  /** Verified role. "Founding Partner" reflects the LLP's two founding partners. */
  role: string;
  /** Verified biography. Leave `null` until approved by the founder. */
  bio: string | null;
  /** Personal LinkedIn profile URL, if the founder wishes to share it. */
  linkedin: string | null;
  /** Path under /public, e.g. "/images/founders/felicia-tan.jpg". */
  photo: string | null;
}

export interface CompanyContact {
  /** Public enquiry email, e.g. "hello@tyllage.com". `null` hides it. */
  email: string | null;
  /** Public phone number in international format. `null` hides it. */
  phone: string | null;
  /** Registered or correspondence address. `null` hides it. */
  address: string | null;
  /** ACRA Unique Entity Number. `null` hides it. */
  uen: string | null;
}

export interface SocialProfiles {
  linkedin: string;
  /** Set to the official Instagram URL once available, e.g. "https://www.instagram.com/<handle>/". */
  instagram: string | null;
  /** Official GitHub organisation URL, if one should be shown publicly. */
  github: string | null;
}

const social: SocialProfiles = {
  linkedin: 'https://www.linkedin.com/company/tyllage-llp',
  // INSTAGRAM_URL_TO_BE_PROVIDED — replace `null` with the official URL.
  instagram: null,
  github: null,
};

const contact: CompanyContact = {
  email: null,
  phone: null,
  address: null,
  uen: null,
};

const founders: Founder[] = [
  {
    name: 'Felicia Tan',
    role: 'Founding Partner',
    bio: null,
    linkedin: null,
    photo: null,
  },
  {
    name: 'Shernell Ho',
    role: 'Founding Partner',
    bio: null,
    linkedin: null,
    photo: null,
  },
];

export const company = {
  legalName: 'Tyllage LLP',
  brandName: 'Tyllage',
  tagline: 'From Harvest to Demand.',
  industry: 'Software Development / AgriTech / Artificial Intelligence',
  country: 'Singapore',
  countryCode: 'SG',
  siteUrl: 'https://tyllage.com',
  description:
    'Tyllage is an emerging Singapore AgriTech software startup developing AI-powered farm sales and operational intelligence solutions.',
  longDescription:
    'Our platform aims to help agricultural businesses connect harvest availability with customer demand, improve sales operations, identify commercial opportunities, and support better decisions through practical artificial intelligence.',
  accessibility:
    'We prioritise accessible technology that can operate without expensive IoT infrastructure or extensive historical datasets.',
  mission:
    'Empower farms with accessible technology that improves sales efficiency, strengthens market connections, and supports sustainable agricultural operations.',
  vision:
    'Build a smarter and more commercially resilient agricultural ecosystem through intelligent, connected software.',
  social,
  contact,
  founders,
} as const;

/** All configured social profile URLs — used for `sameAs` structured data. */
export function configuredSocialUrls(): string[] {
  const { linkedin, instagram, github } = company.social;
  return [linkedin, instagram, github].filter((url): url is string => Boolean(url));
}

/** Public URL for the MEOD Farm prototype. */
export const MEOD_PROTOTYPE_URL = 'https://tyllage.github.io/Tyllage-MEOD-Vibecode/';
