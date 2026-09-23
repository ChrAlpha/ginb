"use client";

import { useState, useEffect, useContext, createContext, useCallback, memo, type ReactNode } from "react";
import type { Theme, ThemeContextType } from "@/types";
import { BaseStyles, ThemeProvider } from "@primer/react";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProvidersProps {
  children: ReactNode;
}

export const ThemeProviders = memo(({ children }: ThemeProvidersProps) => {
  const [theme, setTheme] = useState<Theme | undefined>(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
    const localTheme = localStorage.getItem("user-color-scheme") as Theme | null;
    return localTheme || "system";
  });
  const [colorScheme, setColorScheme] = useState<"light" | "dark" | undefined>(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    else {
      return "light";
    }
  });

  const handleColorSchemeChange = useCallback(
    (event?: MediaQueryListEvent | MediaQueryList) => {
      if (!event) {
        event = window.matchMedia("(prefers-color-scheme: dark)");
      }
      if (event.matches) {
        setColorScheme("dark");
      }
      else {
        setColorScheme("light");
      }
    },
    [setColorScheme],
  );

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleColorSchemeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleColorSchemeChange);
    };
  }, [handleColorSchemeChange]);

  useEffect(() => {
    if (theme != "system" && theme != "light" && theme != "dark") {
      console.error("color must be system, light or dark");
    }
    else {
      const resolvedColorMode = theme === "system" ? colorScheme : theme;
      if (theme == "system") {
        typeof window !== "undefined" && localStorage.removeItem("user-color-scheme");
      }
      else {
        typeof window !== "undefined" && localStorage.setItem("user-color-scheme", theme);
      }
      document.documentElement.setAttribute("data-color-mode", resolvedColorMode || "light");
    }
  }, [theme, colorScheme]);

  const primerColorMode = theme === "system" ? "auto" : theme;

  return (
    <>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html:
            "!function(){const e=localStorage.getItem(\"user-color-scheme\");const mode=\"dark\"===e||(!e&&window.matchMedia(\"(prefers-color-scheme: dark)\").matches)?\"dark\":\"light\";document.documentElement.setAttribute(\"data-color-mode\",mode);}()",
        }}
      />
      <ThemeProvider colorMode={primerColorMode || "auto"}>
        <BaseStyles>
          <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
        </BaseStyles>
      </ThemeProvider>
    </>
  );
});
