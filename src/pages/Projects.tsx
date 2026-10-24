import { useState } from 'react';
import { ArrowUpRight, Check, ClipboardCheck, Info, MessagesSquare, Microscope, MonitorPlay, Target } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Section, SectionHeading } from '../components/Section';
import { CtaBand } from '../components/CtaBand';
import { Media } from '../components/Media';
import { publicProjects } from '../data/projects';
import { media } from '../data/media';
import { pages } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

const problemContext = [
  'Customer enquiries, orders and follow-ups arrive through several channels and are handled manually.',
  'It can be difficult to know which customers may want an upcoming harvest before it is ready.',
  'Learning-journey and farm-visit enquiries need a clear, repeatable process.',
  'Marketing outreach takes time that small farm teams rarely have.',
];

const proposedSolution =
  'A single, simple workspace where a farm team can see upcoming harvests, customer interest and enquiries together — with AI drafting outreach and suggestions that staff review before anything is sent.';

const approach = [
  { icon: Target, title: 'Clearly scoped', text: 'Each capability starts with a focused question about a real farm workflow.' },
  { icon: Microscope, title: 'Prototype first', text: 'Ideas are tested with demo data before any production build.' },
  { icon: MessagesSquare, title: 'Built with feedback', text: 'What we learn from conversations shapes what we build next.' },
  { icon: ClipboardCheck, title: 'Honestly labelled', text: 'We never imply agreements, endorsements or results that do not exist.' },
];

function PrototypePreview({ url, name }: { url: string; name: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <figure className="browser reveal">
      <div className="browser__bar" aria-hidden>
        <span />
        <span />
        <span />
        <span className="browser__url">{url.replace(/^https?:\/\//, '')}</span>
      </div>
      <div className="browser__screen">
        {loaded ? (
          <iframe
            src={url}
            title={`${name} prototype (interactive preview)`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="browser__placeholder">
            <Media slot={media.projectMeod} className="browser__bg" />
            <div className="browser__cta">
              <MonitorPlay size={28} aria-hidden />
              <p>Load an interactive preview of the prototype. It opens the prototype site inside this page.</p>
              <button type="button" className="btn btn--primary btn--sm" onClick={() => setLoaded(true)}>
                Load prototype preview
              </button>
            </div>
          </div>
        )}
      </div>
      <figcaption className="browser__caption">
        <Info size={14} aria-hidden /> Prototype preview using demo data. Not a production system.
      </figcaption>
    </figure>
  );
}

export default function Projects() {
  usePageMeta(pages.projects);

  return (
    <>
      <Hero
        eyebrow="Projects & pilots"
        title={
          <>
            Where our technology <em className="serif-accent">takes root.</em>
          </>
        }
        lead="We develop the Tyllage platform through focused, real-world prototyping. Our current workstream explores AI-assisted operations and sales for an urban farm."
        media={media.projectMeod}
      />

      {publicProjects.map((project) => (
        <div key={project.id} id={project.id} className="project-anchor">
          <Section tone="white" labelledBy={`${project.id}-title`}>
            <div className="project-head reveal">
              <div>
                <p className="status-badge status-badge--prototype">
                  <span className="sr-only">Status: </span>
                  {project.status}
                </p>
                <h2 id={`${project.id}-title`} className="h2">
                  {project.name}
                </h2>
                <p className="prose-lead">{project.summary}</p>
              </div>
              {project.link && (
                <a className="btn btn--primary" href={project.link} target="_blank" rel="noopener noreferrer">
                  {project.linkLabel ?? 'Visit'} <ArrowUpRight size={18} aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>

            <div className="notice reveal" role="note">
              <Info size={18} aria-hidden />
              <p>{project.note}</p>
            </div>

            <div className="case-grid">
              <div className="case-block reveal">
                <h3>Problem context</h3>
                <p className="muted">Challenges we are exploring — to be validated with farms.</p>
                <ul role="list" className="case-list">
                  {problemContext.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="case-block case-block--accent reveal">
                <h3>Proposed solution</h3>
                <p>{proposedSolution}</p>
              </div>
            </div>
          </Section>

          <Section tone="ivory" labelledBy={`${project.id}-capabilities`}>
            <div className="capabilities-split">
              <div className="reveal">
                <p className="eyebrow">Key prototype capabilities</p>
                <h3 id={`${project.id}-capabilities`} className="h3">
                  What the prototype explores
                </h3>
                <ul className="project-focus" role="list">
                  {project.focusAreas.map((area) => (
                    <li key={area}>
                      <Check size={18} aria-hidden /> {area}
                    </li>
                  ))}
                </ul>
              </div>
              {project.link && <PrototypePreview url={project.link} name={project.shortName} />}
            </div>
          </Section>
        </div>
      ))}

      <Section tone="white" labelledBy="approach-title">
        <SectionHeading
          id="approach-title"
          eyebrow="Development approach"
          title="How we run projects and pilots."
          intro="Prototyping lets us learn alongside the people who would use our software, before we commit to a product."
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
        title="Interested in a pilot?"
        text="If you run a farm or agricultural business, we would welcome a conversation about exploring these tools together."
      />
    </>
  );
}
