/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/landingpage/*.tsx", "./app/landingpage/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
};
