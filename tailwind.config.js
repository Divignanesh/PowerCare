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
        // Eucalyptus — a blue-green midtone carries the brand on near-white
        // grounds. Healthcare reads as unwelcoming when large fields go dark,
        // so the deep end of this ramp is reserved for the footer and type.
        primary: {
          50:  '#ECFAF7',  // pale wash — alternating section grounds
          100: '#D3F2EB',  // tints, tags, icon fills
          200: '#A8E5D8',  // rules and hover borders
          300: '#6FD2BC',  // light marks
          400: '#35B79A',  // secondary marks
          500: '#0E9C81',  // bright accent
          600: '#00836B',  // the brand teal, sampled from the logo mark
          700: '#036B58',  // solid buttons and small text (white on this passes AA)
          800: '#045246',  // deep accents
          900: '#03362E',  // footer only
        },
        // Reserved for the few deep grounds that remain.
        accent: {
          50:  '#EDFCF7',
          100: '#D2F7EB',
          200: '#A6EFD8',
          300: '#6FE0C6',  // highlight on deep ground
          400: '#3DCFAC',
          500: '#17B68F',
          600: '#0E9374',
          700: '#0C735C',
          800: '#0B5B4A',
          900: '#093F35',
        },
        // Soft black-green rather than grey — type sits in the same family
        // as the brand instead of reading as stock neutral.
        ink: {
          50:  '#F6F9F8',
          100: '#EDF2F1',
          200: '#DDE5E3',
          300: '#BCC8C5',
          400: '#8E9C98',
          500: '#6A7975',
          600: '#4F5F5A',  // body copy
          700: '#3B4A46',
          800: '#26332F',
          900: '#132320',  // headings — soft black-green
        },
        surface: '#F2F8F6',  // pale eucalyptus wash
      },
      fontFamily: {
        sans:    ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        heading: ['Archivo', 'system-ui', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Display sizes scale with the viewport so headings stay in
        // proportion instead of stepping at breakpoints.
        'display-sm': ['clamp(1.5rem, 1.2rem + 1.4vw, 2rem)',    { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display':    ['clamp(1.875rem, 1.4rem + 2.2vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.02em'  }],
        'display-lg': ['clamp(2.25rem, 1.5rem + 3.4vw, 3.75rem)',  { lineHeight: '1.03', letterSpacing: '-0.025em' }],
      },
      boxShadow: {
        'card':       '0 1px 2px rgba(19,35,32,0.04), 0 1px 1px rgba(19,35,32,0.03)',
        'card-hover': '0 10px 30px -12px rgba(19,35,32,0.16), 0 2px 6px rgba(19,35,32,0.05)',
        'panel':      '0 24px 60px -28px rgba(19,35,32,0.22)',
      },
      borderRadius: {
        // Tighter than the default scale — the mark of drawn stationery
        // rather than a rounded UI kit.
        'lg':  '0.375rem',
        'xl':  '0.5rem',
        '2xl': '0.75rem',
      },
      letterSpacing: {
        widest: '0.18em',
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
