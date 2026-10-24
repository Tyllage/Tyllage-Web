import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LinkedInIcon } from './Icons';

export interface Person {
  name: string;
  role?: string;
  /** Short line or bio shown under the role. */
  note?: string;
  linkedin?: string;
  photo?: string;
  founder?: boolean;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

interface TeamGalleryProps {
  people: Person[];
  /** Section heading, shown left of the previous/next buttons. */
  heading: ReactNode;
  /** Accessible name for the scrollable list. */
  label: string;
}

/**
 * Horizontally scrollable row of team cards with snap scrolling, edge fades
 * and previous/next buttons. The buttons only appear when the row overflows.
 * The scroll area is keyboard-focusable, so arrow keys scroll it natively.
 */
export function TeamGallery({ people, heading, label }: TeamGalleryProps) {
  const trackId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  // Matches the server render (no overflow known yet); measured after mount.
  const [edges, setEdges] = useState({ atStart: true, atEnd: true });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const atStart = el.scrollLeft <= 2;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setEdges((prev) => (prev.atStart === atStart && prev.atEnd === atEnd ? prev : { atStart, atEnd }));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', measure);
      observer.disconnect();
    };
  }, [measure]);

  function scrollByCard(direction: 1 | -1) {
    const el = trackRef.current;
    const card = el?.querySelector<HTMLElement>('.person');
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el.firstElementChild as Element).columnGap) || 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  const scrollable = !(edges.atStart && edges.atEnd);

  return (
    <div className="gallery" data-at-start={edges.atStart} data-at-end={edges.atEnd}>
      <div className="gallery__head">
        {heading}
        {scrollable && (
          <div className="gallery__controls">
            <button
              type="button"
              className="gallery__btn"
              onClick={() => scrollByCard(-1)}
              disabled={edges.atStart}
              aria-controls={trackId}
              aria-label="Show previous team members"
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              className="gallery__btn"
              onClick={() => scrollByCard(1)}
              disabled={edges.atEnd}
              aria-controls={trackId}
              aria-label="Show more team members"
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>
        )}
      </div>

      {/* Scrollable regions must be keyboard-focusable so keyboard users can scroll them (WCAG 2.1.1). */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div id={trackId} ref={trackRef} className="gallery__viewport" role="region" aria-label={label} tabIndex={0}>
        <ul className="gallery__track" role="list">
          {people.map((p) => (
            <li key={p.name} className="person">
              <div className="person__photo">
                {p.photo ? (
                  <img src={p.photo} alt={`Portrait of ${p.name}`} width={264} height={264} loading="lazy" />
                ) : (
                  <span className="person__initials" aria-hidden>
                    {initials(p.name)}
                  </span>
                )}
                {p.founder && <span className="person__tag">Founder</span>}
              </div>
              <div className="person__body">
                <h3 className="person__name">{p.name}</h3>
                {p.role && <p className="person__role">{p.role}</p>}
                {p.note && <p className="person__note">{p.note}</p>}
                {p.linkedin && (
                  <a className="person__link" href={p.linkedin} target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon size={15} /> LinkedIn
                    <span className="sr-only"> profile of {p.name} (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
