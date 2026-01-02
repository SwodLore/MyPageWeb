import { useState, useRef } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  CheckCircle2,
  ExternalLink,
  Eye,
  Github,
  Mail,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Modal from "./Modal";
import { portafolio } from "../data/portafolios";
import { Portfolio } from "../types";
import { GlowButton, GlassCard } from "./ui";

// ═══════════════════════════════════════════════════════════════
// Animation Variants
// ═══════════════════════════════════════════════════════════════

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ═══════════════════════════════════════════════════════════════
// Parallax Project Card Component
// ═══════════════════════════════════════════════════════════════

interface ProjectCardProps {
  project: Portfolio;
  index: number;
  onOpenModal: (project: Portfolio) => void;
}

function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for image
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-slate-700/80 bg-slate-900 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30">
        {/* Image Container - Shows full image */}
        <div className="relative aspect-video overflow-hidden bg-slate-800">
          {project.img ? (
            <>
              {/* Frame border */}
              <div className="absolute inset-2 md:inset-3 border-2 border-slate-600/50 rounded-lg z-10 pointer-events-none" />

              <motion.div
                style={{ y: imageY }}
                className="absolute inset-0"
              >
                <img
                  src={project.img}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500">
                <Github size={32} className="text-white" />
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-slate-900/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Quick Actions on Hover */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-all duration-500 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100">
            <motion.button
              onClick={() => onOpenModal(project)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-xl transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={18} />
              Ver Detalles
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 space-y-4">
          {/* Title */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white transition-colors group-hover:text-blue-400">
              {project.name}
            </h3>
            <p className="mt-2 text-sm md:text-base text-slate-400 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tecnologias.slice(0, 4).map((tech, techIndex) => (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 + techIndex * 0.05 + 0.3 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700/50 text-xs font-medium text-slate-300 transition-all hover:bg-slate-700 hover:border-blue-500/50"
              >
                <img
                  src={tech.img}
                  alt={tech.name}
                  className="w-3.5 h-3.5 object-contain"
                  loading="lazy"
                  width={14}
                  height={14}
                />
                {tech.name}
              </motion.span>
            ))}
            {project.tecnologias.length > 4 && (
              <span className="px-2.5 py-1 text-xs text-slate-500">
                +{project.tecnologias.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => onOpenModal(project)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Eye size={16} />
              Detalles
            </button>

            <div className="flex gap-2">
              {project.urlPageWeb && (
                <a
                  href={project.urlPageWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-blue-500/50 hover:bg-slate-700"
                >
                  <ExternalLink size={16} className="text-slate-300" />
                </a>
              )}
              {project.urlPageGithub && (
                <a
                  href={project.urlPageGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-blue-500/50 hover:bg-slate-700"
                >
                  <Github size={16} className="text-slate-300" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main Portfolio Component
// ═══════════════════════════════════════════════════════════════

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
      <div className="container-apple flex flex-col gap-12 md:gap-16">
        {/* Section Header */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6"
          >
            <Sparkles size={14} />
            Portafolio
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Mis{" "}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 dark:from-blue-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Proyectos
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400"
          >
            Productos digitales creados end-to-end: desde investigación y prototipado hasta despliegue cloud.
          </motion.p>
        </motion.div>

        {/* Projects Grid with Parallax Cards */}
        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              onOpenModal={openModal}
            />
          ))}
        </div>

        {/* Show More Button */}
        {hasMore && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <GlowButton
              onClick={() => setShowAll(!showAll)}
              variant="primary"
            >
              {showAll ? (
                <>
                  Ver menos proyectos
                  <ChevronUp size={18} />
                </>
              ) : (
                <>
                  Ver todos los proyectos ({portafolio.length})
                  <ChevronDown size={18} />
                </>
              )}
            </GlowButton>
          </motion.div>
        )}

        {/* CTA Section */}
        <GlassCard className="p-8 md:p-10 lg:p-12" hover={false}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left space-y-4 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 dark:bg-emerald-900/30 border border-emerald-200/50 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
                <Sparkles size={14} />
                Trabajemos juntos
              </span>

              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                ¿Tienes un proyecto en mente?
              </h3>

              <p className="text-slate-500 dark:text-slate-400">
                Diseñemos una experiencia premium que combine tecnología, diseño y resultados medibles.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Acompañamiento de ideación a go-live",
                  "CI/CD, testing y monitoreo",
                  "SEO-ready y lightning fast",
                  "Colaboración transparente",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <GlowButton
                href="#contacto"
                variant="primary"
              >
                <Mail size={18} />
                Contactarme
              </GlowButton>

              <GlowButton
                href="https://github.com/SwodLore"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <Github size={18} />
                Ver GitHub
              </GlowButton>
            </div>
          </div>
        </GlassCard>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <Modal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} />
        )}
      </AnimatePresence>
    </>
  );
}
