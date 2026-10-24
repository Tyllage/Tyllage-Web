import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Cpu,
  Eye,
  FileCheck2,
  Hand,
  LineChart,
  MessageSquareText,
  Network,
  PlugZap,
  Scale,
  Sprout,
  Unplug,
  UserCheck,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { Section, SectionHeading } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { CtaBand } from '../components/CtaBand';
import { FollowJourney } from '../components/FollowJourney';
import { StageBadge } from '../components/StageBadge';
import { coreCapabilities, howItWorks } from '../data/platform';
import { projects } from '../data/projects';
import { company } from '../data/company';
import { pages } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

const challenges = [
  {
    icon: Unplug,
    title: 'Harvest and demand are disconnected',
    text: 'What is ready to harvest and who wants to buy it are often tracked in different places, by different people.',
  },
  {
    icon: Clock,
    title: 'Perishable produce, narrow windows',
    text: 'Fresh produce has a short selling window. Late visibility of demand can mean missed sales and avoidable waste.',
  },
  {
    icon: MessageSquareText,
    title: 'Sales run on manual effort',
    text: 'Enquiries, follow-ups and outreach are frequently handled by hand across messaging apps, spreadsheets and calls.',
  },
  {
    icon: PlugZap,
    title: 'Advanced tools assume big budgets',
    text: 'Many smart-farming tools depend on IoT sensor networks or years of historical data that smaller farms may not have.',
  },
];

const solutions = [
  {
    icon: Network,
    title: 'Connect harvest to demand',
    text: 'Bring harvest availability and customer demand together so farms can see what to offer, to whom, and when.',
  },
  {
    icon: LineChart,
    title: 'Strengthen sales operations',
    text: 'Organise buyer engagement, pre-orders and enquiries into clear, repeatable workflows that save time.',
  },
  {
    icon: Cpu,
    title: 'Support better decisions',
    text: 'Use practical AI to surface commercial opportunities and draft next steps — always for people to review.',
  },
];

const principles = [
  { title: 'No IoT infrastructure required', text: 'Designed around simple inputs farms can provide today.' },
  { title: 'Useful from limited data', text: 'Built to start helping without years of historical records.' },
  { title: 'Fits existing channels', text: 'Planned to work alongside the messaging tools farms already use.' },
  { title: 'Plain-language guidance', text: 'Recommendations explained clearly, without technical jargon.' },
];

const responsibleAi = [
  {
    icon: UserCheck,
    title: 'Human approval by design',
    text: 'AI drafts and suggests. People decide. Nothing customer-facing is sent without review.',
  },
  {
    icon: Eye,
    title: 'Transparent suggestions',
    text: 'Recommendations come with the reasoning behind them, so users can judge whether to act.',
  },
  {
    icon: Scale,
    title: 'Honest about uncertainty',
    text: 'Where data is limited, we aim to say so — rather than present guesses as certainty.',
  },
  {
    icon: FileCheck2,
    title: 'Privacy-conscious data use',
    text: 'Collect only what is needed, protect it appropriately and respect the farm’s ownership of its data.',
  },
];

export default function Home() {
  usePageMeta(pages.home);

  return (
    <>
      <Hero
        variant="home"
        eyebrow={`${company.brandName} · ${company.tagline}`}
        title={
          <>
            Smarter Farms. <span className="text-accent">Stronger Demand.</span>
          </>
        }
        lead="Tyllage empowers agricultural businesses with AI-assisted sales and operational intelligence — connecting harvest availability, customer demand and smarter commercial decisions."
        actions={
          <>
            <Link to="/platform" className="btn btn--accent">
              Explore Our Platform <ArrowRight size={18} aria-hidden />
            </Link>
            <Link to="/contact" className="btn btn--ghost-light">
              Partner With Us
            </Link>
          </>
        }
      >
        <p className="hero__meta">
          <Sprout size={16} aria-hidden /> An emerging AgriTech software venture, registered in Singapore.
        </p>
      </Hero>

      {/* 2. Challenges */}
      <Section tone="ivory" labelledBy="challenges-title">
        <SectionHeading
          id="challenges-title"
          eyebrow="The challenge"
          title="Great produce deserves better commercial tools."
          intro="Agricultural businesses work hard to grow quality produce. Selling it efficiently is often where the friction lies."
        />
        <ul className="card-grid card-grid--4" role="list">
          {challenges.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="feature-card reveal" style={{ ['--delay' as string]: `${i * 70}ms` }}>
              <span className="feature-card__icon feature-card__icon--muted">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__text">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. Solutions */}
      <Section tone="white" labelledBy="solutions-title">
        <div className="split">
          <SectionHeading
            id="solutions-title"
            eyebrow="Our solution"
            title="Commercial intelligence, built for farms."
            intro={`${company.longDescription}`}
          />
          <div className="split__aside reveal">
            <Link to="/platform" className="text-link">
              See the platform <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
        <ul className="card-grid card-grid--3" role="list">
          {solutions.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="feature-card feature-card--elevated reveal" style={{ ['--delay' as string]: `${i * 80}ms` }}>
              <span className="feature-card__icon">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__text">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. How it works */}
      <Section tone="mist" labelledBy="how-title">
        <SectionHeading
          id="how-title"
          eyebrow="How it works"
          title="From harvest availability to confident action."
          align="center"
        />
        <ol className="steps" role="list">
          {howItWorks.map((s, i) => (
            <li key={s.step} className="step reveal" style={{ ['--delay' as string]: `${i * 90}ms` }}>
              <span className="step__number" aria-hidden>
                {s.step}
              </span>
              <h3 className="step__title">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="step__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 5. Farm-first AI */}
      <Section tone="ivory" labelledBy="farm-first-title">
        <div className="farm-first">
          <div>
            <SectionHeading
              id="farm-first-title"
              eyebrow="Farm-first AI"
              title="Accessible intelligence, not expensive infrastructure."
              intro={company.accessibility}
            />
            <ul className="principles reveal" role="list">
              {principles.map((p) => (
                <li key={p.title}>
                  <span className="principles__tick" aria-hidden />
                  <div>
                    <strong>{p.title}</strong>
                    <span>{p.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="capability-panel reveal">
            <div className="capability-panel__head">
              <h3>Core capabilities</h3>
              <p>In active prototyping and development</p>
            </div>
            <ul role="list">
              {coreCapabilities.map(({ id, name, icon: Icon, stage }) => (
                <li key={id}>
                  <Link to={`/platform#${id}`} className="capability-row">
                    <span className="capability-row__icon">
                      <Icon size={18} aria-hidden />
                    </span>
                    <span className="capability-row__name">{name}</span>
                    <StageBadge stage={stage} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 6. Responsible AI */}
      <Section tone="forest" labelledBy="responsible-title" className="section--pattern">
        <SectionHeading
          id="responsible-title"
          eyebrow="Responsible AI"
          title="Technology that supports people — it does not replace their judgement."
          intro="Farmers know their crops, customers and communities. Our AI is designed to assist that expertise, with clear human oversight at every step."
          tone="light"
        />
        <ul className="card-grid card-grid--4" role="list">
          {responsibleAi.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="feature-card feature-card--dark reveal" style={{ ['--delay' as string]: `${i * 70}ms` }}>
              <span className="feature-card__icon feature-card__icon--dark">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__text">{text}</p>
            </li>
          ))}
        </ul>
        <p className="section-footnote reveal">
          <Hand size={16} aria-hidden /> Read more about our approach on the{' '}
          <Link to="/technology">Technology &amp; Innovation</Link> page.
        </p>
      </Section>

      {/* 7. Projects */}
      <Section tone="white" labelledBy="projects-title">
        <div className="split">
          <SectionHeading
            id="projects-title"
            eyebrow="Projects & pilots"
            title="Current workstreams."
            intro="We develop our technology through focused, real-world workstreams. Each is clearly labelled with its current stage."
          />
          <div className="split__aside reveal">
            <Link to="/projects" className="text-link">
              All projects <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
        <div className="card-grid card-grid--2">
          {projects.map((p) => (
            <div key={p.id} className="reveal">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </Section>

      {/* 8. Vision */}
      <Section tone="ivory" labelledBy="vision-title" className="vision">
        <div className="vision__inner reveal">
          <p className="eyebrow">Our vision</p>
          <h2 id="vision-title" className="vision__statement">
            {company.vision}
          </h2>
          <div className="vision__mission">
            <span className="vision__label">Our mission</span>
            <p>{company.mission}</p>
          </div>
          <Link to="/about" className="text-link">
            About Tyllage <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </Section>

      <FollowJourney tone="white" />

      {/* 9. Final CTA */}
      <CtaBand />
    </>
  );
}
