import type { ReactNode } from 'react';
import type { MediaSlot } from '../data/media';
import type { SceneVariant } from './Scene';
import { Media } from './Media';

interface HeroProps {
  eyebrow?: string;
  title: ReactNode;
  lead: ReactNode;
  actions?: ReactNode;
  /**
   * `home`: full-bleed image with overlay. `page`: editorial header with an
   * image panel. `plain`: text only (legal pages, 404).
   */
  variant?: 'home' | 'page' | 'plain';
  media?: MediaSlot | SceneVariant;
  children?: ReactNode;
}

export function Hero({ eyebrow, title, lead, actions, variant = 'page', media, children }: HeroProps) {
  if (variant === 'home') {
    return (
      <section className="hero hero--home" aria-labelledby="page-title">
        {media && <Media slot={media} className="hero__bg" priority />}
        <div className="hero__overlay" aria-hidden />
        <div className="container hero__inner">
          <div className="hero__copy">
            {eyebrow && <p className="eyebrow eyebrow--light hero__fade hero__fade--1">{eyebrow}</p>}
            <h1 id="page-title" className="hero__title hero__fade hero__fade--2">
              {title}
            </h1>
            <p className="hero__lead hero__fade hero__fade--3">{lead}</p>
            {actions && <div className="hero__actions hero__fade hero__fade--4">{actions}</div>}
            {children}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`hero hero--${variant}`} aria-labelledby="page-title">
      <div className="container hero__inner">
        <div className="hero__copy">
          {eyebrow && <p className="eyebrow hero__fade hero__fade--1">{eyebrow}</p>}
          <h1 id="page-title" className="hero__title hero__fade hero__fade--2">
            {title}
          </h1>
          <p className="hero__lead hero__fade hero__fade--3">{lead}</p>
          {actions && <div className="hero__actions hero__fade hero__fade--4">{actions}</div>}
          {children}
        </div>
        {variant === 'page' && media && <Media slot={media} className="hero__panel hero__fade hero__fade--3" priority />}
      </div>
    </section>
  );
}
