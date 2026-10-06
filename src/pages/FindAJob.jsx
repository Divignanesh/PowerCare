import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import FAQ from '../components/ui/FAQ';
import { findJobFAQs } from '../data/faqs';
import CredentialBadges from '../components/ui/CredentialBadges';
import SEO from '../components/seo/SEO';
import { faqSchema } from '../components/seo/schema';
import ApplicationForm from '../components/careers/ApplicationForm';
import JobFacts from '../components/careers/JobFacts';
import { useJobs, jobSlug, toApply, filterJobs, ALL } from '../lib/jobs';

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
    target="_blank"
    rel="noopener noreferrer"
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

const PER_PAGE = 6;

const pageBtn = 'inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition-colors';

const Pager = ({ page, pages, onPage }) => (
  <nav aria-label="Job openings pages" className="mt-10 flex flex-wrap items-center justify-center gap-2">
    <button type="button" onClick={() => onPage(page - 1)} disabled={page === 1}
            className={`${pageBtn} gap-1 border-ink-200 bg-white text-ink-700 hover:border-primary-400 disabled:opacity-40 disabled:pointer-events-none`}>
      <ChevronLeft size={16} /> Previous
    </button>
    {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
      <button key={n} type="button" onClick={() => onPage(n)} aria-current={n === page ? 'page' : undefined}
              className={`${pageBtn} ${n === page ? 'border-primary-700 bg-primary-700 text-white' : 'border-ink-200 bg-white text-ink-700 hover:border-primary-400'}`}>
        {n}
      </button>
    ))}
    <button type="button" onClick={() => onPage(page + 1)} disabled={page === pages}
            className={`${pageBtn} gap-1 border-ink-200 bg-white text-ink-700 hover:border-primary-400 disabled:opacity-40 disabled:pointer-events-none`}>
      Next <ChevronRight size={16} />
    </button>
  </nav>
);


const chip = 'rounded-full border px-4 py-2 text-sm font-semibold transition-colors';

const RolesAvailable = () => {
  const { status, jobs } = useJobs();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL);
  const top = useRef(null);
  const categories = useMemo(() => [ALL, ...new Set(jobs.map((j) => j.category).filter(Boolean))], [jobs]);
  const matches = useMemo(() => filterJobs(jobs, query, category), [jobs, query, category]);
  const pages = Math.max(1, Math.ceil(matches.length / PER_PAGE));
  const current = Math.min(page, pages);
  const go = (n) => {
    setPage(Math.min(pages, Math.max(1, n)));
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const search = (v) => {
    setQuery(v);
    setPage(1);
  };
  const pick = (c) => {
    setCategory(c);
    setPage(1);
  };
  const shown = matches.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const tools = jobs.length > 0 && (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <label className="relative w-full lg:max-w-sm">
        <span className="sr-only">Search job openings</span>
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-500" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => search(e.target.value)}
          placeholder="Search by role, place or schedule"
          className="w-full rounded-full border border-ink-200 bg-white py-3 pl-11 pr-11 text-base text-ink-900 placeholder:text-ink-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
        {query && (
          <button type="button" onClick={() => search('')} aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-500 hover:text-ink-900">
            <X size={16} />
          </button>
        )}
      </label>
      {categories.length > 2 && (
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => pick(c)} aria-pressed={c === category}
                    className={`${chip} ${c === category ? 'border-primary-700 bg-primary-700 text-white' : 'border-ink-200 bg-white text-ink-700 hover:border-primary-400'}`}>
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
  return (
    <section ref={top} className="section-padding bg-surface scroll-mt-20">
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
          <>
            {tools}
            {matches.length ? (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-5">
                  {shown.map((job) => <JobCard key={job.id} job={job} />)}
                </div>
                {pages > 1 && <Pager page={current} pages={pages} onPage={go} />}
              </>
            ) : (
              <p role="status" className="rounded-xl border border-ink-200 bg-white p-7 text-ink-600 text-pretty">
                No openings match that search.{' '}
                <button type="button" onClick={() => { search(''); pick(ALL); }} className="font-medium text-primary-700 underline underline-offset-2">
                  Show all openings
                </button>
              </p>
            )}
          </>
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
