/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#f9f7f3",
        sunny: "#eb5e28",
      },
      fontFamily: {
        news: ["'Newsreader Variable'", "serif"],
        manrope: ["'Manrope Variable'", "sans-serif"],
        virgil: ["Virgil", "sans-serif"],
      },
      maxWidth: {
        "8xl": "1440px",
      },
      letterSpacing: {
        slight: "0.01em",
      },
    },
  },
  plugins: [],
};
