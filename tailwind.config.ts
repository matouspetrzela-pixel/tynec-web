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
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          /* Lehce hlubší „cihlová“ — stále jasné červené tlačítko, méně neon */
          DEFAULT: "#C41E25",
          hover: "#9E1A1F",
        },
        "tynec-red": {
          DEFAULT: "#C41E25",
          hover: "#9E1A1F",
          deep: "#9E1518",
          light: "#F5A8A8",
          muted: "#FCE8E8",
        },
        "tynec-black": "#1A1A1A",
        "tynec-navy": "#0F172A",
        "tynec-gray": "#6B7280",
        "tynec-gray-soft": "#F4F4F5",
      },
      fontSize: {
        "h1-desktop": "48px",
        "h1-mobile": "32px",
        "h2-desktop": "36px",
        "h2-mobile": "28px",
        "h3-desktop": "24px",
        "h3-mobile": "20px",
        "body-desktop": "18px",
        "body-mobile": "18px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(-0.5deg)" },
          "50%": { transform: "translateY(-12px) rotate(0.5deg)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 5.8s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      transitionDuration: {
        250: "250ms",
      },
      boxShadow: {
        heavy:
          "0 22px 44px -14px rgba(26, 26, 26, 0.12), 0 10px 22px -12px rgba(215, 25, 32, 0.1)",
        "heavy-hover":
          "0 32px 56px -18px rgba(26, 26, 26, 0.14), 0 14px 28px -12px rgba(215, 25, 32, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
