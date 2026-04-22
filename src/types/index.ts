import { z } from 'zod'

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

