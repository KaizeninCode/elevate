/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./App.tsx",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        instrumentRegular: "InstrumentSans-Regular",
        instrumentMedium: "InstrumentSans-Medium",
        instrumentBold: "InstrumentSans-Bold",
        playful: "Hubballi-Regular",
      },
      backgroundColor: {
        main: "#d4cb92",
        secondary: "#e6e1c5",
        primary: "#696047",
      },
      textColor: {
        main: "#d4cb92",
        secondary: "#e6e1c5",
        primary: "#696047",
      },
      borderColor: {
        main: "#d4cb92",
        secondary: "#e6e1c5",
        primary: "#696047",
      },
    },
  },
  plugins: [],
};
