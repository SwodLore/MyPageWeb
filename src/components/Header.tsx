import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false); 
  };

  return (
    <header className="dark:bg-slate-800 bg-slate-200 backdrop-blur-md shadow-md py-4 px-8 md:px-20 flex justify-between items-center fixed w-full top-0 z-50">
    <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-12 h-12 animate-spin-slow" 
        />
      <h1 className="text-3xl font-bold dark:text-[#61DAFB] text-[#007acc] cursor-pointer"><a href="/">Alessandro Poves</a></h1>
    </div>
    
      <nav className="hidden md:flex gap-6">
        {["Sobre Mi", "Portafolio", "Certificados", "Contacto"].map((item) => {
          const id = item.toLowerCase().replace(" ", "-");
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`text-lg font-medium transition duration-300 cursor-pointer ${
                activeSection === id ? "dark:text-[#61DAFB] text-[#007acc]" : "dark:text-white text-black"
              } hover:dark:text-[#61DAFB] text-[#007acc]`}
            >
              {item}
            </button>
          );
        })}
        <ThemeToggle />
      </nav>
      
      <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      
      {menuOpen && (
        <nav className="absolute top-16 right-4 dark:bg-white/10 bg-black/10 backdrop-blur-md shadow-lg p-4 rounded-xl flex flex-col gap-4 md:hidden">
          {["Sobre Mi", "Portafolio", "Certificados", "Contacto"].map((item) => {
            const id = item.toLowerCase().replace(" ", "-");
            return (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-lg font-medium transition duration-300 ${
                  activeSection === id ? "dark:text-[#61DAFB] text-[#007acc]" : "dark:text-white text-black"
                } hover:text-[#61DAFB]`}
              >
                {item}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
