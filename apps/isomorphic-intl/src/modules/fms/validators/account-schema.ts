import { z } from "zod"

import { messages } from "@/config/messages"

// form zod validation schema
export const accountFormSchema = z.object({
  id: z.number().optional(),
  accountName: z.string().min(1, { message: messages.accounting }),
  accountNumber: z.string().optional().nullable(),
  accountingTypeId: z.number().min(1, { message: messages.accountingType }),
  balanceMustBe: z.string().optional().nullable(),
  companyId: z.number().min(1, { message: messages.companyName }),
  currencyId: z.number().min(1, { message: messages.currency }),
  taxRate: z.string().optional().nullable(),
  rootType: z.string().optional().nullable(),
  reportType: z.string().optional().nullable(),
  isParent: z.boolean().optional(),
  isDisabled: z.boolean().optional(),
})
// generate form types from zod validation schema
export type AccountFormInput = z.infer<typeof accountFormSchema>
