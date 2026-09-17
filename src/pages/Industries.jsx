import { Link } from 'react-router-dom';
import {
  ArrowRight, Building2, Home, Hospital, Heart,
  Users, Activity, Brain, ChevronRight, Shield, Plus, Check,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import PageHero from '../components/ui/PageHero';
import CredentialBadges from '../components/ui/CredentialBadges';
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal';
import FAQ from '../components/ui/FAQ';
import { industries } from '../data/industries';
import { industriesFAQs } from '../data/faqs';
import SEO, { faqSchema } from '../components/seo/SEO';
import { PHONE_HREF } from '../data/contact';

const iconMap = { Building2, Home, Hospital, Heart, Users, Activity, Brain };

const Hero = () => (
  <PageHero
    variant="center"
    eyebrow="Industries We Serve"
    title="Built for Every Care Setting"
    subtitle="The staffing challenges differ by setting — we staff for the realities of each one."
    image="/images/facility-exterior.jpg"
    imageAlt="The entrance to a regional hospital served by PowerCare"
  >
    <ul className="flex flex-wrap gap-2 justify-center mt-8">
      {['Sector-specific training', 'Same-day & 24/7', 'Credentialed & screened'].map((t) => (
        <li key={t} className="rounded-lg border border-white/25 bg-white/10 px-3.5 py-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-white">
          {t}
        </li>
      ))}
    </ul>
    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
      <Link to="/contact" className="btn-accent">Request Staff <ArrowRight size={16} /></Link>
      <Link to="/services" className="btn-white">Browse Professions <ChevronRight size={16} /></Link>
    </div>
  </PageHero>
);

/**
 * Every setting on one screen.
 *
 * Each sector carries its own photograph, the value line, the roles we place
 * there and one action — which is all a facility manager needs to recognise
 * themselves and get in touch.
 */
const SectorGrid = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="Where we staff"
        title="Every Setting We Serve"
        subtitle="Pick your setting — we'll match staff who already understand it."
        centered={false}
      />

      <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-5">
        {industries.map((ind) => {
          const Icon = iconMap[ind.icon] || Shield;
          return (
            <RevealItem key={ind.id} className="h-full">
              <div
                className="group flex flex-col h-full rounded-xl border border-ink-200 bg-white overflow-hidden
                           shadow-card transition-[border-color,box-shadow,transform] duration-300 ease-out-soft
                           hover:border-primary-300 hover:shadow-card-hover hover:-translate-y-0.5"
              >
                <div className="relative h-52 overflow-hidden bg-ink-100">
                  <img
                    src={ind.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out-soft group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/85 via-primary-900/25 to-transparent" aria-hidden="true" />
                  <div className="absolute left-5 right-5 bottom-5 flex items-end gap-3">
                    <Icon size={20} strokeWidth={1.7} className="text-accent-300 flex-shrink-0 mb-1" />
                    <h3 className="font-heading font-semibold text-white text-lg leading-snug">{ind.title}</h3>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">{ind.value}</p>

                  <h4 className="font-mono text-[0.625rem] font-semibold uppercase tracking-widest text-ink-400 mt-6 mb-2.5">
                    Roles we place here
                  </h4>
                  <ul className="space-y-1.5">
                    {ind.roles.slice(0, 4).map((role) => (
                      <li key={role} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <Check size={13} strokeWidth={2.6} className="text-primary-500 mt-1 flex-shrink-0" />
                        {role}
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact" className="link-arrow mt-auto pt-6">
                    {ind.cta} <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </RevealItem>
          );
        })}

        {/* An eighth cell so the grid closes cleanly and nobody self-excludes. */}
        <RevealItem className="h-full">
          <div className="flex flex-col h-full rounded-xl border border-primary-200 bg-primary-50 p-7">
            <Plus size={22} strokeWidth={1.6} className="text-primary-600 mb-5" />
            <h3 className="text-lg font-heading font-semibold text-ink-900 mb-2">Another setting?</h3>
            <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">
              If it&rsquo;s a care environment in Ontario — a clinic, a school board programme, a
              shelter, a supportive housing site — we can likely staff it.
            </p>
            <Link to="/contact" className="link-arrow mt-auto pt-6">
              Talk to us <ChevronRight size={14} />
            </Link>
          </div>
        </RevealItem>
      </RevealGroup>
    </div>
  </section>
);

/** What a facility manager actually gets when they book through us. */
const HowItWorks = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom">
      <SectionHeader
        badge="How a booking runs"
        title="From Your Call to Cover on the Floor"
        subtitle="The same four steps whether it's a single overnight call-in or a full line of planned shifts."
        centered={false}
      />

      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
        <RevealGroup className="lg:col-span-7 border-t border-ink-200">
          {[
            ['You tell us the gap',   'Setting, role, shift times and any unit-specific requirement. By phone, or through the request form.'],
            ['We match from the pool', 'Coordinators shortlist staff who already know your setting and hold the right college registration.'],
            ['We confirm in writing',  'You get the name, credential and arrival time — plus a standby name for emergency bookings.'],
            ['We follow up after',     'A post-shift check with your charge nurse, and the feedback goes onto that worker’s record.'],
          ].map(([title, desc], i) => (
            <RevealItem key={title} className="flex items-start gap-5 py-6 border-b border-ink-200">
              <span className="w-11 h-11 rounded-full border-2 border-primary-600 bg-white flex items-center justify-center flex-shrink-0
                               font-mono text-sm font-semibold text-primary-700 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="block font-heading font-semibold text-ink-900 text-lg">{title}</span>
                <span className="block text-ink-600 text-[0.9375rem] leading-relaxed mt-1.5 text-pretty">{desc}</span>
              </span>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="lg:col-span-5">
          <figure className="fig-frame">
            <img
              src="/images/handover.jpg"
              alt="PowerCare coordinators handing over a shift to facility staff"
              loading="lazy"
              className="w-full h-[300px] object-cover object-top"
            />
          </figure>
          <div className="mt-6 rounded-xl border border-ink-200 bg-white p-7">
            <h3 className="font-heading font-semibold text-ink-900 text-lg mb-2">Need cover tonight?</h3>
            <p className="text-ink-600 text-[0.9375rem] mb-6 text-pretty">
              Emergency bookings are confirmed in 1–2 hours through the 24/7 dispatch desk.
            </p>
            <a href={PHONE_HREF} className="btn-primary w-full">Call 24/7 Dispatch</a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const ProofBand = () => (
  <section className="bg-white section-padding-tight border-t border-ink-200">
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

const IndustriesCTA = () => (
  <section className="relative bg-primary-900 overflow-hidden">
    <img
      src="/images/cta-team.jpg"
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover object-top"
    />
    <div className="absolute inset-0 scrim-soft" aria-hidden="true" />
    <div className="container-custom relative z-10 section-padding text-center">
      <h2 className="text-display-sm font-heading font-semibold text-white mb-5 text-balance">
        Staff Your Facility Today
      </h2>
      <p className="text-white/80 text-lg max-w-xl mx-auto mb-8 text-pretty">
        Tell us your setting and your need — we&rsquo;ll match the right people, fast.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/contact" className="btn-accent">Request Staff <ArrowRight size={16} /></Link>
        <Link to="/services" className="btn-white">Browse Professions <ChevronRight size={16} /></Link>
      </div>
    </div>
  </section>
);

const Industries = () => (
  <main>
    <SEO page="industries" extraSchemas={[faqSchema(industriesFAQs)]} />
    <Hero />
    <SectorGrid />
    <HowItWorks />
    <ProofBand />
    <FAQ faqs={industriesFAQs} badge="Industries we serve" title="Questions About Our Industry Expertise" subtitle="Learn how PowerCare staffs different care settings across Ontario." />
    <IndustriesCTA />
  </main>
);

export default Industries;
