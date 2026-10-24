import { ClipboardCheck, MessagesSquare, Microscope, Target } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Section, SectionHeading } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { CtaBand } from '../components/CtaBand';
import { projects } from '../data/projects';
import { pages } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

const approach = [
  {
    icon: Target,
    title: 'Clearly scoped',
    text: 'Each workstream starts with a focused question about a real farm sales or operations challenge.',
  },
  {
    icon: Microscope,
    title: 'Prototype first',
    text: 'We test ideas with working prototypes and demo data before committing to production builds.',
  },
  {
    icon: MessagesSquare,
    title: 'Built with feedback',
    text: 'Conversations with farms, buyers and educators shape what we build next.',
  },
  {
    icon: ClipboardCheck,
    title: 'Honestly labelled',
    text: 'We state the status of every project and never imply agreements or outcomes that do not exist.',
  },
];

export default function Projects() {
  usePageMeta(pages.projects);

  return (
    <>
      <Hero
        eyebrow="Projects & pilots"
        title="Where our technology takes shape."
        lead="Tyllage develops its platform through distinct workstreams. Each one explores a different part of the journey from harvest to demand."
      />

      <Section tone="ivory" labelledBy="workstreams-title">
        <h2 id="workstreams-title" className="sr-only">
          Workstreams
        </h2>
        <div className="project-stack">
          {projects.map((p) => (
            <div key={p.id} className="reveal">
              <ProjectCard project={p} detailed headingLevel="h3" />
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white" labelledBy="approach-title">
        <SectionHeading
          id="approach-title"
          eyebrow="Our approach"
          title="How we run projects and pilots."
          intro="Pilot workstreams are a way for us to learn alongside the people who would use our software."
        />
        <ul className="card-grid card-grid--4" role="list">
          {approach.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="feature-card reveal" style={{ ['--delay' as string]: `${i * 70}ms` }}>
              <span className="feature-card__icon">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__text">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        id="projects-cta-title"
        title="Interested in a pilot workstream?"
        text="If you run a farm or agricultural business, or work with one, we would welcome a conversation about collaborating."
      />
    </>
  );
}
