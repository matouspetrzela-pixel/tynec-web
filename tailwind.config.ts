import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Novecento Sans Wide', 'sans-serif'],
      },
      colors: {
        'tynec-red': '#C64440',
        'tynec-black': '#1A1A1A',
        'tynec-gray': '#6B7280',
      },
      fontSize: {
        'h1-desktop': '48px',
        'h1-mobile': '32px',
        'h2-desktop': '36px',
        'h2-mobile': '28px',
        'h3-desktop': '24px',
        'h3-mobile': '20px',
        'body-desktop': '16px',
        'body-mobile': '14px',
      },
    },
  },
  plugins: [],
};
export default config;
