export default {
  content: ["./dist/**/*.{html,js}"], // arahkan ke dalam dist
  theme: {
    extend: {
      colors: {
        "hijau-atas": "#58d26f",
        "hijau-bawah": "#34a853",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        digital: ["DigitalNumbers", "sans-serif"],
      },
    },
  },
  plugins: [],
};
