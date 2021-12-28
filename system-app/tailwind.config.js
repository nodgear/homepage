module.exports = {
  mode: 'jit',
  content: [    
    "./pages/**/*.{js,ts,jsx,tsx}",    
    "./components/**/*.{js,ts,jsx,tsx}",  
  ],
  theme: {
    extend: {
      colors: {
        accent: '#FF1273',
        support: '#0094ff'
      }
    },
  },
  plugins: [],
}
