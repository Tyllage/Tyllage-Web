import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import type { Project } from '../data/projects';
import { media } from '../data/media';
import { Media } from './Media';

interface ProjectCardProps {
  project: Project;
  headingLevel?: 'h2' | 'h3';
  /** Show a link to the full project write-up on the Projects page. */
  showDetailsLink?: boolean;
}

/** Featured project card: image, status, focus areas and prototype link. */
export function ProjectCard({ project, headingLevel: Heading = 'h3', showDetailsLink = false }: ProjectCardProps) {
  const isPrototype = project.status.startsWith('Prototype');

  return (
    <article className="project-card">
      <Media slot={media.projectMeod} className="project-card__visual" zoom>
        <span className={`status-badge project-card__badge ${isPrototype ? 'status-badge--prototype' : 'status-badge--concept'}`}>
          <span className="sr-only">Status: </span>
          {project.status}
        </span>
      </Media>
      <div className="project-card__body">
        <p className="eyebrow">Featured workstream</p>
        <Heading className="project-card__title">{project.name}</Heading>
        <p className="project-card__summary">{project.summary}</p>

        <ul className="project-card__focus" role="list" aria-label="Focus areas">
          {project.focusAreas.map((area) => (
            <li key={area}>
              <Check size={16} aria-hidden />
              {area}
            </li>
          ))}
        </ul>

        <p className="project-card__note">{project.note}</p>

        <div className="project-card__actions">
          {project.link && (
            <a className="btn btn--primary btn--sm" href={project.link} target="_blank" rel="noopener noreferrer">
              {project.linkLabel ?? 'Visit'} <ArrowUpRight size={16} aria-hidden />
              <span className="sr-only"> — {project.name} (opens in a new tab)</span>
            </a>
          )}
          {showDetailsLink && (
            <Link to={`/projects#${project.id}`} className="text-link">
              About this workstream <ArrowRight size={16} aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
