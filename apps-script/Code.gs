/**
 * PowerCare website forms → email + Google Sheet + Drive.
 *
 * Every form on the site posts here. For each submission this script:
 *   1. emails the details (and any résumé, attached) to NOTIFY_TO,
 *   2. adds a row to a tab named after the form in this spreadsheet,
 *   3. saves the résumé to a Drive folder and links it in the row.
 *
 * Paste this whole file into Extensions → Apps Script of a Google Sheet.
 * See apps-script/README.md for the setup steps.
 */

// ─────────────────────────── Settings ────────────────────────────
var CONFIG = {
  // Who receives the emails. Separate several addresses with commas.
  NOTIFY_TO: 'connect@powercare.ca',

  // Optional: send job applications somewhere else. Leave '' to use NOTIFY_TO.
  CAREERS_TO: 'hiring@powercare.ca',

  // The Drive folder résumés are saved into (created on first use).
  RESUME_FOLDER: 'PowerCare Résumés',

  MAX_FILE_MB: 5,
  ALLOWED_TYPES: ['pdf', 'doc', 'docx'],

  // The tab the Careers page reads job postings from. Row 1 is the headers;
  // only rows with "Yes" in the Show column go on the site.
  JOBS_TAB: 'Jobs',
};

// ─────────────────────────── Entry points ────────────────────────────
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Honeypot: a hidden field people never see. Bots fill it in.
    if (data.website) return reply_({ ok: true });

    var form = clean_(data.form || 'Website form', 80);
    var fields = (data.fields || []).slice(0, 30).map(function (pair) {
      return [clean_(pair[0], 80), clean_(pair[1], 5000)];
    });
    if (!fields.length) return reply_({ ok: false, error: 'empty' });

    var resume = data.file && data.file.data ? saveResume_(data.file, fields) : null;

    logRow_(form, fields, resume);
    sendEmail_(form, fields, resume);

    return reply_({ ok: true });
  } catch (err) {
    console.error(err);
    return reply_({ ok: false, error: String(err.message || err) });
  }
}

// The Careers page loads its postings from `<url>?jobs`. Add `&debug` to see
// which tab and headers the script found. Opening the plain URL in a browser
// shows the "running" line, so you can check it's live.
function doGet(e) {
  var p = (e && e.parameter) || {};
  if ('jobs' in p) return reply_('debug' in p ? jobsDebug_() : { ok: true, jobs: jobs_() });
  return ContentService.createTextOutput('PowerCare forms endpoint is running.');
}

// The Jobs tab: named "Jobs" exactly, or failing that any tab whose name
// contains "job" (an imported "jobs-template", say), but never the
// "Job application" tab the forms write to.
function jobsSheet_() {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var want = CONFIG.JOBS_TAB.toLowerCase();
  var exact = sheets.filter(function (sh) { return sh.getName().trim().toLowerCase() === want; })[0];
  return exact || sheets.filter(function (sh) {
    var name = sh.getName().toLowerCase();
    return name.indexOf('job') !== -1 && name.indexOf('application') === -1;
  })[0] || null;
}

function jobRows_() {
  var sheet = jobsSheet_();
  if (!sheet || sheet.getLastRow() < 2) return { sheet: sheet, rows: [] };

  var values = sheet.getDataRange().getDisplayValues();
  var headers = values.shift().map(function (h) { return String(h).trim(); });
  var rows = values.map(function (row) {
    var job = {};
    headers.forEach(function (h, i) { if (h) job[h] = String(row[i]).trim(); });
    return job;
  });
  return { sheet: sheet, headers: headers, rows: rows };
}

// Shown means Yes, Y or a ticked checkbox (TRUE). A tab without a Show
// column shows every row.
function isShown_(job) {
  if (!('Show' in job)) return true;
  return /^(y|yes|true)$/i.test(job['Show']);
}

// Each shown row of the Jobs tab, as { header: cell text }.
function jobs_() {
  return jobRows_().rows.filter(function (job) { return isShown_(job) && job['Title']; });
}

function jobsDebug_() {
  var found = jobRows_();
  return {
    ok: true,
    tabs: SpreadsheetApp.getActiveSpreadsheet().getSheets().map(function (sh) { return sh.getName(); }),
    jobsTab: found.sheet ? found.sheet.getName() : null,
    headers: found.headers || [],
    rows: found.rows.map(function (job) { return { title: job['Title'] || '', show: job['Show'] }; }),
    shown: jobs_().length,
  };
}

// ─────────────────────────── Steps ────────────────────────────
function saveResume_(file, fields) {
  var name = clean_(file.name || 'resume', 120);
  var ext = name.split('.').pop().toLowerCase();
  if (CONFIG.ALLOWED_TYPES.indexOf(ext) === -1) throw new Error('File type not allowed: ' + ext);

  var bytes = Utilities.base64Decode(file.data);
  if (bytes.length > CONFIG.MAX_FILE_MB * 1024 * 1024) throw new Error('File too large');

  // Prefix with the date and applicant so the folder sorts and reads well.
  var who = valueOf_(fields, 'Name') || 'Applicant';
  var stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  var blob = Utilities.newBlob(bytes, file.type || 'application/octet-stream', stamp + ' ' + who + ' - ' + name);

  var saved = folder_().createFile(blob);
  return { blob: blob, url: saved.getUrl(), name: blob.getName() };
}

// Columns are matched by header, and a field the tab hasn't seen yet gets a
// new column at the end, so forms can gain fields without shifting old rows.
function logRow_(form, fields, resume) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(form) || ss.insertSheet(form);
  var cells = [['Received', new Date()]].concat(fields);
  if (resume) cells.push(['Résumé link', resume.url]);

  var headers = sheet.getLastRow() === 0 ? [] :
    sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
  var row = headers.map(function () { return ''; });
  cells.forEach(function (cell) {
    var col = headers.indexOf(cell[0]);
    if (col === -1) {
      col = headers.length;
      headers.push(cell[0]);
      row.push('');
      sheet.getRange(1, col + 1).setValue(cell[0]).setFontWeight('bold');
    }
    row[col] = cell[1];
  });

  sheet.setFrozenRows(1);
  sheet.appendRow(row);
}

function sendEmail_(form, fields, resume) {
  var to = form === 'Job application' && CONFIG.CAREERS_TO ? CONFIG.CAREERS_TO : CONFIG.NOTIFY_TO;
  var who = valueOf_(fields, 'Name') || 'someone';
  var replyTo = valueOf_(fields, 'Email');

  var rows = fields.map(function (f) {
    return '<tr>' +
      '<td style="padding:8px 14px 8px 0;color:#677585;vertical-align:top;white-space:nowrap">' + esc_(f[0]) + '</td>' +
      '<td style="padding:8px 0;color:#0F1822;white-space:pre-wrap">' + (esc_(f[1]) || '<span style="color:#8B99A9">—</span>') + '</td>' +
      '</tr>';
  }).join('');

  var html =
    '<div style="font-family:Arial,sans-serif;font-size:14px;max-width:620px">' +
    '<h2 style="margin:0 0 4px;color:#003E6F">' + esc_(title_(form)) + '</h2>' +
    '<p style="margin:0 0 18px;color:#677585">From the PowerCare website</p>' +
    '<table style="border-collapse:collapse;width:100%">' + rows + '</table>' +
    (resume ? '<p style="margin-top:18px">Résumé attached, and saved to Drive: <a href="' + resume.url + '">' + esc_(resume.name) + '</a></p>' : '') +
    (replyTo ? '<p style="margin-top:18px;color:#677585">Reply to this email to answer ' + esc_(who) + ' directly.</p>' : '') +
    '</div>';

  // Mail can only be sent from the account that owns this script, so the
  // sender's name and reply-to carry the visitor instead: the inbox shows
  // "Jane Smith via PowerCare Website", and Reply goes straight to them.
  var options = { htmlBody: html, name: who === 'someone' ? 'PowerCare Website' : who + ' via PowerCare Website' };
  if (replyTo) options.replyTo = replyTo;
  if (resume) options.attachments = [resume.blob];

  MailApp.sendEmail(to, subject_(form, fields, who), plainText_(form, fields), options);
}

// "New application: <role>: <applicant>" and "New enquiry: <facility>: <person>".
function subject_(form, fields, who) {
  if (form === 'Job application') {
    return 'New application: ' + (valueOf_(fields, 'Role seeking') || valueOf_(fields, 'Job title') || 'General application') + ': ' + who;
  }
  if (form === 'New enquiry') {
    return 'New enquiry: ' + (valueOf_(fields, 'Facility') || 'Facility not given') + ': ' + who;
  }
  return title_(form) + ': ' + who;
}

function title_(form) {
  return /^new /i.test(form) ? form : 'New ' + form.toLowerCase();
}

// ─────────────────────────── Helpers ────────────────────────────
function folder_() {
  var found = DriveApp.getFoldersByName(CONFIG.RESUME_FOLDER);
  return found.hasNext() ? found.next() : DriveApp.createFolder(CONFIG.RESUME_FOLDER);
}

function valueOf_(fields, label) {
  for (var i = 0; i < fields.length; i++) if (fields[i][0] === label) return fields[i][1];
  return '';
}

function plainText_(form, fields) {
  return title_(form) + '\n\n' + fields.map(function (f) { return f[0] + ': ' + f[1]; }).join('\n');
}

function clean_(value, max) {
  return String(value == null ? '' : value).trim().slice(0, max);
}

function esc_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Run this once from the editor (select it, press Run) to approve access and
// send yourself a test email before connecting the website.
function testSetup() {
  sendEmail_('Test submission', [['Name', 'Test Person'], ['Email', ''], ['Message', 'If you got this, the email step works.']], null);
  logRow_('Test submission', [['Name', 'Test Person'], ['Message', 'Setup check']], null);
  folder_();
}
