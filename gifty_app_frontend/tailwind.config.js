/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      family: "Hind, sans-serif",
    },
    fontSize: {
      sm: "1rem",
      xsm: "12px",
      lg: "3.1rem",
      xl: "4.75rem",
    },
    fontWeight: {
      thin: 200,
      semiLight: 300,
      light: 400,
      normal: 500,
      medium: 600,
      bold: 700,
      smbold: 800,
      xbold: 900,
    },
    extend: {
      colors: {
        body: "#FFFFFF",
        header: "#B20E3E",
        navColor: "#5E0821",
        primary: "#D11149",
        primary_faded: "#F4C6D3",
        whiteSmoke: "#FAE7ED",
        text: "#342026",
        white: "#FDFCFD",
        danger: "#BE1B34",
        darkText: "#3B282D",
        green: "#268822",
        lavenderBlush: "#FAE7ED",
        fadedYellow: "#FCEFCB",
        fadedGreen: "#6E5411",
        placeholder: "#C5C0C1",
        fadedGrey: "#989093"
      },
      backgroundImage: {
        backgroundImage: "url('/src/assets/svg/pattern.svg')",
      },
    },
  },
  plugins: [],
};
