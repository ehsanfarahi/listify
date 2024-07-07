/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      sm: { max: "600px" },
      // => @media (min-width: 640px) { ... }

      md: { max: "1280px", min: "600px" },
      // => @media (min-width: 768px) { ... }

      lg: { max: "1536px" },
      // => @media (min-width: 1024px) { ... }

      xl: { max: "1750px" },
      // => @media (min-width: 1280px) { ... }

      "2xl": { max: "1920px" },
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
