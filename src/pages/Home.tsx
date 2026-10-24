import { Link } from 'react-router-dom';
import { ArrowRight, Compass, HelpCircle, MapPin, MessageSquareText, PackageX, Search, Shuffle } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Section, SectionHeading } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { CtaBand } from '../components/CtaBand';
import { FollowJourney } from '../components/FollowJourney';
import { Media } from '../components/Media';
import { developmentAreas, journey } from '../data/platform';
import { publicProjects } from '../data/projects';
import { company } from '../data/company';
import { media } from '../data/media';
import { pages } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

const challenges = [
  {
    icon: MessageSquareText,
    title: 'Manual sales and marketing workflows',
    text: 'Enquiries, follow-ups and promotions are often handled by hand across messaging apps and spreadsheets.',
  },
  {
    icon: Search,
    title: 'Difficulty identifying new buyers',
    text: 'Finding and keeping in touch with suitable buyers can take time that small teams rarely have.',
  },
  {
    icon: HelpCircle,
    title: 'Uncertain demand for upcoming harvests',
    text: 'It can be hard to know, ahead of time, who will want what is about to be ready.',
  },
  {
    icon: Shuffle,
    title: 'Limited visibility across sales channels',
    text: 'Orders and interest may be spread across many channels, with no single view.',
  },
  {
    icon: PackageX,
    title: 'Unallocated or unsold produce',
    text: 'Fresh produce has a short selling window. Without early demand visibility, some may go unsold.',
  },
];

export default function Home() {
  usePageMeta(pages.home);
  const featured = publicProjects[0];
  const [lead, ...rest] = developmentAreas;

  return (
    <>
      <Hero
        variant="home"
        media={media.hero}
        eyebrow="Singapore-based agricultural innovation"
        title={
          <>
            Growing Smarter.
            <br />
            <span className="hero__title-accent">Selling Better.</span>
          </>
        }
        lead="Empowering agricultural businesses with intelligent technology that connects farm operations, harvest availability and commercial opportunities."
        actions={
          <>
            <Link to="/platform" className="btn btn--sage">
              Explore Our Platform <ArrowRight size={18} aria-hidden />
            </Link>
            <Link to="/contact" className="btn btn--ghost-light">
              Partner With Us
            </Link>
          </>
        }
      >
        <p className="hero__meta hero__fade hero__fade--4">
          <MapPin size={16} aria-hidden /> {company.legalName} · An early-stage AgriTech venture, registered in{' '}
          {company.country}
        </p>
      </Hero>

      {/* Our purpose */}
      <Section tone="ivory" labelledBy="purpose-title" className="purpose">
        <div className="purpose__grid">
          <div className="purpose__intro">
            <SectionHeading
              id="purpose-title"
              eyebrow="Our purpose"
              title={
                <>
                  Farms grow great produce. <em className="serif-accent">Selling it</em> should be easier.
                </>
              }
              intro="Tyllage exists to help agricultural businesses spend less time on manual sales work and more time on what they do best. These are the challenges we have set out to explore."
            />
            <Media slot={media.purpose} className="purpose__image reveal" zoom />
          </div>
          <div>
            <ol className="challenge-list" role="list">
              {challenges.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="challenge reveal" style={{ ['--delay' as string]: `${i * 60}ms` }}>
                  <span className="challenge__icon">
                    <Icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="challenge__title">{title}</h3>
                    <p className="challenge__text">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="hypothesis-note reveal">
              <Compass size={16} aria-hidden />
              These are common industry challenges and working hypotheses. We are validating them with farms — they
              are not published findings.
            </p>
          </div>
        </div>
      </Section>

      {/* What we do */}
      <Section tone="white" labelledBy="what-title">
        <div className="split">
          <SectionHeading
            id="what-title"
            eyebrow="What we do"
            title="Practical technology for the business side of farming."
            intro={company.focus}
          />
          <div className="split__aside reveal">
            <Link to="/platform" className="text-link">
              Explore the platform <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
        <div className="areas">
          <article className="area area--lead reveal">
            <Media slot={lead.scene} className="area__media" zoom />
            <div className="area__body">
              <span className="area__icon">
                <lead.icon size={22} aria-hidden />
              </span>
              <h3 className="area__title">{lead.title}</h3>
              <p className="area__text">{lead.text}</p>
            </div>
          </article>
          {rest.map(({ title, text, icon: Icon, scene }, i) => (
            <article key={title} className="area reveal" style={{ ['--delay' as string]: `${(i + 1) * 70}ms` }}>
              <Media slot={scene} className="area__media" zoom />
              <div className="area__body">
                <span className="area__icon">
                  <Icon size={20} aria-hidden />
                </span>
                <h3 className="area__title">{title}</h3>
                <p className="area__text">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* How Tyllage works */}
      <Section tone="forest" labelledBy="how-title" className="section--texture">
        <SectionHeading
          id="how-title"
          eyebrow="How Tyllage works"
          title="From farm information to confident sales action."
          intro="AI supports the farm team at every step — it never acts on its own."
          tone="light"
          align="center"
        />
        <ol className="journey" role="list">
          {journey.map(({ title, text, icon: Icon }, i) => (
            <li key={title} className="journey__step reveal" style={{ ['--delay' as string]: `${i * 90}ms` }}>
              <span className="journey__marker" aria-hidden>
                <Icon size={22} />
              </span>
              <span className="journey__num" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="journey__title">
                <span className="sr-only">Step {i + 1}: </span>
                {title}
              </h3>
              <p className="journey__text">{text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Meet Tyllage */}
      <Section tone="beige" labelledBy="meet-title">
        <div className="meet">
          <Media slot={media.founders} className="meet__image reveal" zoom />
          <div className="meet__copy reveal">
            <p className="eyebrow">Meet Tyllage</p>
            <h2 id="meet-title" className="h2">
              From classrooms to <em className="serif-accent">cultivating change.</em>
            </h2>
            <p className="prose-lead">
              Tyllage was founded by two female technology entrepreneurs, {company.founders.map((f) => f.name).join(' and ')},
              whose educational journeys took them from ITE to polytechnic.
            </p>
            <p>
              We are applying what we have learnt to a challenge worth solving: helping agricultural businesses in
              Singapore make more informed decisions with practical, connected software.
            </p>
            <Link to="/about" className="text-link">
              Read our story <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      {/* Featured workstream */}
      {featured && (
        <Section tone="ivory" labelledBy="featured-title">
          <SectionHeading
            id="featured-title"
            eyebrow="Projects & pilots"
            title="Our current workstream."
            intro="We develop our technology through focused, real-world prototyping — clearly labelled with its stage."
          />
          <div className="reveal">
            <ProjectCard project={featured} showDetailsLink />
          </div>
        </Section>
      )}

      <FollowJourney tone="white" />

      <CtaBand />
    </>
  );
}
