import { z } from "zod"

import { messages } from "@/config/messages"

export const assetTransactionTypeFormSchema = z.object({
  id: z.number().optional(),
  assetTransactionTypeName: z.string().min(1, {
    message: messages.assetTransactionTypeNameIsRequired,
  }),
})

export type AssetTransactionTypeFormInput = z.infer<
  typeof assetTransactionTypeFormSchema
>
