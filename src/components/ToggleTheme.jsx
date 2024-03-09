"use client";

import { useState, useEffect, useContext, createContext, useCallback, memo } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProviders = memo(({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
    const localTheme = localStorage.getItem("user-color-scheme");
    return localTheme || "system";
  });
  const [colorScheme, setColorScheme] = useState(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  });

  // 添加事件监听器以响应系统颜色方案更改
  const handleColorSchemeChange = useCallback(
    (event) => {
      if (!event) {
        event = window.matchMedia("(prefers-color-scheme: dark)");
      }
      if (event.matches) {
        setColorScheme("dark");
      } else {
        setColorScheme("light");
      }
    },
    [setColorScheme],
  );

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleColorSchemeChange);

    // 卸载组件时，移除事件监听器
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleColorSchemeChange);
    };
  }, [handleColorSchemeChange]);

  useEffect(() => {
    if (theme == "system") {
      if (document.documentElement.className != colorScheme) {
        document.documentElement.className = colorScheme;
      }
    }
  }, [theme, colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "!function(){const e=localStorage.getItem('user-color-scheme');'light'==e||'dark'==e?document.documentElement.classList.contains(e)||(document.documentElement.classList=[e]):document.documentElement.classList=[window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light']}();",
        }}
      />
      {children}
    </ThemeContext.Provider>
  );
});

export const ToggleTheme = memo(({ responsive }) => {
  const [mounted, setMounted] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(
    (color) => {
      if (color != "system" && color != "light" && color != "dark") {
        console.error("color must be system, light or dark");
      } else {
        setTheme(color);
        typeof window !== "undefined" && localStorage.setItem("user-color-scheme", color);
        if (color == "light" || color == "dark") {
          if (document.documentElement.className != color) {
            document.documentElement.className = color;
          }
        }
      }
    },
    [setTheme],
  );

  const handleClickOutside = useCallback(
    (e) => {
      if (e.target.closest("#toggle-theme-button") || e.target.closest("#toggle-theme-menu")) {
        return;
      } else {
        setIsToggleOpen(false);
      }
    },
    [setIsToggleOpen],
  );

  useEffect(() => {
    setMounted(true);

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button
        id="toggle-theme-button"
        aria-label="切换主题"
        className={
          "text-[#666] hover:text-black focus:outline-none dark:text-[#888] dark:hover:text-white" +
          (responsive ? " " + responsive : "")
        }
        type="button"
        onClick={() => setIsToggleOpen(!isToggleOpen)}
      >
        <svg
          className="m-auto h-6 w-6"
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 3v18" />
          <path d="M12 14l7 -7" />
          <path d="M12 19l8.5 -8.5" />
          <path d="M12 9l4.5 -4.5" />
        </svg>
      </button>
      <div className={(isToggleOpen ? "absolute" : "hidden") + " right-0 top-12"}>
        <div
          id="toggle-theme-menu"
          className="mt-1 box-content block min-w-min rounded-lg border bg-white p-2 dark:bg-black"
        >
          <button
            id="toggle-theme-light-button"
            aria-label="总是亮色"
            className="mx-auto flex flex-row rounded-lg p-2 text-black/60 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/20"
            onClick={() => toggleTheme("light")}
          >
            {theme == "light" ? (
              <svg
                className="m-auto h-4 w-6 px-1"
                fill="none"
                height="24"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M 19.28125 5.28125 L 9 15.5625 L 4.71875 11.28125 L 3.28125 12.71875 L 8.28125 17.71875 L 9 18.40625 L 9.71875 17.71875 L 20.71875 6.71875 Z" />
              </svg>
            ) : (
              <span className="w-6"></span>
            )}
            <svg
              className="m-auto h-4 w-6 px-1"
              data-testid="geist-icon"
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <path d="M12 1v2"></path>
              <path d="M12 21v2"></path>
              <path d="M4.22 4.22l1.42 1.42"></path>
              <path d="M18.36 18.36l1.42 1.42"></path>
              <path d="M1 12h2"></path>
              <path d="M21 12h2"></path>
              <path d="M4.22 19.78l1.42-1.42"></path>
              <path d="M18.36 5.64l1.42-1.42"></path>
            </svg>
            <span className="min-w-min break-keep">总是亮色</span>
          </button>
          <button
            id="toggle-theme-dark-button"
            aria-label="总是暗色"
            className="mx-auto flex flex-row rounded-lg p-2 text-black/60 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/20"
            onClick={() => toggleTheme("dark")}
          >
            {theme == "dark" ? (
              <svg
                className="m-auto h-4 w-6 px-1"
                fill="none"
                height="24"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M 19.28125 5.28125 L 9 15.5625 L 4.71875 11.28125 L 3.28125 12.71875 L 8.28125 17.71875 L 9 18.40625 L 9.71875 17.71875 L 20.71875 6.71875 Z" />
              </svg>
            ) : (
              <span className="w-6"></span>
            )}
            <svg
              className="m-auto h-4 w-6 px-1"
              data-testid="geist-icon"
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
            </svg>
            <span className="min-w-min break-keep">总是暗色</span>
          </button>
          <button
            id="toggle-theme-system-button"
            aria-label="跟随系统"
            className="mx-auto flex flex-row rounded-lg p-2 text-black/60 hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/20"
            onClick={() => toggleTheme("system")}
          >
            {theme != "light" && theme != "dark" ? (
              <svg
                className="m-auto h-4 w-6 px-1"
                fill="none"
                height="24"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M 19.28125 5.28125 L 9 15.5625 L 4.71875 11.28125 L 3.28125 12.71875 L 8.28125 17.71875 L 9 18.40625 L 9.71875 17.71875 L 20.71875 6.71875 Z" />
              </svg>
            ) : (
              <span className="w-6"></span>
            )}
            <svg
              className="m-auto h-4 w-6 px-1"
              data-testid="geist-icon"
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M8 21h8"></path>
              <path d="M12 17v4"></path>
            </svg>
            <span className="min-w-min break-keep">跟随系统</span>
          </button>
        </div>
      </div>
    </>
  );
});
