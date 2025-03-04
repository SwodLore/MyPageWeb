import { Linkedin, Github, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="dark:bg-gray-800 bg-slate-200 text-white py-8 px-10 md:px-20 text-center">
      <h2 className="text-2xl font-bold dark:text-[#61DAFB] text-[#007acc]">Alessandro Poves</h2>
      <p className="dark:text-gray-400 text-gray-800 mt-2">Ingeniero de Sistemas | Desarrollador Web | Full Stack | React | Laravel </p>

      <div className="mt-4">
        <p className="dark:text-gray-300 text-gray-700">📩 Contáctame en:</p>
        <a
          href="mailto:apovesmartinez@gmail.com"
          className="dark:text-[#61DAFB] text-[#007acc] hover:underline"
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
          className="dark:text-gray-400 text-gray-700 dark:hover:text-[#61DAFB] hover:text-[#007acc] transition duration-300"
        >
          <Linkedin size={28} />
        </a>
        <a
          href="https://github.com/SwodLore"
          target="_blank"
          rel="noopener noreferrer"
          className="dark:text-gray-400 text-gray-700 dark:hover:text-[#61DAFB] hover:text-[#007acc] transition duration-300"
        >
          <Github size={28} />
        </a>
        <a
          href="https://www.instagram.com/alepoves/"
          target="_blank"
          rel="noopener noreferrer"
          className="dark:text-gray-400 text-gray-700 dark:hover:text-[#61DAFB] hover:text-[#007acc] transition duration-300"
        >
          <Instagram size={28} />
        </a>
      </div>

      <p className="dark:text-gray-500 text-gray-700 text-sm mt-6">
        © {new Date().getFullYear() + ' '}
        <a
          href="https://www.instagram.com/alepoves/"
          target="_blank"
          rel="noopener noreferrer"
          className="dark:text-gray-400 text-gray-500 dark:hover:text-[#61DAFB] hover:text-[#007acc] transition duration-300"
        >
          Alessandro Poves
        </a> . Todos los derechos reservados.
      </p>
    </footer>
  );
}
