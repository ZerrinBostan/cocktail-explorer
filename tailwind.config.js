/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        snow: '#F5F8FD',
        midnight: '#3C4780',
        indigo: '#591FF9',
        navy: '#2B3674',
        white: '#FFFFFF',
        ghost: '#E9EDF7',
        iris: '#1B2559',
        slate: '#707EAE',
        danger: '#E74B3B'
      },
    },
  },
  plugins: [],
};
