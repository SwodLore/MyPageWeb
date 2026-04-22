import { useEffect, useState } from "react";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import { Github, Instagram, Linkedin, Menu, Sparkles, X } from "lucide-react";
import { useLenis } from "lenis/react";
import ThemeToggle from "./ThemeToggle";
import { personal } from "../data/personal";

// ═══════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════

const NAV_ITEMS = [
  { id: "sobre-mi",       label: "Inicio" },
  { id: "skills-overview", label: "Skills" },
  { id: "portafolio",     label: "Proyectos" },
  { id: "certificados",   label: "Certificados" },
  { id: "contacto",       label: "Contacto" },
];

const SOCIAL_MOBILE = [
  { name: "GitHub",    href: personal.social.github,    icon: Github },
  { name: "LinkedIn",  href: personal.social.linkedin,  icon: Linkedin },
  { name: "Instagram", href: personal.social.instagram, icon: Instagram },
];

// ═══════════════════════════════════════════════════════════════
// Header
// ═══════════════════════════════════════════════════════════════

export default function Header() {
  const lenis = useLenis();
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState("sobre-mi");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    const sections  = document.querySelectorAll<HTMLElement>("section[id]");
    const observer  = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: 0.3 }
    );

    sections.forEach((s) => observer.observe(s));
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) lenis?.scrollTo(el, { offset: -80, duration: 1.4 });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Main header bar ─────────────────────────────────── */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/30"
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-apple">
          <div className="flex h-14 items-center justify-between">

            {/* ── Logo ──────────────────────────────────────── */}
            <motion.a
              href="/"
              className="flex items-center gap-3 shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative">
                <img
                  src="/icon.webp"
                  alt="Alessandro Poves"
                  className="h-14 w-auto object-contain"
                />
                {/* Availability dot */}
                {personal.available && (
                  <span className="absolute bottom-1 right-0 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-slate-900" />
                  </span>
                )}
              </div>
              <div className="hidden sm:block">
                <span className="block text-base font-bold text-slate-900 dark:text-white leading-tight">
                  Alessandro Poves
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  Full Stack Developer
                </span>
              </div>
            </motion.a>

            {/* ── Desktop nav ───────────────────────────────── */}
            <LayoutGroup>
              <nav className="hidden md:flex items-center gap-0.5 px-1.5 py-1.5 rounded-2xl bg-slate-100/60 dark:bg-slate-800/60 backdrop-blur-sm">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                        isActive
                          ? "text-white"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavTab"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md shadow-blue-500/25"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </LayoutGroup>

            {/* ── Right actions ─────────────────────────────── */}
            <div className="flex items-center gap-2.5">
              {/* Availability badge — desktop lg only */}
              {personal.available && (
                <motion.div
                  className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-700/40 text-emerald-700 dark:text-emerald-400 text-xs font-medium"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Disponible
                </motion.div>
              )}

              {/* CTA — visible from lg */}
              <motion.button
                onClick={() => scrollTo("contacto")}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-shadow cursor-pointer"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <Sparkles size={13} />
                Hablemos
              </motion.button>

              <ThemeToggle />

              {/* Hamburger — mobile */}
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.93 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile menu ──────────────────────────────────────── */}
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

            {/* Panel */}
            <motion.div
              className="fixed top-[72px] left-4 right-4 z-40 md:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/96 dark:bg-slate-900/96 backdrop-blur-xl shadow-2xl overflow-hidden">

                {/* Availability row */}
                {personal.available && (
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      {personal.availableText}
                    </span>
                  </div>
                )}

                {/* Nav items */}
                <nav className="p-2">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors cursor-pointer ${
                        activeSection === item.id
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                {/* CTA */}
                <div className="p-2 pt-0">
                  <motion.button
                    onClick={() => scrollTo("contacto")}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold shadow-md cursor-pointer"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Sparkles size={14} />
                    Trabajemos Juntos
                  </motion.button>
                </div>

                {/* Social links */}
                <div className="flex items-center justify-center gap-3 px-4 py-3 border-t border-slate-100 dark:border-slate-800">
                  {SOCIAL_MOBILE.map(({ name, href, icon: Icon }, i) => (
                    <motion.a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28 + i * 0.04 }}
                      whileTap={{ scale: 0.93 }}
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
