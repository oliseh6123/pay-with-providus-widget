import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./modals/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "2xl": { min: "1600px" },
      xl: { max: "1599px" },
      lg: { max: "1280px" },
      md: { max: "1024px" },
      sm: { max: "768px" },
      "2xs": { max: "640px" },
      xs: { max: "400px" },
      tab: { min: "769px", max: "900px" },
    },
    extend: {
      colors: {
        overlay: "var(--overlay)",
        "primary-black": "var(--primary-black)",
        "secondary-black": "var(--secondary-black)",
        "primary-yellow": "var(--primary-yellow)",
        "primary-green": "var(--primary-green)",
        "status-black": "var(--status-black)",
        "line-gray": "var(--line-gray)",
        "card-gray-bg": "var(--card-gray-bg)",
        "yellow-bg": "var(--yellow-bg)",
        "yellow-border": "var(--yellow-border)",
        "primary-red": "var(--primary-red)",
        "red-bg": "var(--red-bg)",
        "red-border": "var(--red-border)",
        "tertiary-black": "var(--tertiary-black)",
      },
      fontFamily: {
        dmsans: ["dmsans"],
      },
    },
  },
  plugins: [],
};
export default config;
