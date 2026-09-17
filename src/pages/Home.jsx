import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, Check, Shield, Clock, Users,
  Award, HeartHandshake, MapPin, Wallet, GraduationCap,
  Phone, ChevronRight, ChevronLeft, Building2, Hospital, Home as HomeIcon,
  Heart, Activity, Brain, PhoneCall, CalendarX2, UserX, Wallet2,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import FAQ from '../components/ui/FAQ';
import { services } from '../data/services';
import { industries } from '../data/industries';
import { homeFAQs } from '../data/faqs';
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal';
import CredentialBadges from '../components/ui/CredentialBadges';
import VettingSteps from '../components/ui/VettingSteps';
import SEO, { faqSchema } from '../components/seo/SEO';
import { PHONE, PHONE_HREF } from '../data/contact';

const sectorIcons = { Building2, Home: HomeIcon, Hospital, Heart, Users, Activity, Brain };

// ─────────────────────────── HERO ────────────────────────────
// A staffing agency sells people, so the page opens on people at work —
// full-bleed, under a brand scrim — with the dispatch promise stated beside
// the headline and the credentials welded to the foot of the section, where
// a Director of Care reads them before scrolling anywhere.
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
    'Background checked & WSIB covered',
  ];

  const desk = [
    ['Emergency coverage confirmed', 'in 1–2 hrs'],
    ['Planned requests confirmed',   'in 24 hrs'],
    ['Dispatch line answered',       '24/7/365'],
  ];

  return (
    <section className="relative bg-primary-900 overflow-hidden">
      <img
        src="/images/hero-elder-care.jpg"
        alt="A PowerCare nurse talking with an older client during a home visit"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-[center_18%]"
      />
      <div className="absolute inset-0 scrim" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-invert pointer-events-none" aria-hidden="true" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-20"
      >
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">

          <div className="lg:col-span-7">
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-accent-300"
            >
              <MapPin size={13} />
              Serving GTA &amp; Rural Ontario
            </motion.span>

            <motion.h1
              variants={item}
              className="text-display-lg font-heading font-semibold text-white mt-5 text-balance wdth-wide"
            >
              Trusted Healthcare{' '}
              <span className="text-accent-300">Staffing</span>{' '}
              Solutions
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-white/80 leading-relaxed mt-6 max-w-2xl text-pretty"
            >
              PowerCare connects long-term care homes, hospitals and community agencies across
              the GTA and Rural Ontario with vetted, in-house trained healthcare professionals —
              available when you need them most.
            </motion.p>

            <motion.ul variants={item} className="grid sm:grid-cols-2 gap-x-8 mt-8">
              {assurances.map((assurance) => (
                <li
                  key={assurance}
                  className="flex items-start gap-3 py-2.5 text-white/90 text-[0.9375rem]"
                >
                  <Check size={16} strokeWidth={2.5} className="text-accent-300 flex-shrink-0 mt-0.5" />
                  {assurance}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 mt-9">
              <Link to="/contact" className="btn-accent">
                Request Staff <ArrowRight size={16} />
              </Link>
              <Link to="/careers" className="btn-white">
                Find Work <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* The dispatch desk, stated as a service level rather than a slogan. */}
          <motion.aside
            variants={item}
            className="lg:col-span-5 rounded-2xl border border-white/20 bg-primary-900/70 backdrop-blur-sm p-7 lg:p-8"
          >
            <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-accent-300">
              24/7 Dispatch Desk
            </span>
            <h2 className="text-xl font-heading font-semibold text-white mt-4">
              Short a shift tonight?
            </h2>
            <p className="text-white/70 text-[0.9375rem] leading-relaxed mt-2.5 text-pretty">
              A real coordinator answers — not a voicemail box — any hour of any day.
            </p>

            <dl className="mt-7 border-t border-white/15">
              {desk.map(([label, figure]) => (
                <div key={label} className="flex items-baseline justify-between gap-5 py-3.5 border-b border-white/15">
                  <dt className="text-[0.9375rem] text-white/70">{label}</dt>
                  <dd className="font-heading font-semibold text-accent-300 whitespace-nowrap">{figure}</dd>
                </div>
              ))}
            </dl>

            <a href={PHONE_HREF} className="btn-accent w-full mt-7">
              <PhoneCall size={15} />
              {PHONE}
            </a>
          </motion.aside>
        </div>
      </motion.div>

      {/* The proof strip, at first glance. */}
      <div className="relative z-10 border-t border-white/15 bg-primary-900/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4">
          <CredentialBadges variant="hero" />
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────── RECORD BAND ────────────────────────────
const RECORD = [
  { value: '5,000+', label: 'Shifts successfully filled' },
  { value: '500+',   label: 'Facility partners'          },
  { value: '98%',    label: 'Client satisfaction rate'   },
  { value: '2 hrs',  label: 'Average response time'      },
];

const RecordBand = () => (
  <section className="bg-white border-b border-ink-200">
    <div className="container-custom">
      <Reveal>
        <dl className="grid grid-cols-2 lg:grid-cols-4 border-l border-ink-200">
          {RECORD.map(({ value, label }) => (
            <div key={label} className="border-r border-b lg:border-b-0 border-ink-200 px-6 py-9 lg:py-11">
              <dd className="figure-lg text-3xl lg:text-[2.75rem] leading-none">{value}</dd>
              <dt className="text-ink-600 text-sm mt-3 leading-snug">{label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  </section>
);

// ─────────────────────── WHAT WE'RE CALLED IN TO FIX ──────────────────────
// The sector's own framing: name the problem a Director of Care already has,
// then answer it in the same row. Without this the page jumps straight from
// hero to self-description, which is what reads as thin.
const PROBLEMS = [
  {
    icon: UserX,
    problem: 'Agency staff who do not show',
    answer:  'Confirmed the day before and again on the morning of the shift, with backup staff held on standby.',
  },
  {
    icon: CalendarX2,
    problem: 'Call-ins you cannot cover',
    answer:  'A 24/7 dispatch desk with a live coordinator and a local pool — most emergency shifts confirmed in 1–2 hours.',
  },
  {
    icon: GraduationCap,
    problem: 'Staff who learn on your floor',
    answer:  'Eighty hours of in-house training and a ten-step screen completed before a first placement, not after it.',
  },
  {
    icon: Wallet2,
    problem: 'Budgets that will not stretch',
    answer:  'Transparent rates by credential, no surprise premiums, and a free replacement if the fit is wrong.',
  },
];

const ProblemsWeSolve = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom">
      <SectionHeader
        badge="What we are called in to fix"
        title="The Four Staffing Problems We Hear Most"
        subtitle="Every facility that calls us is already dealing with at least one of these. Here is exactly what we do about each."
        centered={false}
      />

      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
        <RevealGroup className="lg:col-span-7 border-t border-ink-200">
          {PROBLEMS.map(({ icon: Icon, problem, answer }, i) => (
            <RevealItem
              key={problem}
              className="grid sm:grid-cols-12 gap-x-6 gap-y-3 py-7 border-b border-ink-200"
            >
              <div className="sm:col-span-5 flex items-start gap-3.5">
                <Icon size={19} strokeWidth={1.7} className="text-primary-600 flex-shrink-0 mt-1" />
                <span>
                  <span className="block font-mono text-[0.625rem] font-semibold uppercase tracking-widest text-ink-400">
                    {String(i + 1).padStart(2, '0')} · The problem
                  </span>
                  <span className="block font-heading font-semibold text-ink-900 text-lg mt-1.5">
                    {problem}
                  </span>
                </span>
              </div>
              <p className="sm:col-span-7 text-[0.9375rem] text-ink-700 leading-relaxed text-pretty sm:pt-6">
                {answer}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
          <figure className="fig-frame">
            <img
              src="/images/care-team-hallway.jpg"
              alt="A PowerCare coordinator handing over to a nurse at the start of a shift"
              loading="lazy"
              className="w-full h-[320px] lg:h-[400px] object-cover object-top"
            />
          </figure>
          <div className="mt-6 rounded-xl border border-primary-200 bg-primary-50 p-6">
            <p className="font-heading text-lg text-ink-900 leading-snug text-pretty">
              &ldquo;We don&rsquo;t just fill shifts. We keep your facility covered.&rdquo;
            </p>
            <Link to="/why-powercare" className="link-arrow mt-5">
              See how we screen and train <ChevronRight size={14} />
            </Link>
          </div>
        </Reveal>
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
      'Role-specific competency screening (RN · RPN · PSW · DSW · OT · SLP)',
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
        subtitle="Vetted RNs, RPNs, PSWs, DSWs and allied health professionals — credential-verified and ready when you need them."
        centered={false}
      />

      <RevealGroup className="grid md:grid-cols-3 auto-rows-fr gap-5">
        {PROMISE.map(({ icon: Icon, title, proof, points }) => (
          <RevealItem key={title} className="h-full">
            <div className="flex flex-col h-full rounded-xl border border-ink-200 bg-white p-7 shadow-card
                            border-t-2 border-t-primary-600
                            transition-[border-color,box-shadow] duration-300 ease-out-soft
                            hover:shadow-card-hover">
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
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="flex flex-col sm:flex-row gap-3 mt-9">
        <Link to="/contact" className="btn-primary">Request Staff <ArrowRight size={16} /></Link>
        <Link to="/why-powercare" className="btn-secondary">See How We Screen</Link>
      </div>
    </div>
  </section>
);

// ─────────────────────────── PROFESSIONS ────────────────────────────
// The first eight roles from the shared list, each carrying its photograph.
// Order matches /services exactly, because both read the same array.
const ProfessionsPreview = () => {
  const featured = services.slice(0, 8);

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <SectionHeader
          badge="Professions we place"
          title="Healthcare Professionals We Place"
          subtitle="From bedside nursing and personal support through to regulated allied health — occupational therapy, speech-language pathology, psychotherapy and dietetics."
          centered={false}
        />

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-5 mb-9">
          {featured.map((s, i) => (
            <RevealItem key={s.id} className="h-full">
              <Link
                to="/services"
                className="group flex flex-col h-full rounded-xl border border-ink-200 bg-white overflow-hidden
                           shadow-card transition-[border-color,box-shadow,transform] duration-300 ease-out-soft
                           hover:border-primary-300 hover:shadow-card-hover hover:-translate-y-0.5"
              >
                <span className="relative block h-40 overflow-hidden bg-ink-100">
                  <img
                    src={s.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out-soft group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-primary-900/70 to-transparent" aria-hidden="true" />
                  <span className="absolute left-4 bottom-3 font-mono text-[0.625rem] font-semibold uppercase tracking-widest text-white/90">
                    {s.category}
                  </span>
                  <span className="absolute right-4 top-3 font-mono text-[0.625rem] font-semibold text-white/70 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>

                <span className="flex flex-col flex-1 p-5">
                  <span className="block text-[1.0625rem] font-heading font-semibold text-ink-900 mb-2 leading-snug transition-colors group-hover:text-primary-700">
                    {s.title}
                  </span>
                  <span className="block text-ink-600 text-sm leading-relaxed text-pretty">{s.shortDesc}</span>
                  <span className="link-arrow mt-auto pt-5">
                    Learn more <ChevronRight size={14} />
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/services" className="btn-primary">All Professions <ArrowRight size={16} /></Link>
          <Link to="/contact" className="btn-secondary">Request a Role</Link>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────── VETTING PROCESS ────────────────────────────
const VettingProcess = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="Our screening process"
        title="10-Step Candidate Vetting"
        subtitle="Every professional clears all ten steps before they ever set foot in your facility."
        centered={false}
      />

      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
        <div className="lg:col-span-7">
          <VettingSteps />
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <figure className="fig-frame">
            <img
              src="/images/training-lab.jpg"
              alt="PowerCare candidates in a supervised clinical skills session"
              loading="lazy"
              className="w-full h-[300px] object-cover object-top"
            />
          </figure>

          <div className="mt-6 rounded-xl border border-ink-200 bg-surface p-7">
            <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-primary-700">
              Before a first placement
            </span>
            <div className="flex items-baseline gap-3 mt-4">
              <span className="figure-lg text-5xl leading-none">80</span>
              <span className="text-[0.9375rem] text-ink-700 leading-snug">
                <span className="block font-semibold text-ink-900">hours of certification</span>
                clinical safety, dementia care, documentation and role-specific skills
              </span>
            </div>
            <Link to="/why-powercare" className="btn-secondary w-full mt-7">
              How We Train Our Staff <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────── INDUSTRIES PREVIEW ────────────────────────────
// Read from the shared industries list so the sector names — including the
// respite programmes — can never drift from the /industries page.
const IndustriesPreview = () => (
  <section className="section-padding bg-primary-900 relative overflow-hidden">
    <div className="absolute inset-0 bg-grid-invert pointer-events-none" aria-hidden="true" />
    <div className="container-custom relative z-10">
      <SectionHeader
        badge="Industries we serve"
        title="Built for Every Care Setting"
        subtitle="The staffing challenges differ by setting — we staff for the realities of each."
        centered={false}
        light
      />

      <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-5 mb-9">
        {industries.slice(0, 6).map((ind) => {
          const Icon = sectorIcons[ind.icon] || Shield;
          return (
            <RevealItem key={ind.id} className="h-full">
              <Link
                to="/industries"
                className="group relative flex flex-col justify-end h-full min-h-[240px] rounded-xl overflow-hidden
                           border border-white/15 transition-colors duration-300 hover:border-accent-300/60"
              >
                <img
                  src={ind.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 ease-out-soft group-hover:scale-105"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/80 to-primary-900/30"
                  aria-hidden="true"
                />
                <span className="relative p-6">
                  <Icon size={20} strokeWidth={1.7} className="text-accent-300 mb-4" />
                  <span className="block font-heading font-semibold text-white text-lg leading-snug">
                    {ind.title}
                  </span>
                  <span className="block text-white/70 text-sm leading-relaxed mt-2 text-pretty">
                    {ind.value}
                  </span>
                  <span className="flex flex-wrap gap-1.5 mt-4">
                    {ind.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/10 px-2.5 py-1 text-[0.6875rem] font-semibold text-accent-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <Link to="/industries" className="btn-accent">Explore Industries <ArrowRight size={16} /></Link>
    </div>
  </section>
);

// ─────────────────────────── JOB SEEKER VALUE ────────────────────────────
const SEEKER = [
  {
    icon: Clock,
    title: 'Work that fits your life',
    proof: 'You pick the shifts',
    points: [
      'Flexible shifts across the GTA & Rural Ontario',
      'Full-time, part-time or casual',
      'Variety: long-term care, hospitals, home, community & respite',
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
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="Nursing, allied health & PSW jobs"
        title="Why Professionals Choose PowerCare"
        subtitle="RNs, RPNs, PSWs, DSWs, OTs, SLPs and Psychotherapists — build a schedule around your life, and get the support to grow."
        centered={false}
      />

      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
        <Reveal className="lg:col-span-4">
          <figure className="fig-frame">
            <img
              src="/images/nurse-lead.jpg"
              alt="A registered practical nurse placed by PowerCare"
              loading="lazy"
              className="w-full h-[360px] lg:h-[420px] object-cover object-top"
            />
          </figure>
        </Reveal>

        <RevealGroup className="lg:col-span-8 grid sm:grid-cols-3 auto-rows-fr gap-x-8 gap-y-9">
          {SEEKER.map(({ icon: Icon, title, proof, points }) => (
            <RevealItem key={title} className="flex flex-col h-full border-t-2 border-primary-600 pt-6">
              <Icon size={22} strokeWidth={1.6} className="text-primary-600" />
              <h3 className="text-lg font-heading font-semibold text-ink-900 mt-5 mb-3">{title}</h3>
              <span className="self-start rounded-lg bg-surface border border-ink-200 px-3 py-1.5 text-sm font-semibold text-primary-700">
                {proof}
              </span>
              <ul className="mt-5 space-y-2.5">
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
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-9">
        <Link to="/careers" className="btn-primary">Find a Job <ArrowRight size={16} /></Link>
        <Link to="/careers" className="btn-secondary">Join Our Talent Pool</Link>
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
  <section className="relative section-padding bg-surface overflow-hidden">
    <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />
    <div className="container-custom relative z-10">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
        <div className="lg:col-span-5 text-ink-900">
          <span className="section-badge">Coverage area</span>
          <h2 className="text-display-sm font-heading font-semibold mt-1 mb-5 text-balance">
            Serving the GTA &amp; Rural Ontario
          </h2>
          <p className="text-ink-600 leading-relaxed mb-8 max-w-lg text-pretty">
            From metropolitan Toronto out to rural and underserved communities — quality
            staffing wherever your facility is.
          </p>

          <h3 className="font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-ink-500 mb-3">GTA cities</h3>
          <ul className="flex flex-wrap gap-2 mb-8">
            {COVERAGE.gta.map((city) => (
              <li key={city} className="inline-flex items-center gap-2 rounded-lg bg-white border border-ink-200 px-3 py-1.5 text-sm text-ink-700">
                <MapPin size={12} className="text-primary-600 flex-shrink-0" />
                {city}
              </li>
            ))}
          </ul>

          <h3 className="font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-ink-500 mb-3">Regional coverage</h3>
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
              className="w-full rounded-2xl border border-ink-200 bg-white"
            />
            <figcaption className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-ink-500">
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

// ─────────────────────────── PROOF BAND ────────────────────────────
const ProofBand = () => (
  <section className="bg-white section-padding-tight">
    <div className="container-custom">
      <Reveal>
        <h2 className="font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-ink-500 mb-6 text-center">
          Credentials &amp; coverage on every placement
        </h2>
        <CredentialBadges variant="band" useFull />
      </Reveal>
    </div>
  </section>
);

// ─────────────────────────── TESTIMONIALS ────────────────────────────
// Nine quotes, read three at a time: the first of each set takes the featured
// card, the other two the supporting column. They rotate on their own and the
// whole set cross-fades together, so the three panels always belong to each
// other rather than shuffling independently.
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
  {
    quote: "Our OT vacancy sat open for four months before we called PowerCare. They had a registered occupational therapist covering our caseload the following week, and she stayed on right through to the permanent hire.",
    name: 'Priya N.', role: 'Program Manager', facility: 'Rehabilitation Centre, Vaughan',
  },
  {
    quote: "The swallowing assessment backlog was the thing keeping me up at night. Having an SLP in two days a week has completely changed how quickly we can get residents reassessed.",
    name: 'Marc L.', role: 'Director of Care', facility: 'Long-Term Care Home, Peterborough',
  },
  {
    quote: "Respite coverage used to mean cancelling on families. PowerCare gives us names we can plan around, which means our own staff actually get to take their leave.",
    name: 'Grace A.', role: 'Executive Director', facility: 'Developmental Services Agency, Oshawa',
  },
  {
    quote: "We brought in a PowerCare psychotherapist for our concurrent disorders program. She was trauma-informed from day one and our clients took to her immediately — no settling-in period at all.",
    name: 'Renée B.', role: 'Clinical Lead', facility: 'Mental Health Program, London',
  },
  {
    quote: "Their coordinator calls me before I have to call them. That sounds like a small thing until you've spent a year chasing agencies for confirmations the night before a shift.",
    name: 'Tom W.', role: 'Scheduling Manager', facility: 'Hospital, Hamilton',
  },
  {
    quote: "Our dietitian retired and we needed continuity fast. The PowerCare dietitian picked up the therapeutic diet reviews without a single gap in the menu cycle.",
    name: 'Hassan I.', role: 'Food Services Manager', facility: 'Retirement Residence, Markham',
  },
];

const SLIDE_SIZE = 3;
const ROTATE_MS = 7000;

const SLIDES = Array.from(
  { length: Math.ceil(TESTIMONIALS.length / SLIDE_SIZE) },
  (_, i) => TESTIMONIALS.slice(i * SLIDE_SIZE, i * SLIDE_SIZE + SLIDE_SIZE),
);

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
        className={`block font-mono text-[0.625rem] font-semibold uppercase tracking-widest mt-1.5 ${
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
  const reduce = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next) => {
    setSlide((next + SLIDES.length) % SLIDES.length);
  }, []);

  // It rotates on its own, and stops the moment someone hovers it or tabs into
  // the controls — nobody should lose a quote halfway through reading it.
  // Reduced-motion visitors drive it entirely by hand.
  useEffect(() => {
    if (paused || reduce || SLIDES.length < 2) return undefined;
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, reduce]);

  const [featured, ...rest] = SLIDES[slide];

  const arrow =
    'p-2.5 rounded-lg border border-ink-200 bg-white text-ink-600 transition-colors ' +
    'hover:border-primary-500 hover:text-primary-700';

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <SectionHeader
          badge="Client testimonials"
          title="Trusted by Facilities Across Ontario"
          subtitle="Hear from the healthcare administrators and coordinators who partner with PowerCare."
          centered={false}
        />

        <Reveal
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Both slides share one grid cell, so the outgoing set holds the
              height while the incoming one fades up — no collapse, no jump. */}
          <div
            className="grid lg:min-h-[400px]"
            role="group"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={slide}
                aria-live="polite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, pointerEvents: 'none' }}
                transition={{ duration: reduce ? 0 : 0.45, ease: 'easeInOut' }}
                className="col-start-1 row-start-1 grid lg:grid-cols-12 gap-5"
              >
                <figure className="lg:col-span-7 flex flex-col justify-between gap-10 rounded-2xl bg-primary-800 text-white p-8 lg:p-10">
                  <div>
                    <QuoteMark className="w-10 h-auto text-accent-300 mb-7" />
                    <blockquote>
                      <p className="font-heading text-[1.375rem] lg:text-[1.75rem] leading-[1.4] text-balance">
                        {featured.quote}
                      </p>
                    </blockquote>
                  </div>
                  <Attribution {...featured} light />
                </figure>

                <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 auto-rows-fr gap-5">
                  {rest.map((t) => (
                    <figure
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
                    </figure>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <button type="button" onClick={() => go(slide - 1)} aria-label="Previous testimonials" className={arrow}>
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {SLIDES.map((set, i) => (
                <button
                  key={set[0].name}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show testimonials ${i + 1} of ${SLIDES.length}`}
                  aria-current={i === slide}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === slide ? 'bg-primary-600 w-7' : 'bg-ink-300 w-2 hover:bg-ink-400'
                  }`}
                />
              ))}
            </div>

            <button type="button" onClick={() => go(slide + 1)} aria-label="Next testimonials" className={arrow}>
              <ChevronRight size={18} />
            </button>

            <span className="ml-auto font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-ink-400 tabular-nums">
              {String(slide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ─────────────────────────── CTA SECTION ────────────────────────────
const HomeCTA = () => (
  <section className="relative bg-primary-900 overflow-hidden">
    <img
      src="/images/hero-team.jpg"
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover object-top"
    />
    <div className="absolute inset-0 scrim-soft" aria-hidden="true" />
    <div className="absolute inset-0 bg-grid-invert pointer-events-none" aria-hidden="true" />

    <div className="container-custom relative z-10 section-padding text-center">
      <span className="inline-flex items-center gap-2.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-accent-300">
        <span className="block w-6 h-px bg-accent-300/70" aria-hidden="true" />
        Get started today
        <span className="block w-6 h-px bg-accent-300/70" aria-hidden="true" />
      </span>
      <h2 className="text-display font-heading font-semibold text-white mt-6 mb-5 max-w-3xl mx-auto text-balance">
        Let&rsquo;s Build Stronger Care Teams{' '}
        <span className="text-accent-300">Together</span>
      </h2>
      <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 text-pretty">
        Whether you&rsquo;re a facility in need of reliable staffing or a healthcare professional
        seeking your next opportunity, PowerCare is your trusted partner.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
        <Link to="/contact" className="btn-accent">
          I Need Staff <ArrowRight size={16} />
        </Link>
        <Link to="/careers" className="btn-white">
          I&rsquo;m Looking for Work <ArrowRight size={16} />
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 pt-7 border-t border-white/15 max-w-2xl mx-auto">
        {[
          { icon: Phone,  text: PHONE                    },
          { icon: Clock,  text: '24/7 Emergency Staffing' },
          { icon: MapPin, text: 'GTA & Rural Ontario'    },
        ].map(({ icon: Icon, text }) => (
          <span key={text} className="flex items-center gap-2 font-mono text-xs font-semibold text-white/70">
            <Icon size={13} className="text-accent-300" />
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
    <RecordBand />
    <ProblemsWeSolve />
    <WhyFacilitiesTrustUs />
    <ProfessionsPreview />
    <VettingProcess />
    <IndustriesPreview />
    <JobSeekerValue />
    <CoverageBand />
    <ProofBand />
    <Testimonials />
    <FAQ faqs={homeFAQs} title="Frequently Asked Questions" subtitle="Everything you need to know about PowerCare's staffing solutions." />
    <HomeCTA />
  </main>
);

export default Home;
