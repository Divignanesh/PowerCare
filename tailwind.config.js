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
        // Inter throughout, as on powerstaffingsolutions.ca, which the client
        // chose as the reference.
        sans:    ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        heading: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        // `font-mono` is used site-wide for eyebrows, labels and figures.
        // It resolves to Inter at a tracked, uppercase setting rather than
        // a typewriter face.
        mono:    ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // A compact scale: H1 34px, H2 26px, card H3 18px, small headings
        // 14.5px, body 13.5px, small print 12px, labels 10px (the floor —
        // nothing on the site is set smaller). Display sizes scale with the
        // viewport and stop at those values.
        'xs':         ['0.625rem',  { lineHeight: '1.5' }],
        'sm':         ['0.75rem',   { lineHeight: '1.5' }],
        'base':       ['0.85rem',   { lineHeight: '1.65' }],
        'lg':         ['0.9rem',    { lineHeight: '1.45' }],
        'xl':         ['1.1rem',    { lineHeight: '1.3' }],
        '2xl':        ['1.2rem',    { lineHeight: '1.25' }],
        'display-sm': ['clamp(1.375rem, 1.1rem + 0.9vw, 1.6rem)',  { lineHeight: '1.2', letterSpacing: '-0.1px' }],
        'display':    ['clamp(1.5rem, 1.15rem + 1.3vw, 1.9rem)',   { lineHeight: '1.15', letterSpacing: '-0.1px' }],
        'display-lg': ['clamp(1.625rem, 1.2rem + 1.45vw, 2.1rem)', { lineHeight: '1.15', letterSpacing: '-0.1px' }],
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
