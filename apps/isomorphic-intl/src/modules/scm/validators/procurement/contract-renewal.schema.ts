import { messages } from "@/config/messages"
import { z } from "zod"

export const contractRenewalSchema = z.object({
  startDate: z.string().min(1, messages.startDateIsRequired),
  endDate: z.string().min(1, messages.endDateIsRequired),
})

export const updateContractRenewalSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export type ContractRenewalSchemaInput = z.infer<typeof contractRenewalSchema>

export type UpdateContractRenewalSchemaInput = z.infer<
  typeof updateContractRenewalSchema
>
