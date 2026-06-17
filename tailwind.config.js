export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-dark":  "#080808",
        "brand-gray":  "#0f0f0f",
        "brand-light": "#141414",
        "brand-red":   "#E31E24",
        "brand-red2":  "#ff2d35",
        "brand-gold":  "#F5A623",
        "brand-off":   "#ffffff",
        "brand-ink":   "#141922",
        "brand-muted": "#697386",
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        label:   ["'Rajdhani'",   "sans-serif"],
        body:    ["'Inter'",      "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
      },
    },
  },
  plugins: [],
};
