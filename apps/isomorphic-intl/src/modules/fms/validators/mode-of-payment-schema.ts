import { z } from "zod"

import { messages } from "@/config/messages"

export const modeOfPaymentDetailsSchema = z.object({
  id: z.number(),
  modeOfPaymentId: z.number().optional().nullable(),
  companyId: z.number().optional().nullable(),
  companyName: z.string().optional().nullable(),
  chartOfAccountId: z.number().optional().nullable(),
  chartOfAccountName: z.string().optional().nullable(),
})

// form zod validation schema
export const modeOfPaymentFormSchema = z.object({
  id: z.number().optional(),
  modeOfPaymentName: z
    .string()
    .min(1, { message: messages.modeOfPaymentNameRequired }),
  modeOfPaymentType: z
    .string()
    .min(1, { message: messages.modeOfPaymentNameRequired }),
  isActive: z.boolean().optional().nullable(),
  comment: z.string().optional().nullable(),
  companyId: z.number().optional().nullable(),
  chartOfAccountId: z.number().optional().nullable(),
})

export type ModeOfPaymentFormInput = z.infer<typeof modeOfPaymentFormSchema>
