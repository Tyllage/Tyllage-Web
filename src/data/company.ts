/**
 * Single source of truth for verified company information.
 *
 * Only add details here once they are confirmed. Optional fields left as
 * `null` are simply not rendered anywhere on the site (no broken links,
 * no placeholder buttons).
 */

export interface Founder {
  name: string;
  /** Verified role. Use "Founding Partner" until a more specific role is confirmed. */
  role: string;
  /** Verified biography. Leave `null` until approved by the founder. */
  bio: string | null;
  /** Personal LinkedIn profile URL, if the founder wishes to share it. */
  linkedin: string | null;
  /**
   * Real, approved photo under /public, e.g. "/images/founders/felicia-tan.jpg".
   * Never use AI-generated or stock portraits here.
   */
  photo: string | null;
}

export interface TeamMember {
  name: string;
  /** Role as the member would like it shown, e.g. "Software Developer". Omit until confirmed. */
  role?: string;
  /** Optional one-line description of what they work on. */
  focus?: string;
  /** Personal LinkedIn profile URL, if the member wishes to share it. */
  linkedin?: string;
  /**
   * Real, approved photo under /public, e.g. "/images/team/alex-lim.jpg".
   * Never use AI-generated or stock portraits here.
   */
  photo?: string;
}

export interface CompanyContact {
  /** Public enquiry email. `null` hides it. */
  email: string | null;
  /** Public phone number in international format. `null` hides it. */
  phone: string | null;
  /** Registered or correspondence address. `null` hides it. */
  address: string | null;
  /**
   * ACRA Unique Entity Number. Verify against the latest ACRA Business
   * Profile before each publication. `null` hides it.
   */
  uen: string | null;
}

export interface SocialProfiles {
  linkedin: string;
  instagram: string | null;
  /** Official GitHub organisation URL, if one should be shown publicly. */
  github: string | null;
}

/**
 * Production domain, used for canonical URLs, Open Graph tags, structured
 * data, robots.txt and the sitemap. It is metadata only and is never shown
 * to visitors as a link. Override at build time with VITE_SITE_URL (for
 * example while the site is hosted on a temporary address).
 */
const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://tyllage.org').trim().replace(/\/+$/, '');

const social: SocialProfiles = {
  linkedin: 'https://www.linkedin.com/company/tyllage-llp',
  instagram: 'https://www.instagram.com/tyllage.llp/',
  github: null,
};

const contact: CompanyContact = {
  email: 'tyllage.co@gmail.com',
  phone: null,
  address: null,
  uen: 'T26LL1129K',
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

/**
 * Team members beyond the founding partners, shown under "Our team" on the
 * About page. The section stays hidden while this list is empty. Add people
 * only with their agreement, using the name and role they want shown:
 *
 *   { name: 'Alex Lim', role: 'Software Developer', focus: 'Builds the farm platform frontend.' },
 */
const team: TeamMember[] = [
  { name: 'Valene He', role: 'Chief Information Security Officer (CISO)' },
  { name: 'Chit Myat', role: 'Chief Business Officer (CBO)' },
  { name: 'Nicole', role: 'Head of Product & Delivery' },
  { name: 'Shermaine', role: 'Head of AI & Analytics' },
];

export const company = {
  legalName: 'Tyllage LLP',
  brandName: 'Tyllage',
  tagline: 'From Harvest to Demand.',
  industry: 'AgriTech / Artificial Intelligence / Software Development',
  country: 'Singapore',
  countryCode: 'SG',
  entityType: 'Limited Liability Partnership',
  siteUrl,
  logo: '/logo/2.png',
  description:
    'Tyllage is a Singapore-based, female-founded AgriTech software startup developing practical AI solutions for agricultural businesses.',
  longDescription:
    'We aim to improve how farms manage their sales, customer enquiries, upcoming harvests, marketing outreach and business operations — helping them make informed decisions, strengthen market connections, improve sales opportunities and reduce avoidable agricultural waste.',
  focus:
    'Our initial focus is on farm operations and sales intelligence, rather than IoT, robotics or physical agricultural equipment.',
  mission:
    'Empower farms with accessible technology that improves sales efficiency, strengthens market connections, and supports sustainable agricultural operations.',
  vision:
    'Build a smarter and more commercially resilient agricultural ecosystem through intelligent, connected software.',
  social,
  contact,
  founders,
  team,
} as const;

/** All configured social profile URLs — used for `sameAs` structured data. */
export function configuredSocialUrls(): string[] {
  const { linkedin, instagram, github } = company.social;
  return [linkedin, instagram, github].filter((url): url is string => Boolean(url));
}

export function mailtoHref(subject?: string, body?: string): string | null {
  if (!company.contact.email) return null;
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  // URLSearchParams encodes spaces as "+", which some mail clients show literally.
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${company.contact.email}${query ? `?${query}` : ''}`;
}

/** Public URL for the MEOD Farm prototype. */
export const MEOD_PROTOTYPE_URL = 'https://tyllage.github.io/Tyllage-MEOD-Vibecode/';
