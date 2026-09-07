import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, Stethoscope, HeartPulse, Users, Home,
  Activity, Sparkles, ClipboardList, Brain, SmilePlus, UtensilsCrossed,
  ChevronRight, Shield, Clock, Award, X, CheckCircle
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import PageHero from '../components/ui/PageHero';
import FAQ from '../components/ui/FAQ';
import { services, serviceCategories } from '../data/services';
import { servicesFAQs } from '../data/faqs';
import { RevealGroup, RevealItem } from '../components/ui/Reveal';
import CredentialBadges from '../components/ui/CredentialBadges';
import SEO from '../components/seo/SEO';

const iconMap = {
  Stethoscope, HeartPulse, Users, Home, Activity, Sparkles,
  ClipboardList, Brain, SmilePlus, UtensilsCrossed,
  HandHeart: HeartPulse,
};

const ServiceCard = ({ service, index, onClick }) => {
  const Icon = iconMap[service.icon] || CheckCircle;
  return (
    <div className="card group flex flex-col h-full !p-5">
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <span className="font-mono text-[0.6875rem] uppercase tracking-widest text-primary-700">
          {service.category}
        </span>
        <span className="font-mono text-[0.6875rem] text-ink-300 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <Icon size={20} strokeWidth={1.6} className="text-primary-600 mb-3" />
      <h3 className="text-lg font-heading font-semibold text-ink-900 mb-2">{service.title}</h3>
      <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty flex-1">{service.shortDesc}</p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-5 pt-5">
        {/* The role travels with the request so the form arrives pre-filled. */}
        <Link
          to={`/contact?role=${encodeURIComponent(service.title)}`}
          className="btn-primary !px-4 !py-2.5 !text-sm"
        >
          {service.requestLabel}
        </Link>
        <button type="button" onClick={() => onClick(service)} className="link-arrow">
          Learn more <ChevronRight size={14} />
        </button>
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
            className="absolute inset-0 bg-primary-900/80 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={service.title}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white rounded-2xl max-w-xl w-full p-7 sm:p-9 max-h-[88vh] overflow-y-auto shadow-panel"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 rounded-lg border border-ink-200 flex items-center justify-center
                         text-ink-500 hover:bg-ink-50 hover:text-ink-800 transition-colors"
            >
              <X size={16} />
            </button>

            <span className="font-mono text-[0.6875rem] uppercase tracking-widest text-primary-600">
              {service.category}
            </span>
            <Icon size={24} strokeWidth={1.6} className="text-primary-600 mt-5" />
            <h2 className="text-2xl font-heading font-semibold text-ink-900 mt-4 mb-4">{service.title}</h2>
            <p className="text-ink-600 leading-relaxed mb-8 text-pretty">{service.fullDesc}</p>

            <h3 className="font-mono text-[0.6875rem] uppercase tracking-widest text-ink-500 mb-4">
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
    subtitle="PowerCare provides vetted, in-house trained professionals across nursing, personal care, therapy, and facility support — ready for any care setting."
    image="/images/nurse-portrait.jpg"
    imageAlt="A registered nurse placed by PowerCare"
  />
);

const ServicesIntro = () => (
  <section className="bg-white py-14">
    <div className="container-custom">
      <div className="grid sm:grid-cols-3 gap-x-10 gap-y-10">
        {[
          { icon: Shield, title: 'Pre-Vetted & Trained', desc: 'Every professional completes our 80-hour in-house training before placement.' },
          { icon: Clock,  title: 'Available 24/7',       desc: 'Our staffing pool is available for same-day, overnight, and emergency coverage.' },
          { icon: Award,  title: 'Quality Guaranteed',   desc: "Unsatisfied with a placement? We replace them — that is our commitment." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title}>
            <Icon size={20} strokeWidth={1.6} className="text-primary-600 mb-4" />
            <h3 className="font-heading font-semibold text-ink-900 mb-2">{title}</h3>
            <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">{desc}</p>
          </div>
        ))}
      </div>
      <CredentialBadges variant="inline" useFull className="mt-10 justify-center" />
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
        <div className="flex flex-wrap gap-2 mb-8">
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`px-4 py-2 rounded-lg font-mono text-[0.6875rem] uppercase tracking-widest transition-colors duration-200 ${
                active === cat
                  ? 'bg-primary-700 text-ink-900'
                  : 'bg-white text-ink-600 border border-ink-200 hover:border-primary-400 hover:text-primary-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr gap-5">
          {filtered.map((service, i) => (
            <RevealItem key={service.id} className="h-full">
              <ServiceCard service={service} index={i} onClick={setSelectedService} />
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
          <span className="section-badge">Nursing Services</span>
          <h2 className="text-display-sm font-heading font-semibold text-ink-900 mb-6 text-balance">
            Clinical Excellence at Every Level
          </h2>
          <p className="text-ink-600 leading-relaxed mb-8 text-pretty">
            PowerCare provides credentialed nursing professionals — from Registered Nurses and RPNs to Nurse Practitioners — who bring clinical excellence and compassionate patient care to every setting. All nursing staff are college-verified, background-cleared, and trained to our proprietary care standards.
          </p>
          <ul className="mb-9 space-y-2">
            {[
              'Medication administration & IV therapy',
              'Wound care & post-surgical support',
              'Chronic disease & palliative care',
              'Acute and long-term care settings',
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
          <img
            src="/images/theatre-team.jpg"
            alt="A surgical nursing team at work"
            loading="lazy"
            className="w-full h-[260px] object-cover rounded-2xl mb-8"
          />
          <h3 className="font-mono text-[0.6875rem] uppercase tracking-widest text-primary-600 mb-5">
            Nursing Roles We Place
          </h3>
          <div className="space-y-5">
            {[
              { role: 'Registered Nurse (RN)',            desc: 'Full scope nursing practice across all care settings' },
              { role: 'Registered Practical Nurse (RPN)', desc: 'Primary care, medication management, care planning'   },
              { role: 'Nurse Practitioner (NP)',          desc: 'Advanced assessment, diagnosis, and prescribing'      },
            ].map(({ role, desc }) => (
              <div key={role} className="flex items-start gap-4 py-4">
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

const PersonalCareSection = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <img
            src="/images/elderly-hands.jpg"
            alt="A support worker holding a client's hand"
            loading="lazy"
            className="w-full h-[380px] object-cover rounded-2xl"
          />
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <span className="section-badge">Personal &amp; Community Care</span>
          <h2 className="text-display-sm font-heading font-semibold text-ink-900 mb-6 text-balance">
            Compassionate Hands-On Care
          </h2>
          <p className="text-ink-600 leading-relaxed mb-5 text-pretty">
            Our personal care workers — PSWs, DSWs, Home Care Aides, and Companions — are the backbone of quality daily living support. PowerCare's personal care professionals are trained to deliver not just physical assistance, but dignity, warmth, and genuine human connection.
          </p>
          <p className="text-ink-600 leading-relaxed mb-9 text-pretty">
            Every personal care worker completes our person-centred care training module, equipping them to provide culturally sensitive, emotionally intelligent, and physically safe support.
          </p>
          <Link to="/contact" className="btn-primary">
            Request Care Workers <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const ServicesCTA = () => (
  <section className="relative section-padding bg-primary-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />
    <div className="container-custom relative z-10 text-center text-ink-900">
      <h2 className="text-display-sm font-heading font-semibold mb-5 text-balance">
        Can't Find What You're Looking For?
      </h2>
      <p className="text-ink-600 text-lg max-w-xl mx-auto mb-10 text-pretty">
        PowerCare places a wide range of healthcare professionals. Contact us to discuss your specific staffing needs.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/contact" className="btn-primary">
          Discuss Your Needs <ArrowRight size={16} />
        </Link>
        <Link to="/industries" className="btn-secondary">
          Industries We Serve <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

const OurServices = () => (
  <main>
    <SEO page="services" />
    <Hero />
    <ServicesIntro />
    <ServicesGrid />
    <NursingSection />
    <PersonalCareSection />
    <FAQ faqs={servicesFAQs} badge="Our Services" title="Questions About Healthcare Staffing Services" subtitle="Learn more about the roles we place and how to request staff." />
    <ServicesCTA />
  </main>
);

export default OurServices;
