import { z } from "zod"

export const targetFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  type: z.string().optional(),
  targetValue: z.number().optional(),
  quarter: z.string().optional(),
  month: z.string().optional(),
  year: z.string().optional(),
  status: z.string().optional(),
})

export type TargetCreationFormTypes = z.infer<typeof targetFormSchema>
