import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { company } from '../data/company';
import { navItems } from '../data/navigation';
import { Logo } from './Logo';
import { SocialLinks } from './SocialLinks';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Pages with a full-bleed photographic hero start with a transparent header.
  const overHero = pathname === '/' && !scrolled && !open;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    <header
      className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}${overHero ? ' is-over-hero' : ''}`}
    >
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" aria-label={`${company.brandName} — home`}>
          <Logo tone={overHero ? 'light' : 'dark'} />
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
            <li className="site-nav__mobile-only site-nav__mobile-social">
              <SocialLinks variant="list" include={['linkedin', 'instagram']} />
            </li>
            <li className="site-nav__mobile-only">
              <Link to="/contact" className="btn btn--primary btn--block">
                Partner With Us <ArrowRight size={18} aria-hidden />
              </Link>
            </li>
          </ul>
        </nav>

        <div className="site-header__actions">
          <SocialLinks
            className="site-header__social"
            tone={overHero ? 'hero' : 'light'}
            include={['linkedin', 'instagram']}
          />
          <Link to="/contact" className={`btn btn--sm site-header__cta ${overHero ? 'btn--sage' : 'btn--primary'}`}>
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
