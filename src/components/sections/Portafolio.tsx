import { useState, useRef } from "react";
import {
  AnimatePresence,
  m,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Eye,
  Github,
  Globe,
  Mail,
  Sparkles,
  Star,
} from "lucide-react";
import Modal from "@/components/common/Modal";
import { portafolio } from "@/data/portafolios";
import { Portfolio, PORTFOLIO_CATEGORIES, PortfolioCategory } from "@/types";
import { GlowButton, GlassCard } from "@/components/ui";

// ═══════════════════════════════════════════════════════════════
// Category colours
// ═══════════════════════════════════════════════════════════════

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Fullstack: {
    bg: "bg-accent-100 dark:bg-accent-900/30",
    text: "text-accent-700 dark:text-accent-300",
    border: "border-accent-200/60 dark:border-accent-700/40",
  },
  React: {
    bg: "bg-accent-100 dark:bg-accent-900/30",
    text: "text-accent-700 dark:text-accent-300",
    border: "border-accent-200/60 dark:border-accent-700/40",
  },
  Laravel: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-200/60 dark:border-red-700/40",
  },
  Python: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200/60 dark:border-amber-700/40",
  },
  Bash: {
    bg: "bg-accent-100 dark:bg-accent-900/30",
    text: "text-accent-700 dark:text-accent-300",
    border: "border-accent-200/60 dark:border-accent-700/40",
  },
  Frontend: {
    bg: "bg-accent-100 dark:bg-accent-900/30",
    text: "text-accent-700 dark:text-accent-300",
    border: "border-accent-200/60 dark:border-accent-700/40",
  },
};

// ═══════════════════════════════════════════════════════════════
// Category Filters
// ═══════════════════════════════════════════════════════════════

interface CategoryFiltersProps {
  active: PortfolioCategory;
  onSelect: (cat: PortfolioCategory) => void;
  counts: Record<string, number>;
}

function CategoryFilters({ active, onSelect, counts }: CategoryFiltersProps) {
  return (
    <m.div
      className="flex flex-wrap justify-center gap-1.5 md:gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/40 backdrop-blur-sm w-fit mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {PORTFOLIO_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`relative px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer ${
            active === cat
              ? "text-white"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          {active === cat && (
            <m.span
              layoutId="filter-pill"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 shadow-md shadow-accent-500/30"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            {cat}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-semibold tabular-nums ${
                active === cat
                  ? "bg-white/25 text-white"
                  : "bg-slate-200/80 dark:bg-slate-700/80 text-slate-500 dark:text-slate-400"
              }`}
            >
              {counts[cat] ?? 0}
            </span>
          </span>
        </button>
      ))}
    </m.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Project Card
// ═══════════════════════════════════════════════════════════════

interface ProjectCardProps {
  project: Portfolio;
  index: number;
  onOpenModal: (project: Portfolio) => void;
}

function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  const primaryCat = project.category[0] ?? "Frontend";
  const primaryColors = CATEGORY_COLORS[primaryCat] ?? CATEGORY_COLORS.Frontend;

  return (
    <m.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      transition={{
        layout: { type: "spring", bounce: 0.15, duration: 0.5 },
        default: {
          duration: 0.55,
          delay: (index % 6) * 0.07,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      className="group"
    >
      <div className="relative h-full flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-night-900 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-accent-500/8 hover:border-accent-400/40">

        {/* ── Image ─────────────────────────────────────────── */}
        <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
          {project.img ? (
            <>
              <m.div style={{ y: imageY }} className="absolute inset-0">
                <img
                  src={project.img}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
              </m.div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/70 dark:from-night-900/70 via-transparent to-transparent" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-night-900">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500">
                <Github size={32} className="text-white" />
              </div>
            </div>
          )}

          {/* Badges — top-left */}
          <div className="absolute top-3 left-3 z-10 flex gap-1.5">
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/90 backdrop-blur-sm text-white text-xs font-semibold shadow-md">
                <Star size={10} fill="currentColor" />
                Destacado
              </span>
            )}
            {project.urlPageWeb && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Live
              </span>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-night-900/72 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Hover actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-2.5 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <button
              onClick={() => onOpenModal(project)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-sm font-semibold shadow-xl hover:bg-accent-50 transition-colors"
            >
              <Eye size={15} />
              Detalles
            </button>
            {project.urlPageWeb && (
              <a
                href={project.urlPageWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 text-white text-sm font-semibold shadow-xl hover:opacity-90 transition-opacity"
              >
                <Globe size={15} />
                Visitar
              </a>
            )}
          </div>
        </div>

        {/* ── Content ───────────────────────────────────────── */}
        <div className="flex flex-col flex-1 p-5 gap-3">

          {/* Category chips */}
          <div className="flex flex-wrap gap-1.5">
            {project.category.map((cat) => {
              const c = CATEGORY_COLORS[cat] ?? primaryColors;
              return (
                <span
                  key={cat}
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${c.bg} ${c.text} ${c.border}`}
                >
                  {cat}
                </span>
              );
            })}
          </div>

          {/* Title & description */}
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors leading-snug">
              {project.name}
            </h3>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech icons (icon-only, max 5) */}
          <div className="flex items-center gap-1.5">
            {project.tecnologias.slice(0, 5).map((tech) => (
              <div
                key={tech.name}
                title={tech.name}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center p-1 hover:border-accent-400/50 transition-colors"
              >
                <img
                  src={tech.img}
                  alt={tech.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
            {project.tecnologias.length > 5 && (
              <span className="text-xs text-slate-400 font-medium pl-0.5">
                +{project.tecnologias.length - 5}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => onOpenModal(project)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 text-white text-sm font-semibold shadow-md shadow-accent-500/20 hover:shadow-lg hover:shadow-accent-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Eye size={15} />
              Ver detalles
            </button>
            <div className="flex gap-1.5">
              {project.urlPageWeb && (
                <a
                  href={project.urlPageWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ver sitio web"
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-accent-500/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                >
                  <ExternalLink size={15} className="text-slate-600 dark:text-slate-300" />
                </a>
              )}
              {project.urlPageGithub && (
                <a
                  href={project.urlPageGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ver código"
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-accent-500/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                >
                  <Github size={15} className="text-slate-600 dark:text-slate-300" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main Portfolio Component
// ═══════════════════════════════════════════════════════════════

const INITIAL_COUNT = 8;

export default function Portafolio() {
  const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null);
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("Todos");
  const [showAll, setShowAll] = useState(false);

  const counts = Object.fromEntries(
    PORTFOLIO_CATEGORIES.map((cat) => [
      cat,
      cat === "Todos"
        ? portafolio.length
        : portafolio.filter((p) => p.category.includes(cat)).length,
    ])
  );

  const filtered =
    activeFilter === "Todos"
      ? portafolio
      : portafolio.filter((p) => p.category.includes(activeFilter));

  const displayedProjects =
    activeFilter === "Todos" && !showAll ? filtered.slice(0, INITIAL_COUNT) : filtered;

  const canExpand = activeFilter === "Todos" && filtered.length > INITIAL_COUNT;

  const handleFilterChange = (cat: PortfolioCategory) => {
    setActiveFilter(cat);
    setShowAll(false);
  };

  const openModal = (project: Portfolio) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <>
      <div className="container-page flex flex-col gap-12 md:gap-16">

        {/* ── Section Header ─────────────────────────────────── */}
        <div className="text-center space-y-6">
          <m.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100/80 dark:bg-accent-900/30 border border-accent-200/50 dark:border-accent-700/50 text-accent-700 dark:text-accent-300 text-sm font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles size={14} />
            Portafolio
          </m.span>

          <m.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            Mis{" "}
            <span className="text-accent-600 dark:text-accent-400">
              Proyectos
            </span>
          </m.h2>

          <m.p
            className="max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
          >
            Productos digitales creados end-to-end: desde investigación y
            prototipado hasta despliegue cloud.
          </m.p>

          <CategoryFilters
            active={activeFilter}
            onSelect={handleFilterChange}
            counts={counts}
          />
        </div>

        {/* ── Projects Grid ──────────────────────────────────── */}
        <m.div
          layout
          className="grid gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
                onOpenModal={openModal}
              />
            ))}
          </AnimatePresence>
        </m.div>

        {/* ── Expand / Collapse ──────────────────────────────── */}
        {canExpand && (
          <m.div
            className="text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlowButton onClick={() => setShowAll(!showAll)} variant="secondary">
              {showAll ? (
                <>
                  Mostrar menos
                  <ChevronUp size={18} />
                </>
              ) : (
                <>
                  Ver todos los proyectos ({filtered.length})
                  <ChevronDown size={18} />
                </>
              )}
            </GlowButton>
          </m.div>
        )}

        {/* ── CTA Section ────────────────────────────────────── */}
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
                Diseñemos una experiencia premium que combine tecnología, diseño
                y resultados medibles.
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
              <GlowButton href="#contacto" variant="primary">
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

      {/* ── Modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <Modal onClose={closeModal} project={selectedProject} />
        )}
      </AnimatePresence>
    </>
  );
}
