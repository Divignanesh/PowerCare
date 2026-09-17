import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, Shield, HeartHandshake, TrendingUp, BookOpen,
  Layers, UserCheck, Zap, ChevronRight, ChevronLeft, Star,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import PageHero from '../components/ui/PageHero';
import FAQ from '../components/ui/FAQ';
import { whyPowerCareFAQs } from '../data/faqs';
import { RevealGroup, RevealItem } from '../components/ui/Reveal';
import VettingSteps from '../components/ui/VettingSteps';
import SEO, { faqSchema } from '../components/seo/SEO';

const Hero = () => (
  <PageHero
    eyebrow="The PowerCare Difference"
    title={<>Why Choose <span className="text-accent-300">PowerCare</span>?</>}
    subtitle="Because our staff are trained before they ever reach your floor — and backed by a 10-step screen and a fit guarantee."
    image="/images/training-room.jpg"
    imageAlt="PowerCare candidates in a supervised clinical skills session"
    detailImage="/images/why-lead.jpg"
    detailImageAlt="A PowerCare clinical lead"
  >
    <ul className="flex flex-wrap gap-2 mt-8">
      {['80-hour in-house training', '10-step vetting', '24/7 dispatch', 'Fit guarantee'].map((c) => (
        <li key={c} className="rounded-lg border border-white/25 bg-white/10 px-3.5 py-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-white">
          {c}
        </li>
      ))}
    </ul>
    <div className="flex flex-col sm:flex-row gap-3 mt-8">
      <Link to="/contact" className="btn-accent">Request Staff <ArrowRight size={16} /></Link>
      <Link to="/careers" className="btn-white">Find Work <ArrowRight size={16} /></Link>
    </div>
  </PageHero>
);

const MODULES = [
  { title: 'Clinical Foundations & Safety',     hours: '20 hrs', desc: 'IPAC, medication safety, emergency response.' },
  { title: 'Resident-Centred & Dementia Care',  hours: '20 hrs', desc: 'Person-centred care, responsive behaviours.' },
  { title: 'Communication & Documentation',     hours: '15 hrs', desc: 'Charting, handover, family communication.' },
  { title: 'Role-Specific Practical Skills',    hours: '25 hrs', desc: 'Hands-on competency for each role.' },
];

const InHouseTraining = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="Signature Training Program"
        title="In-House Training That Sets Our Staff Apart"
        subtitle="Most agencies place staff on day one with nothing but a credential check. Every PowerCare professional completes our programme before their first placement."
        centered={false}
      />

      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
        <div className="lg:col-span-5">
          <p className="text-ink-600 leading-relaxed mb-5 text-pretty">
            They arrive prepared clinically, professionally and culturally — not learning on your floor.
          </p>
          <p className="text-ink-600 leading-relaxed mb-8 text-pretty">
            Our training is built and delivered by registered healthcare professionals with decades of frontline experience across Ontario&rsquo;s long-term care, home care and acute settings.
          </p>

          <div className="inline-flex items-center gap-4 rounded-xl border border-primary-200 bg-primary-50 px-6 py-5 mb-8">
            <span className="font-heading text-4xl font-semibold text-primary-700">80</span>
            <span className="text-[0.9375rem] text-ink-700 leading-snug">
              <span className="block font-semibold">hours of certification</span>
              completed before any placement
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact" className="btn-primary">Hire Trained Staff <ArrowRight size={16} /></Link>
            <Link to="/careers" className="btn-secondary">Join Our Training Program</Link>
          </div>
        </div>

        <RevealGroup className="lg:col-span-7 grid sm:grid-cols-2 auto-rows-fr gap-4">
          {MODULES.map(({ title, hours, desc }) => (
            <RevealItem key={title} className="h-full">
              <div className="h-full rounded-xl border border-ink-200 bg-white p-6 shadow-card">
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <h3 className="font-heading font-semibold text-ink-900">{title}</h3>
                  <span className="rounded-md bg-primary-700 px-2.5 py-1 font-mono text-xs text-white whitespace-nowrap">
                    {hours}
                  </span>
                </div>
                <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">{desc}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  </section>
);

const TrainedProfessionals = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom">
      <SectionHeader
        badge="Trained Professionals"
        title="What Makes a PowerCare Professional Different"
        subtitle="Beyond credentials and background checks, our staff complete role-specific training that makes them immediately effective in your environment."
        centered={false}
      />

      <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-5">
        {[
          { icon: BookOpen,      title: 'Pre-Placement Certification', desc: 'Every professional receives a PowerCare certification of completion before their first shift, documenting specific modules and competencies mastered.' },
          { icon: Layers,        title: 'Specialty Track Options',     desc: 'Staff can complete advanced specialty tracks in dementia care, palliative support, behavioural intervention, and respite care.' },
          { icon: TrendingUp,    title: 'Continuing Education',        desc: 'Active PowerCare staff have access to quarterly training updates, new regulation briefings, and skills workshops to keep their practice current.' },
          { icon: UserCheck,     title: 'Competency Assessment',       desc: 'Written and practical competency assessments are conducted at the end of training. Only staff who meet our performance threshold are cleared for placement.' },
          { icon: HeartHandshake, title: 'Culture & Fit Orientation',  desc: "We train staff not just in skills, but in professional standards, facility etiquette, team integration, and the PowerCare commitment to excellence." },
          { icon: Shield,        title: 'Ongoing Performance Review',  desc: 'Placed staff are subject to regular quality reviews and client feedback collection. Performance issues are addressed swiftly through our accountability process.' },
        ].map(({ icon: Icon, title, desc }) => (
          <RevealItem key={title} className="card">
            <Icon size={20} strokeWidth={1.6} className="text-primary-600 mb-5" />
            <h3 className="font-heading font-semibold text-ink-900 text-lg mb-2">{title}</h3>
            <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">{desc}</p>
          </RevealItem>
        ))}
      </RevealGroup>

    </div>
  </section>
);

const COMPARISON = [
  ['Training before first shift', '80-hr in-house program',   'Credential check only'],
  ['Availability',                '24/7 dispatch, same-day',  'Business hours, limited'],
  ['Screening',                   '10-step + Vulnerable Sector', 'Basic / inconsistent'],
  ['Account management',          'Dedicated manager',        'Call centre / rotating'],
  ['Fit',                         'Culture & role matched',   "Whoever's available"],
  ["If it's not the right fit",   'Free replacement guarantee', 'No guarantee'],
];

const AgencyComparison = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="See the difference"
        title="PowerCare vs. a Typical Staffing Agency"
        centered={false}
      />
      <div className="rounded-2xl border border-ink-200 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr>
                <th scope="col" className="w-2/5 text-left px-6 py-4 font-mono text-[0.6875rem] uppercase tracking-widest text-ink-500 bg-surface">
                  What matters
                </th>
                <th scope="col" className="px-6 py-4 text-left font-mono text-[0.6875rem] uppercase tracking-widest text-white bg-primary-700">
                  PowerCare
                </th>
                <th scope="col" className="px-6 py-4 text-left font-mono text-[0.6875rem] uppercase tracking-widest text-ink-500 bg-surface">
                  Typical agency
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(([label, ours, theirs], i) => (
                <tr key={label} className={i % 2 ? 'bg-surface/60' : 'bg-white'}>
                  <th scope="row" className="text-left px-6 py-4 font-semibold text-ink-900 text-[0.9375rem]">{label}</th>
                  <td className="px-6 py-4 text-[0.9375rem] text-ink-900">
                    <span className="flex items-start gap-2.5">
                      <Check size={17} strokeWidth={2.6} className="text-primary-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      {ours}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[0.9375rem] text-ink-500">{theirs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
);

const VettingProcess = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="Our screening process"
        title="10-Step Candidate Vetting"
        subtitle="We leave no stone unturned. Our multi-step screening ensures only the most qualified, trustworthy professionals represent PowerCare."
        centered={false}
      />
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
        <div className="lg:col-span-7">
          <VettingSteps />
        </div>
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-5">
          <figure className="fig-frame">
            <img
              src="/images/team-review.jpg"
              alt="A PowerCare clinical reviewer going through a candidate file"
              loading="lazy"
              className="w-full h-[260px] object-cover object-top"
            />
          </figure>
          <figure className="fig-frame">
            <img
              src="/images/credential-review.jpg"
              alt="A PowerCare compliance reviewer checking a candidate's college registration"
              loading="lazy"
              className="w-full h-[260px] object-cover object-top"
            />
          </figure>
        </div>
      </div>
    </div>
  </section>
);

const KeyPillars = () => (
  <section className="relative section-padding bg-primary-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />
    <div className="container-custom relative z-10">
      <SectionHeader
        badge="Our Pillars"
        title="Four Reasons Facilities Choose PowerCare"
        subtitle="Beyond training, here is what defines the PowerCare experience."
        centered={false}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-9">
        {[
          { icon: Zap,            number: '01', title: 'Rapid Response',         desc: 'Our 24/7 dispatch team can confirm and deploy qualified staff within hours of a call — including overnight and holiday emergencies.' },
          { icon: Star,           number: '02', title: 'Quality Assurance',      desc: 'Every placement includes post-shift follow-up, regular performance reviews, and an open-door policy for facility feedback.' },
          { icon: HeartHandshake, number: '03', title: 'Long-Term Partnerships', desc: "We invest in understanding your facility's culture, workflows, and standards so that every placement feels like a seamless extension of your team." },
          { icon: TrendingUp,     number: '04', title: 'Scalable Solutions',     desc: 'From covering a single last-minute shift to managing a complete staffing strategy across multiple locations, PowerCare scales to your needs.' },
        ].map(({ icon: Icon, number, title, desc }) => (
          <div key={title}>
            <div className="flex items-center justify-between mb-6">
              <Icon size={20} strokeWidth={1.6} className="text-primary-600" />
              <span className="font-mono text-sm text-primary-600 tabular-nums">{number}</span>
            </div>
            <h3 className="font-heading font-semibold text-ink-900 text-lg mb-3">{title}</h3>
            <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturedTestimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();

  const testimonials = [
    {
      quote: "The difference with PowerCare is immediately obvious. Their staff arrive prepared, professional, and genuinely invested in our residents' well-being. You can tell they've been trained — and trained well. We've stopped using any other agency.",
      name: "Jennifer Liu",
      title: "Director of Care",
      facility: "Long-Term Care Home — Barrie, ON",
      initials: "JL"
    },
    {
      quote: "PowerCare has transformed our staffing challenges. Their 24/7 support and quality of staff are unmatched. We can now focus on care instead of worrying about coverage.",
      name: "Sarah Chen",
      title: "Facility Manager",
      facility: "Retirement Residence — Toronto, ON",
      initials: "SC"
    },
    {
      quote: "What I appreciate most is their commitment to quality. Every PowerCare professional is well-trained and arrives ready to work. It makes a real difference in our day-to-day operations.",
      name: "Michael Patterson",
      title: "Director of Operations",
      facility: "Community Care Agency — Mississauga, ON",
      initials: "MP"
    }
  ];

  const go = (next) => {
    setDirection(next > currentIndex || (currentIndex === testimonials.length - 1 && next === 0) ? 1 : -1);
    setCurrentIndex(next);
  };
  const nextTestimonial = () => go((currentIndex + 1) % testimonials.length);
  const prevTestimonial = () => go((currentIndex - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom max-w-3xl">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={currentIndex}
              custom={direction}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -28 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <p className="font-heading text-xl sm:text-2xl font-medium text-ink-800 leading-relaxed mb-9 text-pretty">
                &ldquo;{current.quote}&rdquo;
              </p>
              <footer className="flex items-center justify-center gap-4">
                <span className="w-12 h-12 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center flex-shrink-0">
                  <span className="font-heading font-semibold text-primary-700">{current.initials}</span>
                </span>
                <span className="text-left">
                  <span className="block font-semibold text-ink-900">{current.name}</span>
                  <span className="block font-mono text-[0.6875rem] uppercase tracking-widest text-primary-600 mt-1">
                    {current.title}, {current.facility}
                  </span>
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
            className="p-2.5 rounded-lg border border-ink-200 text-ink-600 hover:border-primary-500 hover:text-primary-700 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, idx) => (
              <button
                key={t.name}
                onClick={() => go(idx)}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={idx === currentIndex}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-primary-600 w-7' : 'bg-ink-300 w-2 hover:bg-ink-400'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            aria-label="Next testimonial"
            className="p-2.5 rounded-lg border border-ink-200 text-ink-600 hover:border-primary-500 hover:text-primary-700 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

const WhyPowerCareCTA = () => (
  <section className="relative bg-primary-900 overflow-hidden">
    <img
      src="/images/cta-records.jpg"
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover object-top"
    />
    <div className="absolute inset-0 scrim-soft" aria-hidden="true" />
    <div className="container-custom relative z-10 section-padding text-center">
      <h2 className="text-display-sm font-heading font-semibold text-white mb-5 text-balance">
        Experience the PowerCare Difference
      </h2>
      <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 text-pretty">
        Partner with a staffing agency that invests in its people — so your facility always gets the best.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/contact" className="btn-accent">Get Staffing Support <ArrowRight size={16} /></Link>
        <Link to="/services" className="btn-white">Our Services <ChevronRight size={16} /></Link>
      </div>
    </div>
  </section>
);

const WhyPowerCare = () => (
  <main>
    <SEO page="whyPowerCare" extraSchemas={[faqSchema(whyPowerCareFAQs)]} />
    <Hero />
    <InHouseTraining />
    <TrainedProfessionals />
    <AgencyComparison />
    <VettingProcess />
    <KeyPillars />
    <FeaturedTestimonial />
    <FAQ faqs={whyPowerCareFAQs} badge="Why PowerCare" title="Your Questions About PowerCare" subtitle="Discover what makes PowerCare the right choice for your facility or career." />
    <WhyPowerCareCTA />
  </main>
);

export default WhyPowerCare;
