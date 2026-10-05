import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  Handshake, ShieldCheck, BookOpen, UsersThree,
  FirstAid, Brain, ChatsCircle, HandHeart,
} from '@phosphor-icons/react';
import SectionHeader from '../components/ui/SectionHeader';
import FAQ from '../components/ui/FAQ';
import CtaBand from '../components/ui/CtaBand';
import CredentialBand from '../components/ui/CredentialBand';
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal';
import { whyPowerCareFAQs } from '../data/faqs';
import SEO from '../components/seo/SEO';
import { faqSchema } from '../components/seo/schema';

// ─────────────────────────── HERO ────────────────────────────
// A statement on white, then a strip of four care moments. The photos stay
// bright and sharp; staggered heights keep the row from reading as a grid.
const HERO_PHOTOS = [
  { src: '/images/kitchen-chat.jpg',      alt: 'A carer chatting with an older woman at her kitchen table',          h: 'md:h-64' },
  { src: '/images/wheelchair-support.jpg', alt: 'Care workers helping a resident in a wheelchair',    h: 'md:h-80' },
  { src: '/images/bp-check-home.jpg', alt: 'A nurse checking an older man’s blood pressure at home',  h: 'md:h-72' },
  { src: '/images/why-lounge.jpg',    alt: 'A care worker helping a resident in a bright care home lounge', h: 'md:h-56' },
];

const Hero = () => (
  <section className="bg-white pt-14 lg:pt-20 pb-14 lg:pb-16 overflow-hidden">
    <div className="container-custom text-center">
      <span className="inline-flex items-center gap-3 font-mono text-sm leading-tight font-semibold uppercase tracking-[4px] text-primary-600">
        <span className="block w-6 h-px bg-primary-400" aria-hidden="true" />
        Why PowerCare
        <span className="block w-6 h-px bg-primary-400" aria-hidden="true" />
      </span>
      <h1 className="mt-5 text-display-lg font-heading font-semibold text-primary-700 max-w-3xl mx-auto text-balance">
        Care you can trust.
      </h1>
      <p className="mt-5 text-lg text-ink-600 max-w-2xl mx-auto text-pretty">
        Trained nurses and support workers for care homes across Ontario.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        <Link to="/contact" className="btn-primary">
          Request staff <ArrowRight size={16} />
        </Link>
        <Link to="/careers" className="btn-secondary">Join our team</Link>
      </div>
    </div>

    <RevealGroup className="mt-12 lg:mt-14 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 items-end gap-3 md:gap-4">
      {HERO_PHOTOS.map(({ src, alt, h }) => (
        <RevealItem key={src}>
          <img
            src={src}
            alt={alt}
            fetchPriority="high"
            className={`w-full h-40 sm:h-52 ${h} object-cover object-center rounded-2xl`}
          />
        </RevealItem>
      ))}
    </RevealGroup>
  </section>
);

// ─────────────────────────── TRAINING ────────────────────────────
// No hours are claimed: the point is what the training covers.
const MODULES = [
  { icon: FirstAid,    title: 'Clinical safety',        desc: 'Infection control, medication safety, emergencies.' },
  { icon: Brain,       title: 'Dementia care',          desc: 'Patience when someone is frightened or confused.' },
  { icon: ChatsCircle, title: 'Handover & charting',    desc: 'Nothing lost between shifts.' },
  { icon: HandHeart,   title: 'Hands-on practice',      desc: 'The exact work each person will do.' },
];

const Training = () => (
  <section className="section-padding bg-white">
    <div className="container-custom grid lg:grid-cols-12 gap-x-14 gap-y-10 items-center">
      <Reveal className="lg:col-span-6 order-2 lg:order-1">
        <figure className="fig-frame">
          <img
            src="/images/why-training.jpg"
            alt="A PowerCare care worker sitting with an older man, holding his hand"
            loading="lazy"
            className="w-full aspect-[4/3] object-cover object-center"
          />
        </figure>
      </Reveal>

      <div className="lg:col-span-6 order-1 lg:order-2">
        <h2 className="section-title text-balance">Trained by us before they reach you</h2>
        <p className="section-subtitle">
          Taught by registered professionals who have worked Ontario floors for years.
        </p>

        <RevealGroup className="mt-9 grid sm:grid-cols-2 gap-x-8 gap-y-7">
          {MODULES.map(({ icon: Icon, title, desc }) => (
            <RevealItem key={title} className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                <Icon size={22} className="text-primary-700" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-heading font-semibold text-ink-900 text-lg">{title}</span>
                <span className="block text-ink-600 text-base mt-1 text-pretty">{desc}</span>
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  </section>
);

// ─────────────────────────── COMMITMENTS (BENTO) ────────────────────────────
const Commitments = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom">
      <SectionHeader title="What working with us feels like" centered={false} />

      {/* Four commitments, four cells: one photo tile spanning two rows on
          desktop, three icon tiles beside it. Single column on mobile. */}
      <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-5">
        <RevealItem className="md:col-span-2 lg:col-span-1 lg:row-span-2">
          <div className="relative h-full min-h-[300px] rounded-2xl overflow-hidden">
            <img
              src="/images/physio-session.jpg"
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" aria-hidden="true" />
            <div className="relative h-full flex flex-col justify-end p-7">
              <Handshake size={36} className="text-white mb-4" aria-hidden="true" />
              <h3 className="text-xl font-heading font-semibold text-white">We stay close</h3>
              <p className="mt-2 text-white/85 text-base text-pretty">
                We check in after the first shift and the ones after it.
              </p>
            </div>
          </div>
        </RevealItem>

        {[
          { icon: UsersThree,  title: 'You get a person',     desc: 'The same coordinator every time, who knows your home and your team.', tone: 'bg-primary-700 text-white', sub: 'text-white/80', ic: 'text-white' },
          { icon: ShieldCheck, title: 'Honest conversations',  desc: 'If something doesn’t feel right, we would always rather hear it.',      tone: 'bg-white border border-ink-200', sub: 'text-ink-600', ic: 'text-primary-700' },
          { icon: BookOpen,    title: 'We keep learning',     desc: 'Training carries on long after the first placement.',                tone: 'bg-primary-50', sub: 'text-ink-600', ic: 'text-primary-700', wide: true },
        ].map(({ icon: Icon, title, desc, tone, sub, ic, wide }) => (
          <RevealItem key={title} className={`h-full ${wide ? 'lg:col-span-2' : ''}`}>
            <div className={`h-full rounded-2xl p-7 ${tone}`}>
              <Icon size={36} className={`${ic} mb-4`} aria-hidden="true" />
              <h3 className={`text-xl font-heading font-semibold ${tone.includes('text-white') ? 'text-white' : 'text-ink-900'}`}>{title}</h3>
              <p className={`mt-2 text-base text-pretty ${sub}`}>{desc}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  </section>
);

const WhyPowerCare = () => (
  <main>
    <SEO page="whyPowerCare" extraSchemas={[faqSchema(whyPowerCareFAQs)]} />
    <Hero />
    <Training />
    <CredentialBand />
    <Commitments />
    <FAQ
      faqs={whyPowerCareFAQs}
      title="Your Questions About PowerCare"
      subtitle="What people usually want to know before they call."
    />
    <CtaBand
      image="/images/resident-room.jpg"
      title="Ready when your next shift isn’t covered"
      text="Tell us the role, the setting and the hours. We’ll take it from there."
      cta="Request staff"
      points={['Nursing', 'Personal support', 'Allied health']}
    />
  </main>
);

export default WhyPowerCare;
