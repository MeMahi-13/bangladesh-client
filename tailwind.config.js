/** @type {import('tailwindcss').Config} */
export const darkMode = 'class';
export const content = ['./index.html', './src/**/*.{js,jsx}'];
export const theme = {
  extend: {
    fontFamily: {
      bengali: ['"Noto Sans Bengali"', 'sans-serif'],
    },
  },
};
export const plugins = [];
