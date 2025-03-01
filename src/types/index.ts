import { z } from 'zod'

/* skills */
export const skillsSchema = z.object({
    name: z.string(),
    img: z.string()
})
export type Skill = z.infer<typeof skillsSchema>