import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { company } from '../data/company';
import { publicProjects } from '../data/projects';
import { navItems } from '../data/navigation';
import { ExternalLink } from './ExternalLink';
import { Logo } from './Logo';
import { SocialLinks } from './SocialLinks';
import { InstagramIcon, LinkedInIcon } from './Icons';

export function Footer() {
  const year = new Date().getFullYear();
  const { email, phone, address, uen } = company.contact;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" aria-label={`${company.brandName} — home`}>
              <Logo tone="light" />
            </Link>
            <p className="site-footer__tagline">{company.tagline}</p>
            <p className="site-footer__about">
              A Singapore-based, female-founded AgriTech software startup building practical AI for agricultural
              businesses.
            </p>
            <SocialLinks tone="dark" include={['linkedin', 'instagram', 'github']} />
          </div>

          <nav className="site-footer__col" aria-label="Company">
            <h2 className="site-footer__heading">Company</h2>
            <ul role="list">
              {navItems
                .filter((n) => n.to !== '/')
                .map((n) => (
                  <li key={n.to}>
                    <Link to={n.to}>{n.label}</Link>
                  </li>
                ))}
            </ul>
          </nav>

          <nav className="site-footer__col" aria-label="Platform and projects">
            <h2 className="site-footer__heading">Platform</h2>
            <ul role="list">
              <li>
                <Link to="/platform#core-capabilities">Development areas</Link>
              </li>
              <li>
                <Link to="/technology#responsible-ai">Responsible AI</Link>
              </li>
              {publicProjects.map((p) => (
                <li key={p.id}>
                  <Link to={`/projects#${p.id}`}>{p.name}</Link>
                </li>
              ))}
              {publicProjects
                .filter((p) => p.link)
                .map((p) => (
                  <li key={`${p.id}-link`}>
                    <ExternalLink href={p.link!}>{p.shortName} prototype</ExternalLink>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="site-footer__col">
            <h2 className="site-footer__heading">Contact</h2>
            <ul role="list" className="site-footer__contact">
              {email && (
                <li>
                  <a href={`mailto:${email}`}>
                    <Mail size={16} aria-hidden /> {email}
                  </a>
                </li>
              )}
              <li>
                <ExternalLink href={company.social.linkedin}>
                  <LinkedInIcon size={16} /> LinkedIn
                </ExternalLink>
              </li>
              {company.social.instagram && (
                <li>
                  <ExternalLink href={company.social.instagram}>
                    <InstagramIcon size={16} /> Instagram
                  </ExternalLink>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
                </li>
              )}
            </ul>
            {address && <address className="site-footer__address">{address}</address>}
          </div>
        </div>

        <div className="site-footer__legal-block">
          <p className="site-footer__entity">
            <strong>{company.legalName}</strong>
            <span>
              Registered in {company.country} as a {company.entityType}.
              {uen && <> UEN: {uen}</>}
            </span>
          </p>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <ul role="list" className="site-footer__legal">
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Use</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
