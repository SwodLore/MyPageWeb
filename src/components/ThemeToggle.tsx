import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export default function ThemeToggle() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeToggle debe usarse dentro de ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shadow-md hover:scale-105 transition-transform"
    >
      <span className="text-gray-800 dark:text-gray-100">
        {theme === "dark" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
