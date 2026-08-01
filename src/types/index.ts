import { z } from 'zod'
import type { LucideIcon } from 'lucide-react'

/* Skill categories */
export const SKILL_CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Languages',
] as const
export type SkillCategory = (typeof SKILL_CATEGORIES)[number]

/* Skills */
export const skillsSchema = z.object({
    name: z.string(),
    img: z.string(),
    level: z.enum(['Básico', 'Intermedio', 'Avanzado']),
    category: z.enum(['Frontend', 'Backend', 'Database', 'DevOps', 'Languages']),
})
export type Skill = z.infer<typeof skillsSchema>

/* Certificados */
export const certificateSchema = z.object({
    name: z.string(),
    teacher: z.string(),
    institution: z.string(),
    imgInstitution: z.string(),
    urlCertificate: z.string(),
    dateCertificate: z.string(),
})
export type Certificate = z.infer<typeof certificateSchema>

/* Tecnologías usadas en proyectos */
export const techSchema = z.object({
    name: z.string(),
    img: z.string(),
})
export type Tech = z.infer<typeof techSchema>

/* Portfolio categories */
export const PORTFOLIO_CATEGORIES = [
  'Todos',
  'Fullstack',
  'React',
  'Laravel',
  'Python',
  'Bash',
  'Frontend',
] as const
export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number]

/* Portafolio */
export const portfolioSchema = z.object({
    name: z.string(),
    img: z.string(),
    urlPageWeb: z.string(),
    urlPageGithub: z.string(),
    tecnologias: z.array(techSchema),
    description: z.string(),
    category: z.array(z.string()),
    featured: z.boolean(),
})
export type Portfolio = z.infer<typeof portfolioSchema>

/* Trayectoria (timeline de la sección Sobre mí) */
export const TIMELINE_TYPES = ['education', 'milestone', 'work'] as const
export const timelineEntrySchema = z.object({
    year: z.string(),
    title: z.string(),
    description: z.string(),
    type: z.enum(TIMELINE_TYPES),
})
export type TimelineEntry = z.infer<typeof timelineEntrySchema>
export type TimelineType = TimelineEntry['type']

/* ── Tipos que contienen componentes React (iconos de lucide) ──
   No se validan con zod porque un componente no es un dato
   serializable; aquí solo se declara la forma para reutilizarla. */
export interface SocialLink {
    name: string
    href: string
    icon: LucideIcon
}

export interface SoftSkill {
    icon: LucideIcon
    title: string
    desc: string
}

