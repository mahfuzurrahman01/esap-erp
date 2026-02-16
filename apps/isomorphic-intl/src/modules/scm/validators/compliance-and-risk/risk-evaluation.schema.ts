import { z } from "zod"

import { messages } from "@/config/messages"
import { RiskEvaluation } from "@/modules/scm/types/compliance-and-risk/risk-evaluation"

export const RiskEvaluationSchema: z.ZodSchema<RiskEvaluation> = z.object({
  riskType: z.string().min(1, messages.riskTypeIsRequired),
  riskImpact: z.string().min(1, messages.riskImpactIsRequired),
  riskProbability: z.string().min(1, messages.riskProbabilityIsRequired),
  residualRisk: z.string().optional(),
  followUpAction: z.string().optional(),
  riskDescription: z.string().optional(),
  mitigationAction: z.string().optional(),
  responsibleParty: z.string().min(1, messages.responsiblePartyIsRequired),
  mitigationDeadline: z.string().min(1, messages.mitigationDeadlineIsRequired),
  mitigationStatus: z.string().min(1, messages.mitigationStatusIsRequired),
  riskStatus: z.string().min(1, messages.riskStatusIsRequired),
  comments: z.string().optional(),
})

export type RiskEvaluationFormInput = z.infer<typeof RiskEvaluationSchema>
