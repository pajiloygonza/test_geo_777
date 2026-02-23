import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { AppThemeConfig } from "./theme.types";

export const createAppTheme = (config: AppThemeConfig) => {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: config.primary },
      secondary: { main: config.secondary },
      text: {
        primary: config.text.primary,
        secondary: config.text.secondary,
      },
      background: {
        default: "#05070c",
        paper: "#0b0f1a",
      },
    },
    typography: {
      fontFamily:
        "\"SF Pro Display\", \"SF Pro Text\", -apple-system, system-ui, \"Segoe UI\", Arial, sans-serif",
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
    },
    shape: { borderRadius: 12 },
    app: {
      gradient: config.gradient,
      overlay: config.overlay,
      buttonText: config.buttonText,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};
