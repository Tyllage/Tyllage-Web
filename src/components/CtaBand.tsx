import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { company } from '../data/company';
import { LinkedInIcon } from './Icons';

interface CtaBandProps {
  title?: ReactNode;
  text?: ReactNode;
  id?: string;
}

export function CtaBand({
  id = 'cta-title',
  title = 'Let’s build the future of farm commerce together.',
  text = 'We are looking to work with farms, agricultural businesses, buyers, technology partners, schools, investors and mentors who share our vision.',
}: CtaBandProps) {
  return (
    <section className="cta-band" aria-labelledby={id}>
      <div className="container">
        <div className="cta-band__panel reveal">
          <div className="cta-band__copy">
            <p className="eyebrow eyebrow--light">Partner with Tyllage</p>
            <h2 id={id} className="cta-band__title">
              {title}
            </h2>
            <p className="cta-band__text">{text}</p>
          </div>
          <div className="cta-band__actions">
            <Link to="/contact" className="btn btn--accent">
              Partner With Us <ArrowRight size={18} aria-hidden />
            </Link>
            <a className="btn btn--ghost-light" href={company.social.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon size={18} /> Follow on LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
