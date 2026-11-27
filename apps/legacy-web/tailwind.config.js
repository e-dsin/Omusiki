/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          purple: '#8B5CF6',
          pink: '#EC4899',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #8B5CF6, #EC4899)',
      },
    },
  },
  plugins: [],
};
