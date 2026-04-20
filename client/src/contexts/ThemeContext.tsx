import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (switchable) {
      const stored = localStorage.getItem("theme");
      return (stored as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (switchable) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, switchable]);

  const runThemeTransition = (applyTheme: () => void) => {
    if (typeof window === "undefined") {
      applyTheme();
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      applyTheme();
      return;
    }

    const root = document.documentElement;
    root.classList.add("theme-transitioning");

    const docWithTransition = document as Document & {
      startViewTransition?: (callback: () => void) => { finished?: Promise<void> };
    };

    if (docWithTransition.startViewTransition) {
      const transition = docWithTransition.startViewTransition(() => {
        applyTheme();
      });
      transition?.finished?.finally(() => {
        root.classList.remove("theme-transitioning");
      });
      return;
    }

    applyTheme();
    window.setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 380);
  };

  const toggleTheme = switchable
    ? () => {
        runThemeTransition(() => {
          setTheme((prev) => (prev === "light" ? "dark" : "light"));
        });
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
