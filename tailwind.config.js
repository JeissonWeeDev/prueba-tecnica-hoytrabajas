module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background)',
        foreground: 'rgb(var(--foreground))',
        primary: 'rgb(var(--primary))',
        // Agrega todas tus variables aquí
      },
    },
  },
  plugins: [],
}