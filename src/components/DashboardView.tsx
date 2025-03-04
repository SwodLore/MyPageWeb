import { Link } from "react-router-dom";
import Certificado from "./Certificado";
import Contacto from "./Contacto";
import Portafolio from "./Portafolio";
import { IconCloud } from "./magicui/icon-cloud";
import { slugs } from "../data/slugs";
import { ScrollProgress } from "./magicui/scroll-progress";
import { BoxReveal } from "./magicui/box-reveal";

export default function DashboardView() {
  const handleScrollToCertificado = () => {
    const certificadoSection = document.getElementById("certificados");
    if (certificadoSection) {
      certificadoSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );
  return (
    <>
      <ScrollProgress className="lg:top-[80px] dark:bg-[#61DAFB] bg-[#007acc]" />
      <section id="sobre-mi" className="dark:bg-gray-900 dark:text-white py-5 text-black bg-slate-300">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="relative w-52 h-52 md:w-64 md:h-64">
          <BoxReveal boxColor={"#61DAFB"} duration={0.5}>
            <img
              src="/profile.jpg"
              alt="Alessandro Poves"
              className="w-full h-full object-cover rounded-full border-4 dark:border-[#61DAFB] border-[#007acc] shadow-lg"
            />
          </BoxReveal>
          </div>
          <BoxReveal boxColor={"#ffffff"} duration={0.5}>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-bold dark:text-[#61DAFB] text-[#007acc] mb-4">Sobre Mí</h2>
              <p className="text-lg dark:text-gray-300 text-gray-800">
                ¡Hola! Soy <span className="dark:text-white text-black font-semibold">Alessandro Poves</span>, un apasionado por el desarrollo web y la tecnología.  
                Me especializo en backend con Laravel y Spring Boot, y estoy aprendiendo frontend con React y Angular.
              </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-center mx-3">
              <div className="bg-gray-800 p-4 rounded-lg border-l-4 dark:border-[#61DAFB] border-[#007acc] shadow-md flex flex-row items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Escudo_UNCP.png/800px-Escudo_UNCP.png" alt="Logo de la UNCP" className="w-30 h-30" />
                <div>
                  <h3 className="text-xl font-semibold text-white">  Universidad Nacional del Centro del Perú</h3>
                  <p className="text-gray-400">Ingeniería de Sistemas - 7mo ciclo</p>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border-l-4 dark:border-[#61DAFB] border-[#007acc] shadow-md flex flex-row items-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSacvCIdoNf47zT9nl2qSXlS8nWDoxEJZ16Kg&s" alt="Logo ICPNA" className="w-30 h-30 " />
                <div>
                  <h3 className="text-xl font-semibold text-white"> Instituto Cultural Peruano Norteamericano</h3>
                  <p className="text-gray-400">Ingles - Intermedio - TOEFL B2</p>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border-l-4 dark:border-[#61DAFB] border-[#007acc] shadow-md md:col-span-2">
                <h3 className="text-xl font-semibold text-white">📜 Cursos Destacados</h3>
                <p className="text-gray-400">Laravel, Spring Boot, Redes y Seguridad Informática {' '}
                  <button onClick={handleScrollToCertificado} className="text-[#61DAFB] hover:underline cursor-pointer">
                  Ver más
                  </button>  
                </p>
              </div>
            </div>
          </div>
          </BoxReveal>
        </div>
        <div className="mt-12 flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-3xl font-bold dark:text-[#61DAFB] text-[#007acc] text-center">💻 Habilidades Técnicas</h3>
              <div className="relative flex size-full items-center justify-center overflow-hidden">
                  <IconCloud images={images} />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold dark:text-[#61DAFB] text-[#007acc] text-center"> 🤝 Habilidades Blandas</h3>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 dark:border-[#61DAFB] border-[#007acc] lg:mt-24">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-white">
                    <span className="text-[#61DAFB] text-xl">💬</span> Comunicación efectiva
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <span className="text-[#61DAFB] text-xl">👥</span> Trabajo en equipo
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <span className="text-[#61DAFB] text-xl">🎯</span> Resolución de problemas
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <span className="text-[#61DAFB] text-xl">🧠</span> Pensamiento crítico
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <span className="text-[#61DAFB] text-xl">⏳</span> Gestión del tiempo
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Link className="dark:bg-[#61DAFB] bg-[#007acc] text-gray-900 px-4 py-2 rounded-lg font-bold dark:hover:bg-[#4bb3d6] hover:bg-[#007acce5] cursor-pointer mt-5 md:mt-0" to={"/skills"}>
            Ver todas las habilidades
          </Link>
        </div>
    </section>
    <section id="portafolio" className="dark:bg-gray-900 bg-slate-300 min-h-screen flex flex-col items-center text-white">
      <Portafolio />
    </section>
      <section id="certificados" className="dark:bg-gray-900 bg-slate-300 flex flex-col items-center text-white">
        <h2 className="text-4xl font-bold dark:text-[#61DAFB] text-[#007acc] mt-5">Mis Certificados</h2>
        <Certificado />
      </section>
      <section id="contacto" className="py-12 dark:bg-gray-900 bg-slate-300 text-white flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold dark:text-[#61DAFB] text-[#007acc] mt-5">Contactame</h2>
        <Contacto />
      </section>
    </>
  )
}
