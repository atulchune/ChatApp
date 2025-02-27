/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // This ensures Tailwind scans all files inside `src`
    ],
    theme: {
      extend: {},
    },
    plugins: [
        require('daisyui'),
    ],
  };
  