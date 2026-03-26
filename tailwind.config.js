/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#000000",
        ink: "#111111",
        char: "#222222",
        paper: "#ffffff",
      },
      fontFamily: {
        display: ['"Bodoni Moda"', "serif"],
        body: ['"Noto Kufi Arabic"', "sans-serif"],
        arabic: ['"Noto Kufi Arabic"', "sans-serif"],
      },
      backgroundImage: {
        kufiya:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' fill='%23000'/%3E%3Cg fill='none' stroke='%23fff' stroke-opacity='.1' stroke-width='1'%3E%3Cpath d='M0 0L96 96M96 0L0 96'/%3E%3Cpath d='M0 24H96M0 48H96M0 72H96M24 0V96M48 0V96M72 0V96'/%3E%3C/g%3E%3Cg fill='%23fff' fill-opacity='.06'%3E%3Cpath d='M48 10l6 6-6 6-6-6zM10 48l6 6-6 6-6-6zM86 48l6 6-6 6-6-6zM48 86l6 6-6 6-6-6z'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        kufiya: "0 0 0 1px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.2)",
      },
      keyframes: {
        pulseLine: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        pulseLine: "pulseLine 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
