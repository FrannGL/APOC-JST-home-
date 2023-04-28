import { createContext, useState } from "react";
export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const lightTheme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#1976d2", // Azul
      },
      secondary: {
        main: "#f44336", // Rojo
      },
      background: {
        default: "#FFFFFF", // Fondo blanco
        paper: "#F5F5F5", // Fondo gris claro para elementos elevados
      },
      text: {
        primary: "#212121", // Texto negro
        secondary: "#757575", // Texto gris medio
        blanco: "#FFFFFF", // Texto blanco
        disabled: "#BDBDBD", // Texto gris claro para elementos desactivados
      },
      base: {
        main: "#fff",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#040b16", // Azul
      },
      secondary: {
        main: "#f48fb1", // Rosa
      },
      background: {
        default: "#1B1B1B", // Fondo negro
        paper: "#1E1E1E", // Fondo gris oscuro para elementos elevados
      },
      text: {
        primary: "#FFFFFF", // Texto blanco
        secondary: "#B0B0B0", // Texto gris claro
        blanco: "#FFFFFF", // Texto blanco
        disabled: "#757575", // Texto gris medio para elementos desactivados
      },
      base: {
        main: "#fff",
      },
    },
  });

  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  const value = { handleThemeChange, isDarkMode };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
