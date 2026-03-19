/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gaming: {
          purple: '#8B5CF6',
          dark: '#0F0F23',
          card: '#1A1A2E',
        },
      },
      fontFamily: {
        gaming: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
