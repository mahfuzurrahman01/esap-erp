import { z } from "zod"

import { messages } from "@/config/messages"

export const MaterialAvailabilityApprovalSchema = z.object({
  materialRequirementPlanId: z.number().optional(),
  approvalStatus: z.string().min(1, messages.approvalStatusIsRequired),
  approvedDate: z.string().min(1, messages.approvedDateIsRequired),
  approvedNotes: z.string().optional(),
})

export type MaterialAvailabilityApprovalFormInput = z.infer<
  typeof MaterialAvailabilityApprovalSchema
>
