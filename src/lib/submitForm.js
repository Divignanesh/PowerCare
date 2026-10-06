import { useState } from 'react';

/**
 * Sends a form to the Google Apps Script web app in apps-script/Code.gs,
 * which emails it, logs it to a Google Sheet and saves any résumé to Drive.
 *
 * The body goes as text/plain so the browser makes a "simple" request with
 * no CORS preflight, which Apps Script cannot answer.
 */
// The Apps Script web app URL. To point the forms at a new deployment (for
// example the client's own), replace this. It ships in the page bundle
// either way, so there is nothing to hide here.
export const ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxLqKBvaOPtgiVYUkIlboTBS6K0ASWG0DJhUPJ3VubxCxXOX3tG1SvtgtKRZn1Zjr3cwg/exec';

export const MAX_FILE_MB = 5;

const readAsBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

/**
 * @param {string} form    Which form this is, e.g. "New enquiry".
 * @param {Array<[string, string]>} fields  Label/value pairs, in display order.
 * @param {File} [file]    Optional résumé.
 * @param {string} [trap]  Honeypot value; real people leave it empty.
 */
export async function submitForm(form, fields, file, trap = '') {
  const payload = { form, fields, website: trap };
  if (file) {
    if (file.size > MAX_FILE_MB * 1024 * 1024) throw new Error('file-too-large');
    payload.file = { name: file.name, type: file.type, data: await readAsBase64(file) };
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.ok) throw new Error('send-failed');
}

/** Sending state for one form: idle → sending → sent, or error. */
export function useFormSubmit(form) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const send = async (fields, file, trap) => {
    setStatus('sending');
    setError('');
    try {
      await submitForm(form, fields, file, trap);
      setStatus('sent');
    } catch (err) {
      setError(
        err.message === 'file-too-large'
          ? `That file is over ${MAX_FILE_MB} MB. Please attach a smaller copy.`
          : 'Something went wrong sending this. Please try again, or email us directly.'
      );
      setStatus('error');
    }
  };

  return { status, error, send };
}
