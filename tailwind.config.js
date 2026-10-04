/** @type {import('tailwindcss').Config} */
// Color values are kept in sync with src/styles/tokens.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Harbour blue — a deep, slightly desaturated azure carries the brand
        // grounds. Healthcare reads as unwelcoming when large fields go dark,
        // so the deep end of this ramp is reserved for the footer and type.
        primary: {
          50:  '#EDF4FA',  // pale wash — alternating section grounds
          100: '#D5E5F2',  // tints, tags, icon fills
          200: '#AECCE4',  // rules and hover borders
          300: '#78A9CF',  // light marks
          400: '#4285B7',  // secondary marks
          500: '#1A679E',  // bright accent
          600: '#00558F',  // brand mid — icons and eyebrows
          700: '#003E6F',  // the navy sampled from the logo mark — solid buttons
          800: '#002F55',  // deep accents
          900: '#001E38',  // footer only
        },
        // Reserved for the few deep grounds that remain.
        accent: {
          50:  '#ECFAFF',
          100: '#D2F2FE',
          200: '#A6E5FC',
          300: '#5EC8F2',  // highlight on deep ground
          400: '#2FAFE4',
          500: '#1494CC',
          600: '#0E77A6',
          700: '#0C5F85',
          800: '#0B4C6B',
          900: '#093549',
        },
        // Blue-slate rather than neutral grey — type sits in the same family
        // as the brand instead of reading as stock neutral.
        ink: {
          50:  '#F6F8FB',
          100: '#EDF1F6',
          200: '#DCE3EC',
          300: '#BAC5D2',
          400: '#8B99A9',
          500: '#677585',
          600: '#4C5A6A',  // body copy
          700: '#39454F',
          800: '#242E38',
          900: '#0F1822',  // headings — soft blue-black
        },
        // A warm off-white. The old pale-blue wash tinted every alternating
        // band cold; warmth here lets the photographs carry the colour.
        surface: '#FAFAF8',
      },
      fontFamily: {
        // Montserrat throughout, as on lifecare.org.au, which the client chose
        // as the type reference.
        sans:    ['Montserrat', 'Helvetica Neue', 'Arial', 'sans-serif'],
        heading: ['Montserrat', 'Helvetica Neue', 'Arial', 'sans-serif'],
        // `font-mono` is used site-wide for eyebrows, labels and figures.
        // It resolves to the sans at a tracked, uppercase setting rather than
        // a typewriter face.
        mono:    ['Montserrat', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // The lifecare.org.au scale: hero 72-96px, page H1 48px, H2 40px
        // (32px on phones), large H3 32px, card H3 24px, lead 20px, body
        // 15px, buttons 16px. Labels stop at 12px. Display sizes scale with
        // the viewport and stop at those values.
        'xs':         ['0.75rem',   { lineHeight: '1.5' }],
        'sm':         ['0.8125rem', { lineHeight: '1.5' }],
        'base':       ['0.9375rem', { lineHeight: '1.6' }],
        'lg':         ['1.125rem',  { lineHeight: '1.5' }],
        'xl':         ['1.25rem',   { lineHeight: '1.4' }],
        '2xl':        ['1.5rem',    { lineHeight: '1.2' }],
        '3xl':        ['2rem',      { lineHeight: '1.2' }],
        'display-sm': ['clamp(2rem, 1.6rem + 1.1vw, 2.5rem)',     { lineHeight: '1.2' }],
        'display':    ['clamp(2.25rem, 1.75rem + 1.4vw, 3rem)',   { lineHeight: '1.2' }],
        'display-lg': ['clamp(2.25rem, 1.75rem + 1.4vw, 3rem)',   { lineHeight: '1.2' }],
        'display-xl': ['clamp(2.5rem, 1.4rem + 3.4vw, 4.5rem)',   { lineHeight: '1.1' }],
      },
      fontWeight: {
        // Every heading and emphasised label on the reference is set at 700.
        semibold: '700',
      },
      boxShadow: {
        // Cards sit on the page rather than floating above it; a hairline
        // border does the separating, so the shadows stay almost invisible.
        'card':       '0 1px 2px rgba(15,24,34,0.04)',
        'card-hover': '0 2px 8px -2px rgba(15,24,34,0.08)',
        'panel':      '0 20px 50px -24px rgba(15,24,34,0.25)',
      },
      borderRadius: {
        // Soft and open. Tight corners and ruled boxes read as an institution;
        // this page should feel like somewhere people are looked after.
        'lg':  '0.75rem',
        'xl':  '1rem',
        '2xl': '1.5rem',
      },
      letterSpacing: {
        // Uppercase labels are set in the sans, so they need real tracking
        // to read as small caps rather than as shouting.
        widest: '0.14em',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        // The track holds the list twice, so sliding it by half lands the
        // second copy exactly where the first began and the loop is seamless.
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        rise: 'rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 70s linear infinite',
      },
    },
  },
  plugins: [],
}
