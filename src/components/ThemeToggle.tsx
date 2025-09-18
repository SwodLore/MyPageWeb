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
      className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-105 border border-slate-200 dark:border-slate-600"
      aria-label={`Cambiar a tema ${theme === "dark" ? "claro" : "oscuro"}`}
    >
      {theme === "dark" ? (
        <Sun
          size={18}
          className="text-yellow-500 transition-transform duration-200 hover:scale-110"
        />
      ) : (
        <Moon
          size={18}
          className="text-slate-600 dark:text-slate-400 transition-transform duration-200 hover:scale-110"
        />
      )}
    </button>
  );
}
