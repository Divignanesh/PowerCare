import { Link } from 'react-router-dom';
import {
  Building2, Home, Heart,
  Users, Activity, Brain, ChevronRight, Shield, Plus, Check,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import PageHero from '../components/ui/PageHero';
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal';
import FAQ from '../components/ui/FAQ';
import { industries } from '../data/industries';
import { industriesFAQs } from '../data/faqs';
import CredentialBand from '../components/ui/CredentialBand';
import SEO, { faqSchema } from '../components/seo/SEO';
import { PHONE_ENABLED, PHONE_HREF, EMAIL_HREF } from '../data/contact';

const iconMap = { Building2, Home, Heart, Users, Activity, Brain };

const Hero = () => (
  <PageHero
    variant="center"
    eyebrow="Industries We Serve"
    title="Built for Every Care Setting"
    subtitle="A long-term care home and a group home ask different things of the people who work in them. We staff for what each one is really like."
    image="/images/senior-care.jpg"
    imageAlt="A PowerCare care worker sitting close with a resident"
    imagePos="object-center"
  >
    <ul className="flex flex-wrap gap-2 justify-center mt-8">
      {['Trained for the setting', 'Whenever you need us', 'Known to us before we send them'].map((t) => (
        <li key={t} className="rounded-full bg-surface px-4 py-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-primary-700">
          {t}
        </li>
      ))}
    </ul>
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
                className="group flex flex-col h-full rounded-2xl bg-surface overflow-hidden
                           transition-colors duration-300 ease-out-soft hover:bg-primary-50"
              >
                <div className="h-52 overflow-hidden bg-ink-100">
                  <img
                    src={ind.image}
                    alt=""
                    loading="lazy"
                    /* These frames all put their subjects mid-height; a top
                       crop lands on ceilings and empty corridor. */
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start gap-3 mb-3 min-h-[3.1rem]">
                    <Icon size={20} strokeWidth={1.7} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <h3 className="font-heading font-semibold text-ink-900 text-lg leading-snug">{ind.title}</h3>
                  </div>
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

      </RevealGroup>

      {/* Outside the grid on purpose: auto-rows-fr would stretch this strip to
          a full card's height and leave a hole under it. */}
      <Reveal>
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-4 rounded-2xl bg-primary-50 p-7">
          <Plus size={22} strokeWidth={1.6} className="text-primary-600 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-heading font-semibold text-ink-900 mb-2">Another setting?</h3>
            <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">
              If it&rsquo;s a care environment in Ontario — a clinic, a school board programme, a
              shelter, a supportive housing site — we can likely staff it.
            </p>
          </div>
          <Link to="/contact" className="link-arrow flex-shrink-0">
            Talk to us <ChevronRight size={14} />
          </Link>
        </div>
      </Reveal>
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
        <RevealGroup className="lg:col-span-7">
          {[
            ['You tell us the gap',   'Setting, role, shift times and any unit-specific requirement. By phone, or through the request form.'],
            ['We match from the pool', 'Coordinators shortlist staff who already know your setting and hold the right college registration.'],
            ['We confirm in writing',  'You get the name, credential and arrival time — plus a standby name for emergency bookings.'],
            ['We follow up after',     'A post-shift check with your charge nurse, and the feedback goes onto that worker’s record.'],
          ].map(([title, desc], i) => (
            <RevealItem key={title} className="flex items-start gap-5 py-6">
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
              src="/images/training-lab.jpg"
              alt="A PowerCare coordinator introducing staff to a resident and her family"
              loading="lazy"
              className="w-full h-[300px] object-cover object-center"
            />
          </figure>
          <div className="mt-6 rounded-xl border border-ink-200 bg-white p-7">
            <h3 className="font-heading font-semibold text-ink-900 text-lg mb-2">Need cover tonight?</h3>
            <p className="text-ink-600 text-[0.9375rem] mb-6 text-pretty">
              Emergency bookings are confirmed in 1–2 hours through the 24/7 dispatch desk.
            </p>
            {PHONE_ENABLED ? (
              <a href={PHONE_HREF} className="btn-primary w-full">Call 24/7 Dispatch</a>
            ) : (
              <a href={EMAIL_HREF} className="btn-primary w-full">Email 24/7 Dispatch</a>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const Industries = () => (
  <main>
    <SEO page="industries" extraSchemas={[faqSchema(industriesFAQs)]} />
    <Hero />
    <CredentialBand />
    <SectorGrid />
    <HowItWorks />
    <FAQ faqs={industriesFAQs} badge="Industries we serve" title="Questions About Our Industry Expertise" subtitle="Learn how PowerCare staffs different care settings across Ontario." />
  </main>
);

export default Industries;
