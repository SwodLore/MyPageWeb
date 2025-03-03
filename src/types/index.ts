import { z } from 'zod'

/* skills */
export const skillsSchema = z.object({
    name: z.string(),
    img: z.string(),
    level: z.string(),
})
export type Skill = z.infer<typeof skillsSchema>

/* certificados */

export const certificateSchema = z.object({
    name: z.string(),
    teacher: z.string(),
    institution: z.string(),
    imgInstitution: z.string(),
    urlCertificate: z.string(),
    dateCertificate: z.string(),
})
export type Certificate = z.infer<typeof certificateSchema>
/* Tecnologías */

export const techSchema = z.object({
    name: z.string(),
    img: z.string(),
})
export type Tech = z.infer<typeof techSchema>

/* Portafolio */

export const portfolioSchema = z.object({
    name: z.string(),
    img: z.string(),
    urlPageWeb: z.string(),
    urlPageGithub: z.string(),
    tecnologias: z.array(techSchema),
    description: z.string(),
})
export type Portfolio = z.infer<typeof portfolioSchema>

