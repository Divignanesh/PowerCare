import { EMAIL } from '../../data/contact';

/**
 * Hidden honeypot field. Bots fill every input; people never see this one,
 * so a submission that carries a value is dropped by the Apps Script.
 */
export const Honeypot = ({ value, onChange }) => (
  <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
    <label>
      Website
      <input type="text" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  </div>
);

/** The error line under a form's button, with an email as a fallback. */
export const FormError = ({ message, email = EMAIL }) =>
  message ? (
    <p role="alert" className="text-sm text-red-700 text-center text-pretty">
      {message}{' '}
      <a href={`mailto:${email}`} className="font-medium underline underline-offset-2">{email}</a>
    </p>
  ) : null;
