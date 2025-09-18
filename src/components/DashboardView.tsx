import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Certificado from "./Certificado";
import Contacto from "./Contacto";
import Portafolio from "./Portafolio";
import { IconCloud } from "./magicui/icon-cloud";
import { slugs } from "../data/slugs";
import { ScrollProgress } from "./magicui/scroll-progress";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function DashboardView() {
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const certificatesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elements = [
      aboutRef.current,
      skillsRef.current,
      portfolioRef.current,
      certificatesRef.current,
      contactRef.current
    ];

    elements.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollToCertificado = () => {
    const certificadoSection = document.getElementById("certificados");
    if (certificadoSection) {
      certificadoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToPortfolio = () => {
    const portfolioSection = document.getElementById("portafolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  return (
    <>
      <ScrollProgress className="fixed top-0 left-0 right-0 z-40 h-0.5 bg-blue-600" />

      {/* Hero Section - Apple Style */}
      <section
        id="sobre-mi"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50/40 to-purple-50/30 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800/90 dark:to-indigo-900/80 overflow-hidden"
      >
        {/* Background Elements - Elegant Orbs */}
        <div className="absolute inset-0 opacity-30 dark:opacity-15">
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container-apple relative z-10">
          <div className="text-center">
            <h1
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-fade-up"
              style={{
                backgroundSize: '200% 100%',
                animation: 'gradient 3s ease infinite, fade-up 0.8s ease-out'
              }}
            >
              Alessandro Poves
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-medium mb-8">
              Desarrollador Full Stack
            </p>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Especializado en <span className="text-blue-600 dark:text-blue-400 font-semibold">Laravel</span>, {' '}
              <span className="text-purple-600 dark:text-purple-400 font-semibold">Spring Boot</span>, {' '}
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">React</span> y {' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Angular</span>. {' '}
              Creando experiencias digitales excepcionales.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <button
                onClick={handleScrollToPortfolio}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
              >
                Ver Proyectos
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <Link
                to="/skills"
                className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/90"
              >
                Mis Habilidades
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Profile Image */}
            <div className="mt-16 relative">
              <div className="w-48 h-48 mx-auto relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                <img
                  src="/profile.jpg"
                  alt="Alessandro Poves"
                  className="relative w-full h-full object-cover rounded-full border-4 border-white/80 dark:border-gray-700/80 shadow-2xl group-hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} className="text-slate-400 dark:text-slate-500" />
          </div>
        </div>
      </section>

      {/* About & Education Section */}
      <section ref={aboutRef} className="section-padding bg-gradient-to-br from-gray-50 to-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 scroll-animate">
        <div className="container-apple">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-6">
              Sobre Mí
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Estudiante de Ingeniería de Sistemas apasionado por crear soluciones tecnológicas innovadoras
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* About Text */}
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                ¡Hola! Soy <span className="text-gray-900 dark:text-white font-semibold">Alessandro Poves</span>,
                un desarrollador full stack con experiencia en tecnologías modernas tanto de backend como frontend.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Mi enfoque se centra en crear aplicaciones web robustas, escalables y con una experiencia de usuario excepcional.
                Siempre estoy aprendiendo nuevas tecnologías y mejorando mis habilidades.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:bg-gradient-to-br dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">3+</div>
                  <div className="text-gray-600 dark:text-gray-400">Años de Experiencia</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:bg-gradient-to-br dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-100 dark:border-purple-800/30">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">15+</div>
                  <div className="text-gray-600 dark:text-gray-400">Proyectos Completados</div>
                </div>
              </div>
            </div>

            {/* Education Cards */}
            <div className="space-y-6">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Escudo_UNCP.png/800px-Escudo_UNCP.png"
                    alt="UNCP"
                    className="w-12 h-12 rounded-xl shadow-lg"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Universidad Nacional del Centro del Perú</h3>
                    <p className="text-gray-600 dark:text-gray-300">Ingeniería de Sistemas - 7mo Ciclo</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSacvCIdoNf47zT9nl2qSXlS8nWDoxEJZ16Kg&s"
                    alt="ICPNA"
                    className="w-12 h-12 rounded-xl shadow-lg"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Instituto Cultural Peruano Norteamericano</h3>
                    <p className="text-gray-600 dark:text-gray-300">Inglés - Intermedio - TOEFL B1</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 p-6 rounded-3xl text-white shadow-2xl">
                <h3 className="text-lg font-bold mb-2">📜 Certificaciones</h3>
                <p className="text-blue-100 mb-4">Laravel, Spring Boot, Redes y Seguridad Informática</p>
                <button
                  onClick={handleScrollToCertificado}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl font-semibold transition-all duration-200 hover:scale-105 border border-white/20"
                >
                  Ver Certificados
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="section-padding bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-cyan-50/40 dark:bg-gradient-to-br dark:from-blue-950/20 dark:via-purple-950/10 dark:to-cyan-950/20 scroll-animate">
        <div className="container-apple">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-6">
              Habilidades
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Tecnologías y competencias que domino para crear soluciones excepcionales
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Technical Skills */}
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                💻 Habilidades Técnicas
              </h3>
              <div className="relative flex size-full items-center justify-center overflow-hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                <IconCloud images={images} />
              </div>
            </div>

            {/* Soft Skills */}
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                🤝 Habilidades Blandas
              </h3>
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 space-y-4">
                {[
                  { icon: "💬", skill: "Comunicación efectiva" },
                  { icon: "👥", skill: "Trabajo en equipo" },
                  { icon: "🎯", skill: "Resolución de problemas" },
                  { icon: "🧠", skill: "Pensamiento crítico" },
                  { icon: "⏳", skill: "Gestión del tiempo" },
                  { icon: "🎨", skill: "Creatividad e innovación" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-600/60 transition-all duration-300 border border-gray-200/30 dark:border-gray-600/30">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-gray-800 dark:text-white font-medium">{item.skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              to="/skills"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Ver Todas las Habilidades
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section ref={portfolioRef} id="portafolio" className="section-padding bg-gradient-to-br from-white to-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 scroll-animate">
        <Portafolio />
      </section>

      {/* Certificates Section */}
      <section ref={certificatesRef} id="certificados" className="section-padding bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-cyan-50/30 dark:bg-gradient-to-br dark:from-purple-950/10 dark:via-blue-950/10 dark:to-cyan-950/10 scroll-animate">
        <div className="container-apple text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-6">
            Certificados
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Certificaciones que respaldan mi experiencia y conocimientos técnicos
          </p>
        </div>
        <Certificado />
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contacto" className="scroll-animate">
        <Contacto />
      </section>
    </>
  )
}