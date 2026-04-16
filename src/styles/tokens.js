/**
 * PowerCare Design Tokens
 * Central source of truth for all design constants.
 * Tailwind classes reference these same values via tailwind.config.js.
 */

export const COLORS = {
  navy:         '#122849',   // primary-900 — hero, dark sections, header (brand blue)
  navyDark:     '#0E2251',   // primary-800 — footer, very dark sections
  navyMid:      '#122F65',   // primary-700 — CTA band, stats bar
  navyLight:    '#163F80',   // primary-600 — interactive nav, links
  navySubtle:   '#EAF0F7',   // primary-50  — very light tint for hover states
  navyTint:     '#C5D6E9',   // primary-100 — icon containers on white

  gold:         '#CBA54D',   // accent-500  — primary CTA, badge text (brand gold)
  goldHover:    '#D5A832',   // accent-400  — hover state for gold
  goldLight:    '#F2E2B5',   // accent-100  — subtle gold bg
  goldDim:      '#A6832A',   // accent-600  — muted gold text

  white:        '#FFFFFF',
  surface:      '#F8F7F4',   // warm off-white — alternating section bg
  border:       '#E4E8ED',   // subtle dividers and card borders
  textDark:     '#0F172A',   // headings
  textBody:     '#475569',   // body text (slate-600)
  textMuted:    '#94A3B8',   // placeholders, secondary text
};

export const RADIUS = {
  sm:   '0.5rem',    // rounded-lg   — buttons, small tags
  md:   '0.75rem',   // rounded-xl   — cards, inputs, modals
  lg:   '1rem',      // rounded-2xl  — large cards only
};

export const SHADOW = {
  card:      '0 1px 4px rgba(0,0,0,0.07)',
  cardHover: '0 4px 16px rgba(0,0,0,0.11)',
};

export const FONT = {
  sans:    'Inter, system-ui, sans-serif',
  heading: 'Poppins, system-ui, sans-serif',
};
