import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { company } from '../data/company';
import { Media } from './Media';

interface CtaBandProps {
  title?: ReactNode;
  text?: ReactNode;
  id?: string;
  buttonLabel?: string;
}

export function CtaBand({
  id = 'cta-title',
  title = 'Let’s Grow Something Meaningful Together.',
  text = 'We would like to hear from farm owners, agricultural businesses, technology partners, schools, industry collaborators, mentors and investors.',
  buttonLabel = 'Partner With Tyllage',
}: CtaBandProps) {
  const { email } = company.contact;
  return (
    <section className="cta-band" aria-labelledby={id}>
      <div className="container">
        <div className="cta-band__panel reveal">
          <Media slot="leaves" className="cta-band__bg" />
          <div className="cta-band__copy">
            <p className="eyebrow eyebrow--light">Partner with Tyllage</p>
            <h2 id={id} className="cta-band__title">
              {title}
            </h2>
            <p className="cta-band__text">{text}</p>
            <div className="cta-band__actions">
              <Link to="/contact" className="btn btn--sage">
                {buttonLabel} <ArrowRight size={18} aria-hidden />
              </Link>
              {email && (
                <a className="btn btn--ghost-light" href={`mailto:${email}`}>
                  <Mail size={18} aria-hidden /> {email}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
