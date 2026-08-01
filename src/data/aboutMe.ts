import {
  Code2,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import type { SoftSkill } from "@/types";

/* Propuestas de valor — sección "Sobre mí" de la home */
export const VALUE_PROPS = [
  {
    icon: Code2,
    label: "Full Stack",
    desc: "React, Laravel y NestJS. Front to back, de idea a producción.",
  },
  {
    icon: Shield,
    label: "Seguridad",
    desc: "Perspectiva ofensiva aplicada a defensa: apps robustas desde el diseño.",
  },
  {
    icon: Zap,
    label: "Rendimiento",
    desc: "Lighthouse 95+, Core Web Vitals y bundle optimizado.",
  },
] as const;

/* Metodología de trabajo — página Skills */
export const DELIVERY = [
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

export const SOFT_SKILLS: SoftSkill[] = [
  {
    icon: Users,
    title: "Colaboración transparente",
    desc: "Trabajo mano a mano con founders, PM y designers para mantener visibilidad total del progreso.",
  },
  {
    icon: Target,
    title: "Focus en impacto",
    desc: "Priorizo funcionalidades que aceleran resultados y reduzco fricción para el usuario final.",
  },
  {
    icon: Sparkles,
    title: "Iteración guiada por datos",
    desc: "Analizo métricas y feedback para definir nuevas releases y optimizaciones continuas.",
  },
];

/* Formación académica — usada en la página Skills (tarjetas completas)
   y en el hero (versión corta: heroLogo / heroLabel / heroDetail).
   Los escudos se sirven desde /public: en el hero son zona crítica y
   una URL externa que cambie dejaría la credencial rota. */
export const EDUCATION = [
  {
    institution: "Universidad Nacional del Centro del Perú (UNCP)",
    program: "Ingeniería de Sistemas",
    period: "2022 - Presente · X semestre",
    highlight:
      "En 10.º semestre, profundizando en arquitectura de software, ciberseguridad y gestión de proyectos de alto impacto.",
    logo: "/uncp.webp",
    heroLogo: "/uncp.webp",
    heroLabel: "UNCP",
    heroDetail: "Ing. de Sistemas · X ciclo",
    accent: "from-accent-500/15 via-accent-500/8 to-transparent",
    accentBorder: "border-accent-200/60 dark:border-accent-800/40",
  },
  {
    institution: "ICPNA",
    program: "Programa de Inglés Profesional",
    period: "2024 - Actualidad · Nivel intermedio",
    highlight:
      "Formación activa en nivel intermedio para documentar proyectos y comunicarme con equipos globales en inglés técnico.",
    logo: "/icpna.svg",
    heroLogo: "/icpna.svg",
    heroLabel: "ICPNA",
    heroDetail: "Inglés profesional · Intermedio",
    accent: "from-emerald-500/15 via-emerald-500/8 to-transparent",
    accentBorder: "border-emerald-200/60 dark:border-emerald-800/40",
  },
];
