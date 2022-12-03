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
        ternary: 'var(--ternary)',
        'primary-bg' : 'var(--background-primary)',
        'secondary-bg' : 'var(--background-secondary)',
        'ternary-bg' : 'var(--background-ternary)',
        'input-bg' : 'var(--background-input)',
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
