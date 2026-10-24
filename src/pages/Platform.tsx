import { Link } from 'react-router-dom';
import { ArrowRight, Check, UserCheck } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Section, SectionHeading } from '../components/Section';
import { CtaBand } from '../components/CtaBand';
import { StageBadge } from '../components/StageBadge';
import { coreCapabilities, futureCapabilities, journey, stageDescriptions, type CapabilityStage } from '../data/platform';
import { pages } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

const stages: CapabilityStage[] = ['prototype', 'mvp', 'concept'];

const staffInControl = [
  'Prices are never changed automatically.',
  'Production and harvest decisions stay with the farm.',
  'Customer messages are only sent after a person approves them.',
  'Customer data is used only for the farm’s own operations.',
];

export default function Platform() {
  usePageMeta(pages.platform);

  return (
    <>
      <Hero
        eyebrow="Our platform"
        title={
          <>
            Practical tools for the <em className="serif-accent">business of farming.</em>
          </>
        }
        lead="We are developing a connected set of tools to help farm teams match upcoming harvests with customer demand, manage enquiries and sales, and make better-informed commercial decisions."
        media="seedlings"
        actions={
          <Link to="/contact" className="btn btn--primary">
            Discuss a pilot <ArrowRight size={18} aria-hidden />
          </Link>
        }
      />

      {/* Core */}
      <Section tone="white" id="core-capabilities" labelledBy="core-title">
        <div className="split split--top">
          <SectionHeading
            id="core-title"
            eyebrow="Core development areas"
            title="Six capabilities, one connected workflow."
            intro="Our current development focus. Each is designed to work with simple inputs, without sensors or years of historical data."
          />
          <dl className="stage-key reveal" aria-label="What the stage labels mean">
            {stages.map((s) => (
              <div key={s}>
                <dt>
                  <StageBadge stage={s} />
                </dt>
                <dd>{stageDescriptions[s]}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="capability-grid">
          {coreCapabilities.map(({ id, name, icon: Icon, stage, summary, points }, i) => (
            <article key={id} id={id} className="capability-card reveal" style={{ ['--delay' as string]: `${(i % 3) * 70}ms` }}>
              <div className="capability-card__top">
                <span className="capability-card__icon">
                  <Icon size={22} aria-hidden />
                </span>
                <StageBadge stage={stage} />
              </div>
              <h3 className="capability-card__title">{name}</h3>
              <p className="capability-card__summary">{summary}</p>
              <ul className="check-list" role="list">
                {points.map((p) => (
                  <li key={p}>
                    <Check size={16} aria-hidden /> {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* People in control */}
      <Section tone="forest" labelledBy="control-title" className="section--texture">
        <div className="control">
          <div className="reveal">
            <p className="eyebrow eyebrow--light">AI that supports farm staff</p>
            <h2 id="control-title" className="h2">
              Recommendations, not autopilot.
            </h2>
            <p className="control__lead">
              Tyllage’s AI suggests, drafts and highlights. Farm staff review, decide and act. It does not
              autonomously control prices, production decisions or customer data.
            </p>
            <ul className="control__list" role="list">
              {staffInControl.map((item) => (
                <li key={item}>
                  <UserCheck size={18} aria-hidden /> {item}
                </li>
              ))}
            </ul>
          </div>
          <ol className="mini-journey reveal" role="list" aria-label="How a recommendation becomes an action">
            {journey.map(({ title, icon: Icon }, i) => (
              <li key={title} className={title === 'Farm Approval' ? 'is-highlight' : undefined}>
                <span className="mini-journey__icon">
                  <Icon size={18} aria-hidden />
                </span>
                <span>
                  <span className="sr-only">Step {i + 1}: </span>
                  {title}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Future */}
      <Section tone="ivory" id="future-capabilities" labelledBy="future-title" className="section--tight-bottom">
        <div className="future">
          <div className="future__intro reveal">
            <p className="eyebrow">On the horizon</p>
            <h2 id="future-title" className="h3">
              Future concepts
            </h2>
            <p className="muted">
              Research directions we may explore once the core platform is proven. They are not in development or
              in use, and their scope may change.
            </p>
          </div>
          <ul className="future__list reveal" role="list">
            {futureCapabilities.map(({ id, name, icon: Icon, summary }) => (
              <li key={id}>
                <Icon size={18} aria-hidden />
                <div>
                  <strong>{name}</strong>
                  <span>{summary}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        id="platform-cta-title"
        title="Help shape the platform."
        text="We are keen to hear from farms and agricultural businesses who would like to explore these capabilities with us."
      />
    </>
  );
}
