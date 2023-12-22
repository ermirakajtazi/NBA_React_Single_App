/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    'src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    'src/components/**/*.{js,ts,jsx,tsx,mdx}',
    'src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#191919',
        textColor: '#dedede',
        bgSecondary: '#121212',
        bgOverview: '#0d0d0d',
      },
    },
  },
  plugins: [],
};
