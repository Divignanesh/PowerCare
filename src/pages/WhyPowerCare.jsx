import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, Shield, BookOpen, Users } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import FAQ from '../components/ui/FAQ';
import { whyPowerCareFAQs } from '../data/faqs';
import { RevealGroup, RevealItem } from '../components/ui/Reveal';
import CredentialBand from '../components/ui/CredentialBand';
import SEO, { faqSchema } from '../components/seo/SEO';

// What the training covers. No hours are claimed — the point is the ground it
// covers and who teaches it, not how long anybody sat in a room.
const MODULES = [
  { title: 'Clinical foundations & safety',    desc: 'Infection control, medication safety, and what to do when something goes wrong.' },
  { title: 'Resident-centred & dementia care', desc: 'Seeing the person first, and staying patient when someone is frightened or confused.' },
  { title: 'Communication & documentation',    desc: 'Charting, handover, and how to talk with a worried family.' },
  { title: 'Role-specific practical skills',   desc: 'Hands-on practice for the particular work each person will be doing.' },
];

// ─────────────────────────── TRAINING ────────────────────────────
// This section carries the page's h1 now that the hero band is gone.
const InHouseTraining = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <span className="section-badge">Before anyone arrives</span>
      <h1 className="text-display font-heading font-semibold text-ink-900 text-balance max-w-3xl">
        We teach people the way we would want our own family cared for
      </h1>
      <p className="section-subtitle mb-12">
        Everyone who works with us learns with us first. Not because a rule says so,
        but because the first morning on an unfamiliar floor is no place to be finding
        your feet.
      </p>

      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
        <div className="lg:col-span-5">
          <p className="text-ink-600 leading-relaxed mb-5 text-pretty">
            Our training is written and taught by registered healthcare professionals
            who have spent their working lives on Ontario floors — in long-term care,
            in retirement residences, and in people's own homes.
          </p>
          <p className="text-ink-600 leading-relaxed mb-8 text-pretty">
            They know which things a textbook cannot teach: how to settle someone at
            three in the morning, how to notice that a resident is not quite themselves,
            how to hand over so nothing is lost between shifts.
          </p>

          <Link to="/careers" className="link-arrow text-base">
            Train with us <ArrowRight size={16} />
          </Link>
        </div>

        <RevealGroup className="lg:col-span-7 grid sm:grid-cols-2 auto-rows-fr gap-4">
          {MODULES.map(({ title, desc }) => (
            <RevealItem key={title} className="h-full">
              <div className="h-full rounded-2xl bg-surface p-7">
                <h2 className="font-heading font-semibold text-ink-900 mb-3">{title}</h2>
                <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">{desc}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  </section>
);

// ─────────────────────────── PILLARS ────────────────────────────
const KeyPillars = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom">
      <SectionHeader
        badge="What we hold to"
        title="The things we will not let slip"
        subtitle="Beyond the training, this is what working with us should feel like."
        centered={false}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-9">
        {[
          { icon: HeartHandshake, title: 'We stay close',        desc: 'We ring after the first shift, and the ones after it. If something is not working we would rather hear it early and put it right.' },
          { icon: Users,          title: 'You get a person',     desc: 'The same coordinator, who knows your home, your team and the residents you worry about most. Not a queue.' },
          { icon: Shield,         title: 'We stand behind them', desc: 'Everyone we send is someone we have met, taught and would be happy to see caring for our own family.' },
          { icon: BookOpen,       title: 'We keep learning',     desc: 'Our people keep training long after their first placement, because care does not stand still and neither should we.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title}>
            <Icon size={20} strokeWidth={1.6} className="text-primary-600 mb-6" />
            <h3 className="font-heading font-semibold text-ink-900 text-lg mb-3">{title}</h3>
            <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhyPowerCare = () => (
  <main>
    <SEO page="whyPowerCare" extraSchemas={[faqSchema(whyPowerCareFAQs)]} />
    <InHouseTraining />
    <CredentialBand />
    <KeyPillars />
    <FAQ
      faqs={whyPowerCareFAQs}
      badge="Why PowerCare"
      title="Your Questions About PowerCare"
      subtitle="What people usually want to know before they call."
    />
  </main>
);

export default WhyPowerCare;
