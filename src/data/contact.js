/**
 * Contact details — one source of truth.
 *
 * ── PHONE IS OFF ─────────────────────────────────────────────────────────
 * No number is published while the dispatch line is unconfirmed. Every phone
 * row, button and schema field reads PHONE_ENABLED, and each one either
 * hides itself or falls back to email.
 *
 * To turn it back on: set PHONE_ENABLED to true and put the real number in
 * the two constants below. Nothing else needs touching.
 *
 *   PHONE       what a visitor reads
 *   PHONE_E164  the same number in E.164, for tel: links and JSON-LD
 * ─────────────────────────────────────────────────────────────────────────
 */
export const PHONE_ENABLED = false;
export const PHONE = '+1 (647) 400-0000';
export const PHONE_E164 = '+16474000000';
export const PHONE_HREF = `tel:${PHONE_E164}`;

export const EMAIL = 'connect@powercare.ca';
export const EMAIL_HREF = `mailto:${EMAIL}`;

export const SERVICE_AREA = 'Greater Toronto Area & Rural Ontario';

/** Registered business address. */
export const ADDRESS = {
  street: '10 Kingsbridge Garden Cir',
  locality: 'Mississauga',
  region: 'ON',
  postalCode: 'L5R 3K6',
  country: 'CA',
};

/** One line, for footer rows and contact cards. */
export const ADDRESS_LINE =
  `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region} ${ADDRESS.postalCode}`;

/** Opens the address in whichever map app the visitor uses. */
export const MAP_HREF =
  `https://maps.google.com/?q=${encodeURIComponent(ADDRESS_LINE)}`;

/**
 * Social profiles.
 *
 * Left empty on purpose: the marks in the footer stay non-clickable and the
 * `sameAs` array stays out of the JSON-LD until these accounts actually
 * exist. Pointing schema at a profile that 404s is worse than claiming none.
 * Add the live URLs here and the footer icons become links again.
 */
export const SOCIAL_PROFILES = [];
