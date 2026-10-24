import { ArrowUpRight, Compass, Eye, HeartHandshake, Lightbulb, ShieldCheck, Sprout, Target, Wheat } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Section, SectionHeading } from '../components/Section';
import { CtaBand } from '../components/CtaBand';
import { SocialLinks } from '../components/SocialLinks';
import { LinkedInIcon } from '../components/Icons';
import { company, type Founder } from '../data/company';
import { pages } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

const values = [
  {
    icon: Sprout,
    title: 'Farm-first',
    text: 'We start from the realities of agricultural businesses — their time, budgets and ways of working.',
  },
  {
    icon: Lightbulb,
    title: 'Practical innovation',
    text: 'We favour technology that is useful today over complexity that looks impressive but goes unused.',
  },
  {
    icon: Eye,
    title: 'Honesty and clarity',
    text: 'We are clear about what our technology can and cannot do, and about where each product stands.',
  },
  {
    icon: ShieldCheck,
    title: 'Responsibility',
    text: 'We treat data with care and design AI that keeps people informed and in control.',
  },
  {
    icon: HeartHandshake,
    title: 'Collaboration',
    text: 'We build alongside farms, buyers, educators and partners, and learn from every conversation.',
  },
];

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
          <img src={founder.photo} alt={`Portrait of ${founder.name}`} width={160} height={160} loading="lazy" />
        ) : (
          <span className="founder-card__initials" aria-hidden>
            {initials(founder.name)}
          </span>
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

  return (
    <>
      <Hero
        eyebrow="About us"
        title="Building practical technology for agricultural businesses."
        lead={`${company.legalName} is a Singapore-registered AgriTech software venture focused on AI-assisted farm sales and operational intelligence.`}
      />

      {/* Who we are + story */}
      <Section tone="ivory" labelledBy="who-title">
        <div className="two-col">
          <div className="reveal">
            <p className="eyebrow">Who we are</p>
            <h2 id="who-title" className="h2">
              An emerging Singapore AgriTech startup.
            </h2>
            <p className="prose-lead">{company.description}</p>
            <p>{company.longDescription}</p>
            <p>{company.accessibility}</p>
          </div>
          <div className="reveal">
            <p className="eyebrow">Our story</p>
            <h2 className="h2">Founded by two partners with a shared focus.</h2>
            <p>
              Tyllage was established in Singapore as a limited liability partnership by two founding partners,
              with a focus on how software can make agricultural commerce simpler and more
              resilient.
            </p>
            <p>
              Our early work centres on prototyping: building, testing and refining ideas — such as the{' '}
              MEOD Farm prototype — to understand where practical AI can genuinely help with farm sales and
              operations.
            </p>
            <p>
              We are at the beginning of our journey, and we are open about it. Every product on this website is
              labelled with its current stage of development.
            </p>
          </div>
        </div>
      </Section>

      {/* Mission & vision */}
      <Section tone="forest" labelledBy="mission-title" className="section--pattern">
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
      <Section tone="white" labelledBy="values-title">
        <SectionHeading id="values-title" eyebrow="Our values" title="What guides how we build." />
        <ul className="card-grid card-grid--5" role="list">
          {values.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="feature-card reveal" style={{ ['--delay' as string]: `${i * 60}ms` }}>
              <span className="feature-card__icon">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__text">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Why AgriTech + responsible innovation */}
      <Section tone="mist" labelledBy="why-title">
        <div className="two-col">
          <div className="reveal">
            <span className="icon-chip">
              <Wheat size={20} aria-hidden />
            </span>
            <h2 id="why-title" className="h3">
              Why agricultural technology
            </h2>
            <p>
              Agriculture underpins food security and community wellbeing, yet many agricultural businesses still
              manage sales and operations with fragmented, manual tools. Fresh produce is perishable, so the gap
              between what is harvested and what customers want has real commercial and environmental costs.
            </p>
            <p>
              We believe accessible software — the kind that does not require costly sensors or years of data —
              can help close that gap and give farms more confidence in their commercial decisions.
            </p>
          </div>
          <div className="reveal">
            <span className="icon-chip">
              <ShieldCheck size={20} aria-hidden />
            </span>
            <h2 className="h3">Responsible innovation</h2>
            <p>
              We design AI to assist rather than replace human judgement. Suggestions are explained, editable and
              acted upon only with approval. We aim to collect only the data needed, protect it appropriately and
              be transparent about the limits of our models.
            </p>
            <p>
              We also keep our public communication honest: we do not present prototypes or concepts as deployed
              products.
            </p>
          </div>
        </div>
      </Section>

      {/* Founders */}
      <Section tone="ivory" labelledBy="founders-title">
        <SectionHeading
          id="founders-title"
          eyebrow="Leadership"
          title="Founding partners"
          intro={`${company.legalName} was founded by two partners.`}
        />
        <div className="founders-grid">
          {company.founders.map((f) => (
            <FounderCard key={f.name} founder={f} />
          ))}
        </div>
      </Section>

      {/* Social */}
      <Section tone="white" labelledBy="linkedin-title">
        <div className="linkedin-cta reveal">
          <span className="linkedin-cta__icon">
            <LinkedInIcon size={28} />
          </span>
          <div className="linkedin-cta__copy">
            <h2 id="linkedin-title" className="h3">
              Connect With Tyllage on LinkedIn.
            </h2>
            <p>Follow our company updates, technological developments and industry collaborations.</p>
          </div>
          <a className="btn btn--primary" href={company.social.linkedin} target="_blank" rel="noopener noreferrer">
            Visit our LinkedIn page <ArrowUpRight size={18} aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className="about-social">
          <p>Find us on:</p>
          <SocialLinks variant="list" />
        </div>
      </Section>

      <CtaBand id="about-cta-title" />
    </>
  );
}
