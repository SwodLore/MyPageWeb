import { useEffect, useState, ReactNode } from "react";
import { ThemeContext, type Theme } from "./theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    try {
      const root = document.documentElement;
      const body = document.body;
      const isDark = theme === "dark";

      root.classList.toggle("dark", isDark);
      root.setAttribute("data-theme", theme);
      if (body) body.setAttribute("data-theme", theme);
      root.style.colorScheme = isDark ? "dark" : "light";
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.warn("No se pudo sincronizar el tema", error);
    }
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      try {
        const storedTheme = localStorage.getItem("theme");
        if (!storedTheme) {
          setTheme(event.matches ? "dark" : "light");
        }
      } catch (error) {
        console.warn("No se pudo leer la preferencia del sistema", error);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const toggleTheme = () => setTheme((current) => (current === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
