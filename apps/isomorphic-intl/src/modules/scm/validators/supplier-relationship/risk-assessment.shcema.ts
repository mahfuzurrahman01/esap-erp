import { messages } from "@/config/messages"
import { z } from "zod"

export const RiskAssessmentSchema = z.object({
  id: z.number().optional(),
  supplierId: z.number().min(1, messages.supplierIdRequired),
  riskType: z.string().min(1, messages.riskTypeIsRequired),
  riskDescription: z.string().optional(),
  mitigationPlan: z.string().optional(),
  riskStatus: z.string().min(1, messages.riskStatusIsRequired),
})

export type RiskAssessmentFormInput = z.infer<typeof RiskAssessmentSchema>
