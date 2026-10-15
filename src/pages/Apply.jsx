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
        <h1 className="text-display-lg font-heading font-semibold text-primary-700 text-center text-balance mb-10">
          Healthcare Jobs Across Ontario
        </h1>
        <div className="bg-white rounded-2xl border border-ink-200 p-7 sm:p-8">
          <ApplicationForm />
        </div>
      </div>
    </section>
  </main>
);

export default Apply;
