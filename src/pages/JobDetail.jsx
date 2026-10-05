import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/seo/SEO';
import { jobPostingSchema } from '../components/seo/schema';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import ApplicationForm from '../components/careers/ApplicationForm';
import JobFacts from '../components/careers/JobFacts';
import { useJobs, jobSlug, toApply } from '../lib/jobs';

// ── JOB POSTING ──────────────────────────────────────────────
// One posting from the Jobs tab, at /careers/<role-id>. The role's own
// sections come from the Sheet; the paragraphs every posting shares live
// here, so they are written once. The page ends in the application form,
// which carries this job's Role ID and details.

const Bullets = ({ items }) => (
  <ul className="space-y-3">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3 text-base text-ink-700 leading-relaxed">
        <Check size={16} strokeWidth={2.5} className="text-primary-600 mt-1 flex-shrink-0" aria-hidden="true" />
        {item}
      </li>
    ))}
  </ul>
);

const List = ({ title, note, items }) =>
  items.length ? (
    <section className="mt-10">
      <h2 className="text-xl font-heading font-semibold text-ink-900 mb-4">{title}</h2>
      {note && <p className="-mt-2 mb-4 text-base text-ink-600 leading-relaxed text-pretty">{note}</p>}
      <Bullets items={items} />
    </section>
  ) : null;

const Para = ({ title, children }) => (
  <section className="mt-10">
    <h2 className="text-xl font-heading font-semibold text-ink-900 mb-3">{title}</h2>
    <p className="text-base text-ink-700 leading-relaxed text-pretty">{children}</p>
  </section>
);

const BackLink = () => (
  <Link to="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:underline underline-offset-4">
    <ArrowLeft size={16} /> All openings
  </Link>
);

const Posting = ({ job }) => {
  const path = `/careers/${jobSlug(job)}`;
  const description = (
    job.summary ||
    `Apply for ${job.title} with PowerCare${job.location ? ` in ${job.location}` : ''}. See the duties, requirements and pay.`
  ).slice(0, 160);
  return (
  <>
    <SEO
      meta={{
        title: `${job.title} | PowerCare Careers`,
        description,
        path,
        trail: [{ name: 'Careers', path: '/careers' }, { name: job.title, path }],
      }}
      extraSchemas={[jobPostingSchema(job, path)]}
    />

    <section className="bg-surface pt-10 lg:pt-14 pb-10 lg:pb-12 border-b border-ink-200">
      <div className="container-custom max-w-4xl">
        <BackLink />
        {job.category && (
          <span className="mt-6 block font-mono text-sm font-semibold uppercase tracking-[3px] text-primary-600">{job.category}</span>
        )}
        <h1 className="mt-3 text-display font-heading font-semibold text-primary-700 text-balance">{job.title}</h1>
        <JobFacts job={job} className="mt-5 text-base" />
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="#apply" onClick={toApply} className="btn-primary">Apply now <ArrowRight size={16} /></a>
          <span className="text-sm text-ink-500">
            Role ID {job.id}{job.posted && <> · Posted {job.posted}</>}
          </span>
        </div>
      </div>
    </section>

    <article className="container-custom max-w-4xl py-12 lg:py-16">
      <Para title="About PowerCare">
        PowerCare connects qualified healthcare and support professionals with organizations that need
        dependable, compassionate and professional care across Ontario. We focus on quality, dignity,
        safety, reliability and person-centred service. Opportunities depend on client demand, location,
        qualifications and verified readiness for placement.
      </Para>
      {job.about && <Para title="The opportunity">{job.about}</Para>}
      <List title="Key responsibilities" items={job.responsibilities} />
      <List title="Required qualifications" items={job.requirements} />
      <List
        title="Assignment-specific requirements"
        note="Not every assignment needs all of these. One or more may apply depending on the client, the duties and the workplace."
        items={job.assignment}
      />
      <List title="Nice to have" items={job.niceToHave} />
      <Para title="Why work with PowerCare?">
        We match professionals with assignments that fit their verified qualifications, experience and
        availability, and keep the process clear and professional from first contact to first shift.
      </Para>
      <Para title="Before an assignment is confirmed">
        Successful applicants may need to complete credential verification, references, screening,
        occupational-health documentation and client-specific onboarding. Meeting the general requirements
        does not automatically qualify a candidate for every assignment.
      </Para>
      <Para title="Accessibility and equal opportunity">
        PowerCare is committed to an inclusive and accessible recruitment process. Accommodation is
        available during recruitment and selection in line with Ontario legislation. Applicants are
        assessed on qualifications, competence, experience and lawful job requirements.
      </Para>

      {(job.vacancy || job.ai) && (
        <dl className="mt-10 grid sm:grid-cols-2 gap-4 rounded-xl border border-ink-200 bg-surface p-5 text-sm">
          {job.vacancy && (
            <div><dt className="text-ink-500">Vacancy</dt><dd className="mt-1 font-medium text-ink-900">{job.vacancy}</dd></div>
          )}
          {job.ai && (
            <div><dt className="text-ink-500">AI used to screen applications</dt><dd className="mt-1 font-medium text-ink-900">{job.ai}</dd></div>
          )}
        </dl>
      )}

      <section id="apply" className="mt-14 scroll-mt-24 bg-surface rounded-2xl border border-ink-200 p-7 sm:p-8">
        <h2 className="text-xl font-heading font-semibold text-ink-900 mb-2">Apply for this role</h2>
        <p className="text-ink-600 text-base mb-7">Send your details and résumé. We&rsquo;ll contact you about screening and next steps.</p>
        <ApplicationForm job={job} />
      </section>
    </article>
  </>
  );
};

const JobDetail = () => {
  const { slug } = useParams();
  const { status, jobs } = useJobs();
  const job = jobs.find((j) => jobSlug(j) === slug);

  if (job) return <main><Posting job={job} /></main>;

  return (
    <main className="container-custom max-w-4xl py-16 lg:py-24">
      {/* A closed or unknown posting must not stay in search results. Only
          once the list has loaded, though: a crawler that snapshots while it
          loads, or after a failed request, would otherwise drop a live one. */}
      {status === 'ready' && (
        <Helmet>
          <title>Careers | PowerCare Health Services</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
      )}
      <BackLink />
      {status === 'loading' ? (
        <div role="status" className="mt-8 flex items-center gap-3 text-ink-600">
          <span className="h-5 w-5 rounded-full border-2 border-primary-200 border-t-primary-700 animate-spin" aria-hidden="true" />
          Loading job details&hellip;
        </div>
      ) : (
        <>
          <h1 className="mt-8 text-display-sm font-heading font-semibold text-primary-700">
            {status === 'error' ? 'We couldn’t load this job' : 'This job is no longer open'}
          </h1>
          <p className="mt-4 text-ink-600 text-pretty">
            See our <Link to="/careers" className="font-medium text-primary-700 underline underline-offset-2">current openings</Link>, or
            send a <Link to="/careers#apply" className="font-medium text-primary-700 underline underline-offset-2">general application</Link>.
          </p>
        </>
      )}
    </main>
  );
};

export default JobDetail;
