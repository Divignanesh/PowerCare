import { Link } from 'react-router-dom';
import {
  ArrowRight, Building2, Home, Hospital, Heart,
  Users, Activity, Brain, ChevronRight, Shield, Plus
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import PageHero from '../components/ui/PageHero';
import CredentialBadges from '../components/ui/CredentialBadges';
import { RevealGroup, RevealItem } from '../components/ui/Reveal';
import FAQ from '../components/ui/FAQ';
import { industries } from '../data/industries';
import { industriesFAQs } from '../data/faqs';
import SEO from '../components/seo/SEO';

const iconMap = { Building2, Home, Hospital, Heart, Users, Activity, Brain };

const Hero = () => (
  <PageHero
    variant="center"
    eyebrow="Industries We Serve"
    title="Built for Every Care Setting"
    subtitle="The staffing challenges differ by setting — we staff for the realities of each one."
    image="/images/facility-exterior.jpg"
  >
    <ul className="flex flex-wrap gap-2 justify-center mt-8">
      {['Sector-specific training', 'Same-day & 24/7', 'Credentialed & insured'].map((t) => (
        <li key={t} className="rounded-lg border border-primary-200 bg-white px-3.5 py-2 font-mono text-[0.6875rem] uppercase tracking-widest text-primary-700">
          {t}
        </li>
      ))}
    </ul>
  </PageHero>
);

/**
 * Every setting on one screen.
 *
 * This replaced seven full-length sections: each sector now carries a single
 * value line, the roles we place there, and one action — which is all a
 * facility manager needs to recognise themselves and get in touch.
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
              <div className="card group flex flex-col h-full">
                <Icon size={22} strokeWidth={1.6} className="text-primary-600 mb-5" />
                <h3 className="text-lg font-heading font-semibold text-ink-900 mb-2">{ind.title}</h3>
                <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">{ind.value}</p>

                <ul className="flex flex-wrap gap-1.5 mt-5">
                  {ind.tags.map((tag) => (
                    <li key={tag} className="rounded-md bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
                      {tag}
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="link-arrow mt-auto pt-6">
                  {ind.cta} <ChevronRight size={14} />
                </Link>
              </div>
            </RevealItem>
          );
        })}

        {/* An eighth cell so the grid closes cleanly and nobody self-excludes. */}
        <RevealItem className="h-full">
          <div className="flex flex-col h-full rounded-xl border border-primary-200 bg-primary-50 p-6">
            <Plus size={22} strokeWidth={1.6} className="text-primary-600 mb-5" />
            <h3 className="text-lg font-heading font-semibold text-ink-900 mb-2">Another setting?</h3>
            <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">
              If it's a care environment in Ontario, we can likely staff it.
            </p>
            <Link to="/contact" className="link-arrow mt-auto pt-6">
              Talk to us <ChevronRight size={14} />
            </Link>
          </div>
        </RevealItem>
      </RevealGroup>

      <CredentialBadges variant="inline" useFull className="mt-12" />
    </div>
  </section>
);

const IndustriesCTA = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom text-center">
      <h2 className="text-display-sm font-heading font-semibold text-ink-900 mb-5 text-balance">
        Staff Your Facility Today
      </h2>
      <p className="text-ink-600 text-lg max-w-xl mx-auto mb-10 text-pretty">
        Tell us your setting and your need — we'll match the right people, fast.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/contact" className="btn-primary">Request Staff <ArrowRight size={16} /></Link>
        <Link to="/services" className="btn-secondary">Browse Services <ChevronRight size={16} /></Link>
      </div>
    </div>
  </section>
);

const Industries = () => (
  <main>
    <SEO page="industries" />
    <Hero />
    <SectorGrid />
    <FAQ faqs={industriesFAQs} badge="Industries We Serve" title="Questions About Our Industry Expertise" subtitle="Learn how PowerCare staffs different care settings across Ontario." />
    <IndustriesCTA />
  </main>
);

export default Industries;
