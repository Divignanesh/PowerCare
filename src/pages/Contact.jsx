import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2,
  Building2, User, MessageSquare
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import PageHero from '../components/ui/PageHero';
import FAQ from '../components/ui/FAQ';
import { contactFAQs } from '../data/faqs';
import CredentialBadges from '../components/ui/CredentialBadges';
import { PRIMARY_CREDENTIALS } from '../data/credentials';
import SEO, { faqSchema } from '../components/seo/SEO';

// ── HERO ─────────────────────────────────────────────────────
const Hero = () => (
  <PageHero
    variant="center"
    eyebrow="Contact Us"
    title="Talk to a Coordinator"
    subtitle="Whether you need staffing support or are looking for your next healthcare role — we're here and ready to help, 24 hours a day."
    image="/images/reception-desk.jpg"
    imageAlt="A PowerCare coordinator with staff at a facility reception desk"
  >
    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
      <a href="tel:+16474000000" className="btn-accent">
        <Phone size={15} /> Call 24/7 Dispatch
      </a>
      <a href="mailto:info@powercarestaffing.ca" className="btn-white">
        <Mail size={15} /> Email Us
      </a>
    </div>
  </PageHero>
);

// ── CONTACT INFO BAR ─────────────────────────────────────────
const ContactInfo = () => (
  <section className="bg-primary-50 py-12">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-l border-primary-200">
        {[
          { icon: Phone,  title: 'Call Us',            lines: ['+1 (647) 400-0000', 'Mon–Fri: 8am–8pm ET'],             href: 'tel:+16474000000' },
          { icon: Mail,   title: 'Email Us',           lines: ['info@powercarestaffing.ca', 'Response within 4 hours'], href: 'mailto:info@powercarestaffing.ca' },
          { icon: MapPin, title: 'Service Area',       lines: ['Greater Toronto Area', 'Rural Ontario Communities'],    href: null },
          { icon: Clock,  title: 'Emergency Staffing', lines: ['24/7 Dispatch Available', 'Same-day coverage'],         href: 'tel:+16474000000' },
        ].map(({ icon: Icon, title, lines, href }) => (
          <div key={title} className="text-ink-900 border-r border-b sm:border-b-0 border-primary-200 px-6 py-7">
            <div className="flex items-center gap-2.5 mb-4">
              <Icon size={16} strokeWidth={1.8} className="text-primary-600 flex-shrink-0" />
              <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-primary-700">{title}</span>
            </div>
            {lines.map((line, i) => (
              href && i === 0 ? (
                <a key={line} href={href} className="block text-ink-900 text-[0.9375rem] font-medium hover:text-primary-600 transition-colors">
                  {line}
                </a>
              ) : (
                <div key={line} className="text-ink-600 text-sm mt-1">{line}</div>
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── SUCCESS MESSAGE ───────────────────────────────────────────
const SuccessMessage = () => (
  <div className="text-center py-10" role="status">
    <CheckCircle2 size={40} strokeWidth={1.5} className="text-primary-600 mx-auto mb-4" />
    <h4 className="text-xl font-heading font-semibold text-ink-900 mb-3">Message Sent!</h4>
    <p className="text-ink-600 max-w-xs mx-auto text-pretty">
      Thank you for reaching out. A member of our team will contact you within 4 business hours.
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
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return <SuccessMessage />;

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
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
      <button type="submit" className="btn-primary w-full">
        Submit Staffing Request <ArrowRight size={16} />
      </button>
    </form>
  );
};

// ── PROFESSIONAL FORM ─────────────────────────────────────────
const ProfessionalForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', location: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return <SuccessMessage />;

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
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
      <button type="submit" className="btn-primary w-full">
        Connect With a Recruiter <ArrowRight size={16} />
      </button>
      <p className="text-sm text-ink-500 text-center">
        Or visit our full{' '}
        <Link to="/careers" className="text-primary-700 font-medium underline underline-offset-2 hover:text-primary-800">
          Find a Job
        </Link>{' '}
        page to apply.
      </p>
    </form>
  );
};

// ── GENERAL FORM ──────────────────────────────────────────────
const GeneralForm = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return <SuccessMessage />;

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
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
      <button type="submit" className="btn-primary w-full">
        Send Message <ArrowRight size={16} />
      </button>
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

          {/* Left info */}
          <div className="lg:col-span-5">
            <span className="section-badge">Get in Touch</span>
            <h2 className="text-display-sm font-heading font-semibold text-ink-900 mb-6 text-balance">
              How Can We Help You?
            </h2>
            <p className="text-ink-600 leading-relaxed mb-7 text-pretty">
              Select your enquiry type below. Whether you're a healthcare facility looking for staffing support or a professional seeking career opportunities, we have the right team ready to assist.
            </p>

            <div className="space-y-5">
              {[
                { icon: Building2,     title: 'For Healthcare Facilities',    desc: 'Request staff, discuss a staffing strategy, or enquire about partnership opportunities.' },
                { icon: User,          title: 'For Healthcare Professionals', desc: 'Apply for roles, enquire about current openings, or connect with a recruiter.' },
                { icon: MessageSquare, title: 'General Enquiries',            desc: 'Any other question about PowerCare, our training programs, or our services.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 py-5">
                  <Icon size={19} strokeWidth={1.6} className="text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-heading font-semibold text-ink-900">{title}</div>
                    <div className="text-ink-600 text-[0.9375rem] mt-1 leading-relaxed text-pretty">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-primary-50 rounded-2xl p-7">
              <h3 className="font-heading font-semibold text-ink-900 text-lg mb-2">Need Immediate Staffing?</h3>
              <p className="text-ink-600 text-[0.9375rem] mb-6 text-pretty">
                For urgent, same-day staffing needs, call our 24/7 dispatch line directly.
              </p>
              <a href="tel:+16474000000" className="btn-primary w-full">
                <Phone size={15} />
                Call 24/7 Dispatch: +1 (647) 400-0000
              </a>
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
                  className={`flex-1 px-3 py-4 font-mono text-[0.6875rem] font-semibold uppercase tracking-widest
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
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
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

const Contact = () => (
  <main>
    <SEO page="contact" extraSchemas={[faqSchema(contactFAQs)]} />
    <Hero />
    <ContactInfo />
    <ContactForms />
    <FAQ faqs={contactFAQs} badge="Get in Touch" title="Contact & Support Questions" subtitle="Have questions before reaching out? Find answers here." />
  </main>
);

export default Contact;
