import type { ComponentType } from "react";
import { skills } from "../data/skills";
import {
  CheckCircle2,
  Layers,
  Palette,
  Rocket,
  Server,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

type SkillSummary = {
  title: string;
  icon: ComponentType<{ size?: number }>;
  description: string;
  items: string[];
};

const skillCategories: SkillSummary[] = [
  {
    title: "Frontend & Experiencia",
    icon: Palette,
    description:
      "Interfaces reactivas optimizadas para performance, accesibilidad y branding consistente.",
    items: ["React", "Next.js", "TypeScript", "TailwindCSS"],
  },
  {
    title: "Backend & APIs",
    icon: Server,
    description:
      "Servicios escalables, APIs REST y microservicios integrados con ecosistemas cloud.",
    items: ["Laravel", "Spring Boot", "Express", "Java"],
  },
  {
    title: "DevOps & Data",
    icon: Layers,
    description:
      "Automatización de despliegues, observabilidad y bases de datos robustas para productos en producción.",
    items: ["Docker", "AWS", "MySQL", "Git"],
  },
];

const deliveryHighlights = [
  {
    label: "Descubrimiento & arquitectura",
    details: [
      "Kick-off estratégico para alinear objetivos de negocio.",
      "Diagramas de arquitectura y modelado de datos colaborativo.",
    ],
  },
  {
    label: "Implementación iterativa",
    details: [
      "Sprints con demos quincenales y documentación viva.",
      "QA automatizado, code reviews y estándares de seguridad.",
    ],
  },
  {
    label: "Lanzamiento & evolución",
    details: [
      "Pipelines CI/CD, monitorización y handoff guiado.",
      "Roadmap de mejoras basado en métricas reales.",
    ],
  },
];

const softHighlights = [
  {
    title: "Colaboración transparente",
    description:
      "Trabajo mano a mano con founders, PM y designers para mantener visibilidad total del progreso.",
    icon: Users,
  },
  {
    title: "Focus en impacto",
    description:
      "Priorizo funcionalidades que aceleran resultados y reduzco fricción para el usuario final.",
    icon: Target,
  },
  {
    title: "Iteración guiada por datos",
    description:
      "Analizo métricas y feedback para definir nuevas releases y optimizaciones continuas.",
    icon: Sparkles,
  },
];

function resolveSkill(name: string) {
  return skills.find((skill) => skill.name === name);
}

export default function SkillsAboutMe() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-950">
      <div className="container-apple space-y-16">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700 dark:border-blue-500/50 dark:bg-blue-500/15 dark:text-blue-200">
            <Sparkles size={14} />
            Skillset 360°
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
            Habilidades que convierten ideas en productos reales
          </h2>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Orquesto cada etapa del desarrollo —desde estrategia y arquitectura hasta despliegue y crecimiento— integrando
            tecnologías modernas con procesos colaborativos.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "+30 proyectos", caption: "en sectores fintech, retail y educación" },
              { title: "Stack full stack", caption: "React · Laravel · Spring Boot · AWS" },
              { title: "Certificaciones clave", caption: "Arquitectura de software y ciberseguridad" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-5 text-sm shadow-sm dark:border-slate-800/60 dark:bg-slate-900/80"
              >
                <p className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</p>
                <p className="mt-1 text-slate-500 dark:text-slate-300">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {skillCategories.map(({ title, icon: Icon, description, items }) => (
            <div
              key={title}
              className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800/60 dark:bg-slate-900/80"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {items.map((name) => {
                  const skill = resolveSkill(name);
                  if (!skill) return null;
                  return (
                    <span
                      key={name}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/70 dark:text-slate-200"
                    >
                      <img src={skill.img} alt={skill.name} className="h-4 w-4 object-contain" loading="lazy" />
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl dark:border-slate-800/60 dark:bg-slate-900/80">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
                <Rocket size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Cómo impulso cada entrega</h3>
            </div>
            <div className="space-y-6">
              {deliveryHighlights.map((highlight) => (
                <div
                  key={highlight.label}
                  className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/70"
                >
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{highlight.label}</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {highlight.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-0.5 text-emerald-500 dark:text-emerald-300" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-slate-200 bg-white p-10 shadow-xl dark:border-slate-800/60 dark:bg-slate-900/80">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Cómo colaboro</h3>
              </div>
              <div className="space-y-4">
                {softHighlights.map(({ title, description, icon: Icon }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/70"
                  >
                    <div className="flex items-start gap-3">
                      <Icon size={18} className="mt-0.5 text-blue-500 dark:text-blue-300" />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-blue-200 bg-blue-50 px-6 py-5 text-left text-sm text-blue-700 shadow-sm dark:border-blue-500/50 dark:bg-blue-500/15 dark:text-blue-200">
              Listo para integrarme en tu equipo o liderar la construcción end-to-end de tu siguiente producto. Transparencia, documentación y ownership en cada paso.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
