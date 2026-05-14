import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-green": "#AFF921",
        "custom-light": "#F4F4F4",
        "custom-dark": "#2B2B2B",
        ink: {
          950: "#070707",
          900: "#0c0c0d",
          850: "#131315",
          800: "#1a1a1d",
          750: "#222226",
          700: "#2c2c30",
          600: "#3a3a40",
        },
        lime: {
          DEFAULT: "#C7F94C",
          400: "#D6FF6B",
          500: "#C7F94C",
          600: "#A8E024",
          700: "#86B61C",
        },
        bone: "#F4F4F0",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
export default config;
