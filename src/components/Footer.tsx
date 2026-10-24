import { Link } from 'react-router-dom';
import { company } from '../data/company';
import { projects } from '../data/projects';
import { ExternalLink } from './ExternalLink';
import { navItems } from '../data/navigation';
import { Logo } from './Navbar';
import { SocialLinks } from './SocialLinks';

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
            <p className="site-footer__legal-name">{company.legalName}</p>
            <p className="site-footer__tagline">{company.tagline}</p>
            <SocialLinks tone="dark" />
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

          <nav className="site-footer__col" aria-label="Platform">
            <h2 className="site-footer__heading">Platform</h2>
            <ul role="list">
              <li>
                <Link to="/platform#core-capabilities">Core capabilities</Link>
              </li>
              <li>
                <Link to="/platform#future-capabilities">Future capabilities</Link>
              </li>
              <li>
                <Link to="/technology">Responsible AI</Link>
              </li>
              <li>
                <Link to="/technology#architecture">Architecture</Link>
              </li>
            </ul>
          </nav>

          <nav className="site-footer__col" aria-label="Projects">
            <h2 className="site-footer__heading">Projects</h2>
            <ul role="list">
              {projects.map((p) => (
                <li key={p.id}>
                  <Link to={`/projects#${p.id}`}>{p.name}</Link>
                </li>
              ))}
              {projects
                .filter((p) => p.link)
                .map((p) => (
                  <li key={`${p.id}-link`}>
                    <ExternalLink href={p.link!}>{p.shortName} prototype</ExternalLink>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="site-footer__col">
            <h2 className="site-footer__heading">Connect</h2>
            <ul role="list">
              <li>
                <Link to="/contact">Partner with us</Link>
              </li>
              <li>
                <ExternalLink href={company.social.linkedin}>LinkedIn</ExternalLink>
              </li>
              {company.social.instagram && (
                <li>
                  <ExternalLink href={company.social.instagram}>Instagram</ExternalLink>
                </li>
              )}
              {email && (
                <li>
                  <a href={`mailto:${email}`}>{email}</a>
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

        <div className="site-footer__bottom">
          <p>
            Copyright © {year} {company.legalName}. All rights reserved.
            {uen && <> UEN {uen}.</>} Registered in {company.country}.
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
