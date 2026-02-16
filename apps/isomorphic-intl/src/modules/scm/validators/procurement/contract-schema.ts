import { z } from "zod"

import { messages } from "@/config/messages"

export const contractSchema = z.object({
  contractName: z.string().min(1, messages.contractName),
  contractValue: z.number().min(1, messages.contractValue),
  startDate: z.string().min(1, messages.startDateIsRequired),
  endDate: z.string().min(1, messages.endDateIsRequired),
  paymentTermsId: z.number().min(1, messages.paymentTermsIdRequired),
  currencyId: z.number().min(1, messages.currencyIdRequired),
})

export type ContractSchemaInput = z.infer<typeof contractSchema>
