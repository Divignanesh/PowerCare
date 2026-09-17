/**
 * Contact details — one source of truth.
 *
 * ── PLACEHOLDER ──────────────────────────────────────────────────────────
 * The phone number below is a dummy. Replace the two constants with the real
 * dispatch line and every phone link, button, footer row and schema entry on
 * the site picks it up; nothing else needs touching.
 *
 *   PHONE       what a visitor reads
 *   PHONE_E164  the same number in E.164, for tel: links and JSON-LD
 * ─────────────────────────────────────────────────────────────────────────
 */
export const PHONE = '+1 (647) 400-0000';
export const PHONE_E164 = '+16474000000';
export const PHONE_HREF = `tel:${PHONE_E164}`;

export const EMAIL = 'connect@powercare.ca';
export const EMAIL_HREF = `mailto:${EMAIL}`;

export const SERVICE_AREA = 'Greater Toronto Area & Rural Ontario';

/**
 * Social profiles.
 *
 * Left empty on purpose: the marks in the footer stay non-clickable and the
 * `sameAs` array stays out of the JSON-LD until these accounts actually
 * exist. Pointing schema at a profile that 404s is worse than claiming none.
 * Add the live URLs here and the footer icons become links again.
 */
export const SOCIAL_PROFILES = [];
