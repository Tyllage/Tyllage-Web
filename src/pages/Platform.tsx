import { Link } from 'react-router-dom';
import { ArrowRight, Check, Info } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Section, SectionHeading } from '../components/Section';
import { CtaBand } from '../components/CtaBand';
import { StageBadge } from '../components/StageBadge';
import {
  coreCapabilities,
  futureCapabilities,
  howItWorks,
  stageDescriptions,
  stageLabels,
  type CapabilityStage,
} from '../data/platform';
import { pages } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

const stages: CapabilityStage[] = ['prototype', 'mvp', 'concept'];

export default function Platform() {
  usePageMeta(pages.platform);

  return (
    <>
      <Hero
        eyebrow="Our platform"
        title="The emerging Tyllage farm intelligence platform."
        lead="A connected set of tools to help agricultural businesses match harvest availability with customer demand, run sales operations smoothly and make better-informed commercial decisions."
        actions={
          <Link to="/contact" className="btn btn--accent">
            Discuss a pilot <ArrowRight size={18} aria-hidden />
          </Link>
        }
      />

      {/* Stage legend */}
      <Section tone="white" labelledBy="stages-title" className="section--tight">
        <div className="stage-legend reveal">
          <div className="stage-legend__intro">
            <Info size={20} aria-hidden />
            <div>
              <h2 id="stages-title" className="h4">
                Where each capability stands
              </h2>
              <p>
                The platform is in early development. We label every capability honestly so that partners know what
                exists today and what is planned.
              </p>
            </div>
          </div>
          <dl className="stage-legend__list">
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
      </Section>

      {/* Core */}
      <Section tone="ivory" id="core-capabilities" labelledBy="core-title">
        <SectionHeading
          id="core-title"
          eyebrow="Core capabilities"
          title="Six capabilities, one connected workflow."
          intro="Our current development focus — each designed to work with simple inputs and to keep people in control."
        />
        <div className="capability-grid">
          {coreCapabilities.map(({ id, name, icon: Icon, stage, summary, points }, i) => (
            <article key={id} id={id} className="capability-card reveal" style={{ ['--delay' as string]: `${(i % 3) * 70}ms` }}>
              <div className="capability-card__top">
                <span className="feature-card__icon">
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

      {/* Flow */}
      <Section tone="forest" labelledBy="flow-title" className="section--pattern">
        <SectionHeading
          id="flow-title"
          eyebrow="How the platform fits together"
          title="Designed around the way farms sell."
          tone="light"
          align="center"
        />
        <ol className="steps steps--dark" role="list">
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

      {/* Future */}
      <Section tone="white" id="future-capabilities" labelledBy="future-title">
        <SectionHeading
          id="future-title"
          eyebrow="Roadmap"
          title="Future capabilities we are exploring."
          intro={`These are ${stageLabels.concept.toLowerCase()}s — research directions, not products in development or in use. Their scope and timing may change.`}
        />
        <ul className="future-grid" role="list">
          {futureCapabilities.map(({ id, name, icon: Icon, summary, stage }, i) => (
            <li key={id} className="future-card reveal" style={{ ['--delay' as string]: `${(i % 3) * 70}ms` }}>
              <span className="future-card__icon">
                <Icon size={20} aria-hidden />
              </span>
              <div>
                <h3 className="future-card__title">{name}</h3>
                <p className="future-card__text">{summary}</p>
                <StageBadge stage={stage} />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        id="platform-cta-title"
        title="Help shape the platform."
        text="We are keen to hear from farms and agricultural businesses who would like to explore these capabilities with us."
      />
    </>
  );
}
