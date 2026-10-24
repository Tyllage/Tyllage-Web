import { ArrowUpRight, Briefcase, Building2, Cpu, GraduationCap, Mail, MapPin, Phone, ShoppingBasket, Sprout, TrendingUp } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Section } from '../components/Section';
import { ContactForm } from '../components/ContactForm';
import { SocialLinks } from '../components/SocialLinks';
import { LinkedInIcon } from '../components/Icons';
import { company } from '../data/company';
import { pages } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

const audiences = [
  { icon: Sprout, title: 'Farms', text: 'Explore how our tools could support your sales and operations.' },
  { icon: Building2, title: 'Agricultural businesses', text: 'Discuss commercial and operational challenges.' },
  { icon: ShoppingBasket, title: 'Wholesale buyers', text: 'Help shape how buyers and farms connect.' },
  { icon: Cpu, title: 'Technology partners', text: 'Collaborate on integrations and innovation.' },
  { icon: GraduationCap, title: 'Schools', text: 'Talk about learning journeys and education projects.' },
  { icon: TrendingUp, title: 'Investors and mentors', text: 'Learn about our direction and growth plans.' },
];

export default function Contact() {
  usePageMeta(pages.contact);
  const { email, phone, address } = company.contact;

  return (
    <>
      <Hero
        eyebrow="Partner with us"
        title="Let’s grow something together."
        lead="Whether you grow, buy, build, teach or invest, we would like to hear from you. Tell us a little about your organisation and how you would like to work with Tyllage."
      />

      <Section tone="white" labelledBy="audiences-title" className="section--tight">
        <h2 id="audiences-title" className="h4 audiences__title reveal">
          Who we work with
        </h2>
        <ul className="audience-grid" role="list">
          {audiences.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="audience reveal" style={{ ['--delay' as string]: `${i * 50}ms` }}>
              <Icon size={20} aria-hidden />
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="ivory" labelledBy="enquiry-title">
        <div className="contact-layout">
          <div className="contact-layout__form reveal">
            <h2 id="enquiry-title" className="h3">
              Send an enquiry
            </h2>
            <p className="muted">All fields are required.</p>
            <ContactForm />
          </div>

          <aside className="contact-layout__aside reveal" aria-label="Other ways to connect">
            <div className="aside-card aside-card--dark">
              <span className="aside-card__icon">
                <LinkedInIcon size={22} />
              </span>
              <h3>Connect on LinkedIn</h3>
              <p>Follow our company updates, technological developments and industry collaborations, or send us a message.</p>
              <a className="btn btn--accent btn--sm" href={company.social.linkedin} target="_blank" rel="noopener noreferrer">
                Tyllage on LinkedIn <ArrowUpRight size={16} aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            {(email || phone || address) && (
              <div className="aside-card">
                <h3>Contact details</h3>
                <ul className="contact-details" role="list">
                  {email && (
                    <li>
                      <Mail size={18} aria-hidden /> <a href={`mailto:${email}`}>{email}</a>
                    </li>
                  )}
                  {phone && (
                    <li>
                      <Phone size={18} aria-hidden /> <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
                    </li>
                  )}
                  {address && (
                    <li>
                      <MapPin size={18} aria-hidden /> <address>{address}</address>
                    </li>
                  )}
                </ul>
              </div>
            )}

            <div className="aside-card">
              <h3>Follow Tyllage</h3>
              <SocialLinks variant="list" />
            </div>

            <div className="aside-card aside-card--plain">
              <Briefcase size={18} aria-hidden />
              <p>
                <strong>{company.legalName}</strong>
                <br />
                Registered in {company.country}
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
