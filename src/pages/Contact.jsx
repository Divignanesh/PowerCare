import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  Phone, Envelope as Mail, MapPin, CheckCircle as CheckCircle2,
} from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import PageHero from '../components/ui/PageHero';
import FAQ from '../components/ui/FAQ';
import { contactFAQs } from '../data/faqs';
import CredentialBadges from '../components/ui/CredentialBadges';
import { PRIMARY_CREDENTIALS } from '../data/credentials';
import SEO, { faqSchema } from '../components/seo/SEO';
import { useFormSubmit } from '../lib/submitForm';
import { Honeypot, FormError } from '../components/ui/FormStatus';
import { PHONE_ENABLED, PHONE, PHONE_HREF, EMAIL, EMAIL_HREF, HIRING_EMAIL, HIRING_EMAIL_HREF, ADDRESS, MAP_HREF } from '../data/contact';

// ── HERO ─────────────────────────────────────────────────────
const Hero = () => (
  <PageHero
    variant="overlay"
    large
    eyebrow="Contact Us"
    title="We're here to talk"
    image="/images/hands-reach.jpg"
    imageAlt="Two hands reaching towards one another"
    imagePos="object-center"
  />
);

// ── SUCCESS MESSAGE ───────────────────────────────────────────
const SuccessMessage = () => (
  <div className="text-center py-10" role="status">
    <CheckCircle2 size={44} className="text-primary-700 mx-auto mb-4" />
    <h4 className="text-xl font-heading font-semibold text-ink-900 mb-3">Message Sent!</h4>
    <p className="text-ink-600 max-w-xs mx-auto text-pretty">
      Thank you for reaching out. Someone from our team will be in touch soon.
    </p>
  </div>
);

// ── FACILITY FORM ─────────────────────────────────────────────
const FacilityForm = () => {
  // A request that arrives from a role card carries that role with it.
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', facility: '',
    role: params.get('role') ?? '', urgency: '', message: '',
  });
  const [consent, setConsent] = useState(false);
  const [trap, setTrap] = useState('');
  const { status, error, send } = useFormSubmit('Staff request');
  if (status === 'sent') return <SuccessMessage />;

  const onSubmit = (e) => {
    e.preventDefault();
    const urgency = e.currentTarget.querySelector('#f-urgency');
    send([
      ['Name', form.name],
      ['Phone', form.phone],
      ['Email', form.email],
      ['Facility', form.facility],
      ['Role(s) needed', form.role],
      ['Urgency', form.urgency ? urgency.selectedOptions[0].text : ''],
      ['Details', form.message],
    ], null, trap);
  };

  return (
    <form onSubmit={onSubmit} className="relative space-y-4">
      <Honeypot value={trap} onChange={setTrap} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="f-name" className="field-label">Your Name *</label>
          <input id="f-name" type="text" required placeholder="Full name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
        </div>
        <div>
          <label htmlFor="f-phone" className="field-label">Phone *</label>
          <input id="f-phone" type="tel" required placeholder="(647) 000-0000" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
        </div>
      </div>
      <div>
        <label htmlFor="f-email" className="field-label">Email Address *</label>
        <input id="f-email" type="email" required placeholder="your@facility.ca" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
      </div>
      <div>
        <label htmlFor="f-facility" className="field-label">Facility Name *</label>
        <input id="f-facility" type="text" required placeholder="Name of your healthcare facility" value={form.facility}
          onChange={(e) => setForm({ ...form, facility: e.target.value })} className="input" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="f-role" className="field-label">Role(s) Needed *</label>
          <input id="f-role" type="text" required placeholder="e.g. RN, PSW, DSW" value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })} className="input" />
        </div>
        <div>
          <label htmlFor="f-urgency" className="field-label">Urgency</label>
          <select id="f-urgency" value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value })} className="input">
            <option value="">Select urgency</option>
            <option value="emergency">Emergency (same day)</option>
            <option value="asap">ASAP (within 24 hrs)</option>
            <option value="planned">Planned (this week)</option>
            <option value="ongoing">Ongoing partnership</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="f-message" className="field-label">Additional Details</label>
        <textarea id="f-message" rows={3} placeholder="Shift details, special requirements, preferred dates..." value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })} className="input resize-none" />
      </div>
      <label className="flex items-start gap-3 text-sm text-ink-600 leading-relaxed">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-ink-300 text-primary-700 focus:ring-primary-500"
        />
        <span>
          I agree to PowerCare&rsquo;s{' '}
          <Link to="/privacy" className="text-primary-700 font-medium underline underline-offset-2">Privacy Policy</Link>
          ; my details are used only to respond to this request. <span className="font-semibold">(PIPEDA)</span>
        </span>
      </label>
      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : <>Send us a note <ArrowRight size={16} /></>}
      </button>
      <FormError message={error} />
    </form>
  );
};

// ── PROFESSIONAL FORM ─────────────────────────────────────────
const ProfessionalForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', location: '', message: '' });
  const [trap, setTrap] = useState('');
  const { status, error, send } = useFormSubmit('Job enquiry');
  if (status === 'sent') return <SuccessMessage />;

  const onSubmit = (e) => {
    e.preventDefault();
    send([
      ['Name', form.name],
      ['Phone', form.phone],
      ['Email', form.email],
      ['Current role / credential', form.role],
      ['Preferred location', form.location],
      ['About them', form.message],
    ], null, trap);
  };

  return (
    <form onSubmit={onSubmit} className="relative space-y-4">
      <Honeypot value={trap} onChange={setTrap} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="p-name" className="field-label">Full Name *</label>
          <input id="p-name" type="text" required placeholder="Your name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
        </div>
        <div>
          <label htmlFor="p-phone" className="field-label">Phone *</label>
          <input id="p-phone" type="tel" required placeholder="(647) 000-0000" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
        </div>
      </div>
      <div>
        <label htmlFor="p-email" className="field-label">Email *</label>
        <input id="p-email" type="email" required placeholder="your@email.com" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="p-role" className="field-label">Current Role / Credential</label>
          <input id="p-role" type="text" placeholder="e.g. PSW, RN, DSW" value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })} className="input" />
        </div>
        <div>
          <label htmlFor="p-loc" className="field-label">Preferred Location</label>
          <input id="p-loc" type="text" placeholder="City or region" value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })} className="input" />
        </div>
      </div>
      <div>
        <label htmlFor="p-message" className="field-label">Tell Us About Yourself</label>
        <textarea id="p-message" rows={4} placeholder="Experience, availability, what you're looking for..." value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })} className="input resize-none" />
      </div>
      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : <>Tell us about yourself <ArrowRight size={16} /></>}
      </button>
      <FormError message={error} email={HIRING_EMAIL} />
      <p className="text-sm text-ink-500 text-center">
        Or visit our full{' '}
        <Link to="/careers" className="text-primary-700 font-medium underline underline-offset-2 hover:text-primary-800">
          Careers
        </Link>{' '}
        page to apply.
      </p>
    </form>
  );
};

// ── GENERAL FORM ──────────────────────────────────────────────
const GeneralForm = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [trap, setTrap] = useState('');
  const { status, error, send } = useFormSubmit('General enquiry');
  if (status === 'sent') return <SuccessMessage />;

  const onSubmit = (e) => {
    e.preventDefault();
    send([
      ['Name', form.name],
      ['Email', form.email],
      ['Subject', form.subject],
      ['Message', form.message],
    ], null, trap);
  };

  return (
    <form onSubmit={onSubmit} className="relative space-y-4">
      <Honeypot value={trap} onChange={setTrap} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="g-name" className="field-label">Your Name *</label>
          <input id="g-name" type="text" required placeholder="Full name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
        </div>
        <div>
          <label htmlFor="g-email" className="field-label">Email *</label>
          <input id="g-email" type="email" required placeholder="your@email.com" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
        </div>
      </div>
      <div>
        <label htmlFor="g-subject" className="field-label">Subject *</label>
        <input id="g-subject" type="text" required placeholder="What is this about?" value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input" />
      </div>
      <div>
        <label htmlFor="g-message" className="field-label">Message *</label>
        <textarea id="g-message" rows={6} required placeholder="Tell us more..." value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })} className="input resize-none" />
      </div>
      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : <>Send us a note <ArrowRight size={16} /></>}
      </button>
      <FormError message={error} />
    </form>
  );
};

// ── CONTACT FORMS SECTION ─────────────────────────────────────
const ContactForms = () => {
  const [tab, setTab] = useState('facility');
  const reduceMotion = useReducedMotion();

  const tabs = [
    { id: 'facility',     label: 'I Need Staff'         },
    { id: 'professional', label: "I'm Looking for Work" },
    { id: 'general',      label: 'General Enquiry'      },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">

          {/* Left info — the visitor already knows why they're here, so this
              is just who we are and how to reach us directly. */}
          <div className="lg:col-span-5">
            <h2 className="text-display-sm font-heading font-semibold text-primary-700 mb-6 text-balance">
              PowerCare Health Services
            </h2>
            <p className="text-ink-600 leading-relaxed mb-9 text-pretty">
              Whether you need staff for your home or facility, or want to join our team,
              we&rsquo;re here to help every step of the way.
            </p>

            <h3 className="font-heading font-semibold text-ink-900 text-lg mb-6">
              Prefer to speak with us directly?
            </h3>
            <ul className="space-y-6">
              {[
                { icon: MapPin, href: MAP_HREF,   lines: [ADDRESS.street, `${ADDRESS.locality}, ${ADDRESS.region} ${ADDRESS.postalCode}`], external: true },
                { icon: Mail,   href: EMAIL_HREF, lines: [EMAIL] },
                { icon: Mail,   href: HIRING_EMAIL_HREF, lines: [HIRING_EMAIL, 'Jobs and applications'] },
                ...(PHONE_ENABLED ? [{ icon: Phone, href: PHONE_HREF, lines: [PHONE] }] : []),
              ].map(({ icon: Icon, href, lines, external }) => (
                <li key={lines[0]} className="flex gap-4">
                  <Icon size={24} className="text-primary-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-ink-900 text-base leading-relaxed underline underline-offset-4 decoration-ink-300
                               hover:text-primary-700 hover:decoration-primary-400 transition-colors"
                  >
                    {lines.map((line) => <span key={line} className="block">{line}</span>)}
                  </a>
                </li>
              ))}
            </ul>

            {/* Fills the column beside the taller form, and answers the
                question every sender has: what happens now? No reply times
                are promised — the FAQ deliberately doesn't either. */}
            <div className="mt-12 bg-surface rounded-2xl border border-ink-200 p-7">
              <h3 className="font-heading font-semibold text-ink-900 text-lg mb-6">
                What to Expect After You Contact Us
              </h3>
              <ol className="space-y-5">
                {[
                  ['We receive it',            'Your message comes straight to our team. If it’s urgent, say so in the first line.'],
                  ['We reach out to you',      'A coordinator or recruiter gets in touch and asks anything else we need to help.'],
                  ['We move to next steps',    'For facilities, who we can send and when. For professionals, an interview and a credential check.'],
                ].map(([title, desc], i) => (
                  <li key={title} className="flex gap-4">
                    <span className="index-num flex-shrink-0 w-6 mt-1">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <div className="font-heading font-semibold text-ink-900">{title}</div>
                      <p className="text-ink-600 text-base mt-1 leading-relaxed text-pretty">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7 bg-surface rounded-2xl border border-ink-200 overflow-hidden">
            <div role="tablist" aria-label="Enquiry type" className="flex bg-white">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={tab === t.id}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => setTab(t.id)}
                  className={`flex-1 px-3 py-4 font-mono text-xs font-semibold uppercase tracking-widest
                              transition-colors duration-200 border-b-2 -mb-px ${
                    tab === t.id
                      ? 'border-primary-600 text-primary-700'
                      : 'border-transparent text-ink-500 hover:text-ink-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  role="tabpanel"
                  id={`panel-${tab}`}
                  aria-labelledby={`tab-${tab}`}
                  initial={typeof window === 'undefined' ? false : reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  {tab === 'facility'     && <FacilityForm />}
                  {tab === 'professional' && <ProfessionalForm />}
                  {tab === 'general'      && <GeneralForm />}
                </motion.div>
              </AnimatePresence>

              {/* Reassurance at the point of conversion. */}
              <CredentialBadges
                variant="form"
                only={PRIMARY_CREDENTIALS.slice(0, 3)}
                className="mt-7 pt-6"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── JOIN OUR TEAM ────────────────────────────────────────────
// A closing pointer for job seekers who landed on Contact looking for work.
const JoinOurTeam = () => (
  <section className="relative overflow-hidden section-padding">
    <img
      src="/images/care-team.jpg"
      alt=""
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover object-[50%_25%]"
    />
    {/* A white wash so the dark type holds up over the faces behind it. */}
    <div className="absolute inset-0 bg-white/70" aria-hidden="true" />

    <div className="relative container-custom text-center max-w-2xl">
      <h2 className="text-display-sm font-heading font-semibold text-primary-700 text-balance">
        Looking to Join Our Team?
      </h2>
      <p className="mt-4 text-ink-800 leading-relaxed text-pretty">
        Explore career opportunities and learn what it&rsquo;s like to work with PowerCare.
      </p>
      <Link to="/careers" className="btn-primary mt-8">
        Explore careers <ArrowRight size={16} />
      </Link>
    </div>
  </section>
);

const Contact = () => (
  <main>
    <SEO page="contact" extraSchemas={[faqSchema(contactFAQs)]} />
    <Hero />
    <ContactForms />
    <FAQ faqs={contactFAQs} badge="Get in Touch" title="Contact & Support Questions" subtitle="A few things people often ask before they write." aside={false} />
    <JoinOurTeam />
  </main>
);

export default Contact;
