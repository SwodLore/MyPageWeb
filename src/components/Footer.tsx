import { Linkedin, Github, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-10 md:px-20 text-center">
      {/* Nombre y mensaje */}
      <h2 className="text-2xl font-bold text-[#61DAFB]">Alessandro Poves</h2>
      <p className="text-gray-400 mt-2">Ingeniero de Sistemas | Desarrollador Web | Full Stack | React | Laravel </p>

      {/* Información de contacto */}
      <div className="mt-4">
        <p className="text-gray-300">📩 Contáctame en:</p>
        <a
          href="mailto:apovesmartinez@gmail.com"
          className="text-[#61DAFB] hover:underline"
          target="_blank"
        >
          apovesmartinez@gmail.com
        </a>
      </div>

      <div className="flex justify-center gap-6 mt-6">
        <a
          href="https://www.linkedin.com/in/alessandro-piero-poves-martinez-524467318/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#61DAFB] transition duration-300"
        >
          <Linkedin size={28} />
        </a>
        <a
          href="https://github.com/SwodLore"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#61DAFB] transition duration-300"
        >
          <Github size={28} />
        </a>
        <a
          href="https://www.instagram.com/alepoves/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#61DAFB] transition duration-300"
        >
          <Instagram size={28} />
        </a>
      </div>

      <p className="text-gray-500 text-sm mt-6">
        © {new Date().getFullYear() + ' '}
        <a
          href="https://www.instagram.com/alepoves/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#61DAFB] transition duration-300"
        >
          Alessandro Poves
        </a> . Todos los derechos reservados.
      </p>
    </footer>
  );
}
