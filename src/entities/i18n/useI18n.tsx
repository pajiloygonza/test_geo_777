import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
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
  const { config } = useGeo();
  const [lang, setLang] = useState<LangCode>(config.defaultLang);

  useEffect(() => {
    setLang(config.defaultLang);
  }, [config.defaultLang]);

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
  }, [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
};
