/**
 * PowerCare Design Tokens
 * Central source of truth for all design constants.
 * Tailwind classes reference these same values via tailwind.config.js.
 */

export const COLORS = {
  brand:        '#00558F',   // primary-600 — the brand blue
  brandDeep:    '#003E6F',   // primary-700 — buttons, small text
  brandDark:    '#002F55',   // primary-800 — deep accents
  brandDeepest: '#001E38',   // primary-900 — footer
  brandBright:  '#1A679E',   // primary-500 — bright accent
  brandWash:    '#EDF4FA',   // primary-50  — pale section ground
  brandTint:    '#D5E5F2',   // primary-100 — tints and tags

  sky:         '#5EC8F2',   // accent-300  — highlight tone on deep grounds
  skyBright:   '#2FAFE4',   // accent-400  — hover state for mint
  skyDeep:     '#0E77A6',   // accent-600  — accent text that passes on white
  skyWash:     '#ECFAFF',   // accent-50   — faint accent fill

  white:        '#FFFFFF',
  surface:      '#F2F7FC',   // alternating section ground
  border:       '#DCE3EC',   // ink-200 — dividers and card borders
  hairline:     '#EDF1F6',   // ink-100 — the finest rule
  textDark:     '#0F1822',   // ink-900 — headings
  textBody:     '#4C5A6A',   // ink-600 — body copy
  textMuted:    '#677585',   // ink-500 — secondary text
};

export const RADIUS = {
  sm:   '0.25rem',   // rounded      — tags, small marks
  md:   '0.375rem',  // rounded-lg   — buttons, inputs
  lg:   '0.5rem',    // rounded-xl   — cards, panels
  xl:   '0.75rem',   // rounded-2xl  — large containers only
};

export const SHADOW = {
  card:      '0 1px 2px rgba(15,24,34,0.05), 0 1px 1px rgba(15,24,34,0.04)',
  cardHover: '0 10px 30px -12px rgba(15,24,34,0.22), 0 2px 6px rgba(15,24,34,0.06)',
  panel:     '0 24px 60px -28px rgba(15,24,34,0.35)',
};

export const FONT = {
  sans:    '"Source Sans 3", system-ui, sans-serif',
  heading: 'Archivo, system-ui, sans-serif',
  mono:    '"IBM Plex Mono", ui-monospace, monospace',
};
