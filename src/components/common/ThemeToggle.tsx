import { m } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Cambiar a tema ${isDark ? "claro" : "oscuro"}`}
      className={`relative flex h-8 w-[54px] items-center rounded-full border transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
        isDark
          ? "bg-slate-700 border-slate-600"
          : "bg-slate-200 border-slate-300"
      }`}
    >
      {/* Sliding thumb */}
      <m.span
        className={`absolute flex h-6 w-6 items-center justify-center rounded-full shadow-md ${
          isDark ? "bg-slate-900" : "bg-white"
        }`}
        animate={{ x: isDark ? 24 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon size={13} className="text-blue-400" />
        ) : (
          <Sun size={13} className="text-amber-500" />
        )}
      </m.span>

      {/* Track icons (behind thumb) */}
      <Sun
        size={11}
        className={`absolute left-[6px] transition-opacity duration-200 ${isDark ? "opacity-30 text-slate-400" : "opacity-0"}`}
      />
      <Moon
        size={11}
        className={`absolute right-[6px] transition-opacity duration-200 ${isDark ? "opacity-0" : "opacity-30 text-slate-500"}`}
      />
    </button>
  );
}
