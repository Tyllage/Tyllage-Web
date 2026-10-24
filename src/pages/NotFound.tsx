import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { pages } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta(pages.notFound);
  return (
    <Hero
      variant="plain"
      eyebrow="Error 404"
      title="This page could not be found."
      lead="The link may be out of date, or the page may have moved."
      actions={
        <>
          <Link to="/" className="btn btn--primary">
            Back to home <ArrowRight size={18} aria-hidden />
          </Link>
          <Link to="/contact" className="btn btn--outline">
            Contact us
          </Link>
        </>
      }
    />
  );
}
