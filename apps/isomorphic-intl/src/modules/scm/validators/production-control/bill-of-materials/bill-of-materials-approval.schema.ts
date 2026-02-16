import { z } from "zod"

import { messages } from "@/config/messages"

export const BillOfMaterialsApprovalSchema = z.object({
  id: z.number().optional(),
  billOfMaterialId: z.number().optional(),
  approvalStatus: z.string().min(1, messages.approvalStatusIsRequired),
  approvedBy: z.string().optional(),
  approvedDate: z.string().min(1, messages.approvedDateIsRequired),
  approvedNotes: z.string().optional(),
})

export type BillOfMaterialsApprovalFormInput = z.infer<
  typeof BillOfMaterialsApprovalSchema
>
