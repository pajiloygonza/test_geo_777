import React, { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { dictionaries } from "./dictionaries";
import { LangCode, TranslationKey } from "./i18n.types";
import { useGeo } from "../geo/useGeo";

export type I18nContextValue = {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: TranslationKey) => string;
  availableLangs: LangCode[];
};

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { config, setGeo, allGeos } = useGeo();
  const lang = config.defaultLang;

  const setLang = useCallback(
    (next: LangCode) => {
      if (next === config.defaultLang) return;

      const entry = Object.values(allGeos).find((item) => item.defaultLang === next);
      if (entry) {
        setGeo(entry.code);
      }
    },
    [allGeos, config.defaultLang, setGeo],
  );

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // ignore storage errors
    }
  }, [lang]);

  const t = useCallback(
    (key: TranslationKey) => {
      return dictionaries[lang][key] ?? key;
    },
    [lang],
  );

  const value = useMemo<I18nContextValue>(() => {
    return {
      lang,
      setLang,
      t,
      availableLangs: Object.keys(dictionaries) as LangCode[],
    };
  }, [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
};
