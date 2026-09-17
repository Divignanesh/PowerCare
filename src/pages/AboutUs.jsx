import { Link } from 'react-router-dom';
import {
  ArrowRight, Award, Target, ChevronRight,
  Eye, Lightbulb, Shield, CheckCircle,
  GraduationCap, HeartHandshake,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import PageHero from '../components/ui/PageHero';
import FAQ from '../components/ui/FAQ';
import { aboutFAQs } from '../data/faqs';
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal';
import SEO, { faqSchema } from '../components/seo/SEO';

const Hero = () => (
  <PageHero
    variant="center"
    eyebrow="Our Story"
    title="About PowerCare"
    subtitle="Founded on the belief that quality healthcare staffing can transform lives — for caregivers, clients, and the communities we serve."
    image="/images/team-diverse.jpg"
    imageAlt="The PowerCare clinical team"
  >
    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
      <Link to="/contact" className="btn-accent">Partner With Us <ArrowRight size={16} /></Link>
      <Link to="/why-powercare" className="btn-white">Why PowerCare <ChevronRight size={16} /></Link>
    </div>
  </PageHero>
);

// A ruled row of figures directly under the hero — the page had nothing
// between the headline and a wall of prose, which is what read as empty.
const RecordBand = () => (
  <section className="bg-white border-b border-ink-200">
    <div className="container-custom">
      <Reveal>
        <dl className="grid grid-cols-2 lg:grid-cols-4 border-l border-ink-200">
          {[
            { value: '500+',   label: 'Facility partners across Ontario' },
            { value: '5,000+', label: 'Shifts successfully filled'       },
            { value: '80 hrs', label: 'Training before a first placement' },
            { value: '24/7',   label: 'Live dispatch, every day of the year' },
          ].map(({ value, label }) => (
            <div key={label} className="border-r border-b lg:border-b-0 border-ink-200 px-6 py-9 lg:py-11">
              <dd className="figure-lg text-3xl lg:text-[2.5rem] leading-none">{value}</dd>
              <dt className="text-ink-600 text-sm mt-3 leading-snug">{label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  </section>
);

const OurStory = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
        <div className="lg:col-span-7">
          <span className="section-badge">Why we exist</span>
          <h2 className="text-display-sm font-heading font-semibold text-ink-900 mb-6 text-balance">
            A Staffing Agency Built from the Inside Out
          </h2>
          <p className="text-ink-600 leading-relaxed mb-5 text-pretty">
            PowerCare was founded by healthcare professionals who lived the staffing crisis firsthand. We watched facilities struggle to fill shifts, saw burnout take its toll on dedicated staff, and felt the impact of mismatched placements on resident care.
          </p>
          <p className="text-ink-600 leading-relaxed mb-9 text-pretty">
            We built PowerCare on one conviction: <strong className="text-ink-900 font-semibold">that dependable, trained, and compassionate staffing isn't a luxury — it's a necessity.</strong> So we do it differently — training in-house, vetting rigorously, and matching for fit, not just availability.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/why-powercare" className="btn-primary">
              Why PowerCare <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-secondary">Get in Touch</Link>
          </div>
        </div>

        {/* The three things that actually differentiate the agency, stated
            plainly, over a photograph of the work itself. */}
        <div className="lg:col-span-5">
          <figure className="fig-frame mb-5">
            <img
              src="/images/therapy-pets.jpg"
              alt="PowerCare staff and residents during an afternoon activity"
              loading="lazy"
              className="w-full h-[220px] object-cover"
            />
          </figure>
          <div className="rounded-2xl bg-primary-50 border border-primary-100 p-8">
            <h3 className="font-mono text-[0.6875rem] uppercase tracking-widest text-primary-700 mb-6">
              How we do it differently
            </h3>
            <ul className="space-y-6">
              {[
                { icon: GraduationCap, title: 'Train in-house',    desc: 'Every professional completes our programme before a first placement.' },
                { icon: Shield,        title: 'Vet rigorously',    desc: 'A ten-step screen, including Vulnerable Sector checks.' },
                { icon: HeartHandshake, title: 'Match for fit',    desc: 'Clinically and culturally — not just whoever is free.' },
              ].map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex gap-4">
                  <Icon size={20} strokeWidth={1.7} className="text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-heading font-semibold text-ink-900">{title}</div>
                    <p className="text-ink-600 text-[0.9375rem] leading-relaxed mt-1 text-pretty">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MissionVisionValues = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom">
      <SectionHeader
        badge="Our Foundation"
        title="Mission, Vision & Values"
        subtitle="The principles behind every hire, every placement, and every interaction."
        centered={false}
      />
      <RevealGroup className="grid md:grid-cols-3 auto-rows-fr gap-x-10 gap-y-9 mb-12">
        {[
          { icon: Target,    title: 'Our Mission',  content: 'To make dependable, well-trained care staff available to every facility that needs them — so no shift goes uncovered and no resident goes without care.' },
          { icon: Eye,       title: 'Our Vision',   content: 'A healthcare system where staffing is never the reason care falls short — in cities and rural communities alike.' },
          { icon: Lightbulb, title: 'Our Approach', content: 'Train in-house, vet rigorously, match by fit — then stand behind every placement with our Fit Guarantee.' },
        ].map(({ icon: Icon, title, content }) => (
          <RevealItem key={title} className="border-t-2 border-primary-600 pt-7 h-full">
            <Icon size={22} strokeWidth={1.6} className="text-primary-600" />
            <h3 className="text-xl font-heading font-semibold text-ink-900 mt-5 mb-3">{title}</h3>
            <p className="text-ink-600 leading-relaxed text-pretty">{content}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <h3 className="font-mono text-[0.6875rem] uppercase tracking-widest text-primary-700 mb-5">Core Values</h3>
      <ul className="flex flex-wrap gap-2.5">
        {['Dependability', 'Compassion', 'Integrity', 'Excellence', 'Respect'].map((v) => (
          <li key={v} className="rounded-lg bg-white border border-ink-200 px-4 py-2 font-semibold text-ink-900">
            {v}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const Accreditations = () => (
  <section className="relative section-padding bg-primary-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />
    <div className="container-custom relative z-10">
      <SectionHeader
        badge="Credentials & Compliance"
        title="Accredited, Insured & Compliant"
        subtitle="PowerCare meets Ontario healthcare staffing standards — verifiable, not just stated."
        centered={false}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { icon: Shield,      title: 'WSIB Compliant',      desc: 'All placed workers are WSIB covered for your protection.' },
          { icon: CheckCircle, title: 'Background Checked',  desc: 'Criminal record + vulnerable sector screening on every hire.' },
          { icon: Award,       title: 'College Verified',    desc: 'Nurses, OTs, SLPs and psychotherapists verified against their Ontario colleges.' },
          { icon: GraduationCap, title: 'In-House Trained',  desc: '80 hours of certification completed before a first placement.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="border border-ink-200 rounded-xl p-6 text-ink-900
                       transition-colors duration-300 hover:border-primary-300 hover:bg-primary-50/60"
          >
            <Icon size={20} strokeWidth={1.6} className="text-primary-600" />
            <div className="font-heading font-semibold mt-5 mb-2">{title}</div>
            <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutCTA = () => (
  <section className="relative bg-primary-900 overflow-hidden">
    <img
      src="/images/cta-corridor.jpg"
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 scrim-soft" aria-hidden="true" />
    <div className="container-custom relative z-10 section-padding text-center">
      <h2 className="text-display-sm font-heading font-semibold text-white mb-5 text-balance">
        Ready to Work with PowerCare?
      </h2>
      <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 text-pretty">
        Whether you need to fill a shift today or build a long-term staffing strategy, we&rsquo;re here.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/contact" className="btn-accent">Partner With Us <ArrowRight size={16} /></Link>
        <Link to="/careers" className="btn-white">Find a Job <ArrowRight size={16} /></Link>
      </div>
    </div>
  </section>
);

const AboutUs = () => (
  <main>
    <SEO page="about" extraSchemas={[faqSchema(aboutFAQs)]} />
    <Hero />
    <RecordBand />
    <OurStory />
    <MissionVisionValues />
    <Accreditations />
    <FAQ faqs={aboutFAQs} badge="About PowerCare" title="Questions About Our Company" subtitle="Learn more about PowerCare's mission, values, and commitment to healthcare staffing excellence." />
    <AboutCTA />
  </main>
);

export default AboutUs;
