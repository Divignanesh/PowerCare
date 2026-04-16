import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Send, Search, ClipboardCheck, CheckCircle2,
  UserCheck, Zap, Clock, DollarSign, MapPin, Gift, ChevronRight,
  Briefcase, Star
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import FAQ from '../components/ui/FAQ';
import { jobCategories, employmentTypes, locations, hiringSteps, benefits } from '../data/jobs';
import { findJobFAQs } from '../data/faqs';
import SEO, { hiringHowToSchema } from '../components/seo/SEO';

const iconMap = { Send, Search, ClipboardCheck, CheckCircle2, UserCheck, Zap, Clock, DollarSign, MapPin, Gift };

// ── HERO ─────────────────────────────────────────────────────
const PageHero = () => (
  <section className="relative pt-20 pb-12 bg-primary-900 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="text-white">
          <span className="text-accent-500 text-xs font-bold tracking-widest uppercase mb-4 block">
            Healthcare Careers
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold font-heading mb-4 leading-tight">
            Find Your Next<br />
            <span className="text-accent-500">Healthcare Role</span>
          </h1>
          <p className="text-sm text-white/50 leading-relaxed mb-6">
            Whether you're a seasoned RN, a new PSW graduate, or a DSW looking for meaningful work — PowerCare has opportunities across the GTA and Rural Ontario. Apply once, work everywhere.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'GTA & Rural Ontario',   sub: 'Wide coverage area'      },
              { label: 'Placement within Days', sub: 'Not weeks'               },
              { label: 'All Shift Types',       sub: 'Flexible scheduling'     },
              { label: 'Dedicated Recruiter',   sub: 'Your own advocate'       },
            ].map(({ label, sub }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <CheckCircle size={13} className="text-accent-500 mb-1" />
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-white/40 text-xs">{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick apply form card */}
        <div className="bg-white rounded-xl p-6 shadow-card-hover">
          <h3 className="text-base font-bold font-heading text-slate-900 mb-1">Quick Apply</h3>
          <p className="text-slate-400 text-xs mb-5">Start your application — a recruiter will call you within 24 hours.</p>
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
      <div className="text-center py-6">
        <CheckCircle2 size={36} className="text-accent-500 mx-auto mb-3" />
        <h4 className="text-base font-bold font-heading text-slate-900 mb-2">Application Received!</h4>
        <p className="text-slate-500 text-sm">A PowerCare recruiter will contact you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
          <input type="text" required placeholder="Jane Smith" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Phone *</label>
          <input type="tel" required placeholder="(647) 000-0000" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
        <input type="email" required placeholder="you@email.com" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Role You're Seeking *</label>
        <select required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="input bg-white">
          <option value="">Select a role...</option>
          {jobCategories.flatMap((cat) => cat.roles).map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Location</label>
          <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="input bg-white">
            <option value="">Any location</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="input bg-white">
            <option value="">Any type</option>
            {employmentTypes.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
      </div>
      <button type="submit" className="btn-primary w-full justify-center text-sm py-2.5">
        Submit Application <ArrowRight size={15} />
      </button>
      <p className="text-xs text-slate-400 text-center">
        By applying you agree to be contacted by a PowerCare recruiter.
      </p>
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
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobCategories.map((cat) => (
          <div key={cat.id} className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                <Briefcase size={15} className="text-primary-700" />
              </div>
              <h3 className="font-bold font-heading text-slate-900 text-sm">{cat.label}</h3>
            </div>
            <ul className="space-y-1.5">
              {cat.roles.map((role) => (
                <li key={role} className="flex items-center gap-2 text-sm text-slate-600">
                  <ChevronRight size={12} className="text-accent-500 flex-shrink-0" />
                  {role}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
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
      />
      <div className="relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {hiringSteps.map((step, idx) => {
            const Icon = iconMap[step.icon] || CheckCircle;
            return (
              <div key={step.step} className="relative">
                {/* Connector line - hidden on mobile */}
                {idx < hiringSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-[52px] -right-[calc(100%+20px)] w-[calc(100%+40px)] h-0.5 bg-gradient-to-r from-accent-300 to-accent-200">
                    <div className="absolute right-0 w-2 h-2 bg-accent-500 rounded-full -top-1"></div>
                  </div>
                )}
                <div className="card text-center relative">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 relative">
                    <Icon size={17} className="text-primary-700" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center text-primary-900 text-[10px] font-bold">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-bold font-heading text-slate-900 text-sm mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
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
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {benefits.map((b) => {
          const Icon = iconMap[b.icon] || CheckCircle;
          return (
            <div key={b.title} className="flex gap-4 p-4 rounded-xl border border-slate-200 hover:border-accent-300 hover:bg-accent-50 transition-all group">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent-100 transition-colors">
                <Icon size={17} className="text-primary-700 group-hover:text-accent-500" />
              </div>
              <div>
                <h3 className="font-bold font-heading text-slate-900 text-sm mb-1">{b.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            </div>
          );
        })}
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
      />
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {employmentTypes.map((type) => (
          <div key={type.id} className="bg-white rounded-xl p-4 border border-slate-200 text-center hover:border-accent-300 hover:shadow-card transition-all group">
            <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-accent-100 transition-colors">
              <Briefcase size={16} className="text-primary-700 group-hover:text-accent-500" />
            </div>
            <div className="font-semibold text-slate-900 text-xs">{type.label}</div>
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
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <span className="section-badge">
            <MapPin size={13} />
            Where We Place
          </span>
          <h2 className="section-title mb-4">GTA & Rural Ontario Opportunities</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-5">
            PowerCare has one of the widest geographic staffing networks in Ontario. We place healthcare professionals not just in major urban centres, but in the rural and underserved communities that need skilled caregivers most.
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {locations.map((loc) => (
              <div key={loc} className="flex items-center gap-2 text-sm text-slate-600 py-1">
                <MapPin size={11} className="text-accent-500 flex-shrink-0" />
                {loc}
              </div>
            ))}
          </div>
        </div>

        {/* Full application form — blends into white section */}
        <div className="bg-surface rounded-xl border border-slate-200 p-6">
          <h4 className="font-bold font-heading text-slate-900 text-base mb-1">Ready to Apply?</h4>
          <p className="text-slate-400 text-xs mb-5">Fill out our full application form and get matched with the right opportunities.</p>
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
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-4">
        <CheckCircle2 size={36} className="text-accent-500 mx-auto mb-3" />
        <h4 className="text-base font-bold font-heading text-slate-900 mb-2">Application Submitted!</h4>
        <p className="text-slate-500 text-sm">We'll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input type="text" required placeholder="Full Name *" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
        <input type="tel" required placeholder="Phone *" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
      </div>
      <input type="email" required placeholder="Email Address *" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
      <select required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="input bg-white">
        <option value="">Role Seeking *</option>
        {jobCategories.flatMap((c) => c.roles).map((r) => <option key={r} value={r}>{r}</option>)}
      </select>
      <div className="grid grid-cols-2 gap-3">
        <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="input bg-white">
          <option value="">Location Preference</option>
          {locations.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="input bg-white">
          <option value="">Employment Type</option>
          {employmentTypes.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
      </div>
      <select value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })}
        className="input bg-white">
        <option value="">Years of Experience</option>
        {['Less than 1 year', '1–2 years', '3–5 years', '5–10 years', '10+ years'].map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="Tell us about yourself (optional)" rows={3}
        className="input resize-none" />
      <button type="submit" className="btn-primary w-full justify-center text-sm py-2.5">
        Submit Application <ArrowRight size={15} />
      </button>
    </form>
  );
};

// ── TESTIMONIALS ─────────────────────────────────────────────
const Testimonials = () => (
  <section className="section-padding bg-primary-900">
    <div className="container-custom">
      <SectionHeader
        badge="Staff Stories"
        title="What Our Caregivers Say"
        subtitle="Real experiences from healthcare professionals who found their next role through PowerCare."
        light
      />
      <div className="grid md:grid-cols-3 gap-5">
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
          <div key={name} className="bg-white/5 border border-white/10 rounded-xl p-5 text-white">
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="text-accent-500 fill-accent-500" />
              ))}
            </div>
            <p className="text-white/60 text-sm leading-relaxed italic mb-4">"{quote}"</p>
            <div className="border-t border-white/10 pt-3">
              <div className="font-semibold text-sm">{name}</div>
              <div className="text-white/40 text-xs">{role}</div>
              <div className="text-white/30 text-xs flex items-center gap-1 mt-0.5">
                <MapPin size={9} />
                {location}
              </div>
            </div>
          </div>
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
