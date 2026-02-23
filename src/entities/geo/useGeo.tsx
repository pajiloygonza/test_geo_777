import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { GEO_CONFIG, GeoConfigEntry } from "./geo.config";
import { GeoCode } from "./geo.types";

export type GeoContextValue = {
  geo: GeoCode;
  setGeo: (geo: GeoCode) => void;
  config: GeoConfigEntry;
  allGeos: Record<GeoCode, GeoConfigEntry>;
};

const GeoContext = createContext<GeoContextValue | null>(null);

const STORAGE_KEY = "geo";
const MANUAL_KEY = "geoManual";

function isGeoCode(value: string | null): value is GeoCode {
  return !!value && value in GEO_CONFIG;
}

function detectGeoFromBrowser(): GeoCode | null {
  if (typeof navigator === "undefined") return null;

  // Prefer timezone for country-level hint (e.g. Europe/Warsaw -> PL)
  const timeZone =
    typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "";
  const tzMap: Record<string, GeoCode> = {
    "Europe/Warsaw": "PL",
    "Europe/Berlin": "DE",
    "Europe/Prague": "CS",
    "Europe/Madrid": "ES",
    "Europe/Kyiv": "EN",
    "Europe/Kiev": "EN",
  };
  if (timeZone && tzMap[timeZone]) {
    return tzMap[timeZone];
  }

  // e.g. "pl-PL" -> "pl"
  const lang2 = (navigator.language || "").toLowerCase().slice(0, 2);

  const map: Record<string, GeoCode> = {
    pl: "PL",
    de: "DE",
    es: "ES",
    cs: "CS",
    uk: "EN",
    en: "EN",
  };

  return map[lang2] ?? null;
}

function getInitialGeo(): GeoCode {
  if (typeof window === "undefined") return "EN";

  const manual = localStorage.getItem(MANUAL_KEY) === "1";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (manual && isGeoCode(stored)) return stored;

  const detected = detectGeoFromBrowser();
  if (detected) return detected;
  if (isGeoCode(stored)) return stored;
  return "EN";
}

export const GeoProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [geo, setGeoInternal] = useState<GeoCode>(() => getInitialGeo());

  const setGeo = (next: GeoCode) => {
    setGeoInternal(next);
    try {
      localStorage.setItem(MANUAL_KEY, "1");
    } catch {
      // ignore
    }
  };

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, geo);
    } catch {
      // ignore
    }
  }, [geo]);

  const value = useMemo<GeoContextValue>(() => {
    return {
      geo,
      setGeo,
      config: GEO_CONFIG[geo],
      allGeos: GEO_CONFIG,
    };
  }, [geo]);

  return <GeoContext.Provider value={value}>{children}</GeoContext.Provider>;
};

export const useGeo = (): GeoContextValue => {
  const ctx = useContext(GeoContext);
  if (!ctx) throw new Error("useGeo must be used within GeoProvider");
  return ctx;
};
