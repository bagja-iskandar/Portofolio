import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/atmosphere/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'Geist Mono', 'monospace'],
        sans: ['var(--font-plus-jakarta)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        ink: '#0E0D0C',
        ivory: '#F5F2EB',
        cream: '#EDE8DF',
        charcoal: '#141210',
        ochre: '#C98A4B',
        terracotta: '#B85A3A',
      },
    },
  },
  plugins: [],
};

export default config;
