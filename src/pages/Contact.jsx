import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2,
  Building2, User, MessageSquare, ChevronDown
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import SEO from '../components/seo/SEO';

// ── HERO ─────────────────────────────────────────────────────
const PageHero = () => (
  <section className="relative pt-16 pb-12 bg-primary-900 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <span className="text-accent-500 text-xs font-bold tracking-widest uppercase mb-4 block">
        Contact Us
      </span>
      <h1 className="text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
        Contact Us
      </h1>
      <p className="text-sm text-white/50 max-w-xl mx-auto">
        Whether you need staffing support or are looking for your next healthcare role — we're here and ready to help.
      </p>
    </div>
  </section>
);

// ── CONTACT INFO BAR ─────────────────────────────────────────
const ContactInfo = () => (
  <section className="bg-primary-800 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Phone,  title: 'Call Us',           lines: ['+1 (647) 400-0000', 'Mon–Fri: 8am–8pm ET'],       href: 'tel:+16474000000' },
          { icon: Mail,   title: 'Email Us',           lines: ['info@powercarestaffing.ca', 'Response within 4 hours'], href: 'mailto:info@powercarestaffing.ca' },
          { icon: MapPin, title: 'Service Area',       lines: ['Greater Toronto Area', 'Rural Ontario Communities'], href: null },
          { icon: Clock,  title: 'Emergency Staffing', lines: ['24/7 Dispatch Available', 'Same-day coverage'],   href: 'tel:+16474000000' },
        ].map(({ icon: Icon, title, lines, href }) => (
          <div key={title} className="flex items-start gap-3 text-white">
            <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon size={15} className="text-accent-500" />
            </div>
            <div>
              <div className="font-semibold text-xs mb-1 text-white/60 uppercase tracking-wider">{title}</div>
              {lines.map((line, i) => (
                href && i === 0 ? (
                  <a key={line} href={href} className="block text-white text-sm hover:text-accent-500 transition-colors">{line}</a>
                ) : (
                  <div key={line} className="text-white/40 text-xs">{line}</div>
                )
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── SHARED FORM STYLES ────────────────────────────────────────
const inputCls = "w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors";
const labelCls = "block text-xs font-semibold text-slate-700 mb-1.5";

// ── SUCCESS MESSAGE ───────────────────────────────────────────
const SuccessMessage = () => (
  <div className="text-center py-6">
    <CheckCircle2 size={40} className="text-accent-500 mx-auto mb-3" />
    <h4 className="text-base font-bold font-heading text-slate-900 mb-2">Message Sent!</h4>
    <p className="text-slate-500 text-sm max-w-xs mx-auto">
      Thank you for reaching out. A member of our team will contact you within 4 business hours.
    </p>
  </div>
);

// ── FACILITY FORM ─────────────────────────────────────────────
const FacilityForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', facility: '', role: '', urgency: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return <SuccessMessage />;

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Your Name *</label>
          <input type="text" required placeholder="Full name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Phone *</label>
          <input type="tel" required placeholder="(647) 000-0000" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Email Address *</label>
        <input type="email" required placeholder="your@facility.ca" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Facility Name *</label>
        <input type="text" required placeholder="Name of your healthcare facility" value={form.facility}
          onChange={(e) => setForm({ ...form, facility: e.target.value })} className={inputCls} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Role(s) Needed *</label>
          <input type="text" required placeholder="e.g. RN, PSW, DSW" value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Urgency</label>
          <select value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value })} className={inputCls + ' bg-white'}>
            <option value="">Select urgency</option>
            <option value="emergency">Emergency (same day)</option>
            <option value="asap">ASAP (within 24 hrs)</option>
            <option value="planned">Planned (this week)</option>
            <option value="ongoing">Ongoing partnership</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelCls}>Additional Details</label>
        <textarea rows={3} placeholder="Shift details, special requirements, preferred dates..." value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputCls + ' resize-none'} />
      </div>
      <button type="submit" className="btn-primary w-full justify-center py-3 text-sm">
        Submit Staffing Request <ArrowRight size={15} />
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Full Name *</label>
          <input type="text" required placeholder="Your name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Phone *</label>
          <input type="tel" required placeholder="(647) 000-0000" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Email *</label>
        <input type="email" required placeholder="your@email.com" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Current Role / Credential</label>
          <input type="text" placeholder="e.g. PSW, RN, DSW" value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Preferred Location</label>
          <input type="text" placeholder="City or region" value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Tell Us About Yourself</label>
        <textarea rows={4} placeholder="Experience, availability, what you're looking for..." value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputCls + ' resize-none'} />
      </div>
      <button type="submit" className="btn-primary w-full justify-center py-3 text-sm">
        Connect With a Recruiter <ArrowRight size={15} />
      </button>
      <p className="text-xs text-slate-400 text-center">
        Or visit our full <Link to="/careers" className="text-accent-500 underline">Find a Job</Link> page to apply.
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Your Name *</label>
          <input type="text" required placeholder="Full name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input type="email" required placeholder="your@email.com" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Subject *</label>
        <input type="text" required placeholder="What is this about?" value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Message *</label>
        <textarea rows={6} required placeholder="Tell us more..." value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputCls + ' resize-none'} />
      </div>
      <button type="submit" className="btn-primary w-full justify-center py-3 text-sm">
        Send Message <ArrowRight size={15} />
      </button>
    </form>
  );
};

// ── CONTACT FORMS SECTION ─────────────────────────────────────
const ContactForms = () => {
  const [tab, setTab] = useState('facility');

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left info */}
          <div>
            <span className="section-badge">Get in Touch</span>
            <h2 className="section-title mb-4">How Can We Help You?</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-7">
              Select your enquiry type below. Whether you're a healthcare facility looking for staffing support or a professional seeking career opportunities, we have the right team ready to assist.
            </p>

            <div className="space-y-3">
              {[
                { icon: Building2,    title: 'For Healthcare Facilities',   desc: 'Request staff, discuss a staffing strategy, or enquire about partnership opportunities.' },
                { icon: User,         title: 'For Healthcare Professionals', desc: 'Apply for roles, enquire about current openings, or connect with a recruiter.' },
                { icon: MessageSquare, title: 'General Enquiries',          desc: 'Any other question about PowerCare, our training programs, or our services.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border border-slate-200 hover:border-accent-300 hover:bg-accent-50 transition-all">
                  <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-primary-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{title}</div>
                    <div className="text-slate-400 text-xs mt-0.5 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 bg-primary-900 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-2">Need Immediate Staffing?</h4>
              <p className="text-white/50 text-xs mb-4">
                For urgent, same-day staffing needs, call our 24/7 dispatch line directly.
              </p>
              <a href="tel:+16474000000" className="btn-accent text-sm w-full justify-center">
                <Phone size={14} />
                Call 24/7 Dispatch: +1 (647) 400-0000
              </a>
            </div>
          </div>

          {/* Right form — blends as a clean panel */}
          <div className="bg-surface rounded-xl border border-slate-200 overflow-hidden">
            {/* Tab switcher */}
            <div className="flex border-b border-slate-200 bg-white">
              {[
                { id: 'facility',     label: 'I Need Staff'         },
                { id: 'professional', label: "I'm Looking for Work" },
                { id: 'general',      label: 'General Enquiry'      },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex-1 px-3 py-3 text-xs font-semibold transition-all border-b-2 ${
                    tab === t.id
                      ? 'border-accent-500 text-accent-500 bg-accent-50'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {tab === 'facility'     && <FacilityForm />}
              {tab === 'professional' && <ProfessionalForm />}
              {tab === 'general'      && <GeneralForm />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── FAQ ───────────────────────────────────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState(null);

  const faqs = [
    { q: 'How quickly can PowerCare fill a shift?',
      a: 'For emergency coverage, our 24/7 dispatch team can typically confirm a placement within 1–2 hours. For planned staffing, we aim to confirm within 24 hours of your request.' },
    { q: 'What credentials does PowerCare verify?',
      a: 'We verify all relevant college registrations (CNO, COTO, etc.), conduct criminal background and vulnerable sector checks, confirm immunization records, and verify references.' },
    { q: 'Does PowerCare cover WSIB and liability?',
      a: 'Yes. All PowerCare staff are covered under WSIB and our corporate liability insurance. We provide this documentation to facilities upon request.' },
    { q: 'What training do PowerCare staff complete before placement?',
      a: "Every PowerCare professional completes our 80-hour in-house training program covering clinical foundations, person-centred care, role-specific skills, compliance readiness, and professional standards." },
    { q: "What if I'm not satisfied with a placement?",
      a: 'PowerCare offers a placement guarantee. If you are not satisfied with a placed worker, notify us within the shift and we will provide a replacement at no additional charge.' },
    { q: 'Do you service rural and smaller Ontario communities?',
      a: 'Yes — extending care to underserved rural communities is a core part of our mission. We service the GTA and a wide range of rural Ontario cities and communities.' },
  ];

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom max-w-3xl">
        <SectionHeader
          badge="FAQs"
          title="Frequently Asked Questions"
          subtitle="Quick answers to the most common questions about PowerCare."
        />
        <div className="space-y-2">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-accent-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 text-sm pr-4">{q}</span>
                <ChevronDown
                  size={15}
                  className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <main>
    <SEO page="contact" />
    <PageHero />
    <ContactInfo />
    <ContactForms />
    <FAQ />
  </main>
);

export default Contact;
