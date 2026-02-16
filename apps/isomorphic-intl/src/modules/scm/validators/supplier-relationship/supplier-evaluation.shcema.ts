import { z } from "zod"

import { messages } from "@/config/messages"

export const SupplierEvaluationSchema = z.object({
  supplierId: z.number().optional(),
  overallScore: z.number().optional(),
  evaluationDate: z.string().min(1, messages.evaluationDate),
  evaluatorName: z.string().min(1, messages.evaluatorName),
  comments: z.string().optional(),
  evaluationCriteries: z.array(z.any()).optional(),
})

export type SupplierEvaluationFormInput = z.infer<
  typeof SupplierEvaluationSchema
>
