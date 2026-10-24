import type { ReactNode } from 'react';
import { CalendarClock, Check, GraduationCap, Leaf, Sparkles, Store, Truck } from 'lucide-react';

interface HeroProps {
  eyebrow?: string;
  title: ReactNode;
  lead: ReactNode;
  actions?: ReactNode;
  /** `home`: full hero with product illustration. `page`: compact page header. */
  variant?: 'home' | 'page';
  children?: ReactNode;
}

export function Hero({ eyebrow, title, lead, actions, variant = 'page', children }: HeroProps) {
  return (
    <section className={`hero hero--${variant}`} aria-labelledby="page-title">
      <div className="hero__backdrop" aria-hidden>
        <FieldLines />
      </div>
      <div className="container hero__inner">
        <div className="hero__copy">
          {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
          <h1 id="page-title" className="hero__title">
            {title}
          </h1>
          <p className="hero__lead">{lead}</p>
          {actions && <div className="hero__actions">{actions}</div>}
          {children}
        </div>
        {variant === 'home' && <HeroIllustration />}
      </div>
    </section>
  );
}

/** Contour lines suggesting cultivated rows, drawn behind the hero. */
function FieldLines() {
  const rows = Array.from({ length: 14 }, (_, i) => i);
  return (
    <svg className="field-lines" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" focusable={false}>
      {rows.map((i) => {
        const y = 140 + i * 42;
        return (
          <path
            key={i}
            d={`M-40 ${y + 120} C 320 ${y - 40}, 720 ${y + 160}, 1480 ${y - 60}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity={0.05 + (i % 4) * 0.025}
          />
        );
      })}
    </svg>
  );
}

/**
 * Illustrative product concept: harvest availability on one side, customer
 * demand on the other, and a recommendation awaiting human approval.
 * Contains no real data.
 */
function HeroIllustration() {
  return (
    <figure className="hero-visual">
      <div className="hero-visual__stage" aria-hidden>
        <div className="hv-card hv-card--harvest">
          <p className="hv-card__label">
            <Leaf size={14} /> Harvest availability
          </p>
          <ul className="hv-list" role="list">
            <li>
              <span className="hv-dot hv-dot--ready" />
              <span className="hv-list__name">Leafy greens</span>
              <span className="hv-tag">Ready this week</span>
            </li>
            <li>
              <span className="hv-dot hv-dot--soon" />
              <span className="hv-list__name">Microgreens</span>
              <span className="hv-tag">Next batch</span>
            </li>
            <li>
              <span className="hv-dot hv-dot--soon" />
              <span className="hv-list__name">Culinary herbs</span>
              <span className="hv-tag">Pre-order open</span>
            </li>
          </ul>
        </div>

        <svg className="hv-flow" viewBox="0 0 120 240" preserveAspectRatio="none" focusable={false}>
          <path d="M0 60 C 60 60, 60 120, 120 120" />
          <path d="M0 180 C 60 180, 60 120, 120 120" />
        </svg>

        <div className="hv-card hv-card--demand">
          <p className="hv-card__label">
            <Store size={14} /> Customer demand
          </p>
          <ul className="hv-chips" role="list">
            <li>
              <Truck size={13} /> Wholesale enquiry
            </li>
            <li>
              <CalendarClock size={13} /> Pre-order request
            </li>
            <li>
              <GraduationCap size={13} /> Learning journey
            </li>
          </ul>
        </div>

        <div className="hv-card hv-card--advice">
          <p className="hv-card__label">
            <Sparkles size={14} /> Suggested next step
          </p>
          <p className="hv-advice">Offer this week’s leafy greens to buyers who enquired recently.</p>
          <div className="hv-approval">
            <span className="hv-approval__status">Awaiting your review</span>
            <span className="hv-approval__btn">
              <Check size={13} /> Approve
            </span>
          </div>
        </div>
      </div>
      <figcaption className="hero-visual__caption">
        Illustrative concept of the Tyllage platform — not live data.
      </figcaption>
    </figure>
  );
}
