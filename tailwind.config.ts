import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'down': 'down 25s infinite',
        'right-left': 'right-left 20s infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        down: {
          '0%, 100%': { top: '-50vh' },
          '50%': { top: '200vh' },
        },
        'right-left': {
          '0%, 100%': { left: '-50vh', right: '-50vh' },
          '50%': { left: '50vh', right: '50vh' },
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1.5rem)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
