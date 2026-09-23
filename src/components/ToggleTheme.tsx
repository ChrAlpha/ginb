"use client";

import { useContext, createContext, useCallback, useSyncExternalStore, memo, type ReactNode } from "react";
import type { Theme, ThemeContextType } from "@/types";
import { BaseStyles } from "@primer/react";

const STORAGE_KEY = "user-color-scheme";
const THEME_CHANGE_EVENT = "user-color-scheme-change";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const getStoredTheme = (): Theme => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : "system";
};

// Primer CSS resolves "auto" against prefers-color-scheme by itself
const applyColorMode = (theme: Theme) => {
  document.documentElement.setAttribute("data-color-mode", theme === "system" ? "auto" : theme);
};

const subscribe = (onChange: () => void) => {
  // "storage" fires for changes from other tabs, THEME_CHANGE_EVENT for this one
  const handleChange = () => {
    applyColorMode(getStoredTheme());
    onChange();
  };
  window.addEventListener("storage", handleChange);
  window.addEventListener(THEME_CHANGE_EVENT, handleChange);
  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(THEME_CHANGE_EVENT, handleChange);
  };
};

// localStorage is unavailable on the server, so hydrate as "system" and let React
// re-render with the stored theme; the inline script has already applied it to <html>
const getServerTheme = (): Theme => "system";

const themeScript = `!function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-color-mode",t)}catch(e){}}()`;

interface ThemeProvidersProps {
  children: ReactNode;
}

export const ThemeProviders = memo(({ children }: ThemeProvidersProps) => {
  const theme = useSyncExternalStore(subscribe, getStoredTheme, getServerTheme);

  const setTheme = useCallback((nextTheme: Theme) => {
    if (nextTheme === "system") {
      localStorage.removeItem(STORAGE_KEY);
    }
    else {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  return (
    <>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: themeScript }}
      />
      <BaseStyles>
        <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
      </BaseStyles>
    </>
  );
});
