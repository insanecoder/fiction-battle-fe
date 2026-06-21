// src/hooks/useTheme.ts
import { useLayoutEffect, useState } from "react";
import { logger } from "../common/utils/Logger";

export type Theme = "light" | "dark";
const STORAGE_KEY = "theme";

function getInitialTheme(): Theme {
  // Check saved preference
  const stored:Theme = localStorage.getItem(STORAGE_KEY) as Theme;
  if (stored === "dark" || stored === "light") return stored;

  //Fallback: system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useLayoutEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    logger.info(`Current theme is ${theme}`)
    setTheme(t => (t === "light" ? "dark" : "light"));
    logger.info(`After toggle current theme is ${theme}`)
  }

  return { theme, toggleTheme };
}
