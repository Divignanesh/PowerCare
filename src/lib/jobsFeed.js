// Where the job postings come from, and how a row of the Sheet's Jobs tab is
// read. No imports: scripts/prerender.mjs loads this in Node too.

// The Jobs tab alone, published to the web as CSV (File → Share → Publish to
// web). Google serves it from its file servers in a second or two, and
// refreshes it about five minutes after an edit. Only this tab is public;
// the form tabs in the same spreadsheet are not.
export const JOBS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQClTQtr7e0gEo2VH--V2aoblPDF0GYUgf4ONkGC-R7hIDuXwud_XwHy_ugryBuJ8rZ2csZ4oF7hA2e/pub?gid=1049933903&single=true&output=csv';

// Headers are matched loosely ("role id", "Role ID ", "Type/Schedule"), so a
// header typed slightly differently in the Sheet still lands.
export const headerKey = (header) => header.toLowerCase().replace(/[^a-z0-9]/g, '');

/** The URL slug for a Role ID, e.g. "PC-PSW-001" → "pc-psw-001". */
export const slugOf = (id) => id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** CSV text → rows of cells. Handles quoted cells with commas, "" and line breaks. */
export const parseCSV = (text) => {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
};

// Shown means Yes, Y or a ticked checkbox (TRUE); a tab without a Show
// column shows every row. The same rule as jobs_() in apps-script/Code.gs.
const isShown = (row) => {
  const show = row[headerKey('Show')];
  return (show === undefined || /^(y|yes|true)$/i.test(show.trim())) && Boolean(row[headerKey('Title')]?.trim());
};

/** The published CSV → the shown jobs, each as { headerKey: cell text }. */
export const jobRowsFromCSV = (text) => {
  const [headers = [], ...rows] = parseCSV(text.replace(/^\uFEFF/, ''));
  const keys = headers.map((h) => headerKey(h));
  return rows
    .map((cells) => Object.fromEntries(keys.map((k, i) => [k, (cells[i] ?? '').trim()]).filter(([k]) => k)))
    .filter(isShown);
};
