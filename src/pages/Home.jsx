import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronRight } from 'lucide-react';
import {
  Buildings as Building2, House as HomeIcon, Heart, UsersThree as Users, Pulse as Activity, Brain,
} from '@phosphor-icons/react';
import SectionHeader from '../components/ui/SectionHeader';
import FAQ from '../components/ui/FAQ';
import { services } from '../data/services';
import { industries } from '../data/industries';
import { homeFAQs } from '../data/faqs';
import { RevealGroup, RevealItem } from '../components/ui/Reveal';
import CredentialBand from '../components/ui/CredentialBand';
import RoleCarousel from '../components/ui/RoleCarousel';
import SEO from '../components/seo/SEO';
import { faqSchema } from '../components/seo/schema';

// ─────────────────────────── HERO ────────────────────────────
// Copy on white to the left, sitting on a large pale circle; on the right a
// framed photograph that cross-fades through our people with the people
// they look after, at home, out and about, and in care.
const HERO_SLIDES = [
  { src: '/images/why-hero-companion.jpg',         pos: 'object-[60%_30%]', alt: 'A PowerCare carer laughing with an older woman outdoors' },
  { src: '/images/hero-home-visit.jpg',            pos: 'object-center',    alt: 'A PowerCare support worker visiting an older woman at home' },
  { src: '/images/activity-wheelchair-outing.jpg', pos: 'object-[50%_35%]', alt: 'A support worker taking an older woman out in her wheelchair' },
  { src: '/images/activity-exercise-class.jpg',    pos: 'object-center',    alt: 'An instructor and an older man smiling during a seated exercise class' },
  { src: '/images/hero-home-assessment.jpg',       pos: 'object-center',    alt: 'A PowerCare nurse talking through care plans with an older man at home' },
];
const SLIDE_MS = 5000;

const HeroSlides = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative h-72 sm:h-96 lg:h-full rounded-[1.75rem] overflow-hidden bg-ink-100"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {HERO_SLIDES.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={i === index ? s.alt : ''}
          aria-hidden={i === index ? undefined : 'true'}
          fetchPriority={i === 0 ? 'high' : undefined}
          loading={i === 0 ? undefined : 'lazy'}
          className={`absolute inset-0 w-full h-full object-cover ${s.pos}
                      transition-opacity duration-1000 ease-out-soft ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 rounded-full bg-white/80 px-3 py-2">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show photo ${i + 1} of ${HERO_SLIDES.length}`}
            aria-current={i === index ? 'true' : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-6 bg-primary-700' : 'w-2 bg-primary-300 hover:bg-primary-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Hero = () => (
  <section className="relative bg-white overflow-hidden lg:flex-1 lg:min-h-0 lg:flex">
    <Helmet>
      <link rel="preload" as="image" href={HERO_SLIDES[0].src} fetchPriority="high" />
    </Helmet>

    {/* A large pale circle the copy sits on. */}
    <span
      className="absolute -left-[22rem] top-1/2 -translate-y-1/2 w-[46rem] h-[46rem] sm:-left-[18rem] sm:w-[52rem] sm:h-[52rem]
                 lg:-left-[14rem] lg:w-[max(60rem,calc(50vw+14rem))] lg:h-[max(60rem,calc(50vw+14rem))] rounded-full border border-primary-100 bg-primary-50"
      aria-hidden="true"
    />

    <div className="relative container-custom w-full grid lg:grid-cols-12 gap-x-12 items-center pb-12 lg:py-8">
      <div className="lg:col-span-6 py-14 lg:py-0">
        <span className="block font-mono text-sm font-semibold uppercase tracking-[3px] text-primary-600">
          Healthcare staffing in Ontario
        </span>
        <h1 className="mt-5 text-display-xl font-heading font-extrabold text-primary-700 text-balance">
          Good care starts with good people.
        </h1>
        <p className="mt-5 text-xl text-ink-600">
          Care that feels like home.
        </p>
        <Link to="/contact" className="btn-outline mt-9">
          Get in touch <ArrowRight size={16} />
        </Link>
      </div>

      <div className="lg:col-span-6 lg:self-stretch">
        <HeroSlides />
      </div>
    </div>
  </section>
);

// ─────────────────────────── THE PROMISE ────────────────────────────
// Three pictures of the work, each with a short caption. The caption sits
// under its photograph rather than over it, so the picture keeps its light.
const PILLARS = [
  {
    title: 'Compassion, every shift',
    image: '/images/greeting-hands.jpg',
    alt:   'A carer taking an older woman’s hands as she arrives',
    desc:  'The small kindnesses matter as much as the clinical work — a hand held, a name remembered, time taken.',
  },
  {
    title: 'Hands your residents can trust',
    image: '/images/ltc-kneeling.jpg',
    alt:   'A care worker kneeling to talk with a resident at eye level',
    desc:  'Everyone we place is trained with us and known to us before they ever set foot on your floor.',
  },
  {
    title: 'Attention to the smallest things',
    image: '/images/resident-bedside.jpg',
    // The resident sits left of frame; a centred crop leaves her out.
    pos:   'object-[30%_50%]',
    alt:   'A resident smiling in her room as a care worker passes',
    desc:  'Noticing what changed overnight, what was not eaten, who seemed quiet. Care is made of details.',
  },
];

const ThePromise = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
        <div className="lg:col-span-4">
          <span className="section-badge">Our promise</span>
          <h2 className="text-display-sm font-heading font-semibold text-primary-700 text-balance">
            What we hold ourselves to
          </h2>
          <p className="mt-5 text-ink-600 leading-relaxed text-pretty">
            Families trust someone else with the person they love. That trust is the
            whole of our work, and these are the three things we will not let slip.
          </p>
        </div>

        <RevealGroup className="lg:col-span-8 grid sm:grid-cols-3 gap-6">
          {PILLARS.map(({ title, image, alt, desc, pos }) => (
            <RevealItem key={title}>
              <figure>
                <img
                  src={image}
                  alt={alt}
                  loading="lazy"
                  className={`w-full aspect-[3/4] object-cover ${pos || 'object-center'} rounded-2xl`}
                />
                <figcaption>
                  <h3 className="mt-5 font-heading font-semibold text-ink-900 text-lg leading-snug text-balance min-h-[3.1rem]">
                    {title}
                  </h3>
                  <p className="mt-2 text-ink-600 text-base leading-relaxed text-pretty">
                    {desc}
                  </p>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  </section>
);

// ─────────────────────────── PROFESSIONS ────────────────────────────
// The first eight roles from the shared list, each carrying its photograph.
// Order matches /services exactly, because both read the same array.
const ProfessionsPreview = () => (
  <RoleCarousel
    title="Healthcare Professionals We Place"
    intro={<>Not sure who you need? <Link to="/contact" className="font-semibold text-primary-700 underline-offset-4 hover:underline">Talk to us</Link>.</>}
    items={services.slice(0, 8)}
  />
);

// ─────────────────────────── CARE SETTINGS ────────────────────────────
// The page named the people we place but never the places they work, so a
// reader had no sense of the range. Titles and lines are read from the same
// array /industries uses, which is what keeps the two from drifting apart.
const settingIcons = { Building2, Home: HomeIcon, Heart, Users, Activity, Brain };

const CareSettings = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="Care settings"
        title="Where Our People Work"
        subtitle="Across Ontario — in long-term care and retirement homes, in group homes and therapy programmes, and in people’s own living rooms."
        centered={false}
      />

      <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-9 mb-9">
        {industries.map((ind) => {
          const Icon = settingIcons[ind.icon] || Heart;
          return (
            <RevealItem key={ind.id}>
              <Icon size={40} className="text-primary-700" aria-hidden="true" />
              {/* One of these titles runs to two lines; the floor keeps every
                  body paragraph in a row starting on the same line. */}
              <h3 className="mt-4 font-heading font-semibold text-ink-900 text-base leading-snug text-balance min-h-[3.1rem]">
                {ind.title}
              </h3>
              <p className="mt-2 text-ink-600 text-base leading-relaxed text-pretty">
                {ind.value}
              </p>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <Link to="/industries" className="link-arrow text-base">
        Explore more <ArrowRight size={16} />
      </Link>
    </div>
  </section>
);

const Home = () => (
  <main>
    <SEO page="home" extraSchemas={[faqSchema(homeFAQs)]} />
    {/* On laptops the hero and the credentials row share exactly the first
        screen under the fixed header. */}
    <div className="lg:flex lg:flex-col lg:h-[calc(100dvh-5rem)] lg:min-h-[600px] lg:max-h-[1000px] lg:pb-2">
      <Hero />
      <CredentialBand eager />
    </div>
    <ThePromise />
    <ProfessionsPreview />
    <CareSettings />
    <FAQ
      faqs={homeFAQs}
      title="Frequently Asked Questions"
      subtitle="The things people most often want to know about PowerCare."
    />
  </main>
);

export default Home;
