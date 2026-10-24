import { ArrowUpRight, Compass, Eye, HeartHandshake, Lightbulb, Mail, ShieldCheck, Sprout, Target, UserRound } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Section, SectionHeading } from '../components/Section';
import { CtaBand } from '../components/CtaBand';
import { Media } from '../components/Media';
import { InstagramIcon, LinkedInIcon } from '../components/Icons';
import { company, type Founder } from '../data/company';
import { media } from '../data/media';
import { pages } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * Founders' story — an editable draft supplied by the founders.
 * Keep it free of invented experiences, schools, awards or qualifications.
 */
const story = [
  'Our journey began with a shared interest in technology and the belief that meaningful innovation should solve real-world problems.',
  'Through our educational journeys from ITE to polytechnic, we developed our technical foundations, explored software development, and discovered opportunities to apply technology beyond the classroom.',
  'That curiosity eventually led us towards agriculture — an industry where practical digital solutions can help businesses improve operations, strengthen customer relationships and make more informed decisions.',
  'As two aspiring female technology entrepreneurs, we founded Tyllage to explore how artificial intelligence and connected software can support agricultural businesses in Singapore.',
  'We’re still learning, building and refining our solutions with a focus on real operational needs.',
];
const storyClosing =
  'For us, Tyllage represents more than a technology project. It represents our commitment to applying what we’ve learnt to challenges worth solving.';

const values = [
  { icon: Sprout, title: 'Farm-first', text: 'We start from the realities of agricultural businesses — their time, budgets and ways of working.' },
  { icon: Lightbulb, title: 'Practical', text: 'We favour technology that is useful today over complexity that looks impressive but goes unused.' },
  { icon: Eye, title: 'Honest', text: 'We are clear about what our technology can and cannot do, and where each product stands.' },
  { icon: ShieldCheck, title: 'Responsible', text: 'We treat data with care and design AI that keeps people informed and in control.' },
  { icon: HeartHandshake, title: 'Collaborative', text: 'We build alongside farms, educators and partners, and learn from every conversation.' },
];

const approach = [
  { title: 'Listen first', text: 'Understand real farm workflows before designing a feature.' },
  { title: 'Prototype early', text: 'Test ideas with working prototypes and demo data.' },
  { title: 'Validate with farms', text: 'Treat every challenge as a hypothesis until farms confirm it.' },
  { title: 'Build what helps', text: 'Keep only what makes daily operations genuinely easier.' },
];

/** Milestones in order — no dates are shown until they are confirmed. */
const journeySteps = [
  { label: 'Foundations', title: 'Learning to build', text: 'Our technical foundations took shape through our studies, from ITE to polytechnic.', state: 'done' },
  { label: 'Founded', title: 'Tyllage LLP established', text: `Registered in ${company.country} as a limited liability partnership by two founding partners.`, state: 'done' },
  { label: 'Prototyping', title: 'MEOD Farm prototype', text: 'Exploring AI-assisted farm sales and operations in a working prototype with demo data.', state: 'current' },
  { label: 'Next', title: 'Validating with farms', text: 'Testing our assumptions with agricultural businesses and refining what we build.', state: 'next' },
  { label: 'Ahead', title: 'First minimum viable product', text: 'Bringing the most useful capabilities together into an early product.', state: 'next' },
] as const;

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function FounderCard({ founder }: { founder: Founder }) {
  return (
    <article className="founder-card reveal">
      <div className="founder-card__photo">
        {founder.photo ? (
          <img src={founder.photo} alt={`Portrait of ${founder.name}`} width={320} height={400} loading="lazy" />
        ) : (
          <div className="founder-card__placeholder" aria-hidden>
            <span className="founder-card__initials">{initials(founder.name)}</span>
            <span className="founder-card__slot">
              <UserRound size={14} /> Photo to be added
            </span>
          </div>
        )}
      </div>
      <div className="founder-card__body">
        <h3 className="founder-card__name">{founder.name}</h3>
        <p className="founder-card__role">
          {founder.role}, {company.legalName}
        </p>
        {founder.bio && <p className="founder-card__bio">{founder.bio}</p>}
        {founder.linkedin && (
          <a className="text-link" href={founder.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon size={16} /> {founder.name} on LinkedIn
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default function About() {
  usePageMeta(pages.about);
  const { email } = company.contact;

  return (
    <>
      <Hero
        eyebrow="About Tyllage"
        title={
          <>
            From Classrooms to <em className="serif-accent">Cultivating Change.</em>
          </>
        }
        lead={`${company.description} ${company.focus}`}
        media={media.aboutStory}
      />

      {/* Story */}
      <Section tone="white" labelledBy="story-title" className="story">
        <div className="story__grid">
          <div className="story__aside reveal">
            <p className="eyebrow">Our story</p>
            <h2 id="story-title" className="h2">
              Founded by two female technology entrepreneurs.
            </h2>
            <p className="muted">
              {company.legalName} was founded by {company.founders.map((f) => f.name).join(' and ')}.
            </p>
          </div>
          <div className="story__body reveal">
            {story.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <blockquote className="story__quote">
              <p>{storyClosing}</p>
              <footer>— The founders of {company.brandName}</footer>
            </blockquote>
          </div>
        </div>
      </Section>

      {/* Founders */}
      <Section tone="beige" labelledBy="founders-title">
        <SectionHeading id="founders-title" eyebrow="Founders" title="The people behind Tyllage." align="center" />
        <div className="founders-grid">
          {company.founders.map((f) => (
            <FounderCard key={f.name} founder={f} />
          ))}
        </div>
      </Section>

      {/* Mission & vision */}
      <Section tone="forest" labelledBy="mission-title" className="section--texture">
        <h2 id="mission-title" className="sr-only">
          Mission and vision
        </h2>
        <div className="mv-grid">
          <div className="mv-card reveal">
            <span className="mv-card__icon">
              <Target size={22} aria-hidden />
            </span>
            <h3>Our mission</h3>
            <p>{company.mission}</p>
          </div>
          <div className="mv-card reveal" style={{ ['--delay' as string]: '90ms' }}>
            <span className="mv-card__icon">
              <Compass size={22} aria-hidden />
            </span>
            <h3>Our vision</h3>
            <p>{company.vision}</p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section tone="ivory" labelledBy="values-title">
        <SectionHeading id="values-title" eyebrow="Our values" title="What guides how we build." />
        <ul className="values" role="list">
          {values.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="value reveal" style={{ ['--delay' as string]: `${i * 60}ms` }}>
              <span className="value__icon">
                <Icon size={20} aria-hidden />
              </span>
              <h3 className="value__title">{title}</h3>
              <p className="value__text">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Why agriculture */}
      <Section tone="white" labelledBy="why-title">
        <div className="feature-split">
          <Media slot={media.whyAgriculture} className="feature-split__image reveal" zoom />
          <div className="feature-split__copy reveal">
            <p className="eyebrow">Why agriculture?</p>
            <h2 id="why-title" className="h2">
              An essential industry where practical software can help.
            </h2>
            <p>
              Agriculture underpins food security and community wellbeing, yet much of the commercial work — sales,
              enquiries, outreach and planning — is still handled manually. Fresh produce is perishable, so gaps
              between harvest and demand can mean missed sales and avoidable waste.
            </p>
            <p>
              We believe accessible software that doesn’t require costly sensors or years of historical data can
              help close that gap, and give farm teams more confidence in their decisions.
            </p>
          </div>
        </div>
      </Section>

      {/* Approach + responsible AI */}
      <Section tone="ivory" labelledBy="approach-title">
        <div className="two-col">
          <div className="reveal">
            <p className="eyebrow">Our approach to innovation</p>
            <h2 id="approach-title" className="h3">
              Learn, prototype, validate, refine.
            </h2>
            <ol className="approach-list" role="list">
              {approach.map((a, i) => (
                <li key={a.title}>
                  <span aria-hidden>{i + 1}</span>
                  <div>
                    <strong>{a.title}</strong>
                    <p>{a.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="reveal responsible-card">
            <span className="icon-chip">
              <ShieldCheck size={20} aria-hidden />
            </span>
            <h2 className="h3">Responsible AI</h2>
            <p>
              Our AI is designed to assist farm staff, not to replace their judgement. Suggestions are explained,
              editable and acted on only with approval. AI does not set prices, make production decisions or share
              customer data on its own.
            </p>
            <p>
              We aim to collect only the data that is needed, protect it appropriately, and be open about the limits
              of our models.
            </p>
          </div>
        </div>
      </Section>

      {/* Our journey */}
      <Section tone="white" labelledBy="journey-title">
        <SectionHeading
          id="journey-title"
          eyebrow="Our journey"
          title="Where we are, and where we are heading."
          intro="We are an early-stage venture. This is the path so far, and the steps we are working towards."
        />
        <ol className="timeline" role="list">
          {journeySteps.map((s, i) => (
            <li key={s.title} className={`timeline__item timeline__item--${s.state} reveal`} style={{ ['--delay' as string]: `${i * 80}ms` }}>
              <span className="timeline__dot" aria-hidden />
              <span className="timeline__label">
                {s.label}
                {s.state === 'current' && <span className="sr-only"> (current stage)</span>}
              </span>
              <h3 className="timeline__title">{s.title}</h3>
              <p className="timeline__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Social */}
      <Section tone="beige" labelledBy="connect-title">
        <div className="connect-panel reveal">
          <div className="connect-panel__copy">
            <h2 id="connect-title" className="h3">
              Connect With Tyllage.
            </h2>
            <p>Follow our company updates and development journey, or get in touch directly.</p>
          </div>
          <div className="connect-panel__actions">
            <a className="btn btn--primary" href={company.social.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon size={18} /> LinkedIn <ArrowUpRight size={16} aria-hidden />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {company.social.instagram && (
              <a className="btn btn--outline" href={company.social.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramIcon size={18} /> Instagram <ArrowUpRight size={16} aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {email && (
              <a className="btn btn--outline" href={`mailto:${email}`}>
                <Mail size={18} aria-hidden /> Email us
              </a>
            )}
          </div>
        </div>
      </Section>

      <CtaBand id="about-cta-title" />
    </>
  );
}
