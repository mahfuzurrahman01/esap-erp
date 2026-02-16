import { z } from "zod"

import { messages } from "@/config/messages"

export const BillOfMaterialsVersionSchema = z.object({
  billOfMaterialId: z.number().optional(),
  versionNumber: z.string().min(1, messages.versionNumberIsRequired),
  effectiveDate: z.string().min(1, messages.effectiveDateIsRequired),
  versionDate: z.string().min(1, messages.versionDateIsRequired),
})

export type BillOfMaterialsVersionFormInput = z.infer<
  typeof BillOfMaterialsVersionSchema
>
