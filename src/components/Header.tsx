import { useEffect, useState } from "react";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "sobre-mi", label: "Inicio" },
  { id: "skills-overview", label: "Skills" },
  { id: "portafolio", label: "Proyectos" },
  { id: "certificados", label: "Certificados" },
  { id: "contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: 0.3 },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${scrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/30"
            : "bg-transparent"
          }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-apple">
          <div className="flex h-16 md:h-18 items-center justify-between">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-3 shrink-0 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 shadow-lg shadow-blue-500/25">
                {/* Animated glow */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 opacity-0 group-hover:opacity-50 blur-md transition-opacity"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <img
                  src="/logo.webp"
                  alt="AP"
                  className="relative h-5 w-5 object-contain brightness-0 invert"
                />
              </div>
              <div className="hidden sm:block">
                <span className="block text-base font-bold text-slate-900 dark:text-white">
                  Alessandro Poves
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400 -mt-0.5">
                  Full Stack Developer
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <LayoutGroup>
              <nav className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors ${isActive
                          ? "text-white"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        }`}
                      whileHover={{ scale: isActive ? 1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavTab"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </LayoutGroup>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* CTA Button - Desktop only */}
              <motion.button
                onClick={() => scrollTo("contacto")}
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-shadow"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles size={14} />
                Hablemos
              </motion.button>

              <ThemeToggle />

              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.95 }}
              >
                {menuOpen ? (
                  <X className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                ) : (
                  <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-[72px] left-4 right-4 z-40 md:hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                <nav className="p-3">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`w-full rounded-xl px-4 py-3.5 text-left text-base font-medium transition-colors ${activeSection === item.id
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="p-3 pt-0">
                  <motion.button
                    onClick={() => scrollTo("contacto")}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles size={16} />
                    Trabajemos Juntos
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
