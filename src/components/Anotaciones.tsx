import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, CheckCircle2, Clock, Circle, ChevronDown, ChevronUp, Tag } from "lucide-react";
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
    line: "bg-emerald-500",
  },
  "en-curso": {
    label: "En curso",
    icon: Clock,
    pill: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200/60 dark:border-blue-700/40",
    dot: "bg-blue-500",
    line: "bg-blue-500",
  },
  pendiente: {
    label: "Pendiente",
    icon: Circle,
    pill: "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700",
    dot: "bg-slate-300 dark:bg-slate-600",
    line: "bg-slate-200 dark:bg-slate-700",
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
  const progreso = Math.round((completados / total) * 100);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
      {[
        { label: "Total semanas", value: total, color: "text-slate-900 dark:text-white" },
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

      {/* Progress bar — full width */}
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
// Week Card
// ═══════════════════════════════════════════════════════════════

function WeekCard({ anotacion, index }: { anotacion: Anotacion; index: number }) {
  const [open, setOpen] = useState(false);
  const cfg = ESTADO_CONFIG[anotacion.estado];
  const Icon = cfg.icon;
  const isLast = anotacion.semana === 16;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease }}
      className="relative flex gap-4 sm:gap-6"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        {/* Dot */}
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${cfg.dot} shadow-sm shrink-0`}>
          <Icon size={16} className="text-white" />
        </div>
        {/* Connector line */}
        {!isLast && (
          <div className={`w-0.5 flex-1 mt-1 min-h-[24px] ${cfg.line} opacity-40`} />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-6">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full text-left group"
        >
          <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 hover:border-blue-300 dark:hover:border-blue-700/60 hover:shadow-md transition-all duration-200 overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 shrink-0">
                  S{anotacion.semana.toString().padStart(2, "0")}
                </span>
                <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                  {anotacion.titulo}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${cfg.pill}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </span>
                {open ? (
                  <ChevronUp size={16} className="text-slate-400" />
                ) : (
                  <ChevronDown size={16} className="text-slate-400" />
                )}
              </div>
            </div>

            {/* Temas chips — always visible if present */}
            {anotacion.temas.length > 0 && (
              <div className="flex flex-wrap gap-1.5 px-5 pb-3">
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

            {/* Expandable content */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-700/50">
                    {anotacion.content ? (
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {anotacion.content}
                      </p>
                    ) : (
                      <p className="text-sm text-slate-400 dark:text-slate-500 italic">
                        Sin anotaciones todavía — agrega el contenido en{" "}
                        <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded text-xs not-italic">
                          src/data/anotaciones.ts
                        </code>
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Filter tabs
// ═══════════════════════════════════════════════════════════════

type Filtro = "todas" | "completado" | "en-curso" | "pendiente";

const FILTROS: { id: Filtro; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "completado", label: "Completadas" },
  { id: "en-curso", label: "En curso" },
  { id: "pendiente", label: "Pendientes" },
];

// ═══════════════════════════════════════════════════════════════
// Main Page
// ═══════════════════════════════════════════════════════════════

export default function Anotaciones() {
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const filtered = filtro === "todas"
    ? anotaciones
    : anotaciones.filter((a) => a.estado === filtro);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
      <div className="container-apple max-w-3xl">

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
            Registro semanal de temas, conceptos y reflexiones a lo largo de las 16 semanas.
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

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {FILTROS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFiltro(f.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                filtro === f.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700"
              }`}
            >
              {f.label}
              <span className={`ml-1.5 text-xs ${filtro === f.id ? "opacity-70" : "opacity-50"}`}>
                {f.id === "todas" ? anotaciones.length : anotaciones.filter((a) => a.estado === f.id).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <AnimatePresence mode="popLayout">
          <div>
            {filtered.map((anotacion, i) => (
              <WeekCard key={anotacion.semana} anotacion={anotacion} index={i} />
            ))}
          </div>
        </AnimatePresence>

      </div>
    </div>
  );
}
