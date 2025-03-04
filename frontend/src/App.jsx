import { useEffect, useMemo, useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { DetailsProvider } from "./contexts/DetailsContext";
import { BrowserRouter } from "react-router";
import RouteProvider from "./components/RouteProvider";
import { createTheme, ThemeProvider } from "@mui/material";


export default function  App() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("Site-mode") || "light";
  });

  useEffect(() => {
    localStorage.setItem("Site-mode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark": "light"));
  };

  const theme = useMemo(
    () => createTheme({
      palette: {
        mode: mode,
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
    }), [mode]
  );

  return (
    <AuthProvider>
        <ThemeProvider theme={theme} defaultMode="system" modeStorageKey="Site-mode">
          <DetailsProvider>
            <BrowserRouter>
                <RouteProvider toggleTheme={toggleTheme}/>
            </BrowserRouter>
          </DetailsProvider>
        </ThemeProvider>
    </AuthProvider>
  );
};