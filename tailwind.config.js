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
        primary: {
          50:  '#EAF0F7',  // barely-there tint — hover backgrounds
          100: '#C5D6E9',  // icon container bg on white sections
          200: '#96B3D5',  // hover borders
          300: '#6690C1',  // subtle icon tones
          400: '#3A6EAD',  // medium
          500: '#1B5099',  // mid-dark
          600: '#163F80',  // interactive (active nav, links)
          700: '#122849',  // same brand blue — CTA bands, footer
          800: '#122849',  // same brand blue — all dark sections
          900: '#122849',  // brand blue — hero / headers (hsl 216 60% 18%)
        },
        accent: {
          50:  '#FAF4E6',  // very light tint
          100: '#F2E2B5',
          200: '#E9CE82',
          300: '#DFBA52',
          400: '#D5A832',  // hover gold
          500: '#CBA54D',  // main gold — CTAs, badges
          600: '#A6832A',  // muted gold text
          700: '#82641A',
          800: '#5E470C',
          900: '#3A2C03',
        },
        surface: '#F8F7F4',  // warm off-white for alternating sections
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card':      '0 1px 4px rgba(0,0,0,0.07)',
        'card-hover':'0 4px 16px rgba(0,0,0,0.11)',
      },
      borderRadius: {
        'xl':  '0.75rem',  // cards, inputs
        '2xl': '1rem',     // large containers only
      },
    },
  },
  plugins: [],
}
