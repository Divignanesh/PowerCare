import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Shield, Star, Clock, Users,
  Award, HeartHandshake, TrendingUp, Building2, MapPin,
  Phone, ChevronRight, Stethoscope, UserCheck, Zap
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import FAQ from '../components/ui/FAQ';
import { services } from '../data/services';
import { homeFAQs } from '../data/faqs';
import SEO, { faqSchema } from '../components/seo/SEO';


// ─────────────────────────── HERO ────────────────────────────
const Hero = () => (
  <section className="relative h-[calc(100vh-60px)] flex items-center bg-primary-900">
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 text-sm font-medium px-5 py-2.5 rounded-full mb-6">
            <MapPin size={14} className="text-accent-500" />
            Serving GTA &amp; Rural Ontario
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white leading-tight mb-5">
            Trusted Healthcare{' '}
            <span className="text-accent-500">Staffing</span>{' '}
            Solutions
          </h1>
          <p className="text-sm text-white/60 leading-relaxed mb-7 max-w-lg">
            PowerCare connects long-term care homes, hospitals, and community agencies across the GTA and Rural Ontario with vetted, in-house trained healthcare professionals — available when you need them most.
          </p>

          <ul className="space-y-2.5 mb-8">
            {[
              'In-house trained & credentialed staff',
              '24/7 emergency staffing support',
              'GTA and Rural Ontario coverage',
              'Background checked & insured',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-white/60 text-sm">
                <CheckCircle size={14} className="text-accent-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-accent text-sm px-5 py-2.5">
              Partner With Us <ArrowRight size={15} />
            </Link>
            <Link to="/careers" className="btn-white text-sm px-5 py-2.5">
              Find a Job <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Stats cards */}
        <div className="hidden lg:grid grid-cols-2 gap-4">
          {[
            { value: '5,000+', label: 'Shifts Filled',       icon: CheckCircle },
            { value: '500+',   label: 'Facility Partners',   icon: Building2   },
            { value: '98%',    label: 'Fill Rate',           icon: TrendingUp  },
            { value: '24/7',   label: 'Available Support',   icon: Clock       },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-5 text-white">
              <Icon size={18} className="text-accent-500 mb-3" />
              <div className="text-2xl font-bold font-heading">{value}</div>
              <div className="text-white/50 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────── STATS BAR ────────────────────────────
const StatsBar = () => (
  <section className="bg-primary-800 py-5 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: '5,000+', label: 'Shifts Successfully Filled' },
          { value: '500+',   label: 'Facility Partners'          },
          { value: '98%',    label: 'Client Satisfaction Rate'   },
          { value: '2h',     label: 'Average Response Time'      },
        ].map(({ value, label }) => (
          <div key={label} className="text-center text-white">
            <div className="text-xl font-bold font-heading text-accent-500">{value}</div>
            <div className="text-white/40 text-xs mt-0.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────── WHY FACILITIES TRUST US ──────────────────────────
const WhyFacilitiesTrustUs = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="Why Facilities Trust Us"
        title="The PowerCare Promise"
        subtitle="We don't just fill shifts — we build partnerships founded on reliability, quality, and care."
      />

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: Shield,
            title: 'Built on Dependability',
            desc: 'When you call PowerCare, you can count on us. Our rigorous vetting process, in-house training programs, and 24/7 dispatch team ensure your facility is never left understaffed.',
            points: ['Same-day and emergency coverage', 'Pre-vetted, credential-verified staff', '24/7 dispatch availability'],
          },
          {
            icon: HeartHandshake,
            title: 'Driven by Service',
            desc: 'At PowerCare, service is not just a department — it is our culture. Every interaction reflects our commitment to going beyond expectations.',
            points: ['Dedicated account management', 'Proactive communication', 'Quality follow-up after every placement'],
          },
          {
            icon: Award,
            title: 'Fit for Purpose',
            desc: "Cookie-cutter staffing doesn't work in healthcare. PowerCare takes the time to understand your environment and match staff who fit — clinically, culturally, and professionally.",
            points: ['Culture-matched placements', 'Role-specific competency screening', 'Ongoing fit assessment & feedback'],
          },
        ].map(({ icon: Icon, title, desc, points }) => (
          <div key={title} className="card flex flex-col">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
              <Icon size={18} className="text-primary-600" />
            </div>
            <h3 className="text-base font-bold font-heading text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">{desc}</p>
            <ul className="space-y-2 mt-auto">
              {points.map((pt) => (
                <li key={pt} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle size={14} className="text-accent-500 mt-0.5 flex-shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────── SERVICES PREVIEW ────────────────────────────
const ServicesPreview = () => {
  const featured = services.slice(0, 6);
  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <SectionHeader
            badge="Our Services"
            title="Healthcare Professionals We Place"
            subtitle="From bedside nursing to facility support, PowerCare delivers qualified professionals across every care setting."
            centered={false}
          />
          <Link to="/services" className="btn-primary text-sm whitespace-nowrap self-start md:self-auto">
            All Services <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((s) => (
            <div key={s.id} className="card group cursor-pointer">
              <span className="inline-block text-accent-500 text-xs font-bold tracking-widest uppercase mb-2">
                {s.category}
              </span>
              <h3 className="text-sm font-bold font-heading text-slate-900 mb-1.5 group-hover:text-primary-700 transition-colors">
                {s.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">{s.shortDesc}</p>
              <Link to="/services" className="inline-flex items-center gap-1 text-accent-500 text-xs font-semibold mt-3 group-hover:gap-2 transition-all">
                Learn more <ChevronRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────── COVERAGE BAND ────────────────────────────
const CoverageBand = () => (
  <section className="bg-primary-900 h-[calc(100vh-80px)] flex items-center">
    <div className="container-custom w-full">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="text-white">
          <span className="text-accent-500 text-xs font-bold tracking-widest uppercase mb-3 block">Coverage Area</span>
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-4">
            Serving the GTA &amp; Rural Ontario
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            PowerCare's network spans metropolitan Toronto, the surrounding GTA cities, and extends into rural and underserved Ontario communities — ensuring every facility gets access to quality staffing.
          </p>
          <ul className="grid grid-cols-2 gap-2">
            {['Toronto', 'Mississauga', 'Brampton', 'Oakville', 'Barrie', 'Guelph', 'Hamilton', 'Rural Ontario'].map((city) => (
              <li key={city} className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin size={12} className="text-accent-500 flex-shrink-0" />
                {city}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4 h-[50vh]">
          {[
            { icon: Stethoscope, title: 'Clinical Staff',    desc: 'RNs, RPNs & allied health'   },
            { icon: UserCheck,   title: 'Care Workers',      desc: 'PSWs, DSWs & companions'      },
            { icon: Zap,         title: 'Fast Deployment',   desc: 'Same-day coverage available'  },
            { icon: Shield,      title: 'Fully Insured',     desc: 'WSIB & liability covered'     },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-4 text-white flex flex-col justify-center items-center h-full">
              <Icon size={16} className="text-accent-500 mb-2" />
              <div className="font-semibold text-sm text-center">{title}</div>
              <div className="text-white/50 text-xs mt-0.5 text-center">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────── INDUSTRIES PREVIEW ────────────────────────────
const IndustriesPreview = () => {
  const industries = [
    { title: 'Long-Term Care',          icon: Building2,    count: '1,000+ facilities'  },
    { title: 'Hospitals & Acute Care',  icon: Stethoscope,  count: '200+ partnerships'  },
    { title: 'Home & Community Care',   icon: HeartHandshake, count: '3,000+ clients'   },
    { title: 'Group Homes',             icon: Users,        count: '150+ partnerships'  },
    { title: 'Retirement Residences',   icon: Star,         count: '500+ homes served'  },
    { title: 'Mental Health & Addictions', icon: Shield,    count: '80+ facilities'     },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <SectionHeader
            badge="Industries We Serve"
            title="Built for Every Care Setting"
            subtitle="We understand the staffing challenges unique to each healthcare sector."
            centered={false}
          />
          <Link to="/industries" className="btn-secondary text-sm whitespace-nowrap self-start md:self-auto">
            Explore Industries <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {industries.map(({ title, icon: Icon, count }) => (
            <Link
              key={title}
              to="/industries"
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-accent-400 hover:bg-accent-50 transition-all group"
            >
              <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent-100 transition-colors">
                <Icon size={16} className="text-primary-600 group-hover:text-accent-500" />
              </div>
              <div>
                <div className="font-semibold text-sm text-slate-900">{title}</div>
                <div className="text-slate-400 text-xs">{count}</div>
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-accent-500 ml-auto transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────── TESTIMONIALS ────────────────────────────
const Testimonials = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom">
      <SectionHeader
        badge="Client Testimonials"
        title="Trusted by Facilities Across Ontario"
        subtitle="Hear from the healthcare administrators and coordinators who partner with PowerCare."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            quote: "PowerCare has become our most reliable staffing partner. When we call at 10 PM for a morning shift, they always come through. Their staff are well-trained, professional, and genuinely care about our residents.",
            name: 'Sandra M.', role: 'Director of Care', facility: 'Long-Term Care Home, Mississauga',
          },
          {
            quote: "What sets PowerCare apart is that their workers actually know what they're doing on day one. You can tell the difference between in-house trained staff and those who aren't.",
            name: 'David R.', role: 'HR Manager', facility: 'Retirement Residence, Barrie',
          },
          {
            quote: "We've tried multiple agencies, but PowerCare is the only one that takes the time to understand our specific needs. They don't just send warm bodies — they send the right fit every time.",
            name: 'Fatima O.', role: 'Nursing Coordinator', facility: 'Community Care Agency, Brampton',
          },
        ].map(({ quote, name, role, facility }) => (
          <div key={name} className="card flex flex-col">
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-accent-500 fill-accent-500" />
              ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed italic mb-5 flex-1">"{quote}"</p>
            <div className="border-t border-slate-100 pt-4">
              <div className="font-semibold text-slate-900 text-sm">{name}</div>
              <div className="text-slate-400 text-xs mt-0.5">{role}</div>
              <div className="text-accent-500 text-xs mt-0.5">{facility}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────── CTA SECTION ────────────────────────────
const HomeCTA = () => (
  <section className="section-padding bg-primary-900">
    <div className="container-custom text-center">
      <span className="text-accent-500 text-xs font-bold tracking-widest uppercase mb-4 block">
        Get Started Today
      </span>
      <h2 className="text-2xl lg:text-3xl font-bold font-heading text-white mb-3">
        Let's Build Stronger Care Teams{' '}
        <span className="text-accent-500">Together</span>
      </h2>
      <p className="text-white/50 text-sm max-w-xl mx-auto mb-8">
        Whether you're a facility in need of reliable staffing or a healthcare professional seeking your next opportunity, PowerCare is your trusted partner.
      </p>
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <Link to="/contact" className="btn-accent text-sm px-6 py-2.5">
          I Need Staff <ArrowRight size={15} />
        </Link>
        <Link to="/careers" className="btn-white text-sm px-6 py-2.5">
          I'm Looking for Work <ArrowRight size={15} />
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-xs text-white/30">
        {[
          { icon: Phone,  text: '+1 (647) 400-0000'    },
          { icon: Clock,  text: '24/7 Emergency Staffing' },
          { icon: MapPin, text: 'GTA & Rural Ontario'  },
        ].map(({ icon: Icon, text }) => (
          <span key={text} className="flex items-center gap-1.5">
            <Icon size={13} className="text-accent-500" />
            {text}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const Home = () => (
  <main>
    <SEO page="home" extraSchemas={[faqSchema(homeFAQs)]} />
    <Hero />
    <WhyFacilitiesTrustUs />
    <ServicesPreview />
    <CoverageBand />
    <IndustriesPreview />
    <Testimonials />
    <FAQ faqs={homeFAQs} title="Frequently Asked Questions" subtitle="Everything you need to know about PowerCare's staffing solutions." />
    <HomeCTA />
  </main>
);

export default Home;
