import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      colors: {
        primary: "#34d399",
        "primary-dark": "#10b981",
        muted: "#94a3b8",
        light: "#f1f5f9",
        dark: "#334155",
        darker: "#1e293b",
      },
    },
  },
  plugins: [],
}

export default config
