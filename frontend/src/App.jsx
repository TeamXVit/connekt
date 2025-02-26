import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router";
import RouteProvider from "./components/RouteProvider";
import { createTheme, ThemeProvider } from "@mui/material";


export default function  App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
        contrastText: "white",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 360,
        md: 620,
        lg: 1024,
      },
    },
    typography: {
      fontFamily: ["Poppins"]
    }
  });

  return (
    <AuthProvider>
      <ThemeProvider theme={theme} defaultMode="system">
        <BrowserRouter>
          <RouteProvider />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};