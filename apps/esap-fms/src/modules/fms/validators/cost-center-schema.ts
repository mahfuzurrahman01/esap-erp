import { z } from "zod"

import { messages } from "@/config/messages"

// form zod validation schema
export const costCenterFormSchema = z.object({
  id: z.number().optional(),
  costCenterName: z.string().min(1, { message: messages.thisFieldIsRequired }),
  companyId: z.number(),
  isActive: z.boolean().optional(),
  actions: z.string().optional(),
})

// generate form types from zod validation schema
export type CostCenterFormInput = z.infer<typeof costCenterFormSchema>
