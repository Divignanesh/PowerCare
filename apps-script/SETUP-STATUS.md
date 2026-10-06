# Website forms: where setup stands

Last updated 2026-10-05. Read this first to pick the process back up.
The general setup guide is in `README.md` in this folder.

## Done

- **All four forms are wired to the Apps Script:** Contact (staff request, job enquiry, general enquiry) and the Careers application with its résumé.
  - Client code: `src/lib/submitForm.js` (`useFormSubmit`) and `src/components/ui/FormStatus.jsx` (honeypot and error line).
  - Form labels sent: `New enquiry` (the "I need staff" form on Contact) and `Job application`. These name the Sheet tabs.
  - Email subjects: `New enquiry: <facility>: <person>` and `New application: <role>: <applicant>` (see `subject_` in `Code.gs`).
  - The job enquiry and general enquiry forms were removed on 2026-10-07.
- **Tested locally against a mock endpoint:** fields, the résumé (base64), the error state and the "Sending…" state all work.
- **`apps-script/Code.gs`** emails the details with the résumé attached, logs a row per form tab, and saves the résumé to the Drive folder "PowerCare Résumés".
  - The sender name shows as "<Name> via PowerCare Website".
  - Reply-to is the visitor's email.
- **The first deployment exists, in the developer's (Gnanesh's) Google account.** Its URL is hardcoded as `ENDPOINT` in `src/lib/submitForm.js`.
  - There are no env vars. The URL ships in the browser bundle anyway, so it is not a secret.

## Live (2026-10-05)

The developer's deployment is public and working. A curl test and a real General enquiry submitted from the localhost Contact form both returned ok. Resume steps 1–3 below are done for this deployment; repeat them after switching to the client's.

## Next: switch to the client's email

**Option A: client-owned (recommended).** The Sheet, the résumés and the sending all live in the client's Google account, so applicant data is theirs.

1. The client signs in to their Google account, creates a Sheet ("PowerCare Website Forms"), and opens **Extensions → Apps Script**.
2. Paste in all of `apps-script/Code.gs`.
3. Set `CONFIG.NOTIFY_TO` to the client's address. Optionally set `CAREERS_TO` to a different address for job applications. Save.
4. Run `testSetup` and approve access. Check that the test email arrived and a "Test submission" tab appeared.
5. Deploy as a **Web app**, with **Execute as: Me** and **Who has access: Anyone**. Copy the new `/exec` URL.
6. Give the URL to Claude, who replaces `ENDPOINT` in `src/lib/submitForm.js` and commits.
7. Optional: retire the developer's old deployment under **Deploy → Manage deployments → Archive**.

**Option B: quick.** Keep the developer's deployment and only change `NOTIFY_TO` to the client's email, then save and redeploy as a new version; the URL stays the same.
Emails reach the client, but the Sheet and the résumés stay in the developer's Google account.

## For Claude, on resume

1. **Confirm the endpoint is public.** This should print the "running" text, not sign-in HTML:
   `curl -sL "$(grep -o 'https://script[^']*' src/lib/submitForm.js)"`
2. **Send one marked test submission** (this produces one real email and one Sheet row):
   ```
   curl -sL -H 'Content-Type: text/plain;charset=utf-8' \
     -d '{"form":"Test submission","fields":[["Name","Setup Test"],["Email",""],["Message","Test from setup, please ignore"]],"website":""}' \
     "$(grep -o 'https://script[^']*' src/lib/submitForm.js)"
   ```
   Expect `{"ok":true}`.
3. **Submit each form once in the browser** on localhost.
4. **Commit.** The form work and the other UI changes since commit `53f2eb1` are still uncommitted on branch `redesign/content-refresh-and-seo`.
   - The UI changes are: the Home hero (cut-out photo, "Good care starts with good people."), the rename to PowerCare Health Services and PowerCare Health Inc., the About and Contact overlay heroes, and the Contact steps.
   - Push only when the user explicitly asks.
