import { useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Circle,
  Calendar,
  ImageIcon,
  MessageSquareQuote,
  FlaskConical,
  NotebookPen,
  FileText,
  Github,
  Globe,
  Paperclip,
  ExternalLink,
  ArrowUpRight,
  Layers,
  Presentation,
  NotebookText,
  ListChecks,
} from "lucide-react";
import { anotaciones } from "@/data/anotaciones";
import type { Anotacion, Entregable } from "@/types";
import { usePageMeta } from "@/hooks/usePageMeta";

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
  },
  "en-curso": {
    label: "En curso",
    icon: Clock,
    pill: "bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 border-accent-200/60 dark:border-accent-700/40",
    dot: "bg-accent-500",
  },
  pendiente: {
    label: "Pendiente",
    icon: Circle,
    pill: "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700",
    dot: "bg-slate-300 dark:bg-slate-600",
  },
} as const;

// ─── Acento de color por semana (rota en la paleta) ─────────────
// Solo clases estáticas de Tailwind — cero costo de runtime.

interface Accent {
  text: string;
  bar: string;
  tile: string;
  active: string;
  chip: string;
  dot: string;
  soft: string;
  softText: string;
  softIcon: string;
}

const ACCENT: Accent = {
  text: "text-accent-600 dark:text-accent-400",
  bar: "bg-gradient-to-r from-accent-500 to-accent-400",
  tile: "bg-gradient-to-br from-accent-500 to-accent-400",
  active: "bg-gradient-to-r from-accent-600 to-accent-500 shadow-md shadow-accent-500/25",
  chip: "bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300 border border-accent-200/60 dark:border-accent-700/40",
  dot: "bg-accent-500",
  soft: "bg-accent-50/70 dark:bg-accent-900/10 border-accent-200/60 dark:border-accent-700/30",
  softText: "text-accent-800 dark:text-accent-300",
  softIcon: "text-accent-500",
};

// ─── Entregables por tipo — cada uno con su color "real" ────────
// PDF = rojo (informe/Adobe), GitHub = grafito (código),
// deploy = verde (en vivo). Colores semánticos, fuera de la paleta.

const ENTREGABLE_CONFIG: Record<
  Entregable["tipo"],
  { icon: typeof FileText; kicker: string; className: string; iconWrap: string }
> = {
  pdf: {
    icon: FileText,
    kicker: "Informe PDF",
    className:
      "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border-red-200/70 dark:border-red-800/50 hover:border-red-300 dark:hover:border-red-700",
    iconWrap: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
  },
  github: {
    icon: Github,
    kicker: "Repositorio",
    className:
      "bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600",
    iconWrap: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100",
  },
  web: {
    icon: Globe,
    kicker: "Deploy en vivo",
    className:
      "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200/70 dark:border-emerald-800/50 hover:border-emerald-300 dark:hover:border-emerald-700",
    iconWrap: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  slides: {
    icon: Presentation,
    kicker: "Diapositivas",
    className:
      "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200/70 dark:border-amber-800/50 hover:border-amber-300 dark:hover:border-amber-700",
    iconWrap: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
  },
  docs: {
    icon: NotebookText,
    kicker: "Documentación",
    className:
      "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200/70 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700",
    iconWrap: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  },
  scrum: {
    icon: ListChecks,
    kicker: "Metodología Scrum",
    className:
      "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300 border-cyan-200/70 dark:border-cyan-800/50 hover:border-cyan-300 dark:hover:border-cyan-700",
    iconWrap: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400",
  },
};

// ═══════════════════════════════════════════════════════════════
// Colores por tecnología — SOLO en esta página (/anotaciones)
// ───────────────────────────────────────────────────────────────
// Son colores de MARCA reales (React cian, Django verde, Docker
// azul…) usados como cita visual para diferenciar semanas y temas.
// NO tocan la paleta global (accent/night) ni ninguna otra página.
// El color dominante de la semana = el primer tech que matchea.
// ═══════════════════════════════════════════════════════════════

interface Tech {
  label: string;
  color: string; // hex de marca
  role: string; // línea corta que explica su rol
  match: RegExp; // se busca en título + temas
}

const TECH: Tech[] = [
  { label: "React",      color: "#61DAFB", role: "Librería frontend basada en componentes", match: /react|hook|jsx|props/i },
  { label: "Docker",     color: "#2496ED", role: "Contenedores y orquestación de servicios", match: /docker|microservicio|contenedor|gateway/i },
  { label: "Django",     color: "#44B78B", role: "Framework backend en Python (MTV)", match: /django|\bmtv\b|orm|serializer|\bdrf\b/i },
  { label: "Python",     color: "#F7C948", role: "Lenguaje backend, scripting y POO", match: /python|\bpoo\b/i },
  { label: "TypeScript", color: "#3178C6", role: "JavaScript con tipado estático", match: /typescript/i },
  { label: "JavaScript", color: "#E8C020", role: "Lógica e interactividad en el navegador", match: /javascript|\bdom\b|canvas|async|promesa|axios|evento/i },
  { label: "Tailwind",   color: "#38BDF8", role: "CSS de utilidades atómicas", match: /tailwind/i },
  { label: "Bootstrap",  color: "#7952B3", role: "Framework CSS de componentes", match: /bootstrap/i },
  { label: "PHP",        color: "#8993BE", role: "Lenguaje de servidor clásico", match: /\bphp\b/i },
  { label: "Java / JSP", color: "#EA8C10", role: "Páginas dinámicas sobre servlets", match: /\bjsp\b|servlet|\bjava\b/i },
  { label: "REST API",   color: "#22C55E", role: "Servicios web con verbos HTTP", match: /\bapi\b|\brest\b/i },
  { label: "Postman",    color: "#FF6C37", role: "Cliente para probar APIs", match: /postman/i },
  { label: "Git",        color: "#F05032", role: "Control de versiones distribuido", match: /\bgit\b|github/i },
  { label: "HTML5",      color: "#E34F26", role: "Estructura semántica de la web", match: /html/i },
  { label: "CSS3",       color: "#1572B6", role: "Estilos, Flexbox y Grid", match: /\bcss\b|flexbox|grid|responsiv/i },
  { label: "SEO",        color: "#34A853", role: "Optimización para buscadores", match: /\bseo\b/i },
];

const DEFAULT_COLOR = "#8b5cf6"; // accent-500 — fallback si la semana no tiene tech

function detectStack(a: Anotacion): Tech[] {
  const haystack = [a.titulo, ...a.temas].join(" ");
  return TECH.filter((t) => t.match.test(haystack));
}

function weekColor(a: Anotacion): string {
  return detectStack(a)[0]?.color ?? DEFAULT_COLOR;
}

// "#RRGGBB" + alpha(0..1) → "#RRGGBBAA" (soportado por navegadores)
function withAlpha(hex: string, a: number): string {
  return hex + Math.round(a * 255).toString(16).padStart(2, "0");
}

// Elige texto legible (negro/blanco) según la luminancia del fondo
function readableText(hex: string): string {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#0a0118" : "#ffffff";
}



// ═══════════════════════════════════════════════════════════════
// Parser de apuntes — texto plano → bloques estilizados
// ═══════════════════════════════════════════════════════════════

type Block =
  | { type: "heading" | "para" | "sublabel" | "callout"; text: string }
  | { type: "bullets" | "mono"; items: string[] };

function isHeading(line: string) {
  // Nombres de hooks solos en una línea (useState, useEffect…) son títulos
  if (/^use[A-Z]\w*$/.test(line)) return true;
  // Título si la parte antes del paréntesis va toda en mayúsculas:
  // "ÁRBOL DOM (Document Object Model)" o "JSP (JavaServer Pages)"
  const base = line.split("(")[0].trim();
  return base === base.toUpperCase() && /[A-ZÁÉÍÓÚÑ]{2,}/.test(base);
}

function parseContent(content: string): Block[] {
  const blocks: Block[] = [];
  const push = (b: Block) => blocks.push(b);

  for (const raw of content.split("\n")) {
    const trimmed = raw.trim();
    if (!trimmed) continue;

    const last = blocks[blocks.length - 1];

    if (raw.startsWith("  ") && !trimmed.startsWith("•")) {
      // línea indentada → bloque de código / comandos
      if (last?.type === "mono") last.items.push(trimmed);
      else push({ type: "mono", items: [trimmed] });
    } else if (trimmed.startsWith("•")) {
      const text = trimmed.replace(/^•\s*/, "");
      if (last?.type === "bullets") last.items.push(text);
      else push({ type: "bullets", items: [text] });
    } else if (isHeading(trimmed)) {
      push({ type: "heading", text: trimmed });
    } else if (/^(Lab|Práctica|Laboratorio)\b/.test(trimmed)) {
      push({ type: "callout", text: trimmed });
    } else if (trimmed.endsWith(":") && trimmed.length <= 40) {
      push({ type: "sublabel", text: trimmed });
    } else {
      push({ type: "para", text: trimmed });
    }
  }
  return blocks;
}

function ContentBlocks({ content, accent }: { content: string; accent: Accent }) {
  const blocks = useMemo(() => parseContent(content), [content]);

  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h3 key={i} className="flex items-center gap-2.5 mt-6 first:mt-0 mb-2.5">
                <span className={`h-4 w-1 rounded-full shrink-0 ${accent.bar}`} />
                <span className="text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  {block.text}
                </span>
              </h3>
            );
          case "sublabel":
            return (
              <p key={i} className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-3 mb-1.5">
                {block.text}
              </p>
            );
          case "para":
            return (
              <p key={i} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                {block.text}
              </p>
            );
          case "bullets":
            return (
              <ul key={i} className="space-y-1.5 mb-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <span className={`mt-[7px] h-1.5 w-1.5 rounded-full shrink-0 ${accent.dot}`} />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "mono":
            return (
              <pre key={i} className="rounded-xl bg-night-900 dark:bg-night-950/80 border border-slate-800 dark:border-slate-700/50 px-4 py-3 mb-3 overflow-x-auto">
                <code className="text-xs font-mono leading-relaxed text-slate-200">
                  {block.items.join("\n")}
                </code>
              </pre>
            );
          case "callout":
            return (
              <div key={i} className={`flex items-start gap-2.5 rounded-xl px-3.5 py-2.5 mt-4 text-sm font-medium ${accent.chip}`}>
                <FlaskConical size={15} className="mt-0.5 shrink-0" />
                <span className="min-w-0">{block.text}</span>
              </div>
            );
        }
      })}
    </div>
  );
}

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

  const stats = [
    { label: "Semanas totales", value: total, color: "text-slate-900 dark:text-white", Icon: BookOpen, tile: "bg-gradient-to-br from-slate-600 to-slate-500" },
    { label: "Completadas", value: completados, color: "text-emerald-600 dark:text-emerald-400", Icon: CheckCircle2, tile: "bg-gradient-to-br from-emerald-500 to-accent-400" },
    { label: "En curso", value: enCurso, color: "text-accent-600 dark:text-accent-400", Icon: Clock, tile: "bg-gradient-to-br from-accent-500 to-accent-400" },
    { label: "Pendientes", value: pendientes, color: "text-slate-500 dark:text-slate-400", Icon: Circle, tile: "bg-gradient-to-br from-slate-400 to-slate-300 dark:from-slate-600 dark:to-slate-500" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {stats.map(({ label, value, color, Icon, tile }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 p-4"
        >
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white ${tile}`}>
            <Icon size={16} />
          </div>
          <div className="min-w-0">
            <p className={`text-2xl font-bold leading-none ${color}`}>{value}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">{label}</p>
          </div>
        </div>
      ))}

      <div className="col-span-2 sm:col-span-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-slate-700 dark:text-slate-300">Progreso del curso</span>
          <span className="font-bold text-accent-600 dark:text-accent-400">{progreso}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <m.div
            className="h-full rounded-full bg-gradient-to-r from-accent-500 via-accent-500 to-accent-400"
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
  const isPending = anotacion.estado === "pendiente";
  const wc = weekColor(anotacion);
  const txt = readableText(wc);

  return (
    <button
      onClick={onClick}
      style={isActive ? { backgroundColor: wc } : undefined}
      className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
        isActive ? "shadow-md" : "hover:bg-slate-100 dark:hover:bg-slate-800/70"
      }`}
    >
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
          isPending && !isActive ? "bg-slate-300 dark:bg-slate-600 text-white" : ""
        }`}
        style={
          isActive
            ? { backgroundColor: withAlpha(txt, 0.22), color: txt }
            : isPending
            ? undefined
            : { backgroundColor: wc, color: txt }
        }
      >
        <Icon size={13} />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={`text-xs font-bold uppercase tracking-widest ${isActive ? "" : "text-slate-400 dark:text-slate-500"}`}
          style={isActive ? { color: txt, opacity: 0.75 } : undefined}
        >
          S{String(anotacion.semana).padStart(2, "0")}
        </p>
        <p
          className={`text-sm font-medium truncate leading-tight mt-0.5 ${
            isActive ? "" : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
          }`}
          style={isActive ? { color: txt } : undefined}
        >
          {anotacion.titulo}
        </p>
      </div>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// Entregables — tarjetas de descarga / enlace por semana
// ═══════════════════════════════════════════════════════════════

function Entregables({ items }: { items: Entregable[] }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 p-5 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Paperclip size={14} className="text-accent-500" />
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Entregables de la semana
        </span>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {items.map((item) => {
          const cfg = ENTREGABLE_CONFIG[item.tipo];
          const Icon = cfg.icon;
          const isDownload = item.tipo === "pdf";
          return (
            <m.a
              key={`${item.tipo}-${item.href}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors ${cfg.className}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${cfg.iconWrap}`}>
                <Icon size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {cfg.kicker}
                </p>
                <p className="text-sm font-semibold truncate leading-tight">{item.label}</p>
              </div>
              {isDownload ? (
                <ExternalLink size={14} className="shrink-0 opacity-50 transition-opacity group-hover:opacity-90" />
              ) : (
                <ArrowUpRight size={16} className="shrink-0 opacity-50 transition-opacity group-hover:opacity-90" />
              )}
            </m.a>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Stack de la semana — tecnologías con su color de marca
// ═══════════════════════════════════════════════════════════════

function TechStack({ items }: { items: Tech[] }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 p-5 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Layers size={14} className="text-accent-500" />
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Stack de la semana
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((t) => (
          <div
            key={t.label}
            className="flex items-center gap-3 rounded-xl border px-3 py-2"
            style={{ backgroundColor: withAlpha(t.color, 0.08), borderColor: withAlpha(t.color, 0.3) }}
          >
            <span
              className="shrink-0 px-2 py-1 rounded-md text-xs font-bold"
              style={{ backgroundColor: t.color, color: readableText(t.color) }}
            >
              {t.label}
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
              {t.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Content panel
// ═══════════════════════════════════════════════════════════════

function WeekContent({ anotacion }: { anotacion: Anotacion }) {
  const cfg = ESTADO_CONFIG[anotacion.estado];
  const accent = ACCENT;
  const Icon = cfg.icon;
  const wc = weekColor(anotacion);
  const stack = detectStack(anotacion);

  return (
    <m.div
      key={anotacion.semana}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease }}
    >
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 p-6 mb-4">
        {/* Barra superior con el color de la tecnología de la semana */}
        <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: wc }} />
        {/* Número de semana como marca de agua */}
        <span
          aria-hidden="true"
          className="absolute -right-1 -top-7 text-[6.5rem] font-black leading-none select-none text-slate-900/[0.04] dark:text-white/[0.04]"
        >
          {String(anotacion.semana).padStart(2, "0")}
        </span>

        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-bold uppercase tracking-widest ${accent.text}`}>
                Semana {anotacion.semana}
              </span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
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
          <div className="relative flex flex-wrap gap-1.5 mt-4">
            {anotacion.temas.map((tema) => (
              <span
                key={tema}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs border text-slate-600 dark:text-slate-300"
                style={{ backgroundColor: withAlpha(wc, 0.12), borderColor: withAlpha(wc, 0.35) }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: wc }} />
                {tema}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stack de la semana */}
      {stack.length > 0 && <TechStack items={stack} />}

      {/* Entregables */}
      {anotacion.entregables && anotacion.entregables.length > 0 && (
        <Entregables items={anotacion.entregables} />
      )}

      {/* Images */}
      {anotacion.imagenes && anotacion.imagenes.length > 0 && (
        <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon size={14} className={accent.softIcon} />
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
                  decoding="async"
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
      {anotacion.content && (
        <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 p-5 sm:p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <NotebookPen size={14} className={accent.softIcon} />
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Apuntes
            </span>
          </div>
          <ContentBlocks content={anotacion.content} accent={accent} />
        </div>
      )}

      {/* Reflexion */}
      {anotacion.reflexion && (
        <div className={`rounded-2xl border p-5 ${accent.soft}`}>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquareQuote size={14} className={accent.softIcon} />
            <span className={`text-xs font-semibold uppercase tracking-wide ${accent.text}`}>
              Reflexión
            </span>
          </div>
          <p className={`text-sm leading-relaxed italic ${accent.softText}`}>
            {anotacion.reflexion}
          </p>
        </div>
      )}
    </m.div>
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
        const isActive = i === selected;
        const wc = weekColor(a);
        const txt = readableText(wc);
        return (
          <button
            key={a.semana}
            onClick={() => onSelect(i)}
            style={isActive ? { backgroundColor: wc, color: txt } : undefined}
            className={`shrink-0 flex flex-col items-center px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? "shadow-md"
                : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mb-1 ${isActive || a.estado !== "pendiente" ? "" : "bg-slate-300 dark:bg-slate-600"}`}
              style={isActive ? { backgroundColor: txt, opacity: 0.7 } : a.estado !== "pendiente" ? { backgroundColor: wc } : undefined}
            />
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
  usePageMeta(
    "Anotaciones — Desarrollo de Aplicaciones Web",
    "Apuntes semanales del curso IS093A Desarrollo de Aplicaciones Web (UNCP): fundamentos web, HTML, CSS, JavaScript, React y más."
  );

  // Default to the week currently in progress, or the last one
  const defaultIndex = anotaciones.findIndex((a) => a.estado === "en-curso");
  const [selected, setSelected] = useState(defaultIndex >= 0 ? defaultIndex : anotaciones.length - 1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-night-950 pt-24 pb-20">
      <div className="container-page max-w-5xl">

        {/* Header */}
        <m.div
          className="mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 dark:bg-accent-900/20 border border-accent-200/50 dark:border-accent-700/40 text-accent-700 dark:text-accent-400 text-xs font-medium mb-4">
            <BookOpen size={13} />
            Diario de aprendizaje
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Anotaciones del{" "}
            <span className="bg-gradient-to-r from-accent-600 via-accent-500 to-accent-500 bg-clip-text text-transparent">
              Curso
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Registro semanal de temas, conceptos y reflexiones — IS093A Desarrollo de Aplicaciones Web.
          </p>
        </m.div>

        {/* Stats */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
        >
          <StatsBar />
        </m.div>

        {/* Mobile tab strip */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <MobileTabStrip selected={selected} onSelect={setSelected} />
        </m.div>

        {/* Two-panel layout */}
        <m.div
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
        </m.div>

      </div>
    </div>
  );
}
