import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, Check, Shield, Star, Clock, Users,
  Award, HeartHandshake, Building2, MapPin, Wallet, GraduationCap,
  Phone, ChevronRight, Stethoscope, UserCheck, Zap
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import FAQ from '../components/ui/FAQ';
import { services } from '../data/services';
import { homeFAQs } from '../data/faqs';
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal';
import CredentialBadges from '../components/ui/CredentialBadges';
import VettingSteps from '../components/ui/VettingSteps';
import SEO, { faqSchema } from '../components/seo/SEO';


// ─────────────────────────── HERO ────────────────────────────
// The page opens on the thing a Director of Care actually wants to know:
// the coverage record, set as a ruled ledger rather than four stat tiles.
const Hero = () => {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.07, delayChildren: 0.05 } },
  };
  const item = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  const assurances = [
    'In-house trained & credentialed staff',
    '24/7 emergency staffing support',
    'GTA and Rural Ontario coverage',
    'Background checked & insured',
  ];

  return (
    // Sized to the viewport less the fixed header, so the whole proposition
    // lands on one screen.
    <section className="relative bg-primary-50 overflow-hidden lg:min-h-[calc(100vh-5rem)] flex items-center">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-10"
      >
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">

          <div className="lg:col-span-6">
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-widest text-primary-600"
            >
              <MapPin size={13} />
              Serving GTA &amp; Rural Ontario
            </motion.span>

            <motion.h1
              variants={item}
              className="text-display-lg font-heading font-semibold text-ink-900 mt-5 text-balance wdth-wide"
            >
              Trusted Healthcare{' '}
              <span className="text-primary-500">Staffing</span>{' '}
              Solutions
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-ink-600 leading-relaxed mt-5 max-w-xl text-pretty"
            >
              PowerCare connects long-term care homes, hospitals, and community agencies across the GTA and Rural Ontario with vetted, in-house trained healthcare professionals — available when you need them most.
            </motion.p>

            <motion.ul variants={item} className="grid sm:grid-cols-2 gap-x-8 mt-7">
              {assurances.map((assurance) => (
                <li
                  key={assurance}
                  className="flex items-start gap-3 py-2.5 text-ink-700 text-[0.9375rem]"
                >
                  <Check size={16} strokeWidth={2.5} className="text-primary-500 flex-shrink-0 mt-0.5" />
                  {assurance}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 mt-7">
              <Link to="/contact" className="btn-primary">
                Get Staff <ArrowRight size={16} />
              </Link>
              <Link to="/careers" className="btn-secondary">
                Find Work <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* One photograph of the team together — this is a staffing
              agency, so the group is the product. */}
          <motion.div variants={item} className="lg:col-span-6 lg:pl-6">
            <img
              src="/images/hero-team.jpg"
              alt="The PowerCare clinical team — nurses, personal support workers and physicians"
              fetchPriority="high"
              className="w-full h-[300px] sm:h-[380px] lg:h-[430px] object-cover object-top rounded-2xl"
            />
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

// ─────────────────────────── PROOF BAND ────────────────────────────
const ProofBand = () => (
  <section className="bg-white border-y border-ink-100 py-10 lg:py-12">
    <div className="container-custom">
      <Reveal>
        <CredentialBadges variant="band" useFull />
      </Reveal>
    </div>
  </section>
);

// ─────────────────────────── STATS BAR ────────────────────────────
const StatsBar = () => (
  <section className="bg-primary-50 py-6">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { value: '5,000+', label: 'Shifts Successfully Filled' },
          { value: '500+',   label: 'Facility Partners'          },
          { value: '98%',    label: 'Client Satisfaction Rate'   },
          { value: '2h',     label: 'Average Response Time'      },
        ].map(({ value, label }) => (
          <div key={label} className="text-center text-ink-900">
            <div className="font-mono text-2xl font-medium text-primary-600">{value}</div>
            <div className="text-ink-500 text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────── WHY FACILITIES TRUST US ──────────────────────────
const PROMISE = [
  {
    icon: Shield,
    title: 'Built on Dependability',
    proof: 'On-site in as little as 2 hours',
    points: [
      'Same-day & emergency coverage',
      '24/7 live dispatch — a real coordinator, any hour',
      'Backup staff on standby so a call-in never leaves you short',
    ],
  },
  {
    icon: HeartHandshake,
    title: 'Driven by Service',
    proof: 'One dedicated account manager',
    points: [
      'A named account manager — not a call centre',
      'Proactive shift confirmations & reminders',
      'Follow-up after every placement',
    ],
  },
  {
    icon: Award,
    title: 'Fit for Purpose',
    proof: 'Matched to your unit — clinically & culturally',
    points: [
      'Role-specific competency screening (RN · RPN · PSW · DSW)',
      'Matched to your environment & culture',
      'Feedback loop after every shift',
    ],
  },
];

const WhyFacilitiesTrustUs = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="Reliable healthcare staffing · GTA & Rural Ontario"
        title="The PowerCare Promise"
        subtitle="Vetted RNs, RPNs, PSWs & DSWs — credential-verified and ready when you need them. We don't just fill shifts; we keep your facility covered."
        centered={false}
      />

      <RevealGroup className="grid md:grid-cols-3 auto-rows-fr gap-x-10 gap-y-9">
        {PROMISE.map(({ icon: Icon, title, proof, points }) => (
          <RevealItem key={title} className="flex flex-col h-full">
            <Icon size={22} strokeWidth={1.6} className="text-primary-600" />
            <h3 className="text-xl font-heading font-semibold text-ink-900 mt-5 mb-3">{title}</h3>
            <span className="self-start rounded-lg bg-primary-50 px-3 py-1.5 text-sm font-semibold text-primary-700">
              {proof}
            </span>
            <ul className="mt-6 space-y-2.5">
              {points.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-[0.9375rem] text-ink-700">
                  <Check size={15} strokeWidth={2.5} className="text-primary-500 mt-1 flex-shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="flex flex-col sm:flex-row gap-3 mt-12">
        <Link to="/contact" className="btn-primary">Request Staff <ArrowRight size={16} /></Link>
        <Link to="/why-powercare" className="btn-secondary">See How We Screen</Link>
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
        <SectionHeader
          badge="Our Services"
          title="Healthcare Professionals We Place"
          subtitle="From bedside nursing to facility support, PowerCare delivers qualified professionals across every care setting."
          centered={false}
        />

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-5 mb-12">
          {featured.map((s, i) => (
            <RevealItem key={s.id} className="h-full">
              <Link to="/services" className="card group flex flex-col h-full">
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <span className="font-mono text-[0.6875rem] uppercase tracking-widest text-primary-600">
                  {s.category}
                </span>
                <span className="font-mono text-[0.6875rem] text-ink-300 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-ink-900 mb-2 transition-colors group-hover:text-primary-700">
                {s.title}
              </h3>
              <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">{s.shortDesc}</p>
              <span className="link-arrow mt-auto pt-6">
                Learn more <ChevronRight size={14} />
              </span>
            </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Link to="/services" className="btn-primary">
          All Services <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

// ─────────────────────────── JOB SEEKER VALUE ────────────────────────────
const SEEKER = [
  {
    icon: Clock,
    title: 'Work that fits your life',
    proof: 'You pick the shifts',
    points: [
      'Flexible shifts across the GTA & Rural Ontario',
      'Full-time, part-time or casual',
      'Variety: long-term care, hospitals, home & community',
    ],
  },
  {
    icon: Wallet,
    title: 'Get paid well, get paid fast',
    proof: 'Weekly pay',
    points: [
      'Competitive rates for your credential',
      'Reliable weekly pay',
      'Quick, simple onboarding',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Grow with support',
    proof: 'Free in-house training',
    points: [
      'Free in-house training & upskilling',
      'A coordinator who has your back',
      'Real paths to more responsibility',
    ],
  },
];

const JobSeekerValue = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom">
      <SectionHeader
        badge="Nursing & PSW jobs · GTA & Rural Ontario"
        title="Why Professionals Choose PowerCare"
        subtitle="RNs, RPNs, PSWs and DSWs — build a schedule around your life, and get the support to grow."
        centered={false}
      />
      <RevealGroup className="grid md:grid-cols-3 auto-rows-fr gap-x-10 gap-y-9">
        {SEEKER.map(({ icon: Icon, title, proof, points }) => (
          <RevealItem key={title} className="flex flex-col h-full">
            <Icon size={22} strokeWidth={1.6} className="text-primary-600" />
            <h3 className="text-xl font-heading font-semibold text-ink-900 mt-5 mb-3">{title}</h3>
            <span className="self-start rounded-lg bg-white border border-ink-200 px-3 py-1.5 text-sm font-semibold text-primary-700">
              {proof}
            </span>
            <ul className="mt-6 space-y-2.5">
              {points.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-[0.9375rem] text-ink-700">
                  <Check size={15} strokeWidth={2.5} className="text-primary-500 mt-1 flex-shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
      <div className="flex flex-col sm:flex-row gap-3 mt-12">
        <Link to="/careers" className="btn-primary">Find a Job <ArrowRight size={16} /></Link>
        <Link to="/careers" className="btn-secondary">Join Our Talent Pool</Link>
      </div>
    </div>
  </section>
);

// ─────────────────────────── VETTING PROCESS ────────────────────────────
const VettingProcess = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="Our Screening Process"
        title="10-Step Candidate Vetting"
        subtitle="Every professional clears all ten steps before they ever set foot in your facility."
      />
      <VettingSteps className="max-w-3xl mx-auto" />
      <div className="mt-12">
        <Link to="/why-powercare" className="btn-secondary">
          How We Train Our Staff <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

// ─────────────────────────── COVERAGE BAND ────────────────────────────
const COVERAGE = {
  gta: ['Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham', 'Oakville', 'Hamilton', 'Burlington'],
  regions: [
    ['West',  'Guelph · Waterloo Region · London · Sarnia'],
    ['North', 'Barrie · Simcoe County · Muskoka'],
    ['East',  'Kawartha Lakes · Peterborough'],
  ],
};

const CoverageBand = () => (
  <section className="section-padding bg-primary-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />
    <div className="container-custom relative z-10">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
        <div className="lg:col-span-5 text-ink-900">
          <span className="inline-flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-widest text-primary-700">
            <span className="block w-6 h-px bg-primary-400" aria-hidden="true" />
            Coverage Area
          </span>
          <h2 className="text-display-sm font-heading font-semibold mt-5 mb-5 text-balance">
            Serving the GTA &amp; Rural Ontario
          </h2>
          <p className="text-ink-600 leading-relaxed mb-8 max-w-lg text-pretty">
            From metropolitan Toronto out to rural and underserved communities — quality staffing wherever your facility is.
          </p>

          <h3 className="font-mono text-[0.6875rem] uppercase tracking-widest text-ink-500 mb-3">GTA cities</h3>
          <ul className="flex flex-wrap gap-2 mb-8">
            {COVERAGE.gta.map((city) => (
              <li key={city} className="inline-flex items-center gap-2 rounded-lg bg-white border border-ink-200 px-3 py-1.5 text-sm text-ink-700">
                <MapPin size={12} className="text-primary-600 flex-shrink-0" />
                {city}
              </li>
            ))}
          </ul>

          <h3 className="font-mono text-[0.6875rem] uppercase tracking-widest text-ink-500 mb-3">Regional coverage</h3>
          <dl className="space-y-1.5 mb-9">
            {COVERAGE.regions.map(([dir, places]) => (
              <div key={dir} className="flex gap-3 text-[0.9375rem]">
                <dt className="font-semibold text-ink-900 w-14 flex-shrink-0">{dir}</dt>
                <dd className="text-ink-600">{places}</dd>
              </div>
            ))}
          </dl>

          <Link to="/contact" className="btn-primary">Check Your Area <ArrowRight size={16} /></Link>
        </div>

        <div className="lg:col-span-7">
          <figure>
            <img
              src="/images/coverage-map.jpg"
              alt="Map of PowerCare's coverage across the Greater Toronto Area and Southern Ontario"
              loading="lazy"
              className="w-full rounded-2xl border border-ink-200"
            />
            <figcaption className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-widest text-ink-500">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-600" aria-hidden="true" /> GTA core
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-900" aria-hidden="true" /> Regional reach
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────── INDUSTRIES PREVIEW ────────────────────────────
const SECTORS = [
  { title: 'Long-Term Care',             icon: Building2,      desc: 'Consistent RN, RPN & PSW coverage for full units — planned lines and same-day call-ins.' },
  { title: 'Hospitals & Acute Care',     icon: Stethoscope,    desc: 'Credentialed clinical staff ready for high-acuity, fast-moving environments.' },
  { title: 'Home & Community Care',      icon: HeartHandshake, desc: 'PSWs, aides & nurses for in-home and community programs, scheduled around clients.' },
  { title: 'Group Homes',                icon: Users,          desc: 'DSWs & support staff trained for developmental and behavioural settings.' },
  { title: 'Retirement Residences',      icon: Star,           desc: 'Warm, reliable care staff that residents and families trust day to day.' },
  { title: 'Mental Health & Addictions', icon: Shield,         desc: 'Compassionate, appropriately trained staff for sensitive care environments.' },
];

const IndustriesPreview = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="Industries We Serve"
        title="Built for Every Care Setting"
        subtitle="The staffing challenges differ by setting — we staff for the realities of each."
        centered={false}
      />
      <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-5 mb-12">
        {SECTORS.map(({ title, icon: Icon, desc }) => (
          <RevealItem key={title} className="h-full">
            <Link to="/industries" className="card group flex gap-4 h-full">
              <Icon size={20} strokeWidth={1.6} className="text-primary-600 flex-shrink-0 mt-0.5" />
              <span>
                <span className="block font-heading font-semibold text-ink-900 transition-colors group-hover:text-primary-700">
                  {title}
                </span>
                <span className="block text-ink-600 text-[0.9375rem] leading-relaxed mt-1.5 text-pretty">{desc}</span>
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
      <Link to="/industries" className="btn-secondary">Explore Industries <ArrowRight size={16} /></Link>
    </div>
  </section>
);

// ─────────────────────────── TESTIMONIALS ────────────────────────────
// One voice is given the floor and carries the brand colour; the other two
// support it. Equal columns gave all three the same weight and none of them
// any presence.
const TESTIMONIALS = [
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
];

const initialsOf = (name) => name.split(/\s+/).map((w) => w[0]).join('').toUpperCase();

const Attribution = ({ name, role, facility, light = false }) => (
  <figcaption className="flex items-center gap-4">
    <span
      className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-heading font-semibold ${
        light ? 'bg-white/15 text-white' : 'bg-primary-50 text-primary-700'
      }`}
      aria-hidden="true"
    >
      {initialsOf(name)}
    </span>
    <span>
      <span className={`block font-semibold ${light ? 'text-white' : 'text-ink-900'}`}>{name}</span>
      <span className={`block text-sm mt-0.5 ${light ? 'text-white/70' : 'text-ink-600'}`}>{role}</span>
      <span
        className={`block font-mono text-[0.625rem] uppercase tracking-widest mt-1.5 ${
          light ? 'text-accent-300' : 'text-primary-700'
        }`}
      >
        {facility}
      </span>
    </span>
  </figcaption>
);

const QuoteMark = ({ className = '' }) => (
  <svg viewBox="0 0 44 32" className={className} fill="currentColor" aria-hidden="true">
    <path d="M0 32V18.4C0 12.5 1.4 7.9 4.2 4.7 7 1.6 11.1 0 16.4 0v6.6c-2.7 0-4.7.8-6 2.3-1.3 1.5-2 3.6-2 6.3h9V32H0Zm26.6 0V18.4c0-5.9 1.4-10.5 4.2-13.7C33.6 1.6 37.7 0 43 0v6.6c-2.7 0-4.7.8-6 2.3-1.3 1.5-2 3.6-2 6.3h9V32H26.6Z" />
  </svg>
);

const Testimonials = () => {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <SectionHeader
          badge="Client Testimonials"
          title="Trusted by Facilities Across Ontario"
          subtitle="Hear from the healthcare administrators and coordinators who partner with PowerCare."
          centered={false}
        />

        <RevealGroup className="grid lg:grid-cols-12 gap-5">
          {/* Featured */}
          <RevealItem as="figure" className="lg:col-span-7 flex flex-col justify-between gap-10 rounded-2xl bg-primary-800 text-white p-8 lg:p-10">
            <div>
              <QuoteMark className="w-10 h-auto text-accent-300 mb-7" />
              <blockquote>
                <p className="font-heading text-[1.375rem] lg:text-[1.75rem] leading-[1.35] text-balance">
                  {featured.quote}
                </p>
              </blockquote>
            </div>
            <Attribution {...featured} light />
          </RevealItem>

          {/* Supporting */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 auto-rows-fr gap-5">
            {rest.map((t) => (
              <RevealItem
                as="figure"
                key={t.name}
                className="flex flex-col justify-between gap-6 rounded-2xl bg-white border border-ink-200 p-7
                           shadow-card transition-[border-color,box-shadow,transform] duration-300 ease-out-soft
                           hover:border-primary-300 hover:shadow-card-hover hover:-translate-y-0.5"
              >
                <div>
                  <QuoteMark className="w-6 h-auto text-primary-300 mb-4" />
                  <blockquote>
                    <p className="text-ink-700 leading-relaxed text-pretty">{t.quote}</p>
                  </blockquote>
                </div>
                <Attribution {...t} />
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
};

// ─────────────────────────── CTA SECTION ────────────────────────────
const HomeCTA = () => (
  <section className="relative section-padding bg-primary-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />
    <div className="container-custom relative z-10 text-center">
      <span className="inline-flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-widest text-primary-600">
        <span className="block w-6 h-px bg-primary-400" aria-hidden="true" />
        Get Started Today
        <span className="block w-6 h-px bg-primary-400" aria-hidden="true" />
      </span>
      <h2 className="text-display font-heading font-semibold text-ink-900 mt-6 mb-5 max-w-3xl mx-auto text-balance">
        Let's Build Stronger Care Teams{' '}
        <span className="text-primary-600">Together</span>
      </h2>
      <p className="text-ink-600 text-lg max-w-2xl mx-auto mb-10 text-pretty">
        Whether you're a facility in need of reliable staffing or a healthcare professional seeking your next opportunity, PowerCare is your trusted partner.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
        <Link to="/contact" className="btn-primary">
          I Need Staff <ArrowRight size={16} />
        </Link>
        <Link to="/careers" className="btn-secondary">
          I'm Looking for Work <ArrowRight size={16} />
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 pt-8 max-w-2xl mx-auto">
        {[
          { icon: Phone,  text: '+1 (647) 400-0000'      },
          { icon: Clock,  text: '24/7 Emergency Staffing' },
          { icon: MapPin, text: 'GTA & Rural Ontario'    },
        ].map(({ icon: Icon, text }) => (
          <span key={text} className="flex items-center gap-2 font-mono text-xs text-ink-500">
            <Icon size={13} className="text-primary-600" />
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
    <ProofBand />
    <WhyFacilitiesTrustUs />
    <ServicesPreview />
    <VettingProcess />
    <JobSeekerValue />
    <CoverageBand />
    <IndustriesPreview />
    <Testimonials />
    <FAQ faqs={homeFAQs} title="Frequently Asked Questions" subtitle="Everything you need to know about PowerCare's staffing solutions." />
    <HomeCTA />
  </main>
);

export default Home;
