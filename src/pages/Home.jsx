import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import FAQ from '../components/ui/FAQ';
import { services } from '../data/services';
import { homeFAQs } from '../data/faqs';
import { RevealGroup, RevealItem } from '../components/ui/Reveal';
import CredentialBand from '../components/ui/CredentialBand';
import SEO, { faqSchema } from '../components/seo/SEO';

// ─────────────────────────── HERO ────────────────────────────
// The photograph is shown as it was taken. One line of type beneath it, a
// rule, and a sentence — nothing else above the fold. Anything that asks the
// reader for something belongs further down the page.
const Hero = () => (
  <section className="bg-white">
    <div className="relative flex items-center min-h-[360px] sm:min-h-[430px] lg:min-h-[480px]">
      <img
        src="/images/hero-elder-care.jpg"
        alt="A PowerCare nurse talking with an older man during a visit"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      {/* A single flat tone, not a ramp — enough to carry white type without
          draining the light out of the photograph. */}
      <div className="absolute inset-0 bg-ink-900/38" aria-hidden="true" />

      <div className="relative container-custom py-10 text-center">
        <h1 className="text-display-lg font-heading font-semibold text-white max-w-4xl mx-auto text-balance">
          We care for your residents like our own.
        </h1>
        <span className="block w-16 h-px bg-white/50 mx-auto my-6" aria-hidden="true" />
        <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed text-pretty">
          Every day, PowerCare nurses, support workers and therapists look after the
          people who once looked after us — with dignity, patience and warmth.
        </p>
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
    image: '/images/elderly-hands.jpg',
    alt:   'A caregiver holding an older person’s hands',
    desc:  'The small kindnesses matter as much as the clinical work — a hand held, a name remembered, time taken.',
  },
  {
    title: 'Hands your residents can trust',
    image: '/images/senior-care.jpg',
    alt:   'A care worker sitting close with an older woman, a hand on her arm',
    desc:  'Everyone we place is trained with us and known to us before they ever set foot on your floor.',
  },
  {
    title: 'Attention to the smallest things',
    image: '/images/dementia-care.jpg',
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
          <h2 className="text-display-sm font-heading font-semibold text-ink-900 text-balance">
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
                  <p className="mt-2 text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">
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
const ProfessionsPreview = () => {
  const featured = services.slice(0, 8);

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <SectionHeader
          badge="The people we place"
          title="Healthcare Professionals We Place"
          subtitle="From bedside nursing and personal support through to regulated allied health — occupational therapy, speech-language pathology, psychotherapy and dietetics."
          centered={false}
        />

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-5 mb-9">
          {featured.map((s) => (
            <RevealItem key={s.id} className="h-full">
              <Link
                to="/services"
                className="group flex flex-col h-full rounded-2xl bg-white overflow-hidden
                           transition-colors duration-300 ease-out-soft hover:bg-primary-50"
              >
                <span className="block h-40 overflow-hidden bg-ink-100">
                  <img
                    src={s.image}
                    alt=""
                    loading="lazy"
                    className={`w-full h-full object-cover ${s.imagePos || 'object-top'}`}
                  />
                </span>

                <span className="flex flex-col flex-1 p-5">
                  <span className="block font-mono text-[0.625rem] font-semibold uppercase tracking-widest text-primary-700 mb-2">
                    {s.category}
                  </span>
                  <span className="block text-[1.0625rem] font-heading font-semibold text-ink-900 mb-2 leading-snug min-h-[2.9rem] transition-colors group-hover:text-primary-700">
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

        <Link to="/services" className="link-arrow text-base">
          See everyone we place <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

const Home = () => (
  <main>
    <SEO page="home" extraSchemas={[faqSchema(homeFAQs)]} />
    <Hero />
    <CredentialBand />
    <ThePromise />
    <ProfessionsPreview />
    <FAQ
      faqs={homeFAQs}
      title="Frequently Asked Questions"
      subtitle="The things people most often want to know about PowerCare."
    />
  </main>
);

export default Home;
