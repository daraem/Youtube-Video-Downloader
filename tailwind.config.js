/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      transitionProperty: {
        'border-bottom-width': 'border-bottom-width'
      },
      fontFamily: {
        'Varela':["Varela Round", 'sans-serif']
      },
    },
  },
  plugins: [],
}

