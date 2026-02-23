import { AppThemeConfig } from "../../shared/theme/theme.types";
import { GeoCode } from "./geo.types";
import { LangCode } from "../i18n/i18n.types";

export type GeoConfigEntry = {
  code: GeoCode;
  label: string;
  defaultLang: LangCode;
  theme: AppThemeConfig;
};

const THEME_EN: AppThemeConfig = {
  primary: "#ff9f45",
  secondary: "#ffd36a",
  gradient: { from: "#ff8a3d", to: "#ffc25d" },
  overlay: "rgba(3, 8, 20, 0.65)",
  text: { primary: "#ffffff", secondary: "#cbd5f5" },
  buttonText: "#1a0e05",
};

const THEME_CS: AppThemeConfig = {
  ...THEME_EN,
  gradient: { from: "#4dd4ff", to: "#6c7bff" },
  overlay: "rgba(2, 10, 24, 0.70)",
};

const THEME_DE: AppThemeConfig = {
  ...THEME_EN,
  gradient: { from: "#00d084", to: "#00a3ff" },
  overlay: "rgba(0, 14, 12, 0.70)",
};

const THEME_ES: AppThemeConfig = {
  ...THEME_EN,
  gradient: { from: "#ff4d6d", to: "#ffb703" },
  overlay: "rgba(18, 6, 6, 0.70)",
};

const THEME_PL: AppThemeConfig = {
  primary: "#ff6b7a",
  secondary: "#ffd1a1",
  gradient: { from: "#ff6b7a", to: "#ffb36a" },
  overlay: "rgba(22, 5, 8, 0.70)",
  text: { primary: "#ffffff", secondary: "#ffdfe5" },
  buttonText: "#2b0b11",
};

export const GEO_CONFIG: Record<GeoCode, GeoConfigEntry> = {
  EN: { code: "EN", label: "Ukrainian", defaultLang: "uk", theme: THEME_EN },
  CS: { code: "CS", label: "Czech", defaultLang: "cs", theme: THEME_CS },
  DE: { code: "DE", label: "German", defaultLang: "de", theme: THEME_DE },
  ES: { code: "ES", label: "Spanish", defaultLang: "es", theme: THEME_ES },
  PL: { code: "PL", label: "Polish", defaultLang: "pl", theme: THEME_PL },
};
