import { useEffect, useRef, type RefObject } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { useReveal } from '../hooks/useReveal';

/** Resets scroll and focus on navigation, and honours in-page #hash links. */
function useRouteFocus(mainRef: RefObject<HTMLElement | null>) {
  const { pathname, hash } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    // Page transitions apply only to in-app navigation, never to the first paint.
    document.documentElement.dataset.navigated = 'true';
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash, mainRef]);
}

export function Layout() {
  const mainRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  useRouteFocus(mainRef);
  useReveal();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Navbar />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <div key={pathname} className="page-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
