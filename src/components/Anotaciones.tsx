import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Circle,
  Tag,
  Calendar,
  ImageIcon,
  MessageSquareQuote,
} from "lucide-react";
import { anotaciones, type Anotacion } from "../data/anotaciones";

// ═══════════════════════════════════════════════════════════════
// Config
// ═══════════════════════════════════════════════════════════════

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ESTADO_CONFIG = {
  completado: {
    label: "Completado",
    icon: CheckCircle2,
    pill: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-700/40",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/40",
    sidebar: "text-emerald-600 dark:text-emerald-400",
  },
  "en-curso": {
    label: "En curso",
    icon: Clock,
    pill: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200/60 dark:border-blue-700/40",
    dot: "bg-blue-500",
    ring: "ring-blue-500/40",
    sidebar: "text-blue-500 dark:text-blue-400",
  },
  pendiente: {
    label: "Pendiente",
    icon: Circle,
    pill: "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700",
    dot: "bg-slate-300 dark:bg-slate-600",
    ring: "ring-slate-400/30",
    sidebar: "text-slate-400 dark:text-slate-500",
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// Stats bar
// ═══════════════════════════════════════════════════════════════

function StatsBar() {
  const total = anotaciones.length;
  const completados = anotaciones.filter((a) => a.estado === "completado").length;
  const enCurso = anotaciones.filter((a) => a.estado === "en-curso").length;
  const pendientes = anotaciones.filter((a) => a.estado === "pendiente").length;
  const current = anotaciones.find((a) => a.estado === "en-curso") ?? anotaciones[total - 1];
  const progreso = current.avance;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {[
        { label: "Semanas totales", value: total, color: "text-slate-900 dark:text-white" },
        { label: "Completadas", value: completados, color: "text-emerald-600 dark:text-emerald-400" },
        { label: "En curso", value: enCurso, color: "text-blue-600 dark:text-blue-400" },
        { label: "Pendientes", value: pendientes, color: "text-slate-500 dark:text-slate-400" },
      ].map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 p-4 text-center"
        >
          <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
        </div>
      ))}

      <div className="col-span-2 sm:col-span-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-slate-700 dark:text-slate-300">Progreso del curso</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">{progreso}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${progreso}%` }}
            transition={{ duration: 1.2, ease, delay: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Sidebar — week list
// ═══════════════════════════════════════════════════════════════

function SidebarItem({
  anotacion,
  isActive,
  onClick,
}: {
  anotacion: Anotacion;
  isActive: boolean;
  onClick: () => void;
}) {
  const cfg = ESTADO_CONFIG[anotacion.estado];
  const Icon = cfg.icon;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
        isActive
          ? "bg-blue-600 shadow-md shadow-blue-500/20"
          : "hover:bg-slate-100 dark:hover:bg-slate-800/70"
      }`}
    >
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${isActive ? "bg-white/20" : cfg.dot} transition-colors`}>
        <Icon size={13} className={isActive ? "text-white" : "text-white"} />
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-xs font-bold uppercase tracking-widest ${isActive ? "text-blue-200" : "text-slate-400 dark:text-slate-500"}`}>
          S{String(anotacion.semana).padStart(2, "0")}
        </p>
        <p className={`text-sm font-medium truncate leading-tight mt-0.5 ${isActive ? "text-white" : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"}`}>
          {anotacion.titulo}
        </p>
      </div>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// Content panel
// ═══════════════════════════════════════════════════════════════

function WeekContent({ anotacion }: { anotacion: Anotacion }) {
  const cfg = ESTADO_CONFIG[anotacion.estado];
  const Icon = cfg.icon;

  return (
    <motion.div
      key={anotacion.semana}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease }}
    >
      {/* Header */}
      <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 p-6 mb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Semana {anotacion.semana}
              </span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-violet-500 dark:text-violet-400">
                Unidad {anotacion.unidad}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {anotacion.titulo}
            </h2>
            <div className="flex items-center gap-1.5 mt-1.5 text-sm text-slate-400 dark:text-slate-500">
              <Calendar size={13} />
              {anotacion.fecha}
            </div>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${cfg.pill}`}>
            <Icon size={12} />
            {cfg.label}
          </span>
        </div>

        {/* Temas */}
        {anotacion.temas.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {anotacion.temas.map((tema) => (
              <span
                key={tema}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300"
              >
                <Tag size={9} />
                {tema}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Images */}
      {anotacion.imagenes && anotacion.imagenes.length > 0 && (
        <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon size={14} className="text-slate-400" />
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Recursos visuales
            </span>
          </div>
          <div className={`grid gap-3 ${anotacion.imagenes.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
            {anotacion.imagenes.map((img) => (
              <figure key={img.src} className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="px-3 py-2 text-xs text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 p-5 mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3">
          Apuntes
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {anotacion.content}
        </p>
      </div>

      {/* Reflexion */}
      {anotacion.reflexion && (
        <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200/60 dark:border-violet-700/30 p-5">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquareQuote size={14} className="text-violet-500" />
            <span className="text-xs font-semibold uppercase tracking-wide text-violet-500 dark:text-violet-400">
              Reflexión
            </span>
          </div>
          <p className="text-sm text-violet-700 dark:text-violet-300 leading-relaxed italic">
            {anotacion.reflexion}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Mobile tab strip
// ═══════════════════════════════════════════════════════════════

function MobileTabStrip({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-2 mb-6 md:hidden [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
      {anotaciones.map((a, i) => {
        const cfg = ESTADO_CONFIG[a.estado];
        const isActive = i === selected;
        return (
          <button
            key={a.semana}
            onClick={() => onSelect(i)}
            className={`shrink-0 flex flex-col items-center px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full mb-1 ${isActive ? "bg-white/70" : cfg.dot}`} />
            S{String(a.semana).padStart(2, "0")}
          </button>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main Page
// ═══════════════════════════════════════════════════════════════

export default function Anotaciones() {
  // Default to week 8 (en-curso) or last week
  const defaultIndex = anotaciones.findIndex((a) => a.estado === "en-curso");
  const [selected, setSelected] = useState(defaultIndex >= 0 ? defaultIndex : anotaciones.length - 1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
      <div className="container-apple max-w-5xl">

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-700/40 text-blue-700 dark:text-blue-400 text-xs font-medium mb-4">
            <BookOpen size={13} />
            Diario de aprendizaje
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Anotaciones del Curso
          </h1>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Registro semanal de temas, conceptos y reflexiones — IS093A Desarrollo de Aplicaciones Web.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
        >
          <StatsBar />
        </motion.div>

        {/* Mobile tab strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <MobileTabStrip selected={selected} onSelect={setSelected} />
        </motion.div>

        {/* Two-panel layout */}
        <motion.div
          className="flex gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Sidebar — desktop only */}
          <aside className="hidden md:flex flex-col gap-1 w-56 shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 mb-1">
              Semanas
            </p>
            {anotaciones.map((a, i) => (
              <SidebarItem
                key={a.semana}
                anotacion={a}
                isActive={i === selected}
                onClick={() => setSelected(i)}
              />
            ))}
          </aside>

          {/* Content panel */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <WeekContent key={selected} anotacion={anotaciones[selected]} />
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
