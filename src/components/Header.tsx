import { useEffect, useState } from "react";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "sobre-mi", label: "Inicio" },
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
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "bg-white/90 border-slate-200 shadow-md dark:bg-slate-900/90 dark:border-slate-800"
            : "bg-white/70 border-transparent dark:bg-slate-900/70"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container-apple">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 dark:bg-blue-500">
                <img 
                  src="/logo.webp" 
                  alt="AP" 
                  className="h-5 w-5 object-contain brightness-0 invert"
                />
              </div>
              <span className="hidden sm:inline-block text-base font-semibold text-slate-900 dark:text-white">
                Alessandro Poves
              </span>
            </a>

            {/* Desktop Navigation */}
            <LayoutGroup>
              <nav className="hidden md:flex items-center gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>
            </LayoutGroup>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                ) : (
                  <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                )}
              </button>
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
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              className="fixed top-16 left-0 right-0 z-40 md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mx-4 mt-2 rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
                <nav className="p-2">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`w-full rounded-xl px-4 py-3 text-left text-base font-medium transition-colors ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
