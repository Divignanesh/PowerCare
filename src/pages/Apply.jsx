import { ArrowRight, Check } from 'lucide-react';
import SEO from '../components/seo/SEO';
import ApplicationForm from '../components/careers/ApplicationForm';
import CredentialBadges from '../components/ui/CredentialBadges';

// ── APPLY (ad landing page) ──────────────────────────────────
// Where Google and Meta job ads point: the essentials and the same
// application form as Careers, with nothing else to click away to.
// Kept out of search results; /careers is the page meant for search.

const REASONS = [
  'Work in long-term care, retirement, home and community settings',
  'Placements across the GTA and rural Ontario',
  'Shifts matched to your availability and experience',
  'In-house training before your first placement',
];

const STEPS = [
  'Send your application and résumé',
  'We review it and call you',
  'Screening and credential checks',
  'Start your first placement',
];

const Apply = () => (
  <main className="bg-surface">
    <SEO page="apply" noindex />
    <section className="section-padding">
      <div className="container-custom grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <span className="section-badge">Now Hiring</span>
          <h1 className="text-display-lg font-heading font-semibold text-primary-700 text-balance">
            Healthcare Jobs Across Ontario
          </h1>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed text-pretty">
            PowerCare is hiring PSWs, DSWs, nurses and allied health professionals. Apply in a few
            minutes and our team will be in touch.
          </p>
          {/* On phones the form sits below all this; this gets people to it. */}
          <a href="#apply" className="btn-primary mt-6 lg:hidden">
            Apply now <ArrowRight size={16} />
          </a>

          <ul className="mt-8 space-y-3">
            {REASONS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-ink-700">
                <Check size={16} strokeWidth={2.5} className="text-primary-600 mt-1 flex-shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-lg font-heading font-semibold text-ink-900">What happens next</h2>
          <ol className="mt-4 space-y-3">
            {STEPS.map((step, i) => (
              <li key={step} className="flex items-center gap-3 text-base text-ink-700">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-semibold text-white">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <CredentialBadges
            variant="form"
            only={['wsib', 'trained', 'dispatch']}
            className="mt-10 pt-8 border-t border-ink-200"
          />
        </div>

        <div id="apply" className="lg:col-span-7 bg-white rounded-2xl border border-ink-200 p-7 sm:p-8 scroll-mt-24">
          <h2 className="text-xl font-heading font-semibold text-ink-900 mb-2">Apply Now</h2>
          <p className="text-ink-600 text-base mb-7">Choose your role, add your details and attach your résumé.</p>
          <ApplicationForm />
        </div>
      </div>
    </section>
  </main>
);

export default Apply;
