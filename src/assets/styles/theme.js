import { extendTheme } from "@chakra-ui/react";

const fonts = {
  heading: `'Fira Code', monospace`,
  body: `'Heebo', sans-serif`,
};

const colors = {
  blau: {
    50: "#e3efff",
    100: "#b7cefc",
    200: "#8aadf5",
    300: "#5c8def",
    400: "#306cea",
    500: "#1852d0",
    600: "#1040a3",
    700: "#082e75",
    800: "#021b49",
    900: "#00091d",
  },
};

export const theme = extendTheme({
  fonts,
  colors,
});
