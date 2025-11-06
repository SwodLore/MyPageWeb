import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ExternalLink,
  Eye,
  Github,
  Mail,
  Sparkles,
} from "lucide-react";
import Modal from "./Modal";
import LazyImage from "./LazyImage";
import { portafolio } from "../data/portafolios";
import { Portfolio } from "../types";

const heroHighlights = [
  {
    title: "Experiencias inmersivas",
    description: "Animaciones fluidas, storytelling visual y UI moderna.",
  },
  {
    title: "Arquitectura robusta",
    description: "Integraciones API, DevOps y despliegues escalables.",
  },
  {
    title: "Resultados medibles",
    description: "Enfoque en conversión, velocidad y accesibilidad AA.",
  },
];

export default function Portafolio() {
  const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const initialCount = 6;

  const displayedProjects = showAll ? portafolio : portafolio.slice(0, initialCount);
  const hasMore = portafolio.length > initialCount;

  const openModal = (project: Portfolio) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container-apple flex flex-col gap-12 md:gap-16 lg:gap-20">
        {/* Hero Section */}
        <div className="rounded-2xl md:rounded-3xl border border-slate-200 bg-white px-6 py-10 md:px-8 md:py-12 text-center shadow-xl backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/80">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 md:gap-8">
            <span className="no-scroll-reveal inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 md:px-4 py-1 text-[10px] md:text-xs font-semibold uppercase tracking-wider md:tracking-[0.25em] text-blue-700 dark:border-blue-500/50 dark:bg-blue-500/15 dark:text-blue-200">
              <Sparkles size={14} />
              Portafolio
            </span>
            <div className="space-y-3 md:space-y-4">
              <h2 className="no-scroll-reveal text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
                Mis proyectos
              </h2>
              <p className="no-scroll-reveal text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300 px-4">
                Productos digitales creados end-to-end: desde investigación y prototipado hasta despliegue cloud y seguimiento de métricas.
              </p>
            </div>
            <div className="grid w-full gap-3 md:gap-4 text-left grid-cols-1 sm:grid-cols-3">
              {heroHighlights.map((item) => (
                <div
                  key={item.title}
                  className="no-scroll-reveal rounded-xl md:rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800/60 dark:bg-slate-900/70"
                >
                  <p className="no-scroll-reveal font-semibold text-slate-800 dark:text-slate-100">{item.title}</p>
                  <p className="no-scroll-reveal mt-2 text-slate-500 dark:text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project) => (
            <div
              key={project.name}
              className="group overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-100 via-white to-indigo-100 dark:from-slate-800 dark:to-slate-700">
                {project.img ? (
                  <LazyImage
                    src={project.img}
                    alt={project.name}
                    className="h-full w-full"
                    imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
                      <Github size={32} className="text-blue-600" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="space-y-4 md:space-y-6 p-6 md:p-8">
                <div>
                  <h3 className="no-scroll-reveal mb-2 md:mb-3 text-lg md:text-xl font-bold transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-300">
                    {project.name}
                  </h3>
                  <p className="no-scroll-reveal line-clamp-3 text-sm md:text-base text-slate-500 dark:text-slate-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tecnologias.slice(0, 4).map((tech) => (
                    <span
                      key={tech.name}
                      className="no-scroll-reveal inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-slate-200/70 bg-white/90 px-2.5 md:px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      <img
                        src={tech.img}
                        alt={tech.name}
                        className="h-3.5 md:h-4 w-3.5 md:w-4 object-contain"
                        loading="lazy"
                        decoding="async"
                        width={16}
                        height={16}
                      />
                      {tech.name}
                    </span>
                  ))}
                  {project.tecnologias.length > 4 && (
                    <span className="no-scroll-reveal px-2.5 md:px-3 py-1 text-xs text-slate-500 dark:text-slate-300">
                      +{project.tecnologias.length - 4} mas
                    </span>
                  )}
                </div>

                <div className="flex gap-2 md:gap-3">
                  <button
                    onClick={() => openModal(project)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl md:rounded-2xl bg-blue-600 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base font-semibold text-white transition hover:bg-blue-700 hover:scale-105"
                  >
                    <Eye size={16} />
                    Ver detalles
                  </button>

                  <div className="flex gap-2">
                    {project.urlPageWeb && (
                      <a
                        href={project.urlPageWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl md:rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:scale-110 dark:border-slate-700 dark:bg-slate-900"
                      >
                        <ExternalLink size={16} className="text-slate-600 dark:text-slate-300" />
                      </a>
                    )}
                    {project.urlPageGithub && (
                      <a
                        href={project.urlPageGithub}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl md:rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:scale-110 dark:border-slate-700 dark:bg-slate-900"
                      >
                        <Github size={16} className="text-slate-600 dark:text-slate-300" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ver más button */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-xl transition hover:shadow-2xl hover:scale-105"
            >
              {showAll ? (
                <>
                  Ver menos proyectos
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Ver todos los proyectos ({portafolio.length})
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-12 shadow-2xl backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/80 sm:px-12 lg:px-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-5 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700 dark:border-blue-500/50 dark:bg-blue-500/15 dark:text-blue-200">
                  <Sparkles size={14} />
                  Trabajemos juntos
              </span>
              <div className="space-y-4">
                <h3 className="text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl">
                  ¿Tienes un proyecto en mente?
                </h3>
                <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  Diseñemos una experiencia premium que combine tecnología, diseño y resultados medibles. Integro procesos
                  ágiles, análisis de métricas y despliegues automatizados para acelerar el impacto de tu negocio.
                </p>
              </div>
              <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
                {[
                  "Acompañamiento desde la ideación hasta el go-live.",
                  "Integración continua, testing y monitoreo posterior.",
                  "Experiencias accesibles, SEO-ready y lightning fast.",
                  "Entrega colaborativa con transparencia total.",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-start gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/70"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 text-emerald-500 dark:text-emerald-300" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="#contacto"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:scale-105 sm:flex-none"
              >
                <Mail size={18} />
                Contactarme
              </a>
              <a
                href="https://github.com/SwodLore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-900 shadow-lg transition hover:-translate-y-1 hover:scale-105 dark:border-slate-800/60 dark:bg-slate-900/70 dark:text-slate-100 sm:flex-none"
              >
                <Github size={18} />
                Ver más en GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <Modal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} />
        )}
      </AnimatePresence>
    </>
  );
}
