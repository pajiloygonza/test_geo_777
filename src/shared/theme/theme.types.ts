export type AppThemeConfig = {
  primary: string;
  secondary: string;
  gradient: {
    from: string;
    to: string;
  };
  overlay: string;
  text: {
    primary: string;
    secondary: string;
  };
  buttonText: string;
};

declare module "@mui/material/styles" {
  interface Theme {
    app: {
      gradient: {
        from: string;
        to: string;
      };
      overlay: string;
      buttonText: string;
    };
  }

  interface ThemeOptions {
    app?: {
      gradient?: {
        from?: string;
        to?: string;
      };
      overlay?: string;
      buttonText?: string;
    };
  }
}

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends import("@mui/material/styles").Theme {}
}
