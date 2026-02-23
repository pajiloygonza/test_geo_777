import React, { useMemo } from "react";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useGeo } from "../../entities/geo/useGeo";
import { createAppTheme } from "../../shared/theme/createAppTheme";

export const AppThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { geo, config } = useGeo();

  // ВАЖНО: мемо по geo, а не по объекту config.theme (который может быть нестабильным)
  const theme = useMemo(() => createAppTheme(config.theme), [geo]);

  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            "*, *::before, *::after": { boxSizing: "border-box" },
            "html, body, #root": { height: "100%" },
            body: { margin: 0, overflowX: "hidden" },
          }}
        />
        {children}
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};
