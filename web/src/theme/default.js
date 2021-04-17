import { extendTheme } from "@chakra-ui/react";
// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  styles: {
    global: {
      background: "gray.900",
    },
    body: {
      background: "gray.900",
    },
    text: {
      fontWeight: {
        bold: 700,
      },
    },
  },
  components: {
    Link: {
      baseStyle: {
        _focus: {
          boxShadow: "none",
        },
        outline: "none",
      },
    },
  },
  colors: {
    green: {
      200: "",
      500: "#20fc8f",
    },
    white: "#fff",
  },
  // breakpoints: {
  //   sm: "320px",
  //   md: "768px",
  //   lg: "960px",
  //   xl: "1200px",
  // },
});
