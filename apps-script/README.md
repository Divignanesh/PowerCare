# Website forms → email, Google Sheet and Drive

Every form on the site (the three on Contact, and the Careers application with
its résumé) posts to the Google Apps Script in `Code.gs`. For each submission it:

- emails the details to you, with the résumé attached;
- adds a row to a Google Sheet, with one tab per form;
- saves the résumé in a Drive folder called **PowerCare Résumés**.

## Setup (about 10 minutes)

1. **Create the sheet.** Sign in to the Google account that should own the data.
   Go to [sheets.new](https://sheets.new) and name the sheet "PowerCare Website Forms".
2. **Open Apps Script.** In the sheet, choose **Extensions → Apps Script**.
3. **Paste the code.** Delete everything in `Code.gs`, paste in the whole of
   this folder's `Code.gs`, and click **Save**.
4. **Set your email.** Near the top of the file, replace `you@example.com` in
   `NOTIFY_TO` with the address that should receive the forms. To send job
   applications somewhere else, put that address in `CAREERS_TO`. Save again.
5. **Test it.** In the function dropdown at the top, pick **testSetup** and click **Run**.
   Google asks you to approve access. Choose your account, then **Advanced →
   Go to (project name) → Allow**. The script needs Gmail to send, Sheets to
   log and Drive to save résumés. You should get a test email, and a
   "Test submission" tab appears in the sheet.
6. **Deploy.** Click **Deploy → New deployment**. Under the gear icon, choose
   **Web app**. Set **Execute as: Me** and **Who has access: Anyone**, then
   click **Deploy**. Copy the **Web app URL**; it ends in `/exec`.
7. **Connect the website.** Put the URL in `ENDPOINT` at the top of
   `src/lib/submitForm.js`, then commit and deploy.

## Changing the script later

After editing `Code.gs`, go to **Deploy → Manage deployments**, click the pencil
icon, set **Version: New version** and click **Deploy**. This keeps the same URL,
so nothing changes on the website.

## Limits

Gmail allows about 100 emails a day on a personal account, and 1,500 on Google
Workspace. Résumés are limited to 5 MB and to PDF, DOC or DOCX files.
