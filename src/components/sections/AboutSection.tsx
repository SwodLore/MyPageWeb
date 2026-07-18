import { useRef } from "react";
import { m, useInView } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Lightbulb,
  MapPin,
  Sparkles,
} from "lucide-react";
import { personal } from "@/data/personal";
import type { TimelineEntry, TimelineType } from "@/types";
import { VALUE_PROPS } from "@/data/aboutMe";

// ═══════════════════════════════════════════════════════════════
// Config
// ═══════════════════════════════════════════════════════════════

type TypeConfig = {
  dot: string;
  bg: string;
  text: string;
  border: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const TYPE_CONFIG: Record<TimelineType, TypeConfig> = {
  education: {
    dot: "bg-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800/50",
    icon: GraduationCap,
  },
  milestone: {
    dot: "bg-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800/50",
    icon: Lightbulb,
  },
  work: {
    dot: "bg-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800/50",
    icon: Briefcase,
  },
};

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ═══════════════════════════════════════════════════════════════
// Timeline Item
// ═══════════════════════════════════════════════════════════════

interface TLItemProps {
  item: TimelineEntry;
  index: number;
  isLast: boolean;
}

function TimelineItem({ item, index, isLast }: TLItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const cfg = TYPE_CONFIG[item.type];
  const Icon = cfg.icon;

  return (
    <m.div
      ref={ref}
      className="relative flex gap-5"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease }}
    >
      {/* Vertical connector */}
      {!isLast && (
        <div
          className={`absolute left-[19px] top-11 bottom-0 w-px ${cfg.dot} opacity-20`}
        />
      )}

      {/* Icon node */}
      <div
        className={`flex-shrink-0 mt-0.5 w-10 h-10 rounded-xl border flex items-center justify-center ${cfg.bg} ${cfg.border}`}
      >
        <Icon size={16} className={cfg.text} />
      </div>

      {/* Text */}
      <div className="flex-1 pb-8">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold mb-1.5 border ${cfg.bg} ${cfg.text} ${cfg.border}`}
        >
          {item.year}
        </span>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
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
    <section className="section-padding bg-white dark:bg-slate-950">
      <div className="container-page space-y-16">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="text-center space-y-4">
          <m.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 text-sm font-medium"
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
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 dark:from-blue-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
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
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 hover:border-blue-300/50 dark:hover:border-blue-700/50 transition-colors"
                >
                  <div className="w-9 h-9 mb-3 rounded-xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 border border-blue-200/60 dark:border-blue-800/40 flex items-center justify-center">
                    <Icon size={16} className="text-blue-600 dark:text-blue-400" />
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
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500 mb-8">
              Trayectoria
            </p>
            <div>
              {personal.timeline.map((item, i) => (
                <TimelineItem
                  key={item.year}
                  item={item}
                  index={i}
                  isLast={i === personal.timeline.length - 1}
                />
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
