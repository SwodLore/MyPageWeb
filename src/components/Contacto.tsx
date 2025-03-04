import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contacto() {
  return (
    <>
      <div className="container mx-auto px-4 mt-5">
        <div className="grid md:grid-cols-2 gap-8 rounded-lg border-l-4 dark:border-[#61DAFB] border-[#007acc] shadow-md">
          <div className="dark:bg-gray-800 bg-slate-200 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-white text-black">📍 Información</h3>
            <p className="dark:text-gray-400 text-gray-800">
              ¿Tienes un proyecto interesante o simplemente quieres conectar? 🚀  
              Estoy disponible para colaborar en proyectos de desarrollo y tecnología.
            </p>
            <ul className="mt-4 space-y-2 flex flex-col dark:text-white text-black">
              <li className="inline-flex"><MapPin className="w-5 h-5 dark:text-[#61DAFB] text-[#007acc] mr-2" /> Ubicación: Huancayo, Perú</li>
              <li className="inline-flex"><Mail className="w-5 h-5 dark:text-[#61DAFB] text-[#007acc] mr-2" /> Email: <a href="mailto:apovesmartinez@gmail.com" className="dark:text-[#61DAFB] text-[#007acc] underline"> apovesmartinez@gmail.com</a></li>
              <li className="inline-flex"><a href="https://wa.me/51977776058" target="_blank" className="bg-green-500 px-4 py-2 rounded-lg text-white my-3 inline-flex">
                <Phone className="w-5 h-5 text-white mr-2" /> WhatsApp
              </a></li>
              🔗 Redes: 
              <li className="flex items-start flex-col gap-4"> 
                <a href="https://www.linkedin.com/in/alessandro-piero-poves-martinez-524467318/" target="_blank" className="dark:text-[#61DAFB] text-[#007acc] ml-2 inline-flex">
                  <Linkedin className="w-5 h-5 mr-1" />
                  LinkedIn
                </a>
                <a href="https://github.com/SwodLore" target="_blank" className="dark:text-[#61DAFB] text-[#007acc] ml-2 inline-flex">
                  <Github className="w-5 h-5 mr-1" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center dark:bg-gray-800 bg-slate-200 rounded-lg py-6  border-l-4 dark:border-[#61DAFB] border-[#007acc] shadow-md">
            <h1 className="md:text-3xl font-bold mb-4 text-xl dark:text-white text-black">📄 Mi Currículum Vitae</h1>
            <Link
              to="/cv.pdf"
              target="_blank"
              className="mt-4 px-6 py-3 dark:bg-[#61DAFB] bg-[#007acc] text-gray-900 font-semibold rounded-lg dark:hover:bg-[#4bb3d6] hover:bg-[#007acce5]"
            >
              📥 Descargar CV
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
