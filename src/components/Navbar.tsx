import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { company } from '../data/company';
import { navItems } from '../data/navigation';
import { LinkedInIcon, TyllageMark } from './Icons';


export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span className={`logo logo--${tone}`}>
      <TyllageMark size={34} />
      <span className="logo__word">{company.brandName}</span>
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 1024) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    document.body.classList.add('nav-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.classList.remove('nav-open');
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" aria-label={`${company.brandName} — home`}>
          <Logo />
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <ul id="primary-menu" className="site-nav__list" role="list">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className="site-nav__link">
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="site-nav__mobile-only">
              <a
                className="site-nav__link site-nav__social"
                href={company.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon size={18} />
                Tyllage on LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li className="site-nav__mobile-only">
              <Link to="/contact" className="btn btn--primary btn--block">
                Partner With Us <ArrowRight size={18} aria-hidden />
              </Link>
            </li>
          </ul>
        </nav>

        <div className="site-header__actions">
          <a
            className="icon-link"
            href={company.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tyllage on LinkedIn (opens in a new tab)"
            title="Tyllage on LinkedIn"
          >
            <LinkedInIcon size={18} />
          </a>
          <Link to="/contact" className="btn btn--primary btn--sm site-header__cta">
            Partner With Us
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="primary-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
