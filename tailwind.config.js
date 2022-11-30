module.exports = {
  content: [
    "./index.html",
    "./ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        seconday: 'var(--seconday)',
        ternary: 'var(--ternary)'
      },
      flexGrow: {
        '2': 2,
        '3': 3,
        '4': 4
      }
    },
  },
  plugins: [],
}
