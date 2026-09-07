/**
 * PowerCare Design Tokens
 * Central source of truth for all design constants.
 * Tailwind classes reference these same values via tailwind.config.js.
 */

export const COLORS = {
  brand:        '#00836B',   // primary-600 — the teal from the logo mark
  brandDeep:    '#036B58',   // primary-700 — buttons, small text
  brandDark:    '#045246',   // primary-800 — deep accents
  brandDeepest: '#03362E',   // primary-900 — footer
  brandBright:  '#0E9C81',   // primary-500 — bright accent
  brandWash:    '#ECFAF7',   // primary-50  — pale section ground
  brandTint:    '#D3F2EB',   // primary-100 — tints and tags

  mint:         '#6FE0B4',   // accent-300  — highlight tone on dark grounds
  mintBright:   '#3DCF98',   // accent-400  — hover state for mint
  mintDeep:     '#0E9366',   // accent-600  — accent text that passes on white
  mintWash:     '#ECFDF5',   // accent-50   — faint accent fill

  white:        '#FFFFFF',
  surface:      '#F2F6F4',   // alternating section ground
  border:       '#DBE2DF',   // ink-200 — dividers and card borders
  hairline:     '#EBEFED',   // ink-100 — the finest rule
  textDark:     '#151A19',   // ink-900 — headings
  textBody:     '#4D5854',   // ink-600 — body copy
  textMuted:    '#66736F',   // ink-500 — secondary text
};

export const RADIUS = {
  sm:   '0.25rem',   // rounded      — tags, small marks
  md:   '0.375rem',  // rounded-lg   — buttons, inputs
  lg:   '0.5rem',    // rounded-xl   — cards, panels
  xl:   '0.75rem',   // rounded-2xl  — large containers only
};

export const SHADOW = {
  card:      '0 1px 2px rgba(12,44,39,0.05), 0 1px 1px rgba(12,44,39,0.04)',
  cardHover: '0 10px 30px -12px rgba(12,44,39,0.22), 0 2px 6px rgba(12,44,39,0.06)',
  panel:     '0 24px 60px -28px rgba(12,44,39,0.35)',
};

export const FONT = {
  sans:    '"Source Sans 3", system-ui, sans-serif',
  heading: 'Archivo, system-ui, sans-serif',
  mono:    '"IBM Plex Mono", ui-monospace, monospace',
};
