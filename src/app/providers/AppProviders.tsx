import React from "react";
import { GeoProvider } from "./GeoProvider";
import { I18nProvider } from "./I18nProvider";
import { AppThemeProvider } from "./ThemeProvider";

export const AppProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <GeoProvider>
      <I18nProvider>
        <AppThemeProvider>{children}</AppThemeProvider>
      </I18nProvider>
    </GeoProvider>
  );
};
