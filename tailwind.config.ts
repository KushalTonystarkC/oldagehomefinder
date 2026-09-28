import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0b0f14",
          raised: "#121820",
          overlay: "#1a222d",
        },
        accent: {
          DEFAULT: "#2dd4bf",
          muted: "#14b8a6",
          soft: "rgba(45, 212, 191, 0.12)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Segoe UI",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.02em",
      },
      boxShadow: {
        glass:
          "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 24px -8px rgba(0,0,0,0.45), 0 2px 8px -2px rgba(0,0,0,0.3)",
        "glass-lg":
          "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 24px 48px -16px rgba(0,0,0,0.55), 0 8px 16px -8px rgba(0,0,0,0.35)",
        "glass-hover":
          "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 16px 32px -12px rgba(0,0,0,0.5), 0 4px 12px -4px rgba(45,212,191,0.15)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-dark":
          "radial-gradient(ellipse 80% 50% at 20% -10%, rgba(45,212,191,0.15), transparent), radial-gradient(ellipse 60% 40% at 90% 10%, rgba(56,189,248,0.08), transparent), radial-gradient(ellipse 50% 30% at 50% 100%, rgba(45,212,191,0.06), transparent)",
      },
      transitionTimingFunction: {
        premium: "ease-in-out",
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
    },
  },
  plugins: [],
};
export default config;
