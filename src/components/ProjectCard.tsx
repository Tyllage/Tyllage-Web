import { ArrowUpRight, Check } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  /** `detailed` shows the full focus list and status note. */
  detailed?: boolean;
  headingLevel?: 'h2' | 'h3';
}

export function ProjectCard({ project, detailed = false, headingLevel: Heading = 'h3' }: ProjectCardProps) {
  const isPrototype = project.status.startsWith('Prototype');

  return (
    <article id={detailed ? project.id : undefined} className={`project-card${detailed ? ' project-card--detailed' : ''}`}>
      <div className="project-card__visual" aria-hidden>
        <ProjectPattern variant={isPrototype ? 'rows' : 'routes'} />
        <span className="project-card__monogram">{project.shortName}</span>
      </div>
      <div className="project-card__body">
        <p className={`status-badge ${isPrototype ? 'status-badge--prototype' : 'status-badge--concept'}`}>
          <span className="sr-only">Status: </span>
          {project.status}
        </p>
        <Heading className="project-card__title">{project.name}</Heading>
        <p className="project-card__summary">{project.summary}</p>

        <ul className={`project-card__focus${detailed ? ' project-card__focus--list' : ''}`} role="list" aria-label="Focus areas">
          {project.focusAreas.map((area) => (
            <li key={area}>
              {detailed && <Check size={16} aria-hidden />}
              {area}
            </li>
          ))}
        </ul>

        {detailed && <p className="project-card__note">{project.note}</p>}

        {project.link && (
          <a className="btn btn--outline btn--sm project-card__link" href={project.link} target="_blank" rel="noopener noreferrer">
            {project.linkLabel ?? 'Visit'} <ArrowUpRight size={16} aria-hidden />
            <span className="sr-only"> — {project.name} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}

function ProjectPattern({ variant }: { variant: 'rows' | 'routes' }) {
  if (variant === 'rows') {
    return (
      <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" focusable={false}>
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M-20 ${30 + i * 22} Q 200 ${i * 22 - 10}, 420 ${40 + i * 22}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity={0.18 + (i % 3) * 0.08}
          />
        ))}
      </svg>
    );
  }
  const nodes = [
    [60, 140],
    [150, 60],
    [230, 120],
    [320, 50],
    [350, 150],
  ];
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" focusable={false}>
      <path
        d="M60 140 L150 60 L230 120 L320 50 M230 120 L350 150 M150 60 L320 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="4 6"
        opacity="0.45"
      />
      {nodes.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill="currentColor" opacity="0.6" />
      ))}
    </svg>
  );
}
