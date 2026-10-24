import type { ComponentType } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { company } from '../data/company';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from './Icons';

type SocialKey = 'linkedin' | 'instagram' | 'github';

interface SocialProfile {
  key: SocialKey;
  label: string;
  url: string;
  icon: ComponentType<{ size?: number }>;
  description: string;
}

const meta: Record<SocialKey, Omit<SocialProfile, 'url' | 'key'>> = {
  linkedin: {
    label: 'LinkedIn',
    icon: LinkedInIcon,
    description: 'Follow our company updates, technological developments and industry collaborations.',
  },
  instagram: {
    label: 'Instagram',
    icon: InstagramIcon,
    description: 'Explore our startup journey, development progress and behind-the-scenes moments.',
  },
  github: {
    label: 'GitHub',
    icon: GitHubIcon,
    description: 'Browse our open prototypes and technical work.',
  },
};

/** Only profiles with a configured URL are returned, so nothing renders broken. */
function getSocialProfiles(include: SocialKey[] = ['linkedin', 'instagram', 'github']): SocialProfile[] {
  return include.flatMap((key) => {
    const url = company.social[key];
    return url ? [{ key, url, ...meta[key] }] : [];
  });
}

interface SocialLinksProps {
  /** `icons`: compact round icons. `list`: icon plus label. `cards`: “Follow Our Journey” cards. */
  variant?: 'icons' | 'list' | 'cards';
  tone?: 'light' | 'dark';
  include?: SocialKey[];
  className?: string;
}

export function SocialLinks({ variant = 'icons', tone = 'light', include, className = '' }: SocialLinksProps) {
  const profiles = getSocialProfiles(include);
  if (profiles.length === 0) return null;

  if (variant === 'cards') {
    return (
      <ul className={`social-cards ${className}`} role="list">
        {profiles.map(({ key, label, url, icon: Icon, description }) => (
          <li key={key}>
            <a className="social-card" href={url} target="_blank" rel="noopener noreferrer">
              <span className="social-card__icon">
                <Icon size={22} />
              </span>
              <span className="social-card__body">
                <span className="social-card__title">{label}</span>
                <span className="social-card__text">{description}</span>
                <span className="social-card__cta">
                  Follow {company.brandName} on {label}
                  <ArrowUpRight size={16} aria-hidden />
                </span>
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`social-links social-links--${variant} social-links--${tone} ${className}`} role="list">
      {profiles.map(({ key, label, url, icon: Icon }) => (
        <li key={key}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={variant === 'icons' ? `${company.brandName} on ${label} (opens in a new tab)` : undefined}
            title={variant === 'icons' ? `${company.brandName} on ${label}` : undefined}
          >
            <Icon size={18} />
            {variant === 'list' && (
              <>
                <span>{label}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
