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
        surface: '#F2F7FC',  // pale blue wash
      },
      fontFamily: {
        // A formal pairing that stays comfortable to read: Lora is a warm,
        // low-contrast serif with open counters and a generous x-height —
        // the same institutional register as a sharper transitional face,
        // without the glare of thin hairlines against thick stems.
        sans:    ['"Source Sans 3"', 'Helvetica Neue', 'Arial', 'sans-serif'],
        heading: ['Lora', 'Georgia', 'Times New Roman', 'serif'],
        // `font-mono` is used site-wide for eyebrows, labels and figures.
        // It now resolves to the sans at a tracked, uppercase setting rather
        // than a typewriter face — the tech-startup note the client heard.
        mono:    ['"Source Sans 3"', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Display sizes scale with the viewport so headings stay in
        // proportion instead of stepping at breakpoints. A serif needs a
        // touch more line height and almost no negative tracking.
        'display-sm': ['clamp(1.5rem, 1.2rem + 1.4vw, 1.9375rem)',   { lineHeight: '1.28', letterSpacing: '-0.004em' }],
        'display':    ['clamp(1.875rem, 1.4rem + 2.1vw, 2.625rem)',  { lineHeight: '1.22', letterSpacing: '-0.006em' }],
        'display-lg': ['clamp(2.125rem, 1.45rem + 3.1vw, 3.375rem)', { lineHeight: '1.16', letterSpacing: '-0.01em'  }],
      },
      boxShadow: {
        'card':       '0 1px 2px rgba(15,24,34,0.04), 0 1px 1px rgba(15,24,34,0.03)',
        'card-hover': '0 10px 30px -12px rgba(15,24,34,0.16), 0 2px 6px rgba(15,24,34,0.05)',
        'panel':      '0 24px 60px -28px rgba(15,24,34,0.22)',
      },
      borderRadius: {
        // Tighter than the default scale — the mark of drawn stationery
        // rather than a rounded UI kit.
        'lg':  '0.375rem',
        'xl':  '0.5rem',
        '2xl': '0.75rem',
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
      },
      animation: {
        rise: 'rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
