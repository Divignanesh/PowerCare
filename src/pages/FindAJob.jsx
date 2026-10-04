import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Send, Upload } from 'lucide-react';
import { CheckCircle as CheckCircle2, MapPin, Briefcase } from '@phosphor-icons/react';
import SectionHeader from '../components/ui/SectionHeader';
import FAQ from '../components/ui/FAQ';
import { jobCategories, employmentTypes, locations } from '../data/jobs';
import { findJobFAQs } from '../data/faqs';
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal';
import CredentialBadges from '../components/ui/CredentialBadges';
import SEO, { faqSchema } from '../components/seo/SEO';
import { useFormSubmit, MAX_FILE_MB } from '../lib/submitForm';
import { Honeypot, FormError } from '../components/ui/FormStatus';

// ── HERO ─────────────────────────────────────────────────────
// A short banner: the photograph under a white wash, the title and one line.
// The application form lives further down the page, so nothing here asks
// the reader for anything yet.
const PageHero = () => (
  <section className="relative flex items-center min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] overflow-hidden">
    <img
      src="/images/careers-team.jpg"
      alt="A PowerCare team of nurses and clinicians smiling together"
      fetchPriority="high"
      className="absolute inset-0 w-full h-full object-cover object-[50%_22%]"
    />
    <div className="absolute inset-0 bg-white/70" aria-hidden="true" />

    <div className="relative container-custom py-12 text-center">
      <h1 className="text-display-lg font-heading font-semibold text-primary-700 text-balance">
        Careers
      </h1>
      <p className="mt-4 text-lg text-ink-800 max-w-2xl mx-auto leading-relaxed text-pretty">
        Join us on our mission to bring good care to every community.
      </p>
    </div>
  </section>
);

// ── RÉSUMÉ UPLOAD ────────────────────────────────────────────
// Shared by both application forms. The native input is visually hidden and
// the dashed label stands in for it, showing the chosen file's name.
const ResumeUpload = ({ id, file, onFile }) => {
  const fileName = file?.name ?? '';
  return (
    <div>
      <label htmlFor={id} className="field-label">Résumé (PDF or DOC, up to {MAX_FILE_MB} MB)</label>
      <label
        htmlFor={id}
        className="flex items-center justify-center gap-2.5 w-full px-4 py-5 rounded-xl cursor-pointer
                   bg-white border border-dashed border-ink-300 text-ink-600 text-base
                   hover:border-primary-400 hover:text-primary-700 transition-colors"
      >
        <Upload size={17} strokeWidth={1.8} />
        {fileName || 'Upload your résumé'}
      </label>
      <input
        id={id}
        type="file"
        accept=".pdf,.doc,.docx"
        className="sr-only"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
    </div>
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
      <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-5">
        {jobCategories.map((cat) => (
          <RevealItem key={cat.id} className="h-full">
            <div className="flex flex-col h-full rounded-xl border border-ink-200 bg-white p-7 shadow-card
">
              <h3 className="flex items-center gap-3 font-heading font-semibold text-ink-900 text-lg mb-5">
                <Briefcase size={26} className="text-primary-700 flex-shrink-0" />
                {cat.label}
              </h3>
              <ul className="space-y-2 mt-4">
                {cat.roles.map((role) => (
                  <li key={role} className="flex items-start gap-2.5 py-1.5 text-base text-ink-700">
                    <Check size={14} strokeWidth={2.6} className="text-primary-500 mt-1.5 flex-shrink-0" />
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  </section>
);

// ── APPLY ────────────────────────────────────────────────────
const CoverageMap = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
        <div className="lg:col-span-6 lg:sticky lg:top-28">
          {/* Sets expectations before the form, so people can see whether
              they fit without needing a job board. */}
          <span className="section-badge">Before You Apply</span>
          <h2 className="text-display-sm font-heading font-semibold text-primary-700 mb-6 text-balance">
            Who We&rsquo;re Looking For
          </h2>
          <p className="text-ink-600 leading-relaxed mb-7 text-pretty">
            We work with certified healthcare professionals who are reliable, compassionate and
            committed to quality care. Your experience, your availability and demand in your
            region shape the opportunities we can offer.
          </p>
          <ul className="space-y-3">
            {[
              'Relevant healthcare certification or training',
              'A professional, dependable work ethic',
              'Strong communication and people skills',
              'Able to work independently or as part of a care team',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-ink-700">
                <Check size={16} strokeWidth={2.5} className="text-primary-600 mt-1 flex-shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          {/* What every placement carries, set beside the form rather than
              trailing under its button. */}
          <CredentialBadges
            variant="form"
            only={['wsib', 'trained', 'dispatch']}
            className="mt-10 pt-8 border-t border-ink-200"
          />
        </div>

        {/* Full application form */}
        <div className="lg:col-span-6 bg-surface rounded-2xl border border-ink-200 p-7 sm:p-8">
          <h3 className="text-xl font-heading font-semibold text-ink-900 mb-2">Ready to Apply?</h3>
          <p className="text-ink-600 text-base mb-7">Fill out our full application form and get matched with the right opportunities.</p>
          <FullApplicationForm />
        </div>
      </div>
    </div>
  </section>
);

// ── WHERE WE PLACE ───────────────────────────────────────────
// The copy on the left; on the right the coverage map, with every place we
// place people listed under it.
const WherePlace = () => (
  <section className="section-padding bg-surface">
    <div className="container-custom grid lg:grid-cols-12 gap-x-14 gap-y-10 items-center">
      <Reveal className="lg:col-span-5">
        <span className="section-badge">Where We Place</span>
        <h2 className="section-title text-balance">GTA &amp; Rural Ontario Opportunities</h2>
        <p className="mt-6 text-lg text-ink-600 leading-relaxed text-pretty">
          We place healthcare professionals in the GTA&rsquo;s major centres and in the rural and
          underserved communities that need skilled caregivers most.
        </p>
        <p className="mt-4 text-ink-600 leading-relaxed text-pretty">
          Tell us where you would like to work. You can choose one area or several.
        </p>
      </Reveal>

      <Reveal className="lg:col-span-7" delay={0.1}>
        <figure className="rounded-2xl overflow-hidden border border-ink-200 bg-white">
          <img
            src="/images/coverage-map.jpg"
            alt="Map of southern Ontario showing PowerCare's coverage around the Greater Toronto Area, from London and Kitchener to Barrie and Peterborough"
            loading="lazy"
            className="w-full aspect-[9/7] object-cover"
          />
        </figure>
        <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
          {locations.map((loc) => (
            <li key={loc} className="flex items-center gap-2 text-base text-ink-700">
              <MapPin size={17} className="text-primary-700 flex-shrink-0" aria-hidden="true" />
              {loc}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

// ── FULL APPLICATION FORM ─────────────────────────────────────
const FullApplicationForm = () => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', role: '', location: '', type: '',
    experience: '', message: ''
  });
  const [consent, setConsent] = useState(false);
  const [resume, setResume] = useState(null);
  const [trap, setTrap] = useState('');
  const { status, error, send } = useFormSubmit('Job application');

  if (status === 'sent') {
    return (
      <div className="text-center py-8" role="status">
        <CheckCircle2 size={44} className="text-primary-700 mx-auto mb-4" />
        <h4 className="text-xl font-heading font-semibold text-ink-900 mb-2">Application Submitted!</h4>
        <p className="text-ink-600">Thank you. Our recruiting team will be in touch.</p>
      </div>
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();
    send([
      ['Name', form.name],
      ['Phone', form.phone],
      ['Email', form.email],
      ['Role seeking', form.role],
      ['Location preference', form.location],
      ['Employment type', employmentTypes.find((t) => t.id === form.type)?.label ?? ''],
      ['Experience', form.experience],
      ['About them', form.message],
      ['Résumé', resume ? resume.name : 'Not attached'],
    ], resume, trap);
  };

  return (
    <form onSubmit={onSubmit} className="relative space-y-4">
      <Honeypot value={trap} onChange={setTrap} />
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

      <ResumeUpload id="fa-resume" file={resume} onFile={setResume} />

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

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : <>Send your application <ArrowRight size={16} /></>}
      </button>
      <FormError message={error} />
    </form>
  );
};

const FindAJob = () => (
  <main>
    <SEO page="careers" extraSchemas={[faqSchema(findJobFAQs)]} />
    <PageHero />
    <CoverageMap />
    <WherePlace />
    <RoleCategories />
    <FAQ faqs={findJobFAQs} badge="Find Your Role" title="Questions About Working with PowerCare" subtitle="What people usually ask before they apply." />
  </main>
);

export default FindAJob;
