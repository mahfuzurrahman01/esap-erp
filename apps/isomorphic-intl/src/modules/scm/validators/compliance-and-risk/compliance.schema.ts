import { z } from "zod"

import { messages } from "@/config/messages"

export const ComplianceSchema = z.object({
  complianceArea: z.string().min(1, messages.complianceAreaIsRequired),
  regulationStandard: z.string().min(1, messages.regulationStandardIsRequired),
  taskName: z.string().min(1, messages.taskNameIsRequired),
  assignedToId: z.number().min(1, messages.assignedToIdIsRequired),
  assignedToName: z.string().optional(),
  dueDate: z.string().min(1, messages.dueDateIsRequired),
  completionStatus: z.string().min(1, messages.completionStatusIsRequired),
  proofDocumentUrl: z.any().optional(),
  comments: z.string().optional(),
})

export type ComplianceFormInput = z.infer<typeof ComplianceSchema>
