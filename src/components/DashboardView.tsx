import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { skills } from "../data/skills";

export default function DashboardView() {
  const handleScrollToCertificado = () => {
    const certificadoSection = document.getElementById("certificados");
    if (certificadoSection) {
      certificadoSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <section id="sobre-mi" className="py-16 px-8 md:px-20 bg-gray-900 text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="relative w-52 h-52 md:w-64 md:h-64">
            <img
              src="/profile.jpg"
              alt="Alessandro Poves"
              className="w-full h-full object-cover rounded-full border-4 border-[#61DAFB] shadow-lg"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-bold text-[#61DAFB] mb-4">Sobre Mí</h2>
            <p className="text-lg text-gray-300">
              ¡Hola! Soy <span className="text-white font-semibold">Alessandro Poves</span>, un apasionado por el desarrollo web y la tecnología.  
              Me especializo en backend con Laravel y Spring Boot, y estoy aprendiendo frontend con React y Angular.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-[#61DAFB] shadow-md">
                <img src="https://uncp.edu.pe/wp-content/uploads/2024/01/logo-uncp-2024.png" alt="Logo de la UNCP" />
                <h3 className="text-xl font-semibold">  Universidad Nacional del Centro del Perú</h3>
                <p className="text-gray-400">Ingeniería de Sistemas - 7mo ciclo</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-[#61DAFB] shadow-md">
                <img src="https://aulavirtual.icpnarc.edu.pe/pluginfile.php/1/theme_moove/logo/1739894532/logo-icpna.jpg" alt="Logo ICPNA" />
                <h3 className="text-xl font-semibold"> Instituto Cultural Peruano Norteamericano</h3>
                <p className="text-gray-400">Ingles - Intermedio - TOEFL B2</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-[#61DAFB] shadow-md col-span-2">
                <h3 className="text-xl font-semibold">📜 Cursos Destacados</h3>
                <p className="text-gray-400">Laravel, Spring Boot, Redes y Seguridad Informática {' '}
                  <button onClick={handleScrollToCertificado} className="text-[#61DAFB] hover:underline cursor-pointer">
                  Ver más
                  </button>  
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-3xl font-bold text-[#61DAFB] text-center mb-6">💻 Habilidades Técnicas</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-md border border-[#61DAFB] transform transition-all hover:scale-105 hover:shadow-lg">
                <img src={skill.img} alt={skill.name} className="w-16 h-16 mb-2" />
                <p className="text-lg font-semibold">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
    </section>

      <section id="portafolio" className="min-h-screen flex flex-col justify-center items-center bg-gray-800 text-white">
        <h2 className="text-4xl font-bold text-[#61DAFB]">Portafolio</h2>
        <p className="text-lg max-w-2xl text-center mt-4">Aquí puedes mostrar tus proyectos con imágenes y descripciones.</p>
      </section>

      <section id="certificados" className="min-h-screen flex flex-col justify-center items-center bg-gray-700 text-white">
        <h2 className="text-4xl font-bold text-[#61DAFB]">Certificados</h2>
        <p className="text-lg max-w-2xl text-center mt-4">Muestra los certificados y logros que has obtenido.</p>
      </section>

      <section id="contacto" className="py-12 bg-gray-600 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">📩 Contacto</h2>

        {/* Contenedor principal con dos columnas */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Información de contacto */}
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

          <div className="flex flex-col items-center justify-center bg-gray-800 text-white">
            <h1 className="text-3xl font-bold mb-4">📄 Mi Currículum Vitae</h1>
            <a
              href="/cv"
              target="_blank"
              className="mt-4 px-6 py-3 bg-[#61DAFB] text-gray-900 font-semibold rounded-lg hover:bg-[#4bb0d7]"
            >
              📥 Ver CV
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
