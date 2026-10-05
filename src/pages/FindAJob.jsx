import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import FAQ from '../components/ui/FAQ';
import { findJobFAQs } from '../data/faqs';
import CredentialBadges from '../components/ui/CredentialBadges';
import SEO from '../components/seo/SEO';
import { faqSchema } from '../components/seo/schema';
import ApplicationForm from '../components/careers/ApplicationForm';
import JobFacts from '../components/careers/JobFacts';
import { useJobs, jobSlug, toApply } from '../lib/jobs';

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

// ── ROLES AVAILABLE ──────────────────────────────────────────
// The live postings from the Jobs tab of the Sheet. Each card opens the full
// posting, which ends in an application form for that job.
const JobCard = ({ job }) => (
  <Link
    to={`/careers/${jobSlug(job)}`}
    className="group flex flex-col h-full rounded-xl border border-ink-200 bg-white p-7 shadow-card
               hover:border-primary-400 transition-colors"
  >
    {job.category && (
      <span className="self-start rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
        {job.category}
      </span>
    )}
    <h3 className="mt-4 font-heading font-semibold text-ink-900 text-lg text-balance">{job.title}</h3>
    {job.summary && <p className="mt-2 text-base text-ink-600 leading-relaxed text-pretty">{job.summary}</p>}
    <JobFacts job={job} className="mt-5" />
    <span className="mt-auto pt-6 inline-flex items-center gap-1.5 font-semibold text-primary-700">
      View details and apply
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
    </span>
  </Link>
);

const RolesAvailable = () => {
  const { status, jobs } = useJobs();
  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <SectionHeader
          badge="Roles Available"
          title="Current Job Openings"
          centered={false}
        />
        {status === 'loading' ? (
          <div role="status" className="flex items-center gap-3 rounded-xl border border-ink-200 bg-white p-7 text-ink-600">
            <span className="h-5 w-5 rounded-full border-2 border-primary-200 border-t-primary-700 animate-spin" aria-hidden="true" />
            Loading current openings&hellip;
          </div>
        ) : jobs.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-5">
            {jobs.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        ) : (
          <p className="rounded-xl border border-ink-200 bg-white p-7 text-ink-600 text-pretty">
            {status === 'error' ? 'We couldn\u2019t load the openings just now.' : 'There are no openings posted right now.'}{' '}
            You can still{' '}
            <a href="#apply" onClick={toApply} className="font-medium text-primary-700 underline underline-offset-2">send us a general application</a>
            , and we&rsquo;ll be in touch when a role fits.
          </p>
        )}
      </div>
    </section>
  );
};

// ── APPLY ────────────────────────────────────────────────────
const CoverageMap = () => (
  <section id="apply" className="section-padding bg-white scroll-mt-24">
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
          <ApplicationForm />
        </div>
      </div>
    </div>
  </section>
);

const FindAJob = () => (
  <main>
    <SEO page="careers" extraSchemas={[faqSchema(findJobFAQs)]} />
    <PageHero />
    <CoverageMap />
    <RolesAvailable />
    <FAQ faqs={findJobFAQs} badge="Find Your Role" title="Questions About Working with PowerCare" subtitle="What people usually ask before they apply." />
  </main>
);

export default FindAJob;
