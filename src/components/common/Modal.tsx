import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { m, useDragControls } from "framer-motion";
import { useLenis } from "lenis/react";
import { Portfolio } from "@/types";
import { ExternalLink, Github, Layers, Star } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/* Badge de categoría — conectado al design system */
const CATEGORY_STYLE = { bg: "bg-accent-500/20", text: "text-accent-300", border: "border-accent-500/30" };

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ═══════════════════════════════════════════════════════════════
// Semáforo macOS — el rojo CIERRA de verdad, el verde MAXIMIZA.
// Los glifos aparecen al hacer hover sobre el grupo, como en macOS.
// ═══════════════════════════════════════════════════════════════

interface TrafficDotProps {
  color: string;
  glyph: string;
  label?: string;
  onClick?: () => void;
  className?: string;
}

function TrafficDot({ color, glyph, label, onClick, className = "" }: TrafficDotProps) {
  const Tag = onClick || label ? "button" : "span";
  return (
    <Tag
      type={Tag === "button" ? "button" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      onClick={onClick}
      className={`grid h-3.5 w-3.5 place-items-center rounded-full text-[9px] font-bold leading-none text-black/60 ${
        onClick ? "cursor-pointer" : "cursor-default"
      } ${className}`}
      style={{ backgroundColor: color }}
    >
      <span className="opacity-0 transition-opacity duration-150 group-hover/lights:opacity-100 select-none">
        {glyph}
      </span>
    </Tag>
  );
}

// ═══════════════════════════════════════════════════════════════
// Modal — ventana macOS en desktop, sheet deslizable en móvil
// ═══════════════════════════════════════════════════════════════

type ModalProps = {
  onClose: () => void;
  project: Portfolio;
};

export default function Modal({ onClose, project }: ModalProps) {
  const lenis = useLenis();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [maximized, setMaximized] = useState(false);
  const dragControls = useDragControls();

  // Lock smooth scroll while modal is visible
  useEffect(() => {
    lenis?.stop();
    return () => { lenis?.start(); };
  }, [lenis]);

  /* "Dirección" de la ventana: la URL real del proyecto, como un browser */
  const windowTitle = (project.urlPageWeb || project.urlPageGithub || project.name)
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <m.div
            className="fixed inset-0 bg-night-950/80 backdrop-blur-xl z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        </Dialog.Overlay>

        <Dialog.Content asChild onOpenAutoFocus={(e) => e.preventDefault()}>
          <m.div
            className="fixed inset-0 z-[80]"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="flex h-full items-end justify-center md:items-center md:p-8"
              onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
              {/* ── La ventana / sheet ─────────────────────────── */}
              <m.div
                drag={isDesktop ? false : "y"}
                dragControls={dragControls}
                dragListener={false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.6 }}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 120 || info.velocity.y > 600) onClose();
                }}
                initial={isDesktop ? { opacity: 0, scale: 0.93, y: 28 } : { y: "100%" }}
                animate={isDesktop ? { opacity: 1, scale: 1, y: 0 } : { y: 0 }}
                exit={isDesktop ? { opacity: 0, scale: 0.93, y: 28 } : { y: "100%" }}
                transition={{ duration: 0.35, ease: EASE }}
                className={`relative flex w-full flex-col overflow-hidden border border-night-700 bg-night-900 shadow-2xl shadow-black/60
                  max-h-[92dvh] rounded-t-2xl
                  md:max-h-[85vh] md:rounded-2xl
                  ${maximized ? "md:max-w-[92vw] md:h-[85vh]" : "md:max-w-3xl"}`}
              >
                {/* ── Barra de título macOS (y asa de arrastre en móvil) ── */}
                <div
                  className="relative flex shrink-0 touch-none items-center border-b border-night-700 bg-night-950/70 px-4 py-3"
                  onPointerDown={(e) => { if (!isDesktop) dragControls.start(e); }}
                >
                  {/* Asa del sheet — solo móvil */}
                  <span
                    className="absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-night-700 md:hidden"
                    aria-hidden="true"
                  />

                  {/* Semáforos: rojo cierra, amarillo decora, verde maximiza */}
                  <div className="group/lights flex items-center gap-2">
                    <TrafficDot color="#ff5f57" glyph="×" label="Cerrar" onClick={onClose} />
                    <TrafficDot color="#febc2e" glyph="−" />
                    <TrafficDot
                      color="#28c840"
                      glyph="+"
                      label={maximized ? "Restaurar tamaño" : "Maximizar"}
                      onClick={() => setMaximized((v) => !v)}
                      className="hidden md:grid"
                    />
                  </div>

                  {/* URL del proyecto como título de la ventana */}
                  <span className="absolute left-1/2 max-w-[55%] -translate-x-1/2 truncate font-mono text-xs text-slate-500 select-none">
                    {windowTitle}
                  </span>
                </div>

                {/* ── Contenido con scroll interno ─────────────────
                    min-h-0: sin esto, un hijo de flex-col no puede
                    encogerse y el overflow-y-auto jamás se activa.
                    data-lenis-prevent: Lenis debe ignorar la rueda aquí. */}
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" data-lenis-prevent>
                  {/* Screenshot area */}
                  <div className="relative bg-gradient-to-b from-night-800/90 to-night-800/60 p-4 md:p-6">
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
                    <div className="relative w-full aspect-video bg-night-950 rounded-xl overflow-hidden border border-night-700/50 shadow-xl">
                      {project.img ? (
                        <img
                          src={project.img}
                          alt={project.name}
                          className="w-full h-full object-contain"
                          loading="eager"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                          <div className="w-16 h-16 rounded-2xl bg-accent-600 flex items-center justify-center">
                            <Github size={32} className="text-white" />
                          </div>
                          <span className="text-slate-500 text-sm">Sin vista previa</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── Content ───────────────────────────────────── */}
                  <div className="p-6 md:p-8 space-y-6">
                    {/* Title, categories & description */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-start gap-x-3 gap-y-2">
                        <Dialog.Title asChild>
                          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                            {project.name}
                          </h2>
                        </Dialog.Title>
                        <div className="flex flex-wrap gap-1.5 mt-0.5">
                          {project.category.map((cat) => (
                            <span
                              key={cat}
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border ${CATEGORY_STYLE.bg} ${CATEGORY_STYLE.text} ${CATEGORY_STYLE.border}`}
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Dialog.Description asChild>
                        <p className="text-slate-400 text-base leading-relaxed">
                          {project.description}
                        </p>
                      </Dialog.Description>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-accent-500/20 flex items-center justify-center border border-accent-500/30 flex-shrink-0">
                          <Layers size={16} className="text-accent-400" />
                        </div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                          Tecnologías utilizadas
                        </h3>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                        {project.tecnologias.map((tech, idx) => (
                          <m.div
                            key={idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.04 }}
                            whileHover={{ y: -3, scale: 1.05 }}
                            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-night-800/60 border border-night-700/50 hover:border-accent-500/50 hover:bg-night-800 transition-all duration-200"
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
                          </m.div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-night-700/80">
                      {project.urlPageWeb && (
                        <m.a
                          href={project.urlPageWeb}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-semibold shadow-lg shadow-accent-500/25 transition-colors"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ExternalLink size={18} />
                          Ver Proyecto
                        </m.a>
                      )}
                      {project.urlPageGithub && (
                        <m.a
                          href={project.urlPageGithub}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-night-800 hover:bg-night-700 text-white font-semibold border border-night-700 hover:border-accent-500/40 transition-all"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Github size={18} />
                          Ver Código
                        </m.a>
                      )}
                    </div>
                  </div>
                </div>
              </m.div>
            </div>
          </m.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
