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

/* Entregables de una semana: informe PDF, repositorio, deploy en vivo,
   diapositivas, documentación o evidencia de metodología Scrum */
export const ENTREGABLE_TIPOS = ['pdf', 'github', 'web', 'slides', 'docs', 'scrum'] as const
export const entregableSchema = z.object({
    tipo: z.enum(ENTREGABLE_TIPOS),
    label: z.string(),
    href: z.string().url(),
})
export type Entregable = z.infer<typeof entregableSchema>

/* Anotaciones semanales del curso (página /anotaciones) */
export const anotacionSchema = z.object({
    semana: z.number().int().positive(),
    titulo: z.string(),
    fecha: z.string(),
    content: z.string(),
    temas: z.array(z.string()),
    estado: z.enum(['completado', 'en-curso', 'pendiente']),
    unidad: z.enum(['I', 'II']),
    avance: z.number().min(0).max(100),
    reflexion: z.string().optional(),
    imagenes: z.array(z.object({ src: z.string(), caption: z.string() })).optional(),
    entregables: z.array(entregableSchema).optional(),
})
export type Anotacion = z.infer<typeof anotacionSchema>

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

