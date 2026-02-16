import { z } from "zod"

import { messages } from "@/config/messages"

export const requisitionApprovalSchema = z.object({
  requisitionId: z.number().optional(),
  approvedBy: z.string().min(1, messages.nameIsRequired),
  approvalNotes: z.string().min(1, messages.approvalNotesIsRequired),
  approvalStatus: z.string().optional(),
  approvalDate: z.string().optional(),
})

export type RequisitionApprovalSchemaInput = z.infer<
  typeof requisitionApprovalSchema
>
