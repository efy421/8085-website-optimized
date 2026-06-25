/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101312",
        bg: "#f3efe6",
        surface: "#fbf7ef",
        signal: {
          DEFAULT: "#c3642b",
          hover: "#d4783f",
          light: "#e8a87c",
        },
        ember: {
          DEFAULT: "#c3642b",
          hover: "#d4783f",
        },
        moss: "#6d7e4e",
        fog: "#e8e3d9",
        mist: "#d9d3c7",
      },
      fontFamily: {
        body: ["Poppins", "system-ui", "-apple-system", "sans-serif"],
        display: ["Livvic", "Poppins", "system-ui", "sans-serif"],
        accent: ["Georgia", "Times New Roman", "serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "2rem",
        pill: "999px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(16,19,18,0.04)",
        sm: "0 2px 8px rgba(16,19,18,0.06)",
        md: "0 4px 16px rgba(16,19,18,0.08)",
        lg: "0 8px 32px rgba(16,19,18,0.1)",
        xl: "0 16px 48px rgba(16,19,18,0.12)",
      },
      maxWidth: {
        page: "1280px",
        content: "720px",
        wide: "1100px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-in": "fade-in 0.4s cubic-bezier(0.22,1,0.36,1) forwards",
      },
    },
  },
  plugins: [],
}
