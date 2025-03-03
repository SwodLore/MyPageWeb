import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contacto() {
  return (
    <>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">📩 Contacto</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">📍 Información</h3>
            <p className="text-gray-400">
              ¿Tienes un proyecto interesante o simplemente quieres conectar? 🚀  
              Estoy disponible para colaborar en proyectos de desarrollo y tecnología.
            </p>
            <ul className="mt-4 space-y-2 flex flex-col">
              <li className="inline-flex"><MapPin className="w-5 h-5 text-[#61DAFB] mr-2" /> Ubicación: Huancayo, Perú</li>
              <li className="inline-flex"><Mail className="w-5 h-5 text-[#61DAFB] mr-2" /> Email: <a href="mailto:apovesmartinez@gmail.com" className="text-[#61DAFB] underline"> apovesmartinez@gmail.com</a></li>
              <li className="inline-flex"><a href="https://wa.me/51977776058" target="_blank" className="bg-green-500 px-4 py-2 rounded-lg text-white my-3 inline-flex">
                <Phone className="w-5 h-5 text-white mr-2" /> WhatsApp
              </a></li>
              🔗 Redes: 
              <li className="flex items-start flex-col gap-4"> 
                <a href="https://www.linkedin.com/in/alessandro-piero-poves-martinez-524467318/" target="_blank" className="text-[#61DAFB] ml-2 inline-flex">
                  <Linkedin className="w-5 h-5 mr-1" />
                  LinkedIn
                </a>
                <a href="https://github.com/SwodLore" target="_blank" className="text-[#61DAFB] ml-2 inline-flex">
                  <Github className="w-5 h-5 mr-1" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-800 text-white rounded-lg py-6">
            <h1 className="md:text-3xl font-bold mb-4 text-xl">📄 Mi Currículum Vitae</h1>
            <Link
              to="/cvPage"
              target="_blank"
              className="mt-4 px-6 py-3 bg-[#61DAFB] text-gray-900 font-semibold rounded-lg hover:bg-[#4bb0d7]"
            >
              📥 Ver CV
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
