import SEO from '../components/seo/SEO';
import ApplicationForm from '../components/careers/ApplicationForm';

// ── APPLY (ad landing page) ──────────────────────────────────
// Where Google and Meta job ads point: a title and the same application
// form as Careers, nothing else. Kept out of search results; /careers is
// the page meant for search.
const Apply = () => (
  <main className="bg-surface">
    <SEO page="apply" noindex />
    <section className="section-padding">
      <div className="container-custom max-w-2xl">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-3 font-mono text-sm leading-tight font-semibold uppercase tracking-[4px] text-primary-600">
            <span className="block w-6 h-px bg-primary-400" aria-hidden="true" />
            Career Opportunities
            <span className="block w-6 h-px bg-primary-400" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-display-lg font-heading font-semibold text-primary-700 text-balance">
            Advance Your Career
          </h1>
          <p className="mt-5 text-lg text-ink-600 max-w-xl mx-auto text-pretty">
            Bring your skills to care homes, retirement residences and communities across the GTA
            and rural Ontario.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-ink-200 p-7 sm:p-8">
          <ApplicationForm standalone />
        </div>
      </div>
    </section>
  </main>
);

export default Apply;
