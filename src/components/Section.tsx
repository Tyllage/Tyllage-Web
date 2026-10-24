import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  tone?: 'ivory' | 'white' | 'forest' | 'deep' | 'beige' | 'mist';
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}

export function Section({ id, tone = 'ivory', className = '', children, labelledBy }: SectionProps) {
  return (
    <section id={id} className={`section section--${tone} ${className}`} aria-labelledby={labelledBy}>
      <div className="container">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
}

export function SectionHeading({ id, eyebrow, title, intro, align = 'left', tone = 'dark' }: SectionHeadingProps) {
  return (
    <header className={`section-heading section-heading--${align} section-heading--${tone} reveal`}>
      {eyebrow && <p className={`eyebrow${tone === 'light' ? ' eyebrow--light' : ''}`}>{eyebrow}</p>}
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </header>
  );
}
