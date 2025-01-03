/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",],
  theme: {
    extend: {
      fontFamily: {
        raleway: "Raleway, sans-serif",
        roboto: "Roboto, sans-serif",
        nunito: "Nunito, sans-serif",
        inter: "Inter, sans-serif",
      },
      colors: {
        "app-primary-color": "#5a8dff",
      },
    },
  },
  plugins: [daisyui, require("tailgrids/plugin")],
  daisyui: {
    themes: [
      {
        mycustomtheme: {
          "primary": "#5a8dff", // Màu chính
          "secondary": "#ffaf40", // Màu phụ
          "accent": "#37cdbe", // Màu nhấn
          "neutral": "#3d4451", // Màu trung tính
          "base-100": "#ffffff", // Màu nền
          "info": "#2094f3", // Màu info
          "success": "#009485", // Màu success
          "warning": "#ff9900", // Màu warning
          "error": "#ff5724", // Màu error
        },
      },
    ],
  },
};
