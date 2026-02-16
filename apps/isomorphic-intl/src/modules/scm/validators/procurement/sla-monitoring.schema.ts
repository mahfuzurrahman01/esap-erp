import { z } from "zod"

import { messages } from "@/config/messages"

export const SlaPerformanceSchema = z.object({
  auditName: z.string().min(1, messages.auditNameIsRequired),
  expectedPerformance: z.string().min(1, messages.expectedPerformanceIsRequired),
  actualPerformance: z.string().min(1, messages.actualPerformanceIsRequired),
  auditDate: z.string().min(1, messages.auditDateIsRequired),
  comments: z.string().optional(),
  status: z.string().min(1, messages.statusIsRequired),
})

export type SlaPerformanceTypes = z.infer<typeof SlaPerformanceSchema>
