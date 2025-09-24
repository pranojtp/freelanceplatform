const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      keyframes: {
        roll: {
          "0%": { transform: "rotateX(45deg) rotateY(-45deg)" },
          "25%": { transform: "rotateX(-45deg) rotateY(-45deg)" },
          "50%": { transform: "rotateX(45deg) rotateY(45deg)" },
          "75%": { transform: "rotateX(-45deg) rotateY(45deg)" },
          "100%": { transform: "rotateX(45deg) rotateY(-45deg)" },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      animation: {
        roll: "roll 6s infinite linear",
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
});
