import { useEffect, useState } from 'react';
import { ENDPOINT } from './submitForm';
import { JOBS_CSV_URL, headerKey as key, jobRowsFromCSV, slugOf } from './jobsFeed';

/**
 * Job postings from the "Jobs" tab of the forms Google Sheet. The tab has
 * one row per job; apps-script/jobs-template.csv shows its columns.
 *
 * Where they come from, fastest first:
 *   1. this browser's copy from the last hour (localStorage), with no request;
 *   2. the tab published as CSV (src/lib/jobsFeed.js), a second or two;
 *   3. the Apps Script (`?jobs`), which can take half a minute or fail, so
 *      it is only the fallback, with one retry.
 * An older copy, or failing that the build's snapshot (/jobs.json), shows
 * at once while a fresh list loads.
 */

// A cell that only looks empty (spaces, line breaks, or the invisible
// characters text pasted from a document carries) counts as empty, so the
// heading or section built from it is left out entirely.
const INVISIBLE = /[\u200B-\u200D\u2060\uFEFF]/g;
const clean = (cell) => String(cell ?? '').replace(INVISIBLE, '').trim();

// List cells hold one point per line. Leading bullets or dashes are dropped,
// so points pasted from a document come through clean.
const toList = (cell) =>
  clean(cell).split('\n').map((line) => clean(line.replace(/^[\s•\-*·]+/, ''))).filter(Boolean);

const toJob = (raw) => {
  const row = Object.fromEntries(Object.entries(raw).map(([h, v]) => [key(h), v]));
  const get = (header) => clean(row[key(header)]);
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
export const jobSlug = (job) => slugOf(job.id);

const CACHE_KEY = 'powercare-jobs-v1';
const CACHE_MS = 60 * 60 * 1000; // refresh at most once an hour

// Storage can be missing or blocked (private windows, strict settings); the
// page then simply loads the list each visit.
const readCache = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(CACHE_KEY));
    return Array.isArray(saved?.rows) ? saved : null;
  } catch {
    return null;
  }
};
const writeCache = (rows) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), rows }));
  } catch { /* storage unavailable */ }
};

const fetchCSV = () =>
  fetch(JOBS_CSV_URL)
    .then((res) => (res.ok ? res.text() : Promise.reject(new Error(`csv ${res.status}`))))
    .then(jobRowsFromCSV);
const fetchJSON = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((body) => (body?.ok && Array.isArray(body.jobs) ? body.jobs : Promise.reject(new Error('jobs-failed'))));
const fetchScript = () => fetchJSON(`${ENDPOINT}?jobs`);

let fresh; // one fresh fetch per visit, shared by every page
const loadFresh = () => {
  fresh ??= fetchCSV()
    .catch(fetchScript)
    .catch(fetchScript)
    .then((rows) => {
      writeCache(rows);
      return rows;
    })
    .catch((err) => {
      fresh = undefined; // let the next page view try again
      throw err;
    });
  return fresh;
};

/** { status: 'loading' | 'ready' | 'error', jobs } */
export function useJobs() {
  // Starts as loading on the server and in the browser alike, so the
  // pre-rendered HTML hydrates cleanly; a saved copy shows right after.
  const [state, setState] = useState({ status: 'loading', jobs: [] });
  useEffect(() => {
    let mounted = true;
    let shown = false;
    let current = false;
    const show = (rows) => {
      shown = true;
      if (mounted) setState({ status: 'ready', jobs: rows.map(toJob) });
    };

    const saved = readCache();
    if (saved) show(saved.rows);
    if (saved && Date.now() - saved.at < CACHE_MS) return () => { mounted = false; };

    if (!saved) {
      fetchJSON('/jobs.json').then((rows) => !shown && !current && show(rows), () => {});
    }
    loadFresh().then(
      (rows) => {
        current = true;
        show(rows);
      },
      () => {
        if (mounted && !shown) setState({ status: 'error', jobs: [] });
      }
    );
    return () => { mounted = false; };
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
