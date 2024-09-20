module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-blue': '#30c0bf', 
      },
      spacing: {
        '22': '5.5rem',
      }
    }
  },

  plugins: [],
};
