import { BrainCircuit, Cloud, Cpu, Lock, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Section, SectionHeading } from '../components/Section';
import { CtaBand } from '../components/CtaBand';
import { media } from '../data/media';
import { pages } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

const pillars = [
  {
    id: 'intelligent-technology',
    icon: Cpu,
    title: 'Intelligent Technology',
    what: 'Software that brings harvest, customer and sales information together in one place.',
    benefit: 'Farm teams spend less time searching across chats and spreadsheets.',
  },
  {
    id: 'practical-ai',
    icon: BrainCircuit,
    title: 'Practical AI',
    what: 'AI that drafts messages, organises enquiries and points out possible sales opportunities.',
    benefit: 'Useful from day one — even without years of historical data.',
  },
  {
    id: 'cloud-computing',
    icon: Cloud,
    title: 'Cloud Computing',
    what: 'Tools that run in a web browser on a phone, tablet or laptop.',
    benefit: 'Nothing to install or maintain on the farm.',
  },
  {
    id: 'workflow-automation',
    icon: Workflow,
    title: 'Workflow Automation',
    what: 'Repetitive steps — reminders, follow-ups, enquiry tracking — handled by structured workflows.',
    benefit: 'More consistent customer service with less manual effort.',
  },
  {
    id: 'responsible-ai',
    icon: ShieldCheck,
    title: 'Responsible AI',
    what: 'Every customer-facing action needs human approval, and suggestions explain their reasoning.',
    benefit: 'The farm stays in control of prices, production and its customer relationships.',
  },
  {
    id: 'security-privacy',
    icon: Lock,
    title: 'Security and Privacy',
    what: 'Collecting only what is needed, encrypting data in transit and limiting who can access it.',
    benefit: 'Farm and customer information is handled with care, in line with Singapore’s PDPA.',
  },
];

const stack = [
  { name: 'React', role: 'User interface' },
  { name: 'TypeScript', role: 'Typed application code' },
  { name: 'Node.js', role: 'Server runtime' },
  { name: 'Express', role: 'Application API' },
  { name: 'PostgreSQL', role: 'Relational database' },
  { name: 'AWS', role: 'Cloud infrastructure' },
  { name: 'OpenAI API', role: 'Language-model features' },
  { name: 'WhatsApp Business Platform', role: 'Customer messaging' },
];

export default function Technology() {
  usePageMeta(pages.technology);

  return (
    <>
      <Hero
        eyebrow="Technology & innovation"
        title={
          <>
            Technology that <em className="serif-accent">works for farms.</em>
          </>
        }
        lead="We use artificial intelligence, cloud software and workflow automation to make the business side of farming simpler — explained in plain language below."
        media={media.technology}
      />

      <Section tone="white" labelledBy="pillars-title">
        <SectionHeading
          id="pillars-title"
          eyebrow="What we use, and why it matters"
          title="Six foundations of our work."
        />
        <ul className="pillars" role="list">
          {pillars.map(({ id, icon: Icon, title, what, benefit }, i) => (
            <li key={id} id={id} className="pillar reveal" style={{ ['--delay' as string]: `${(i % 3) * 70}ms` }}>
              <span className="pillar__icon">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="pillar__title">{title}</h3>
              <p className="pillar__what">{what}</p>
              <p className="pillar__benefit">
                <Sparkles size={15} aria-hidden />
                <span>
                  <span className="sr-only">Benefit for farms: </span>
                  {benefit}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="beige" labelledBy="stack-title" className="section--tight">
        <div className="stack">
          <div className="stack__intro reveal">
            <p className="eyebrow">For the technically curious</p>
            <h2 id="stack-title" className="h3">
              Our preferred technology stack
            </h2>
            <p className="muted">
              The technologies we currently prefer for the Tyllage farm application. The application is at prototype
              stage and is not yet running in production; these choices may evolve.
            </p>
          </div>
          <ul className="stack__list reveal" role="list">
            {stack.map(({ name, role }) => (
              <li key={name}>
                <strong>{name}</strong>
                <span>{role}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        id="tech-cta-title"
        title="Interested in collaborating on technology?"
        text="We welcome conversations with technology partners, industry collaborators and educational institutions."
      />
    </>
  );
}
