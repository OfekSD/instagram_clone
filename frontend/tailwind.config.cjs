module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
          "primary": "#d4b0f9",
          
          "secondary": "#f78ecf",
                   
          "accent": "#b26ad1",
                   
          "neutral": "#2B353B",
                   
          "base-100": "#f0f0f0",
                   
          "info": "#9FB7F4",
                   
          "success": "#49E487",
                   
          "warning": "#FB9937",
                   
          "error": "#F8626C",
        },
      },
    ],
  },
  
  plugins: [require("daisyui")],
};