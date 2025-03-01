import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); 
    }
  };

  return (
    <header className="bg-slate-800 backdrop-blur-md shadow-md py-4 px-8 md:px-20 flex justify-between items-center fixed w-full top-0 z-50">
      {/* Nombre */}
      <h1 className="text-3xl font-bold text-[#61DAFB] cursor-pointer">Alessandro Poves</h1>

      {/* Menú Desktop */}
      <nav className="hidden md:flex gap-6">
        {["Sobre Mí", "Portafolio", "Certificados", "Contacto"].map((item, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
            className="text-white text-lg font-medium hover:text-[#61DAFB] transition duration-300"
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Menú Hamburguesa Responsive */}
      <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menú Móvil */}
      {menuOpen && (
        <nav className="absolute top-16 right-4 bg-white/10 backdrop-blur-md shadow-lg p-4 rounded-xl flex flex-col gap-4 md:hidden">
          {["Sobre Mí", "Portafolio", "Certificados", "Contacto"].map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
              className="text-white text-lg font-medium hover:text-[#61DAFB] transition duration-300"
            >
              {item}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
