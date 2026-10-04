import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import {
  Stethoscope, Heartbeat as HeartPulse, UsersThree as Users, House as Home,
  Pulse as Activity, Sparkle as Sparkles, ClipboardText as ClipboardList, Brain,
  Smiley as SmilePlus, ForkKnife as UtensilsCrossed,
  ShieldCheck as Shield, Clock, Medal as Award, CheckCircle,
  HandHeart, Wheelchair as Accessibility, ChatsCircle as Speech, Handshake as HeartHandshake,
} from '@phosphor-icons/react';
import SectionHeader from '../components/ui/SectionHeader';
import PageHero from '../components/ui/PageHero';
import FAQ from '../components/ui/FAQ';
import CtaBand from '../components/ui/CtaBand';
import { services, serviceCategories } from '../data/services';
import { servicesFAQs } from '../data/faqs';
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal';
import SEO, { faqSchema, servicesListSchema } from '../components/seo/SEO';

const iconMap = {
  Stethoscope, HeartPulse, Users, Home, Activity, Sparkles,
  ClipboardList, Brain, SmilePlus, UtensilsCrossed,
  HandHeart, Accessibility, Speech, HeartHandshake,
};

const ServiceCard = ({ service }) => {
  const Icon = iconMap[service.icon] || CheckCircle;
  return (
    // The whole card is the request: the role travels with it so the contact
    // form arrives pre-filled. The photograph fills the card; a dark wash from
    // the foot up keeps the white type readable over any picture.
    <Link
      to={`/contact?role=${encodeURIComponent(service.title)}`}
      className="group relative isolate flex h-full min-h-[440px] rounded-[1.75rem] overflow-hidden bg-ink-200"
    >
      <img
        src={service.image}
        alt=""
        loading="lazy"
        className={`absolute inset-0 -z-20 w-full h-full object-cover ${service.imagePos || 'object-top'}
                    transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]`}
      />
      <span
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900/90 via-ink-900/45 to-ink-900/15"
        aria-hidden="true"
      />

      <span className="mt-auto w-full p-7">
        <span className="flex items-center gap-2.5 mb-2">
          <Icon size={18} className="text-white/80 flex-shrink-0" />
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-white/80">
            {service.category}
          </span>
        </span>
        <h3 className="text-2xl font-heading font-bold text-white leading-tight text-balance">
          {service.title}
        </h3>
        <span className="block mt-2 text-white/80 text-sm leading-relaxed text-pretty">{service.shortDesc}</span>
        <span className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-primary-200
                         transition-colors group-hover:text-white">
          {service.requestLabel} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  );
};

const Hero = () => (
  <PageHero
    eyebrow="Our Services"
    title="Healthcare Professionals We Place"
    subtitle="The nurses, support workers and therapists we place across every kind of care setting in Ontario."
    image="/images/services-hero.jpg"
    imageAlt="A PowerCare caregiver hugging a smiling older woman at home"
    imagePos="object-center"
    insetImage="/images/services-hero-inset.jpg"
    insetImageAlt="A PowerCare nurse talking with an older man"
  >
    <ul className="flex flex-wrap gap-2 mt-8">
      {['Nursing', 'Personal & developmental support', 'Allied health', 'Facility services'].map((t) => (
        <li key={t} className="rounded-full bg-surface px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-primary-700">
          {t}
        </li>
      ))}
    </ul>
  </PageHero>
);

const ServicesIntro = () => (
  <section className="bg-white section-padding-tight">
    <div className="container-custom">
      <div className="grid sm:grid-cols-3 gap-5">
        {[
          { icon: Shield, title: 'Known to us',     desc: 'Everyone we place trains with us and is someone we have met before we send them anywhere.' },
          { icon: Clock,  title: 'Whenever you need', desc: 'Mornings, nights, weekends and holidays — care does not keep office hours.' },
          { icon: Award,  title: 'We stay close',     desc: 'If a placement is not right, tell us and we will put it right. No argument.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="h-full rounded-xl border border-ink-200 bg-white shadow-card px-7 py-8 text-center">
            <Icon size={44} className="text-primary-700 mb-4 mx-auto" />
            <h3 className="text-xl font-heading font-semibold text-ink-900 mb-3">{title}</h3>
            <p className="text-ink-600 text-base leading-relaxed text-pretty">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ServicesGrid = () => {
  const [active, setActive] = useState('All');
  const [showAll, setShowAll] = useState(false);

  // Six cards — two full rows — until the visitor asks for the rest.
  // Changing the filter collapses the list again.
  const PREVIEW = 6;
  const filtered = active === 'All' ? services : services.filter((s) => s.category === active);
  const visible = showAll ? filtered : filtered.slice(0, PREVIEW);

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <SectionHeader
          badge="All professions"
          title="Every Role We Place, in One Place"
          subtitle="Filter by discipline to find the people you need."
          centered={false}
        />

        <div className="flex flex-wrap gap-2 mb-9">
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActive(cat); setShowAll(false); }}
              aria-pressed={active === cat}
              className={`px-4 py-2.5 rounded-full border font-mono text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${
                active === cat
                  ? 'bg-primary-700 border-primary-700 text-white'
                  : 'bg-white border-ink-300 text-ink-600 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Keyed on the filter and the toggle: a reveal only plays once, so
            cards added after it has run would otherwise stay invisible. */}
        <RevealGroup
          key={`${active}-${showAll}`}
          className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-5"
        >
          {visible.map((service) => (
            <RevealItem key={service.id} className="h-full">
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {filtered.length > PREVIEW && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="btn-primary"
            >
              {showAll ? 'Show fewer roles' : `View all ${filtered.length} roles`}
              <ArrowRight size={16} className={`transition-transform ${showAll ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          )}
          <Link to="/contact" className="btn-secondary">
            Request staff <ArrowRight size={16} />
          </Link>
        </div>
      </div>

    </section>
  );
};

const NursingSection = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
        <div className="lg:col-span-6">
          <span className="section-badge">Nursing services</span>
          <h2 className="text-display-sm font-heading font-semibold text-primary-700 mb-6 text-balance">
            Clinical Excellence at Every Level
          </h2>
          <p className="text-ink-600 leading-relaxed mb-8 text-pretty">
            PowerCare provides credentialed nursing professionals — from Registered Nurses and RPNs
            to Nurse Practitioners — who bring clinical excellence and compassionate patient care to
            every setting. All nursing staff are college-verified, background-cleared, and trained to
            our proprietary care standards.
          </p>
          <ul className="mb-9 space-y-2">
            {[
              'Medication administration & IV therapy',
              'Wound care & post-operative recovery at home',
              'Chronic disease & palliative care',
              'Long-term care, retirement and community settings',
              'Infection prevention & control (IPAC)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 py-1.5 text-base text-ink-700">
                <Check size={15} strokeWidth={2.5} className="text-primary-500 mt-1 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn-primary">
            Request Nursing Staff <ArrowRight size={16} />
          </Link>
        </div>

        <div className="lg:col-span-6">
          <figure className="fig-frame mb-8">
            <img
              src="/images/senior-care.jpg"
              alt="A PowerCare nurse with a resident during a routine check"
              loading="lazy"
              className="w-full h-[320px] object-cover object-center"
            />
          </figure>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary-700 mb-5">
            Nursing roles we place
          </h3>
          <div>
            {[
              { role: 'Registered Nurse (RN)',            desc: 'Full scope nursing practice across all care settings' },
              { role: 'Registered Practical Nurse (RPN)', desc: 'Primary care, medication management, care planning'   },
              { role: 'Nurse Practitioner (NP)',          desc: 'Advanced assessment, diagnosis, and prescribing'      },
            ].map(({ role, desc }) => (
              <div key={role} className="flex items-start gap-4 py-5">
                <HeartPulse size={22} className="text-primary-700 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-heading font-semibold text-ink-900">{role}</div>
                  <div className="text-ink-600 text-sm mt-1">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PersonalCareSection = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
        <Reveal className="lg:col-span-6 order-2 lg:order-1">
          <figure className="fig-frame">
            <img
              src="/images/home-breakfast.jpg"
              alt="A PowerCare carer helping an older man at breakfast during a home visit"
              loading="lazy"
              className="w-full h-[420px] object-cover object-top"
            />
          </figure>
        </Reveal>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <span className="section-badge">Personal &amp; community care</span>
          <h2 className="text-display-sm font-heading font-semibold text-primary-700 mb-6 text-balance">
            Compassionate Hands-On Care
          </h2>
          <p className="text-ink-600 leading-relaxed mb-5 text-pretty">
            Our personal care workers — PSWs, DSWs, Companions and respite support staff — are the
            backbone of quality daily living support. PowerCare&rsquo;s personal care professionals
            are trained to deliver not just physical assistance, but dignity, warmth, and genuine
            human connection.
          </p>
          <p className="text-ink-600 leading-relaxed mb-9 text-pretty">
            Every personal care worker completes our person-centred care training module, equipping
            them to provide culturally sensitive, emotionally intelligent, and physically safe support
            in homes, group homes, retirement residences and long-term care.
          </p>
          <Link to="/contact" className="btn-primary">
            Request Care Workers <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const OurServices = () => (
  <main>
    <SEO page="services" extraSchemas={[servicesListSchema, faqSchema(servicesFAQs)]} />
    <Hero />
    <ServicesIntro />
    <ServicesGrid />
    <NursingSection />
    <PersonalCareSection />
    <FAQ faqs={servicesFAQs} badge="Our services" title="Questions About Healthcare Staffing Services" subtitle="More about the people we place and how to reach us." />
    <CtaBand
      image="/images/activity-room.jpg"
      title="Get the right people on your floor"
      text="Tell us the roles and shifts you need, and we'll take it from there."
      cta="Request staff"
      points={['Nursing', 'Personal support', 'Allied health']}
    />
  </main>
);

export default OurServices;
