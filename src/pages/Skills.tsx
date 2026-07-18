import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  CheckCircle2,
  Layers,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";
import { skills } from "@/data/skills";
import { SKILL_CATEGORIES, type SkillCategory } from "@/types";
import { DELIVERY, SOFT_SKILLS, EDUCATION } from "@/data/aboutMe";
import { usePageMeta } from "@/hooks/usePageMeta";

// ═══════════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════════

const LEVEL_STYLE = {
  Avanzado:   "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-400/30",
  Intermedio: "bg-blue-500/15   text-blue-600   dark:text-blue-400   border-blue-400/30",
  Básico:     "bg-amber-500/15  text-amber-600  dark:text-amber-400  border-amber-400/30",
} as const;

const TABS = ["Todos", ...SKILL_CATEGORIES] as const;
type Tab = (typeof TABS)[number];

// ═══════════════════════════════════════════════════════════════
// Skill Card
// ═══════════════════════════════════════════════════════════════

function SkillCard({
  skill,
  index,
}: {
  skill: (typeof skills)[number];
  index: number;
}) {
  return (
    <m.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.18 } }}
      transition={{ duration: 0.35, delay: index * 0.025 }}
      whileHover={{ y: -4, scale: 1.05 }}
      className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:shadow-blue-500/8 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-300 cursor-default"
    >
      {/* Icon */}
      <div className="w-11 h-11 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/50 group-hover:border-blue-300/40 transition-colors flex items-center justify-center">
        <img
          src={skill.img}
          alt={skill.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Name */}
      <span className="text-xs md:text-sm font-semibold text-slate-900 dark:text-white text-center leading-tight">
        {skill.name}
      </span>

      {/* Level */}
      <span
        className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
          LEVEL_STYLE[skill.level]
        }`}
      >
        {skill.level}
      </span>
    </m.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════

export default function Skills() {
  usePageMeta(
    "Skills & Trayectoria",
    "Stack técnico de Alessandro Poves: React, Laravel, NestJS, bases de datos y DevOps, con metodología de trabajo y formación académica."
  );

  const [activeTab, setActiveTab] = useState<Tab>("Todos");

  const filteredSkills =
    activeTab === "Todos"
      ? skills
      : skills.filter((s) => s.category === (activeTab as SkillCategory));

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-950">
      <div className="container-page space-y-20">

        {/* ── Page hero ──────────────────────────────────────── */}
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <m.div
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-700/50 dark:bg-blue-500/10 dark:text-blue-300"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles size={14} />
            Skillset 360°
          </m.div>

          <m.h1
            className="text-4xl font-bold text-slate-900 dark:text-white md:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            Habilidades que convierten{" "}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 dark:from-blue-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
              ideas en productos
            </span>
          </m.h1>

          <m.p
            className="text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
          >
            Orquesto cada etapa del desarrollo —desde estrategia y arquitectura
            hasta despliegue— integrando tecnologías modernas con procesos
            colaborativos.
          </m.p>

          {/* Quick stats */}
          <m.div
            className="grid gap-4 sm:grid-cols-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              { title: "+30 proyectos", caption: "en sectores fintech, retail y educación" },
              { title: "Stack full stack", caption: "React · Laravel · NestJS · AWS" },
              { title: "Ciberseguridad", caption: "Perspectiva ofensiva aplicada a defensa" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/80"
              >
                <p className="font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {item.caption}
                </p>
              </div>
            ))}
          </m.div>
        </div>

        {/* ── Skills grid with category tabs ─────────────────── */}
        <div className="space-y-8">
          <div className="text-center space-y-5">
            <m.h2
              className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Stack tecnológico
            </m.h2>

            {/* Category tabs */}
            <m.div
              className="flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/40 w-fit mx-auto"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    activeTab === tab
                      ? "text-white"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  }`}
                >
                  {activeTab === tab && (
                    <m.span
                      layoutId="skills-tab-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 shadow-md shadow-blue-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {tab}
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold tabular-nums ${
                        activeTab === tab
                          ? "bg-white/25 text-white"
                          : "bg-slate-200/80 dark:bg-slate-700/80 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {tab === "Todos"
                        ? skills.length
                        : skills.filter((s) => s.category === tab).length}
                    </span>
                  </span>
                </button>
              ))}
            </m.div>
          </div>

          {/* Grid */}
          <m.div
            layout
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </AnimatePresence>
          </m.div>
        </div>

        {/* ── Delivery + soft skills ─────────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Delivery process */}
          <m.div
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800/60 dark:bg-slate-900/80 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
                <Rocket size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Cómo impulso cada entrega
              </h3>
            </div>

            {DELIVERY.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700/50 dark:bg-slate-800/40"
              >
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
                  {item.label}
                </p>
                <ul className="space-y-2">
                  {item.details.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle2
                        size={14}
                        className="mt-0.5 text-emerald-500 flex-shrink-0"
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </m.div>

          {/* Soft skills */}
          <m.div
            className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800/60 dark:bg-slate-900/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
                <Users size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Cómo colaboro
              </h3>
            </div>

            <div className="flex-1 space-y-3">
              {SOFT_SKILLS.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50/80 dark:border-slate-700/50 dark:bg-slate-800/40"
                >
                  <Icon size={15} className="mt-0.5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {title}
                    </p>
                    <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm text-blue-700 dark:border-blue-700/40 dark:bg-blue-500/10 dark:text-blue-300">
              Listo para integrarme en tu equipo o liderar la construcción
              end-to-end de tu siguiente producto.
            </div>
          </m.div>
        </div>

        {/* ── Education ──────────────────────────────────────── */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <m.div
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:border-emerald-700/40 dark:bg-emerald-500/10 dark:text-emerald-300"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Layers size={14} />
              Formación Académica
            </m.div>

            <m.h2
              className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
            >
              Trayectoria académica
            </m.h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {EDUCATION.map((edu, i) => (
              <m.div
                key={edu.institution}
                className={`relative overflow-hidden rounded-3xl border bg-white p-6 shadow-xl dark:bg-slate-900/80 ${edu.accentBorder}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${edu.accent}`}
                />
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        className="h-9 w-9 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        {edu.period}
                      </p>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {edu.institution}
                      </h4>
                    </div>
                  </div>
                  <div className="space-y-1 text-slate-600 dark:text-slate-300">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">
                      {edu.program}
                    </p>
                    <p className="text-sm leading-relaxed">{edu.highlight}</p>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
