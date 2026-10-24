import {
  BrainCircuit,
  Cloud,
  Database,
  Globe,
  LineChart,
  Lock,
  MessageCircle,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
  Layout as LayoutIcon,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { Section, SectionHeading } from '../components/Section';
import { CtaBand } from '../components/CtaBand';
import { pages } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

const pillars = [
  {
    icon: BrainCircuit,
    title: 'Artificial Intelligence',
    text: 'Practical AI for drafting outreach, organising enquiries and surfacing commercial opportunities — designed to be useful even when historical data is limited.',
  },
  {
    icon: Cloud,
    title: 'Cloud Computing',
    text: 'Cloud-hosted services so farms can use the platform from a phone or laptop without installing or maintaining local infrastructure.',
  },
  {
    icon: LineChart,
    title: 'Commercial Intelligence',
    text: 'Bringing harvest availability, demand signals and buyer activity together to inform sales and pricing decisions.',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    text: 'Reducing repetitive manual steps in enquiries, pre-orders and follow-ups, while keeping people in the loop.',
  },
  {
    icon: ShieldCheck,
    title: 'Responsible AI',
    text: 'Human approval before customer-facing actions, explainable suggestions and clear communication of uncertainty.',
  },
  {
    icon: Lock,
    title: 'Data Security & Privacy',
    text: 'Data minimisation, encryption in transit, access controls and handling of personal data in line with Singapore’s PDPA.',
  },
];

const stack = [
  { icon: LayoutIcon, name: 'React + TypeScript', role: 'Web application interface' },
  { icon: Server, name: 'Node.js + Express', role: 'Application API and business logic' },
  { icon: Database, name: 'PostgreSQL', role: 'Relational data storage' },
  { icon: Cloud, name: 'AWS', role: 'Cloud hosting and infrastructure' },
  { icon: Sparkles, name: 'OpenAI API', role: 'Language-model capabilities' },
  { icon: MessageCircle, name: 'WhatsApp Business Platform', role: 'Customer messaging channel' },
];

export default function Technology() {
  usePageMeta(pages.technology);

  return (
    <>
      <Hero
        eyebrow="Technology & innovation"
        title="Practical technology, responsibly applied."
        lead="We combine artificial intelligence, cloud computing and workflow automation to build tools that agricultural businesses can actually adopt."
      />

      <Section tone="ivory" labelledBy="pillars-title">
        <SectionHeading id="pillars-title" eyebrow="Focus areas" title="The foundations of our work." />
        <ul className="card-grid card-grid--3" role="list">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="feature-card feature-card--elevated reveal" style={{ ['--delay' as string]: `${(i % 3) * 70}ms` }}>
              <span className="feature-card__icon">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__text">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="stack-title">
        <div className="split">
          <SectionHeading
            id="stack-title"
            eyebrow="Planned farm-platform technologies"
            title="The technology behind the platform."
            intro="These are the technologies planned for the Tyllage farm platform. Choices may evolve as development progresses."
          />
        </div>
        <ul className="stack-grid" role="list">
          {stack.map(({ icon: Icon, name, role }, i) => (
            <li key={name} className="stack-item reveal" style={{ ['--delay' as string]: `${(i % 3) * 60}ms` }}>
              <span className="stack-item__icon">
                <Icon size={20} aria-hidden />
              </span>
              <div>
                <strong>{name}</strong>
                <span>{role}</span>
              </div>
              <span className="status-badge status-badge--mvp">Planned</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" id="architecture" labelledBy="architecture-title">
        <SectionHeading
          id="architecture-title"
          eyebrow="Architecture"
          title="Two separate systems, by design."
          intro="This public corporate website and the Tyllage farm software platform are built and operated independently. Keeping them separate limits risk and lets each evolve at its own pace."
        />
        <div className="arch-grid">
          <article className="arch-card reveal">
            <header className="arch-card__head">
              <span className="arch-card__icon">
                <Globe size={20} aria-hidden />
              </span>
              <div>
                <h3>Corporate website</h3>
                <p>tyllage.com — the site you are viewing</p>
              </div>
            </header>
            <ul className="arch-list" role="list">
              <li>
                <strong>Frontend</strong>
                <span>React, TypeScript and Vite, prerendered to static HTML</span>
              </li>
              <li>
                <strong>Hosting</strong>
                <span>Amazon S3 with CloudFront CDN and HTTPS</span>
              </li>
              <li>
                <strong>Delivery</strong>
                <span>Automated builds and deployment with GitHub Actions</span>
              </li>
              <li>
                <strong>Data</strong>
                <span>No application database. No access to farm platform data.</span>
              </li>
            </ul>
          </article>
          <article className="arch-card arch-card--platform reveal" style={{ ['--delay' as string]: '90ms' }}>
            <header className="arch-card__head">
              <span className="arch-card__icon">
                <Server size={20} aria-hidden />
              </span>
              <div>
                <h3>Farm software platform</h3>
                <p>Planned architecture — in development</p>
              </div>
            </header>
            <ul className="arch-list" role="list">
              <li>
                <strong>Frontend</strong>
                <span>React and TypeScript web application</span>
              </li>
              <li>
                <strong>Backend</strong>
                <span>Node.js and Express API with PostgreSQL</span>
              </li>
              <li>
                <strong>Cloud</strong>
                <span>AWS infrastructure</span>
              </li>
              <li>
                <strong>Integrations</strong>
                <span>OpenAI API and WhatsApp Business Platform</span>
              </li>
            </ul>
          </article>
        </div>
      </Section>

      <CtaBand
        id="tech-cta-title"
        title="Interested in collaborating on technology?"
        text="We welcome conversations with technology partners, researchers and educational institutions."
      />
    </>
  );
}
