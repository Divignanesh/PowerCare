import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, Send, Search, ClipboardCheck, CheckCircle2,
  UserCheck, Zap, Clock, DollarSign, MapPin, Gift,
  Briefcase, CheckCircle, Upload
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import FAQ from '../components/ui/FAQ';
import { jobCategories, employmentTypes, locations, hiringSteps, benefits } from '../data/jobs';
import { findJobFAQs } from '../data/faqs';
import { RevealGroup, RevealItem } from '../components/ui/Reveal';
import CredentialBadges from '../components/ui/CredentialBadges';
import { PRIMARY_CREDENTIALS } from '../data/credentials';
import SEO, { hiringHowToSchema } from '../components/seo/SEO';

const iconMap = { Send, Search, ClipboardCheck, CheckCircle2, UserCheck, Zap, Clock, DollarSign, MapPin, Gift };

// ── HERO ─────────────────────────────────────────────────────
const PageHero = () => (
  <section className="relative bg-primary-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />
    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
        <div className="lg:col-span-6 text-ink-900">
          <span className="inline-flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-widest text-primary-600">
            <span className="block w-6 h-px bg-primary-400" aria-hidden="true" />
            Healthcare Careers
          </span>
          <h1 className="text-display font-heading font-semibold mt-6 text-balance wdth-wide">
            Find Your Next<br />
            <span className="text-primary-600">Healthcare Role</span>
          </h1>
          <p className="text-lg text-ink-600 leading-relaxed mt-6 max-w-xl text-pretty">
            Whether you're a seasoned RN, a new PSW graduate, or a DSW looking for meaningful work — PowerCare has opportunities across the GTA and Rural Ontario. Apply once, work everywhere.
          </p>
          <div className="grid sm:grid-cols-2 gap-x-10 mt-10">
            {[
              { label: 'GTA & Rural Ontario',   sub: 'Wide coverage area'  },
              { label: 'Placement within Days', sub: 'Not weeks'           },
              { label: 'All Shift Types',       sub: 'Flexible scheduling' },
              { label: 'Dedicated Recruiter',   sub: 'Your own advocate'   },
            ].map(({ label, sub }) => (
              <div key={label} className="flex items-start gap-3 py-4">
                <Check size={16} strokeWidth={2.5} className="text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-[0.9375rem]">{label}</div>
                  <div className="text-ink-500 text-sm mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick apply form card */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-7 sm:p-8 shadow-panel">
          <h2 className="text-2xl font-heading font-semibold text-ink-900 mb-2">Quick Apply</h2>
          <p className="text-ink-600 text-[0.9375rem] mb-7">Start your application — a recruiter will call you within 24 hours.</p>
          <QuickApplyForm />
        </div>
      </div>
    </div>
  </section>
);

// ── QUICK APPLY FORM ──────────────────────────────────────────
const QuickApplyForm = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', role: '', location: '', type: '' });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-8" role="status">
        <CheckCircle2 size={38} strokeWidth={1.5} className="text-primary-600 mx-auto mb-4" />
        <h3 className="text-xl font-heading font-semibold text-ink-900 mb-2">Application Received!</h3>
        <p className="text-ink-600">A PowerCare recruiter will contact you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="qa-name" className="field-label">Full Name *</label>
          <input id="qa-name" type="text" required placeholder="Jane Smith" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
        </div>
        <div>
          <label htmlFor="qa-phone" className="field-label">Phone *</label>
          <input id="qa-phone" type="tel" required placeholder="(647) 000-0000" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
        </div>
      </div>
      <div>
        <label htmlFor="qa-email" className="field-label">Email Address *</label>
        <input id="qa-email" type="email" required placeholder="you@email.com" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
      </div>
      <div>
        <label htmlFor="qa-role" className="field-label">Role You're Seeking *</label>
        <select id="qa-role" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="input">
          <option value="">Select a role...</option>
          {jobCategories.flatMap((cat) => cat.roles).map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="qa-loc" className="field-label">Preferred Location</label>
          <select id="qa-loc" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input">
            <option value="">Any location</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="qa-type" className="field-label">Employment Type</label>
          <select id="qa-type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input">
            <option value="">Any type</option>
            {employmentTypes.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
      </div>
      <button type="submit" className="btn-primary w-full">
        Submit Application <ArrowRight size={16} />
      </button>
      <p className="text-sm text-ink-500 text-center">
        By applying you agree to be contacted by a PowerCare recruiter.
      </p>
      <CredentialBadges variant="form" only={['cno', 'wsib', 'vsc']} className="pt-2 justify-center" />
    </form>
  );
};

// ── ROLE CATEGORIES ──────────────────────────────────────────
const RoleCategories = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="Roles Available"
        title="Healthcare Positions We Fill"
        subtitle="PowerCare places professionals across a wide range of clinical, care, and support roles throughout Ontario."
        centered={false}
      />
      <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-9">
        {jobCategories.map((cat) => (
          <RevealItem key={cat.id} className="border-t-2 border-primary-600 pt-6">
            <h3 className="flex items-center gap-3 font-heading font-semibold text-ink-900 text-lg mb-5">
              <Briefcase size={18} strokeWidth={1.7} className="text-primary-600 flex-shrink-0" />
              {cat.label}
            </h3>
            <ul className="space-y-2">
              {cat.roles.map((role) => (
                <li key={role} className="py-1.5 text-[0.9375rem] text-ink-700">
                  {role}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  </section>
);

// ── HIRING PROCESS ───────────────────────────────────────────
const HiringProcess = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom">
      <SectionHeader
        badge="How It Works"
        title="Your Path to Placement"
        subtitle="From application to first shift, PowerCare makes the hiring process simple, fast, and supportive."
        centered={false}
      />
      {/* A real sequence, so it is numbered. */}
      <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-9">
        {hiringSteps.map((step) => {
          const Icon = iconMap[step.icon] || CheckCircle;
          return (
            <li key={step.step} className="border-t-2 border-primary-600 pt-6">
              <div className="flex items-center justify-between mb-5">
                <Icon size={20} strokeWidth={1.6} className="text-primary-600" />
                <span className="font-mono text-sm text-primary-600 tabular-nums">
                  {String(step.step).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-ink-900 text-lg mb-3">{step.title}</h3>
              <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">{step.description}</p>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);

// ── BENEFITS ─────────────────────────────────────────────────
const Benefits = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeader
        badge="Why Work With Us"
        title="The PowerCare Advantage for Caregivers"
        subtitle="We're not just a placement service — we're your long-term career partner."
        centered={false}
      />
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
        <div className="lg:col-span-5">
          <img
            src="/images/scrubs-portrait.jpg"
            alt="A healthcare professional placed by PowerCare"
            loading="lazy"
            className="w-full h-[420px] object-cover rounded-2xl"
          />
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-x-10 gap-y-10">
          {benefits.map((b) => {
            const Icon = iconMap[b.icon] || CheckCircle;
            return (
              <div key={b.title}>
                <Icon size={20} strokeWidth={1.6} className="text-primary-600 mb-4" />
                <h3 className="font-heading font-semibold text-ink-900 mb-2">{b.title}</h3>
                <p className="text-ink-600 text-[0.9375rem] leading-relaxed text-pretty">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

// ── EMPLOYMENT TYPES ─────────────────────────────────────────
const EmploymentTypes = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom">
      <SectionHeader
        badge="Flexibility"
        title="Work on Your Terms"
        subtitle="PowerCare offers multiple employment arrangements to match your lifestyle, goals, and availability."
        centered={false}
      />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {employmentTypes.map((type) => (
          <div
            key={type.id}
            className="bg-white rounded-xl p-6 border border-ink-200 text-center
                       transition-colors duration-300 hover:border-primary-400"
          >
            <Briefcase size={19} strokeWidth={1.6} className="text-primary-600 mx-auto mb-4" />
            <div className="font-heading font-semibold text-ink-900 text-[0.9375rem]">{type.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── COVERAGE MAP ─────────────────────────────────────────────
const CoverageMap = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
        <div className="lg:col-span-6">
          <span className="section-badge">Where We Place</span>
          <h2 className="text-display-sm font-heading font-semibold text-ink-900 mb-6 text-balance">
            GTA &amp; Rural Ontario Opportunities
          </h2>
          <p className="text-ink-600 leading-relaxed mb-9 text-pretty">
            PowerCare has one of the widest geographic staffing networks in Ontario. We place healthcare professionals not just in major urban centres, but in the rural and underserved communities that need skilled caregivers most.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {locations.map((loc) => (
              <li key={loc} className="flex items-center gap-2.5 py-1.5 text-[0.9375rem] text-ink-700">
                <MapPin size={13} className="text-primary-600 flex-shrink-0" />
                {loc}
              </li>
            ))}
          </ul>
        </div>

        {/* Full application form */}
        <div className="lg:col-span-6 bg-surface rounded-2xl border border-ink-200 p-7 sm:p-8">
          <h3 className="text-xl font-heading font-semibold text-ink-900 mb-2">Ready to Apply?</h3>
          <p className="text-ink-600 text-[0.9375rem] mb-7">Fill out our full application form and get matched with the right opportunities.</p>
          <FullApplicationForm />
        </div>
      </div>
    </div>
  </section>
);

// ── FULL APPLICATION FORM ─────────────────────────────────────
const FullApplicationForm = () => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', role: '', location: '', type: '',
    experience: '', message: ''
  });
  const [resumeName, setResumeName] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-8" role="status">
        <CheckCircle2 size={38} strokeWidth={1.5} className="text-primary-600 mx-auto mb-4" />
        <h4 className="text-xl font-heading font-semibold text-ink-900 mb-2">Application Submitted!</h4>
        <p className="text-ink-600">We'll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" required aria-label="Full Name" placeholder="Full Name *" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
        <input type="tel" required aria-label="Phone" placeholder="Phone *" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
      </div>
      <input type="email" required aria-label="Email Address" placeholder="Email Address *" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
      <select required aria-label="Role Seeking" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="input">
        <option value="">Role Seeking *</option>
        {jobCategories.flatMap((c) => c.roles).map((r) => <option key={r} value={r}>{r}</option>)}
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select aria-label="Location Preference" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input">
          <option value="">Location Preference</option>
          {locations.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <select aria-label="Employment Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input">
          <option value="">Employment Type</option>
          {employmentTypes.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
      </div>
      <select aria-label="Years of Experience" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="input">
        <option value="">Years of Experience</option>
        {['Less than 1 year', '1–2 years', '3–5 years', '5–10 years', '10+ years'].map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      <textarea aria-label="Tell us about yourself" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="Tell us about yourself (optional)" rows={3} className="input resize-none" />

      <div>
        <label htmlFor="fa-resume" className="field-label">Résumé (PDF or DOC)</label>
        <label
          htmlFor="fa-resume"
          className="flex items-center justify-center gap-2.5 w-full px-4 py-5 rounded-lg cursor-pointer
                     border border-dashed border-ink-300 bg-white text-ink-600 text-[0.9375rem]
                     hover:border-primary-500 hover:text-primary-700 transition-colors"
        >
          <Upload size={17} strokeWidth={1.8} />
          {resumeName || 'Upload your résumé'}
        </label>
        <input
          id="fa-resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="sr-only"
          onChange={(e) => setResumeName(e.target.files?.[0]?.name ?? '')}
        />
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
          <Link to="/privacy" className="text-primary-700 font-medium underline underline-offset-2">Privacy Policy</Link>.
          My information is kept confidential and never sold or shared without consent.{' '}
          <span className="font-semibold">(PIPEDA)</span>
        </span>
      </label>

      <button type="submit" className="btn-primary w-full">
        Submit Application <ArrowRight size={16} />
      </button>
      <CredentialBadges variant="form" only={['wsib', 'insured', 'dispatch']} className="pt-2" />
    </form>
  );
};

// ── TESTIMONIALS ─────────────────────────────────────────────
const Testimonials = () => (
  <section className="relative section-padding bg-primary-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />
    <div className="container-custom relative z-10">
      <SectionHeader
        badge="Staff Stories"
        title="What Our Caregivers Say"
        subtitle="Real experiences from healthcare professionals who found their next role through PowerCare."
        centered={false}
      />
      <div className="grid md:grid-cols-3 gap-x-10 gap-y-9">
        {[
          {
            quote: "PowerCare placed me within 3 days of my first call. My recruiter listened to exactly what I wanted — flexible shifts near Brampton — and delivered. I've been with them for 2 years now.",
            name: 'Aisha K.', role: 'Registered Practical Nurse', location: 'Brampton, ON',
          },
          {
            quote: "What I love about PowerCare is the training. Even though I graduated recently, their orientation made me feel confident and prepared before my first shift. That matters a lot.",
            name: 'Daniel O.', role: 'Personal Support Worker', location: 'Toronto, ON',
          },
          {
            quote: "My recruiter checks in on me regularly and actually cares about how placements are going. It doesn't feel like a transactional relationship — it feels like they're invested in my career.",
            name: 'Maria S.', role: 'Developmental Support Worker', location: 'Barrie, ON',
          },
        ].map(({ quote, name, role, location }) => (
          <figure key={name} className="flex flex-col">
            <blockquote className="flex-1">
              <p className="font-heading text-lg text-ink-700 leading-relaxed text-pretty">
                &ldquo;{quote}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-7 pt-5">
              <div className="font-semibold text-ink-900">{name}</div>
              <div className="text-ink-600 text-sm mt-0.5">{role}</div>
              <div className="font-mono text-[0.6875rem] uppercase tracking-widest text-primary-600 mt-2 flex items-center gap-1.5">
                <MapPin size={11} />
                {location}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

const FindAJob = () => (
  <main>
    <SEO page="careers" extraSchemas={[hiringHowToSchema]} />
    <PageHero />
    <RoleCategories />
    <HiringProcess />
    <Benefits />
    <EmploymentTypes />
    <CoverageMap />
    <Testimonials />
    <FAQ faqs={findJobFAQs} badge="Find Your Role" title="Questions About Working with PowerCare" subtitle="Get answers about our hiring process, roles, training, and benefits." />
  </main>
);

export default FindAJob;
