/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            light: "#f5f5f5",
            dark: "#111111",
            dark2: "#252525",
            orange: "#bb4430",
            yellow: "#ead94c",
            lightBlue: "#7ebdc2",
            darkBlue: "#005c69",
         },
      },
      container: {
         center: true,
      },
   },
};