import { ArrowUpRight, Building2, Cpu, GraduationCap, Handshake, Landmark, Mail, Sprout, TrendingUp } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Section } from '../components/Section';
import { ContactForm } from '../components/ContactForm';
import { InstagramIcon, LinkedInIcon } from '../components/Icons';
import { company } from '../data/company';
import { media } from '../data/media';
import { pages } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

const audiences = [
  { icon: Sprout, title: 'Farm Owners', text: 'Explore how our tools could support your sales and day-to-day operations.' },
  { icon: Building2, title: 'Agricultural Businesses', text: 'Talk to us about commercial and operational challenges.' },
  { icon: Cpu, title: 'Technology Partners', text: 'Collaborate on integrations, data and innovation.' },
  { icon: GraduationCap, title: 'Schools', text: 'Discuss learning journeys and education projects.' },
  { icon: Handshake, title: 'Industry Collaborators', text: 'Work with us on initiatives across the agricultural sector.' },
  { icon: TrendingUp, title: 'Mentors and Investors', text: 'Learn about our direction, progress and plans.' },
];

export default function Contact() {
  usePageMeta(pages.contact);
  const { email, phone, address, uen } = company.contact;

  return (
    <>
      <Hero
        eyebrow="Partner with us"
        title={
          <>
            Let’s grow something <em className="serif-accent">together.</em>
          </>
        }
        lead="Whether you grow, buy, build, teach, mentor or invest, we would like to hear from you."
        media={media.contact}
        actions={
          email ? (
            <a className="btn btn--primary" href={`mailto:${email}`}>
              <Mail size={18} aria-hidden /> Email {email}
            </a>
          ) : undefined
        }
      />

      <Section tone="white" labelledBy="audiences-title" className="section--tight">
        <h2 id="audiences-title" className="h3 audiences__title reveal">
          Who we would like to work with
        </h2>
        <ul className="audience-grid" role="list">
          {audiences.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="audience reveal" style={{ ['--delay' as string]: `${i * 50}ms` }}>
              <span className="audience__icon">
                <Icon size={22} aria-hidden />
              </span>
              <strong>{title}</strong>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="ivory" labelledBy="enquiry-title">
        <div className="contact-layout">
          <div className="contact-layout__form reveal">
            <h2 id="enquiry-title" className="h3">
              Partnership enquiry
            </h2>
            <p className="muted">Tell us about your organisation and how you would like to collaborate.</p>
            <ContactForm />
          </div>

          <aside className="contact-layout__aside reveal" aria-label="Other ways to connect">
            {email && (
              <div className="aside-card aside-card--dark">
                <span className="aside-card__icon">
                  <Mail size={22} aria-hidden />
                </span>
                <h3>Email us</h3>
                <p>The quickest way to reach the Tyllage team.</p>
                <a className="aside-card__email" href={`mailto:${email}`}>
                  {email}
                </a>
              </div>
            )}

            <div className="aside-card">
              <h3>Follow Tyllage</h3>
              <ul className="aside-links" role="list">
                <li>
                  <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <span className="aside-links__icon">
                      <LinkedInIcon size={18} />
                    </span>
                    <span>
                      <strong>LinkedIn</strong>
                      <span>Company updates and news</span>
                    </span>
                    <ArrowUpRight size={16} aria-hidden />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                {company.social.instagram && (
                  <li>
                    <a href={company.social.instagram} target="_blank" rel="noopener noreferrer">
                      <span className="aside-links__icon">
                        <InstagramIcon size={18} />
                      </span>
                      <span>
                        <strong>Instagram</strong>
                        <span>Our startup journey</span>
                      </span>
                      <ArrowUpRight size={16} aria-hidden />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div className="aside-card aside-card--plain">
              <Landmark size={20} aria-hidden />
              <div>
                <h3>Registered business</h3>
                <p>
                  <strong>{company.legalName}</strong>
                  <br />
                  {company.entityType}, registered in {company.country}
                  {uen && (
                    <>
                      <br />
                      UEN: {uen}
                    </>
                  )}
                  {phone && (
                    <>
                      <br />
                      <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
                    </>
                  )}
                </p>
                {address && <address>{address}</address>}
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
