import { useEffect, useState } from 'react';
import { ENDPOINT } from './submitForm';

/**
 * Job postings, read live from the "Jobs" tab of the forms Google Sheet
 * through the same Apps Script (apps-script/Code.gs, `?jobs`). The tab has
 * one row per job; apps-script/jobs-template.csv shows its columns.
 */

// List cells hold one point per line. Leading bullets or dashes are dropped,
// so points pasted from a document come through clean.
const toList = (cell = '') =>
  cell.split('\n').map((line) => line.replace(/^[\s•\-*·]+/, '').trim()).filter(Boolean);

// Headers are matched loosely ("role id", "Role ID ", "Type/Schedule"), so a
// header typed slightly differently in the Sheet still lands.
const key = (header) => header.toLowerCase().replace(/[^a-z0-9]/g, '');

const toJob = (raw) => {
  const row = Object.fromEntries(Object.entries(raw).map(([h, v]) => [key(h), v]));
  const get = (header) => row[key(header)] ?? '';
  return {
    id: get('Role ID') || get('Title'),
    title: get('Title'),
    category: get('Category'),
    location: get('Location'),
    type: get('Type / schedule'),
    pay: get('Pay'),
    vacancy: get('Vacancy'),
    ai: get('AI used in screening'),
    posted: get('Posted'),
    summary: get('Summary'),
    about: get('About the role'),
    responsibilities: toList(get('Responsibilities')),
    requirements: toList(get('Requirements')),
    assignment: toList(get('Assignment requirements')),
    niceToHave: toList(get('Nice to have')),
  };
};

/** The URL slug for a job, e.g. "PC-PSW-001" → "pc-psw-001". */
export const jobSlug = (job) => job.id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// One request per visit: the list and the detail pages share it.
let request;
const loadJobs = () => {
  request ??= fetch(`${ENDPOINT}?jobs`)
    .then((res) => res.json())
    .then((body) => {
      if (!body.ok) throw new Error('jobs-failed');
      return body.jobs.map(toJob);
    })
    .catch((err) => {
      request = undefined; // let the next visit try again
      throw err;
    });
  return request;
};

/** { status: 'loading' | 'ready' | 'error', jobs } */
export function useJobs() {
  const [state, setState] = useState({ status: 'loading', jobs: [] });
  useEffect(() => {
    let live = true;
    loadJobs().then(
      (jobs) => live && setState({ status: 'ready', jobs }),
      () => live && setState({ status: 'error', jobs: [] })
    );
    return () => { live = false; };
  }, []);
  return state;
}

/** Click handler for "Apply" links: scrolls to the form with id="apply". */
export const toApply = (e) => {
  const form = document.getElementById('apply');
  if (!form) return;
  e.preventDefault();
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', '#apply');
};
