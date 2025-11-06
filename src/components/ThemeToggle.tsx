import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeToggle debe usarse dentro de ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-200"
      aria-label={`Cambiar a tema ${theme === "dark" ? "claro" : "oscuro"}`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-slate-600" />
      )}
    </button>
  );
}
