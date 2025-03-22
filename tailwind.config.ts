   /** @type {import('tailwindcss').Config} */
   export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extends: {
        fontFamily: {
          quicksand: ["Quicksand", "sans-serif"],
        },

      },
    },
  
    plugins: [require("tailwind-scrollbar")],
  };