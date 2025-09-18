import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { name: "Inicio", id: "sobre-mi" },
    { name: "Proyectos", id: "portafolio" },
    { name: "Certificados", id: "certificados" },
    { name: "Contacto", id: "contacto" }
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-700/50"
          : "bg-transparent"
      }`}
      style={{
        backdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none'
      }}
    >
      <div className="container-apple">
        <div
          className={`flex justify-between items-center transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Apple Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center gap-3 group hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-7 h-7 relative">
                <img
                  src="/logo.png"
                  alt="Alessandro Poves"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-slate-100 hidden sm:block">
                Alessandro Poves
              </span>
            </a>
          </div>

          {/* Apple Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-normal transition-colors duration-200 relative py-2 ${
                  activeSection === item.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                style={{
                  fontSize: '14px',
                  letterSpacing: '0.01em'
                }}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? (
                <X size={20} className="text-gray-700 dark:text-slate-300" />
              ) : (
                <Menu size={20} className="text-gray-700 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Apple Mobile Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40 md:hidden animate-fade-up"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="absolute top-full left-0 right-0 z-50 md:hidden animate-scale-in"
            style={{ animationDuration: '0.15s' }}
          >
            <div
              className="mx-4 mt-2 bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-slate-700/50"
              style={{
                backdropFilter: 'saturate(180%) blur(20px)',
                WebkitBackdropFilter: 'saturate(180%) blur(20px)'
              }}
            >
              <nav className="py-4">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-6 py-4 text-lg font-normal transition-colors duration-200 ${
                      activeSection === item.id
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-800 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800/50"
                    }`}
                    style={{
                      animationDelay: `${index * 0.05}s`
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
