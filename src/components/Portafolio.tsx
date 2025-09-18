import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Eye, ChevronDown, ChevronUp } from "lucide-react";
import Modal from "./Modal";
import { portafolio } from "../data/portafolios";
import { Portfolio } from "../types";

export default function Portafolio() {
  const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const initialCount = 6; // Mostrar solo los primeros 6 proyectos
  const gridRef = useRef<HTMLDivElement>(null);

  const displayedProjects = showAll ? portafolio : portafolio.slice(0, initialCount);
  const hasMore = portafolio.length > initialCount;

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    if (gridRef.current) {
      observer.observe(gridRef.current);

      // Observe individual project cards for staggered animation
      const cards = gridRef.current.querySelectorAll('.project-card');
      cards.forEach((card) => {
        observer.observe(card);
      });
    }

    return () => observer.disconnect();
  }, [displayedProjects]); // Re-run when projects change

  const openModal = (project: Portfolio) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <div className="container-apple">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            Mis Proyectos
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Una selección de proyectos que demuestran mis habilidades en desarrollo
            full stack, desde aplicaciones web hasta sistemas empresariales.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-animate">
          {displayedProjects.map((project: Portfolio, index: number) => (
            <div
              key={index}
              className="project-card group bg-white/95 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-slate-600/50 hover:-translate-y-2 scroll-animate"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600">
                {project.img ? (
                  <img
                    src={project.img}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                      <Github size={32} className="text-blue-600" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Content */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {project.name}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tecnologias.slice(0, 4).map((tech: any, techIndex: number) => (
                    <div key={techIndex} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 px-3 py-1.5 rounded-full">
                      <img
                        src={tech.img}
                        alt={tech.name}
                        className="w-4 h-4 object-contain"
                      />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                  {project.tecnologias.length > 4 && (
                    <span className="text-xs text-slate-500 dark:text-slate-400 px-3 py-1.5">
                      +{project.tecnologias.length - 4} más
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => openModal(project)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    Ver Detalles
                  </button>

                  <div className="flex gap-2">
                    {project.urlPageWeb && (
                      <a
                        href={project.urlPageWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 group/link"
                        title="Ver proyecto"
                      >
                        <ExternalLink size={18} className="text-slate-600 dark:text-slate-400 group-hover/link:text-blue-600" />
                      </a>
                    )}

                    {project.urlPageGithub && (
                      <a
                        href={project.urlPageGithub}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 group/link"
                        title="Ver código"
                      >
                        <Github size={18} className="text-slate-600 dark:text-slate-400 group-hover/link:text-slate-800 dark:group-hover/link:text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl group"
            >
              {showAll ? (
                <>
                  Ver Menos Proyectos
                  <ChevronUp size={20} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
                </>
              ) : (
                <>
                  Ver Todos los Proyectos ({portafolio.length})
                  <ChevronDown size={20} className="group-hover:translate-y-0.5 transition-transform duration-300" />
                </>
              )}
            </button>
          </div>
        )}

        {/* View More Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-3xl text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Me especializo en crear soluciones web modernas y escalables.
              ¡Trabajemos juntos para hacer realidad tu visión!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contacto"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Contactarme
              </a>
              <a
                href="https://github.com/SwodLore"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-white/20 hover:border-white/40 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Github size={20} />
                Ver más en GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
      />
    </>
  );
}