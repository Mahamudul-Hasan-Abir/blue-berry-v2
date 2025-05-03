import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@shadcn/ui/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6c7fd8",
        secondary: "#f8f8fb",
        accent: "#eeeeee",
        heading: "#3d4750",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"], // Make Geist Sans the default
        mono: ["var(--font-geist-mono)", "monospace"],
        quicksand: ["var(--font-quicksand)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
