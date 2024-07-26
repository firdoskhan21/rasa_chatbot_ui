import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Lato, sans-serif",
    color: "#040404",
  },
  
  IconButton: {
    color: "#040404",
  },

  palette: {
    primary: {
      main: "#082567", // primary color
    },
    secondary: {
      main: "#8649AB", // secondary color
    },
  },
});

export default theme;
