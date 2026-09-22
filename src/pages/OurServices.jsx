import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, Stethoscope, HeartPulse, Users, Home,
  Activity, Sparkles, ClipboardList, Brain, SmilePlus, UtensilsCrossed,
  ChevronRight, Shield, Clock, Award, X, CheckCircle,
  HandHeart, Accessibility, Speech, HeartHandshake,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import PageHero from '../components/ui/PageHero';
import FAQ from '../components/ui/FAQ';
import { services, serviceCategories } from '../data/services';
import { servicesFAQs } from '../data/faqs';
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal';
import CredentialBand from '../components/ui/CredentialBand';
import SEO, { faqSchema, servicesListSchema } from '../components/seo/SEO';

const iconMap = {
  Stethoscope, HeartPulse, Users, Home, Activity, Sparkles,
  ClipboardList, Brain, SmilePlus, UtensilsCrossed,
  HandHeart, Accessibility, Speech, HeartHandshake,
};

const ServiceCard = ({ service, onClick }) => {
  const Icon = iconMap[service.icon] || CheckCircle;
  return (
    <div
      className="group flex flex-col h-full rounded-2xl bg-surface overflow-hidden
                 transition-colors duration-300 ease-out-soft hover:bg-primary-50"
    >
      <div className="h-44 overflow-hidden bg-ink-100">
        <img
          src={service.image}
          alt=""
          loading="lazy"
          className={`w-full h-full object-cover ${service.imagePos || 'object-top'}`}
        />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2.5 mb-2">
          <Icon size={16} strokeWidth={1.7} className="text-primary-600 flex-shrink-0" />
          <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-widest text-primary-700">
            {service.category}
          </span>
        </div>
        <h3 className="text-[1.0625rem] font-heading font-semibold text-ink-900 mb-2 leading-snug min-h-[2.9rem]">
          {service.title}
        </h3>
        <p className="text-ink-600 text-sm leading-relaxed text-pretty flex-1">{service.shortDesc}</p>

        <div className="flex flex-col items-start gap-3 mt-6">
          <button type="button" onClick={() => onClick(service)} className="link-arrow">
            Learn more <ChevronRight size={14} />
          </button>
          {/* The role travels with the request so the form arrives pre-filled. */}
          <Link
            to={`/contact?role=${encodeURIComponent(service.title)}`}
            className="btn-primary w-full !px-3 !py-2.5 !text-[0.8125rem]"
          >
            {service.requestLabel}
          </Link>
        </div>
      </div>
    </div>
  );
};

const ServiceModal = ({ service, onClose }) => {
  const reduceMotion = useReducedMotion();

  // Escape closes the dialog and the page behind it must not scroll.
  useEffect(() => {
    if (!service) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [service, onClose]);

  const Icon = service ? (iconMap[service.icon] || CheckCircle) : null;

  return (
    <AnimatePresence>
      {service && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-900/60"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={service.title}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white rounded-2xl max-w-xl w-full max-h-[88vh] overflow-y-auto shadow-panel"
          >
            <div className="relative h-44 overflow-hidden bg-ink-100">
              <img src={service.image} alt="" className={`w-full h-full object-cover ${service.imagePos || 'object-top'}`} />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center
                           text-ink-700 hover:bg-ink-50 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-7 sm:p-9">
              <Icon size={24} strokeWidth={1.6} className="text-primary-600 mb-5" />
              <p className="text-ink-600 leading-relaxed mb-8 text-pretty">{service.fullDesc}</p>

              <h3 className="font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-ink-500 mb-4">
                Key Responsibilities &amp; Highlights
              </h3>
              <ul className="mb-9 space-y-2">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 py-1.5 text-[0.9375rem] text-ink-700">
                    <Check size={15} strokeWidth={2.5} className="text-primary-500 mt-1 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="btn-primary flex-1" onClick={onClose}>
                  Request This Role
                </Link>
                <Link to="/careers" className="btn-secondary flex-1" onClick={onClose}>
                  Apply for This Role
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Hero = () => (
  <PageHero
    eyebrow="Our Services"
    title="Healthcare Professionals We Place"
    subtitle="The nurses, support workers and therapists we place across every kind of care setting in Ontario."
    image="/images/training-room.jpg"
    imageAlt="PowerCare staff working together at a resident's bedside"
    imagePos="object-center"
  >
    <ul className="flex flex-wrap gap-2 mt-8">
      {['Nursing', 'Personal & developmental support', 'Allied health', 'Facility services'].map((t) => (
        <li key={t} className="rounded-full bg-surface px-4 py-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-primary-700">
          {t}
        </li>
      ))}
    </ul>
  </PageHero>
);

const ServicesIntro = () => (
  <section className="bg-white section-padding-tight">
    <div className="container-custom">
      <div className="grid sm:grid-cols-3 gap-x-10 gap-y-8">
        {[
          { icon: Shield, title: 'Known to us',     desc: 'Everyone we place trains with us and is someone we have met before we send them anywhere.' },
          { icon: Clock,  title: 'Whenever you need', desc: 'Mornings, nights, weekends and holidays — care does not keep office hours.' },
          { icon: Award,  title: 'We stay close',     desc: 'If a placement is not right, tell us and we will put it right. No argument.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="py-4">
            <Icon size={20} strokeWidth={1.6} className="text-primary-600 mb-4" />
            <h3 className="font-heading font-semibold text-ink-900 mb-2">{title}</h3>
            <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ServicesGrid = () => {
  const [active, setActive] = useState('All');
  const [selectedService, setSelectedService] = useState(null);

  const filtered = active === 'All' ? services : services.filter((s) => s.category === active);

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <SectionHeader
          badge="All professions"
          title="Every Role We Place, in One Place"
          subtitle="Filter by discipline, or ask us about a role you don't see listed — if it's a regulated or support role in Ontario care, we can likely staff it."
          centered={false}
        />

        <div className="flex flex-wrap gap-2 mb-9">
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`px-4 py-2.5 rounded-lg font-mono text-[0.6875rem] font-semibold uppercase tracking-widest transition-colors duration-200 ${
                active === cat
                  ? 'bg-primary-700 text-white'
                  : 'bg-surface text-ink-600 hover:bg-primary-50 hover:text-primary-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr gap-5">
          {filtered.map((service) => (
            <RevealItem key={service.id} className="h-full">
              <ServiceCard service={service} onClick={setSelectedService} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </section>
  );
};

const NursingSection = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
        <div className="lg:col-span-6">
          <span className="section-badge">Nursing services</span>
          <h2 className="text-display-sm font-heading font-semibold text-ink-900 mb-6 text-balance">
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
              <li key={item} className="flex items-start gap-3 py-1.5 text-[0.9375rem] text-ink-700">
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
          <h3 className="font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-primary-700 mb-5">
            Nursing roles we place
          </h3>
          <div>
            {[
              { role: 'Registered Nurse (RN)',            desc: 'Full scope nursing practice across all care settings' },
              { role: 'Registered Practical Nurse (RPN)', desc: 'Primary care, medication management, care planning'   },
              { role: 'Nurse Practitioner (NP)',          desc: 'Advanced assessment, diagnosis, and prescribing'      },
            ].map(({ role, desc }) => (
              <div key={role} className="flex items-start gap-4 py-5">
                <HeartPulse size={17} className="text-primary-600 mt-1 flex-shrink-0" />
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

// ── Allied health ────────────────────────────────────────────
// The regulated therapy disciplines earn their own band: these are college-
// registered professionals, not assistants, and facilities book them
// differently from a shift-by-shift care role.
const ALLIED = [
  {
    key: 'ot',
    icon: Accessibility,
    title: 'Occupational Therapist (OT)',
    college: 'College of Occupational Therapists of Ontario',
    points: ['Functional & home safety assessments', 'Seating, mobility & equipment prescription', 'Falls prevention and ADL retraining'],
  },
  {
    key: 'slp',
    icon: Speech,
    title: 'Speech-Language Pathologist (SLP)',
    college: 'CASLPO registered',
    points: ['Swallowing (dysphagia) assessment', 'Post-stroke and aphasia therapy', 'Paediatric speech and language'],
  },
  {
    key: 'psy',
    icon: Brain,
    title: 'Psychotherapist',
    college: 'CRPO registered',
    points: ['Individual & group psychotherapy', 'Trauma-informed and CBT practice', 'Mental health & addictions programmes'],
  },
  {
    key: 'diet',
    icon: UtensilsCrossed,
    title: 'Dietary Aide / Dietitian',
    college: 'College of Dietitians of Ontario',
    points: ['Nutritional risk assessment', 'Therapeutic & texture-modified diets', 'Meal service and food safety'],
  },
];

const AlliedHealthSection = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="Allied health & therapy"
        title="Regulated Therapy Professionals"
        subtitle="College-registered OTs, SLPs, Psychotherapists and Dietitians — for rehabilitation programmes, therapy hours in long-term care, developmental services and mental health teams."
        centered={false}
      />

      <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-5">
        {ALLIED.map(({ key, icon: Icon, title, college, points }) => (
          <RevealItem key={key} className="h-full">
            <div className="flex flex-col h-full rounded-2xl bg-surface p-7">
              <Icon size={24} strokeWidth={1.6} className="text-primary-600" />
              <h3 className="font-heading font-semibold text-ink-900 text-[1.0625rem] leading-snug mt-5 min-h-[2.9rem]">{title}</h3>
              <span className="block font-mono text-[0.625rem] font-semibold uppercase tracking-widest text-primary-700 mt-2">
                {college}
              </span>
              <ul className="space-y-2.5 flex-1 mt-5">
                {points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-ink-600 leading-relaxed">
                    <Check size={14} strokeWidth={2.5} className="text-primary-500 mt-1 flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-9">
        <Link to="/industries" className="link-arrow text-base">
          Where we place them <ChevronRight size={16} />
        </Link>
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
              src="/images/home-visit.jpg"
              alt="A PowerCare support worker checking a client's blood pressure during a community visit"
              loading="lazy"
              className="w-full h-[420px] object-cover object-top"
            />
          </figure>
        </Reveal>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <span className="section-badge">Personal &amp; community care</span>
          <h2 className="text-display-sm font-heading font-semibold text-ink-900 mb-6 text-balance">
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
    <CredentialBand />
    <ServicesIntro />
    <ServicesGrid />
    <NursingSection />
    <AlliedHealthSection />
    <PersonalCareSection />
    <FAQ faqs={servicesFAQs} badge="Our services" title="Questions About Healthcare Staffing Services" subtitle="More about the people we place and how to reach us." />
  </main>
);

export default OurServices;
