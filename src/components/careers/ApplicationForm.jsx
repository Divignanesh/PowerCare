import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload } from 'lucide-react';
import { CheckCircle as CheckCircle2 } from '@phosphor-icons/react';
import { jobCategories, employmentTypes, locations } from '../../data/jobs';
import { useFormSubmit, MAX_FILE_MB } from '../../lib/submitForm';
import { Honeypot, FormError } from '../ui/FormStatus';
import { HIRING_EMAIL } from '../../data/contact';

// ── RÉSUMÉ UPLOAD ────────────────────────────────────────────
// The native input is visually hidden and
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

// ── APPLICATION FORM ─────────────────────────────────────────
// The general application on the Careers page, and the one at the end of
// each job posting. Given a `job`, the role is fixed to it and the posting's
// details go along with the application, so every row in the Sheet and every
// email says which posting it answers. Both send the same fields in the same
// order, so they share one "Job application" tab.
const ApplicationForm = ({ job }) => {
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
      ['Role ID', job?.id ?? ''],
      ['Job title', job?.title ?? ''],
      ['Job location', job?.location ?? ''],
      ['Job type', job?.type ?? ''],
      ['Name', form.name],
      ['Phone', form.phone],
      ['Email', form.email],
      ['Role seeking', job ? job.title : form.role],
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
      {job ? (
        <p className="rounded-xl bg-white border border-ink-200 px-4 py-3 text-base text-ink-700">
          Applying for <span className="font-semibold text-ink-900">{job.title}</span>
          <span className="block text-sm text-ink-500 mt-0.5">Role ID {job.id}</span>
        </p>
      ) : (
        <select required aria-label="Role Seeking" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="input">
          <option value="">Role Seeking *</option>
          {jobCategories.flatMap((c) => c.roles).map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      )}
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

      <ResumeUpload id={job ? `resume-${job.id}` : 'fa-resume'} file={resume} onFile={setResume} />

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
      <FormError message={error} email={HIRING_EMAIL} />
    </form>
  );
};

export default ApplicationForm;
