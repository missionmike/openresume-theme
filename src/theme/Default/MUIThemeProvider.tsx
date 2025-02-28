import React, { useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

import { ThemeAppearanceContext } from "@/app/components/ThemeContext";

/**
 * Since this theme uses React MUI, we need to wrap the entire theme in a ThemeProvider.
 * Child components can then use the theme.
 *
 * @param {React.ReactNode} children
 * @returns {React.ReactNode}
 */
export const MUIThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);

  const theme = createTheme({
    palette: {
      primary: {
        main: themeAppearance === "dark" ? "#eee" : "#333",
        light: themeAppearance === "dark" ? "#333" : "#eee",
      },
      secondary: {
        main: themeAppearance === "dark" ? "#cf75ff" : "#690e9c",
        light: themeAppearance === "dark" ? "#690e9c" : "#cf75ff",
      },
      background: {
        default: themeAppearance === "dark" ? "#151515" : "#fff",
        paper: themeAppearance === "dark" ? "#000" : "#eee",
      },
      mode: themeAppearance,
    },
    typography: {
      fontSize: 16,
      fontFamily: "var(--font-geist-sans), Arial, sans-serif",
      h1: {
        fontFamily: "var(--font-geist-mono), monospace",
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
