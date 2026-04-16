import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Stethoscope, HeartPulse, Users, Home,
  Activity, Sparkles, ClipboardList, Brain, SmilePlus, UtensilsCrossed,
  ChevronRight, Shield, Clock, Award, X
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { services, serviceCategories } from '../data/services';
import SEO from '../components/seo/SEO';

const iconMap = {
  Stethoscope, HeartPulse, Users, Home, Activity, Sparkles,
  ClipboardList, Brain, SmilePlus, UtensilsCrossed,
  HandHeart: HeartPulse,
};

const ServiceCard = ({ service, onClick }) => {
  const Icon = iconMap[service.icon] || CheckCircle;
  return (
    <div className="card cursor-pointer group" onClick={() => onClick(service)}>
      <span className="text-accent-500 text-xs font-bold tracking-widest uppercase mb-2 block">
        {service.category}
      </span>
      <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-accent-100 transition-colors">
        <Icon size={15} className="text-primary-700 group-hover:text-accent-500" />
      </div>
      <h3 className="text-sm font-bold font-heading text-slate-900 mb-2 group-hover:text-primary-700 transition-colors">
        {service.title}
      </h3>
      <p className="text-slate-500 text-xs leading-relaxed mb-3">{service.shortDesc}</p>
      <button className="inline-flex items-center gap-1 text-accent-500 text-xs font-semibold group-hover:gap-2 transition-all">
        View Details <ChevronRight size={12} />
      </button>
    </div>
  );
};

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;
  const Icon = iconMap[service.icon] || CheckCircle;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-primary-900/70 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <X size={14} />
        </button>
        <span className="text-accent-500 text-xs font-bold tracking-widest uppercase mb-4 block">
          {service.category}
        </span>
        <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
          <Icon size={16} className="text-primary-700" />
        </div>
        <h2 className="text-lg font-bold font-heading text-slate-900 mb-3">{service.title}</h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-5">{service.fullDesc}</p>
        <div>
          <h4 className="font-semibold text-slate-900 text-sm mb-3">Key Responsibilities & Highlights</h4>
          <ul className="space-y-2">
            {service.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle size={13} className="text-accent-500 mt-0.5 flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-3 mt-7">
          <Link to="/contact" className="btn-primary flex-1 justify-center text-sm" onClick={onClose}>
            Request This Role
          </Link>
          <Link to="/careers" className="btn-secondary flex-1 justify-center text-sm" onClick={onClose}>
            Apply for This Role
          </Link>
        </div>
      </div>
    </div>
  );
};

const PageHero = () => (
  <section className="relative pt-20 pb-20 bg-primary-900 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <span className="text-accent-500 text-xl font-bold tracking-widest uppercase mb-2 block">
        Our Services
      </span>
      <h1 className="text-3xl font-bold font-heading text-white mb-4">
        Healthcare Professionals We Place
      </h1>
      <p className="text-sm text-white/50 max-w-2xl mx-auto">
        PowerCare provides vetted, in-house trained professionals across nursing, personal care, therapy, and facility support — ready for any care setting.
      </p>
    </div>
  </section>
);

const ServicesIntro = () => (
  <section className="bg-white py-10 border-b border-slate-100">
    <div className="container-custom">
      <div className="grid sm:grid-cols-3 gap-8 text-center">
        {[
          { icon: Shield, title: 'Pre-Vetted & Trained',    desc: 'Every professional completes our 80-hour in-house training before placement.' },
          { icon: Clock,  title: 'Available 24/7',          desc: 'Our staffing pool is available for same-day, overnight, and emergency coverage.' },
          { icon: Award,  title: 'Quality Guaranteed',      desc: "Unsatisfied with a placement? We replace them — that is our commitment." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex flex-col items-center">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
              <Icon size={17} className="text-primary-700" />
            </div>
            <h3 className="font-bold font-heading text-slate-900 text-sm mb-1">{title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
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
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                active === cat
                  ? 'bg-primary-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} onClick={setSelectedService} />
          ))}
        </div>
      </div>

      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </section>
  );
};

const NursingSection = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="section-badge">
            <Stethoscope size={13} />
            Nursing Services
          </span>
          <h2 className="section-title mb-4">Clinical Excellence at Every Level</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-5">
            PowerCare provides credentialed nursing professionals — from Registered Nurses and RPNs to Nurse Practitioners — who bring clinical excellence and compassionate patient care to every setting. All nursing staff are college-verified, background-cleared, and trained to our proprietary care standards.
          </p>
          <div className="space-y-2.5 mb-6">
            {[
              'Medication administration & IV therapy',
              'Wound care & post-surgical support',
              'Chronic disease & palliative care',
              'Acute and long-term care settings',
              'Infection prevention & control (IPAC)',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-slate-600 text-sm">
                <CheckCircle size={14} className="text-accent-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <Link to="/contact" className="btn-primary">
            Request Nursing Staff <ArrowRight size={16} />
          </Link>
        </div>
        <div className="bg-surface rounded-xl border border-slate-200 p-5">
          <h4 className="font-bold font-heading text-slate-900 mb-4 text-sm">Nursing Roles We Place</h4>
          <div className="space-y-3">
            {[
              { role: 'Registered Nurse (RN)',          desc: 'Full scope nursing practice across all care settings'    },
              { role: 'Registered Practical Nurse (RPN)', desc: 'Primary care, medication management, care planning'    },
              { role: 'Nurse Practitioner (NP)',         desc: 'Advanced assessment, diagnosis, and prescribing'        },
            ].map(({ role, desc }) => (
              <div key={role} className="bg-white rounded-xl p-4 flex items-start gap-3 border border-slate-100">
                <HeartPulse size={16} className="text-accent-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{role}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{desc}</div>
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
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Personal Support Workers', stat: '1,500+', sub: 'Active PSWs in network'  },
              { title: 'Developmental Support',    stat: '300+',   sub: 'DSWs placed annually'    },
              { title: 'Home Care Aides',          stat: '800+',   sub: 'Home care clients served' },
              { title: 'Companions',               stat: '400+',   sub: 'Companion placements'    },
            ].map(({ title, stat, sub }) => (
              <div key={title} className="bg-white rounded-xl border border-slate-200 p-5 text-center">
                <div className="text-xl font-bold font-heading text-accent-500">{stat}</div>
                <div className="font-semibold text-slate-800 text-xs mt-1">{title}</div>
                <div className="text-slate-400 text-xs mt-0.5">{sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <span className="section-badge">
            <Users size={13} />
            Personal & Community Care
          </span>
          <h2 className="section-title mb-4">Compassionate Hands-On Care</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            Our personal care workers — PSWs, DSWs, Home Care Aides, and Companions — are the backbone of quality daily living support. PowerCare's personal care professionals are trained to deliver not just physical assistance, but dignity, warmth, and genuine human connection.
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
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
  <section className="section-padding bg-primary-900">
    <div className="container-custom text-center text-white">
      <h2 className="text-xl lg:text-2xl font-bold font-heading mb-3">
        Can't Find What You're Looking For?
      </h2>
      <p className="text-white/50 text-sm max-w-xl mx-auto mb-6">
        PowerCare places a wide range of healthcare professionals. Contact us to discuss your specific staffing needs.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/contact" className="btn-accent text-sm px-5 py-2.5">
          Discuss Your Needs <ArrowRight size={16} />
        </Link>
        <Link to="/industries" className="btn-white text-sm px-5 py-2.5">
          Industries We Serve <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

const OurServices = () => (
  <main>
    <SEO page="services" />
    <PageHero />
    <ServicesIntro />
    <ServicesGrid />
    <NursingSection />
    <PersonalCareSection />
    <ServicesCTA />
  </main>
);

export default OurServices;
