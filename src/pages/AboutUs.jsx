import {
  Target, Eye, Lightbulb,
  HandHeart, GraduationCap, Sparkles, HeartHandshake,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import PageHero from '../components/ui/PageHero';
import FAQ from '../components/ui/FAQ';
import { aboutFAQs } from '../data/faqs';
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal';
import CredentialBand from '../components/ui/CredentialBand';
import SEO, { faqSchema } from '../components/seo/SEO';

const Hero = () => (
  <PageHero
    variant="center"
    eyebrow="Our Story"
    title="About PowerCare"
    subtitle="We look after the people who once looked after us — and the families who trust us with them."
    image="/images/psw-care.jpg"
    imageAlt="A PowerCare support worker holding a resident's hands"
    imagePos="object-center"
  />
);

// ─────────────────────────── ABOUT ────────────────────────────
// Two photographs, offset and overlapping, with the prose beside them.
const AboutIntro = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="grid lg:grid-cols-12 gap-x-14 gap-y-12 items-center">
        <Reveal className="lg:col-span-6">
          <div className="relative">
            <img
              src="/images/therapy-pets.jpg"
              alt="PowerCare staff and residents during an afternoon activity"
              loading="lazy"
              /* The carer and the resident are left of frame; a centred crop
                 leaves only the dog. */
              className="w-[80%] aspect-[3/4] object-cover object-left rounded-2xl"
            />
            <img
              src="/images/home-respite.jpg"
              alt="A support worker sitting with a client and their family at home"
              loading="lazy"
              className="hidden sm:block absolute right-0 top-[20%] w-[54%] aspect-[3/4]
                         object-cover object-top rounded-2xl ring-[12px] ring-white"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <span className="section-badge">About us</span>
          <h2 className="text-display-sm font-heading font-semibold text-ink-900 mb-7 text-balance">
            We care about the people you care about
          </h2>
          <p className="text-ink-600 leading-relaxed mb-5 text-pretty">
            Everyone deserves to be looked after well. Growing older, or living with illness
            or disability, should never cost someone their dignity, their routines, or their
            place among the people who love them. How we care for one another at the most
            vulnerable point of a life says a great deal about all of us.
          </p>
          <p className="text-ink-600 leading-relaxed mb-5 text-pretty">
            That belief is why PowerCare exists. We were started by people who had done the
            work themselves — nights on the floor, mornings handing over, the quiet weight of
            looking after someone else&rsquo;s parent. We knew what a good day felt like, and we
            knew what it cost when the right person did not arrive.
          </p>
          <p className="text-ink-600 leading-relaxed text-pretty">
            So we built something gentler. We get to know every person before we send them
            anywhere, we teach them the way we would want our own family cared for, and we
            stay close long after they arrive. Nobody here is a shift to be filled.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────── WHERE WE CARE ────────────────────────────
const DEPENDABLE = [
  {
    title: 'Caring for older adults',
    image: '/images/senior-walker.jpg',
    pos:   'object-center',
    alt:   'A care worker walking beside an older woman using a walker',
    desc:  'Long-term care homes and retirement residences, where our people become part of your team rather than a face passing through.',
  },
  {
    title: 'Support closer to home',
    image: '/images/home-visit.jpg',
    pos:   'object-center',
    alt:   'A support worker checking on a client during a home visit',
    desc:  'Home, community and respite care, so people can stay where they are most themselves for as long as they are able.',
  },
  {
    title: 'Specialised and complex care',
    image: '/images/group-home.jpg',
    pos:   'object-center',
    alt:   'A developmental support worker with a resident in a group home',
    desc:  'Group homes, developmental services, rehabilitation and mental health — settings that ask for patience as much as skill.',
  },
];

const DependableCare = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom">
      <div className="text-center mb-12">
        <span className="section-badge">Pride in how we care</span>
        <h2 className="text-display-sm font-heading font-semibold text-ink-900 text-balance">
          Care you can depend on
        </h2>
      </div>

      <RevealGroup className="grid sm:grid-cols-3 gap-x-8 gap-y-10">
        {DEPENDABLE.map(({ title, image, pos, alt, desc }) => (
          <RevealItem key={title}>
            <figure>
              <img
                src={image}
                alt={alt}
                loading="lazy"
                className={`w-full aspect-[4/3] object-cover ${pos} rounded-2xl`}
              />
              <figcaption>
                <h3 className="mt-6 font-heading font-semibold text-ink-900 text-lg leading-snug text-balance min-h-[3.1rem]">
                  {title}
                </h3>
                <p className="mt-2.5 text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">
                  {desc}
                </p>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  </section>
);

const MissionVisionValues = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="What guides us"
        title="Mission, Vision & Values"
        subtitle="Why we come in, and what we hope to leave behind."
        centered={false}
      />
      <RevealGroup className="grid md:grid-cols-3 auto-rows-fr gap-x-10 gap-y-9 mb-12">
        {[
          { icon: Target,    title: 'Our Mission',  content: 'That every older person in Ontario is looked after by someone patient, prepared and glad to be there — whatever the hour, wherever they live.' },
          { icon: Eye,       title: 'Our Vision',   content: 'Communities where growing older is not something to be feared, because the care around you is steady and kind.' },
          { icon: Lightbulb, title: 'Our Approach', content: 'Know the people we send, teach them well, and stay close enough to notice when something is not right.' },
        ].map(({ icon: Icon, title, content }) => (
          <RevealItem key={title} className="h-full">
            <Icon size={22} strokeWidth={1.6} className="text-primary-600" />
            <h3 className="text-xl font-heading font-semibold text-ink-900 mt-5 mb-3">{title}</h3>
            <p className="text-ink-600 leading-relaxed text-pretty">{content}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <h3 className="font-mono text-[0.6875rem] uppercase tracking-widest text-primary-700 mb-5">What we value</h3>
      <ul className="flex flex-wrap gap-2.5">
        {['Kindness', 'Patience', 'Honesty', 'Dignity', 'Respect'].map((v) => (
          <li key={v} className="rounded-full bg-surface px-5 py-2 font-semibold text-ink-900">
            {v}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// ─────────────────────────── WHAT WE ARE KNOWN FOR ────────────────────
const KnownFor = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom">
      <div className="text-center mb-12">
        <span className="section-badge">Our speciality</span>
        <h2 className="text-display-sm font-heading font-semibold text-ink-900 text-balance">
          What we are known for
        </h2>
      </div>

      <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
        {[
          { icon: HandHeart,      title: 'A person, never a case', desc: 'Everyone we place is asked to see the person first — their history, their routines, and what makes a day a good one.' },
          { icon: GraduationCap,  title: 'An experienced team',    desc: 'Our training is written and taught by registered professionals who have spent their working lives on Ontario floors.' },
          { icon: Sparkles,       title: 'We fit ourselves to you', desc: 'Every home runs a little differently. We learn yours, rather than asking you to accommodate ours.' },
          { icon: HeartHandshake, title: 'We stay close',          desc: 'We ring after the first shift and the ones after it. If something is not right, we would rather hear it early.' },
        ].map(({ icon: Icon, title, desc }) => (
          <RevealItem key={title}>
            <Icon size={22} strokeWidth={1.6} className="text-primary-600 mb-5" />
            <h3 className="font-heading font-semibold text-ink-900 text-lg leading-snug mb-2.5 text-balance min-h-[3.1rem]">{title}</h3>
            <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">{desc}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  </section>
);

const AboutUs = () => (
  <main>
    <SEO page="about" extraSchemas={[faqSchema(aboutFAQs)]} />
    <Hero />
    <CredentialBand />
    <AboutIntro />
    <DependableCare />
    <MissionVisionValues />
    <KnownFor />
    <FAQ
      faqs={aboutFAQs}
      badge="About PowerCare"
      title="Questions About Our Company"
      subtitle="A little more about who we are and how we work."
    />
  </main>
);

export default AboutUs;
