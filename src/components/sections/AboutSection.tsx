import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import { personal } from "@/data/personal";
import type { TimelineEntry, TimelineType } from "@/types";
import { VALUE_PROPS } from "@/data/aboutMe";
import { PromptLine } from "@/components/ui/TerminalPrompt";
import { TERMINAL_COLORS } from "@/lib/terminalTheme";

// ═══════════════════════════════════════════════════════════════
// Git log — la trayectoria como historial de commits
// ═══════════════════════════════════════════════════════════════

/* Intensidad del punto según el tipo de hito — variedad dentro
   de la familia morada, sin salir del sistema. */
const DOT_COLOR: Record<TimelineType, string> = {
  education: "bg-accent-400",
  milestone: "bg-accent-500",
  work: "bg-accent-600",
};

/* Hash tipo git, determinístico a partir del contenido:
   el mismo hito produce siempre el mismo hash. */
function fakeHash(seed: string) {
  let h = 2166136261;
  for (const c of seed) {
    h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  }
  return h.toString(16).padStart(7, "0").slice(0, 7);
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface CommitItemProps {
  item: TimelineEntry;
  index: number;
  isLast: boolean;
  isHead: boolean;
}

function CommitItem({ item, index, isLast, isHead }: CommitItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <m.div
      ref={ref}
      className="relative flex gap-4"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
    >
      {/* Rama: punto de commit + línea que se dibuja al scrollear */}
      <div className="flex flex-col items-center pt-1">
        <span className={`relative z-10 h-3.5 w-3.5 rounded-full ${DOT_COLOR[item.type]} ring-4 ring-white dark:ring-night-950`}>
          {isHead && (
            <span className="absolute inset-0 rounded-full bg-accent-400 animate-ping opacity-50" aria-hidden="true" />
          )}
        </span>
        {!isLast && (
          <m.div
            className="w-px flex-1 bg-accent-500/30 origin-top"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08 + 0.2, ease }}
          />
        )}
      </div>

      {/* Contenido del commit — jerarquía tipo git real:
          tag (año) en amarillo > HEAD en verde > mensaje > hash tenue */}
      <div className="flex-1 pb-8">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] leading-none">
          <span
            className="rounded-md px-1.5 py-1 font-bold"
            style={{ backgroundColor: TERMINAL_COLORS.branch, color: TERMINAL_COLORS.ink }}
          >
            tag: {item.year}
          </span>
          {isHead && (
            <span className="font-semibold" style={{ color: TERMINAL_COLORS.prompt }}>
              (HEAD → ahora)
            </span>
          )}
          <span className="text-slate-300 dark:text-slate-600">
            {fakeHash(item.year + item.title)}
          </span>
        </p>
        <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white leading-snug">
          {item.title}
        </h4>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {item.description}
        </p>
      </div>
    </m.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════

export default function AboutSection() {
  return (
    <section className="pt-16 md:pt-24 lg:pt-28 pb-10 md:pb-14 bg-white dark:bg-night-950">
      <div className="container-page space-y-16">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="text-center space-y-4">
          <m.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100/80 dark:bg-accent-900/30 border border-accent-200/50 dark:border-accent-700/50 text-accent-700 dark:text-accent-300 text-sm font-medium"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles size={14} />
            Sobre Mí
          </m.span>

          <m.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            Quién está detrás{" "}
            <span className="text-accent-600 dark:text-accent-400">
              del código
            </span>
          </m.h2>

          <m.p
            className="max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
          >
            {personal.bioshort}
          </m.p>
        </div>

        {/* ── Two-column: bio / timeline ──────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — bio + value props */}
          <m.div
            className="space-y-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500">
              <MapPin size={13} />
              {personal.location}
            </div>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {personal.bio}
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {VALUE_PROPS.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-night-900/60 border border-slate-200/80 dark:border-slate-800/60 hover:border-accent-300/50 dark:hover:border-accent-700/50 transition-colors"
                >
                  <div className="w-9 h-9 mb-3 rounded-xl bg-gradient-to-br from-accent-500/15 to-accent-500/15 border border-accent-200/60 dark:border-accent-800/40 flex items-center justify-center">
                    <Icon size={16} className="text-accent-600 dark:text-accent-400" />
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{label}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </m.div>

          {/* Right — timeline */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            {/* git log: los commits más recientes arriba, como en la terminal */}
            <div className="mb-8 text-sm">
              <PromptLine path="~/carrera" branch="main">
                <span className="text-slate-600 dark:text-slate-300">git log --carrera</span>
              </PromptLine>
            </div>
            <div>
              {[...personal.timeline].reverse().map((item, i, arr) => (
                <CommitItem
                  key={item.year}
                  item={item}
                  index={i}
                  isLast={i === arr.length - 1}
                  isHead={i === 0}
                />
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
