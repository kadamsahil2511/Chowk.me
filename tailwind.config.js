/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-blue': '#BAD7E9',
        'pastel-yellow': '#FFEAA7',
        'pastel-orange': '#FFDAB9',
        'pastel-red': '#FFCCCB',
        'pastel-purple': '#D8BFD8',
        'pastel-green': '#C1E1C1',
        'bg-soft': '#F4F6F8',
        'bg-site': '#f4f5f0',
        'text-primary': '#333333',
        'text-secondary': '#666666',
      },
      fontFamily: {
        'sans': ['Mabry Pro', 'Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'playfair': ['Playfair Display', 'serif'],
        'mabry': ['Mabry Pro', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 2px 6px rgba(0,0,0,0.05)',
        'card': '0 4px 12px rgba(0,0,0,0.05)',
        'hover': '0 6px 16px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        'card': '12px',
        'pill': '999px',
      },
    },
  },
  plugins: [],
}