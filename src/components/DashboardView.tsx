import { Link } from "react-router-dom";
import Certificado from "./Certificado";
import Contacto from "./Contacto";
import Portafolio from "./Portafolio";
import { IconCloud } from "./magicui/icon-cloud";
import { slugs } from "../data/slugs";
import { WarpBackground } from "./magicui/warp-background";
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
      <ScrollProgress className="top-[80px] bg-[#61DAFB]" />
      <WarpBackground className="bg-gray-900">
      <section id="sobre-mi" className="text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="relative w-52 h-52 md:w-64 md:h-64">
          <BoxReveal boxColor={"#61DAFB"} duration={0.5}>
            <img
              src="/profile.jpg"
              alt="Alessandro Poves"
              className="w-full h-full object-cover rounded-full border-4 border-[#61DAFB] shadow-lg"
            />
          </BoxReveal>
          </div>

          <div className="flex-1 text-center md:text-left">
            <BoxReveal boxColor={"#61DAFB"} duration={0.5}>
            <h2 className="text-4xl font-bold text-[#61DAFB] mb-4">Sobre Mí</h2>
            </BoxReveal>
            <BoxReveal boxColor={"#ffffff"} duration={0.5}>
              <p className="text-lg text-gray-300">
                ¡Hola! Soy <span className="text-white font-semibold">Alessandro Poves</span>, un apasionado por el desarrollo web y la tecnología.  
                Me especializo en backend con Laravel y Spring Boot, y estoy aprendiendo frontend con React y Angular.
              </p>
            </BoxReveal>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-[#61DAFB] shadow-md">
                <BoxReveal boxColor={"#61DAFB"} duration={0.5}>
                <img src="https://uncp.edu.pe/wp-content/uploads/2024/01/logo-uncp-2024.png" alt="Logo de la UNCP" />
                </BoxReveal>
                <BoxReveal boxColor={"#ffffff"} duration={0.5}>
                <h3 className="text-xl font-semibold">  Universidad Nacional del Centro del Perú</h3>
                </BoxReveal>
                <BoxReveal boxColor={"#99a1af"} duration={0.5}>
                <p className="text-gray-400">Ingeniería de Sistemas - 7mo ciclo</p>
                </BoxReveal>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-[#61DAFB] shadow-md">
                <BoxReveal boxColor={"#61DAFB"} duration={0.5}>
                <img src="https://aulavirtual.icpnarc.edu.pe/pluginfile.php/1/theme_moove/logo/1739894532/logo-icpna.jpg" alt="Logo ICPNA" />
                </BoxReveal>
                <BoxReveal boxColor={"#ffffff"} duration={0.5}>
                <h3 className="text-xl font-semibold"> Instituto Cultural Peruano Norteamericano</h3>
                </BoxReveal>
                <BoxReveal boxColor={"#99a1af"} duration={0.5}>
                <p className="text-gray-400">Ingles - Intermedio - TOEFL B2</p>
                </BoxReveal>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-[#61DAFB] shadow-md md:col-span-2">
                <BoxReveal boxColor={"#ffffff"} duration={0.5}>
                <h3 className="text-xl font-semibold">📜 Cursos Destacados</h3>
                </BoxReveal>
                <BoxReveal boxColor={"#99a1af"} duration={0.5}>
                <p className="text-gray-400">Laravel, Spring Boot, Redes y Seguridad Informática {' '}
                  <button onClick={handleScrollToCertificado} className="text-[#61DAFB] hover:underline cursor-pointer">
                  Ver más
                  </button>  
                </p>
                </BoxReveal>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-3xl font-bold text-[#61DAFB] text-center mb-6">💻 Habilidades Técnicas</h3>
              <div className="relative flex size-full items-center justify-center overflow-hidden">
                  <IconCloud images={images} />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#61DAFB] text-center mb-6"> 🤝 Habilidades Blandas</h3>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-[#61DAFB] lg:mt-32">
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
          <Link className="bg-[#61DAFB] text-gray-900 px-4 py-2 rounded-lg font-bold hover:bg-[#4bb3d6] cursor-pointer mt-5 md:mt-0" to={"/skills"}>
            Ver más skills detalladas
          </Link>
        </div>
    </section>
    </WarpBackground>
    <WarpBackground className="bg-gray-800">
      <section id="portafolio" className="min-h-screen flex flex-col items-center text-white">
        <Portafolio />
      </section>
    </WarpBackground>
      <WarpBackground className="bg-gray-700">
        <section id="certificados" className="min-h-screen flex flex-col items-center  text-white">
          <h2 className="text-4xl font-bold text-[#61DAFB] mt-5">Certificados</h2>
          <Certificado />
        </section>
      </WarpBackground>
      <WarpBackground className="bg-gray-600">
        <section id="contacto" className="py-12 text-white">
          <Contacto />
        </section>
      </WarpBackground>
    </>
  )
}
