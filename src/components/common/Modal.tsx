import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Portfolio } from "../types";
import { X, ExternalLink, Github, Layers, Star } from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// Category colours (dark-mode variants — modal is always dark)
// ═══════════════════════════════════════════════════════════════

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Fullstack: { bg: "bg-blue-500/20",   text: "text-blue-300",   border: "border-blue-500/30" },
  React:     { bg: "bg-cyan-500/20",   text: "text-cyan-300",   border: "border-cyan-500/30" },
  Laravel:   { bg: "bg-red-500/20",    text: "text-red-300",    border: "border-red-500/30" },
  Python:    { bg: "bg-amber-500/20",  text: "text-amber-300",  border: "border-amber-500/30" },
  Bash:      { bg: "bg-green-500/20",  text: "text-green-300",  border: "border-green-500/30" },
  Frontend:  { bg: "bg-violet-500/20", text: "text-violet-300", border: "border-violet-500/30" },
};

const DEFAULT_COLOR = { bg: "bg-slate-700", text: "text-slate-300", border: "border-slate-600" };

// ═══════════════════════════════════════════════════════════════
// Modal
// ═══════════════════════════════════════════════════════════════

type ModalProps = {
  onClose: () => void;
  project: Portfolio;
};

export default function Modal({ onClose, project }: ModalProps) {
  const lenis = useLenis();

  // Lock smooth scroll while modal is visible
  useEffect(() => {
    lenis?.stop();
    return () => { lenis?.start(); };
  }, [lenis]);

  // Escape key handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[80] overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="min-h-screen flex items-center justify-center p-4 md:p-8 py-12">
        <motion.div
          className="relative w-full max-w-3xl bg-slate-900 rounded-2xl md:rounded-3xl shadow-2xl shadow-black/60 border border-slate-800/60 overflow-hidden"
          initial={{ opacity: 0, scale: 0.93, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 28 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Close button ──────────────────────────────────── */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-slate-800/90 hover:bg-red-500/80 backdrop-blur-sm rounded-xl flex items-center justify-center transition-colors border border-slate-700/50 hover:border-red-500/50"
            aria-label="Cerrar"
          >
            <X size={18} className="text-slate-300" />
          </motion.button>

          {/* ── Image area ────────────────────────────────────── */}
          <div className="relative bg-gradient-to-b from-slate-800/90 to-slate-800/60 p-4 md:p-6">
            {/* Badges */}
            <div className="absolute top-6 left-6 z-10 flex gap-2">
              {project.featured && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/90 backdrop-blur-sm text-white text-xs font-semibold shadow-lg">
                  <Star size={11} fill="currentColor" />
                  Destacado
                </span>
              )}
              {project.urlPageWeb && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Live
                </span>
              )}
            </div>

            {/* Screenshot */}
            <div className="relative w-full aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-700/50 shadow-xl">
              {project.img ? (
                <img
                  src={project.img}
                  alt={project.name}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Github size={32} className="text-white" />
                  </div>
                  <span className="text-slate-500 text-sm">Sin vista previa</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Content ───────────────────────────────────────── */}
          <div className="p-6 md:p-8 space-y-6">

            {/* Title, categories & description */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-start gap-x-3 gap-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {project.name}
                </h2>
                <div className="flex flex-wrap gap-1.5 mt-0.5">
                  {project.category.map((cat) => {
                    const c = CATEGORY_COLORS[cat] ?? DEFAULT_COLOR;
                    return (
                      <span
                        key={cat}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border ${c.bg} ${c.text} ${c.border}`}
                      >
                        {cat}
                      </span>
                    );
                  })}
                </div>
              </div>
              <p className="text-slate-400 text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-cyan-500/30 flex-shrink-0">
                  <Layers size={16} className="text-blue-400" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Tecnologías utilizadas
                </h3>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                {project.tecnologias.map((tech, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-200"
                  >
                    <img
                      src={tech.img}
                      alt={tech.name}
                      className="w-8 h-8 object-contain"
                      loading="lazy"
                    />
                    <span className="text-xs font-medium text-slate-300 text-center leading-tight">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-800/80">
              {project.urlPageWeb && (
                <motion.a
                  href={project.urlPageWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-cyan-500/30 transition-shadow"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink size={18} />
                  Ver Proyecto
                </motion.a>
              )}
              {project.urlPageGithub && (
                <motion.a
                  href={project.urlPageGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold border border-slate-700 hover:border-slate-600 transition-all"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github size={18} />
                  Ver Código
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
