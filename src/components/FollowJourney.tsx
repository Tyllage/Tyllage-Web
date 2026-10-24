import { Section, SectionHeading } from './Section';
import { SocialLinks } from './SocialLinks';

export function FollowJourney({ tone = 'white' }: { tone?: 'white' | 'ivory' | 'mist' }) {
  return (
    <Section tone={tone} labelledBy="follow-title" className="follow-journey">
      <div className="follow-journey__grid">
        <SectionHeading
          id="follow-title"
          eyebrow="Company updates"
          title="Follow Our Journey"
          intro="We share progress on our official channels as Tyllage develops. Follow along for news as it happens."
        />
        <SocialLinks variant="cards" include={['linkedin', 'instagram']} className="reveal" />
      </div>
    </Section>
  );
}
