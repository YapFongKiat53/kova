import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en, type Dict } from "./en";
import { ms } from "./ms";

export type Lang = "en" | "ms";

const dictionaries: Record<Lang, Dict> = { en: en as unknown as Dict, ms };

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "en", setLang: () => {} });

// ✅ 1. 更新 Props 接口，添加 initialLang
export function LangProvider({ 
  children, 
  initialLang 
}: { 
  children: ReactNode; 
  initialLang?: Lang; // SSG 在打包时会传入这个参数
}) {
  // ✅ 2. 优先使用 initialLang (为了 SEO 渲染)，其次读取 localStorage
  const [lang, setLangState] = useState<Lang>(initialLang || "en");

  useEffect(() => {
    // 只有在浏览器环境才去读取 localStorage
    if (!initialLang) {
      const saved = localStorage.getItem("kova-lang");
      if (saved === "en" || saved === "ms") setLangState(saved);
    }
  }, [initialLang]);

  useEffect(() => {
    document.documentElement.lang = dictionaries[lang].meta.htmlLang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("kova-lang", l);
    } catch {
      /* ignore quota / private mode errors */
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function useT(): Dict {
  const { lang } = useContext(LangContext);
  return dictionaries[lang];
}