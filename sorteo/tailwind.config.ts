import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '320px',
        'md': '520px',
        'lg': '900px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customGreen: 'rgb(70, 205, 105)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif']
      },
    },
  },
  plugins: [],
};
export default config;
