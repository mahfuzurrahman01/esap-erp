import { z } from "zod"

import { messages } from "@/config/messages"

export const paymentMethodsSchema = z.object({
  name: z.string().min(1, messages.nameIsRequired),
  description: z.string().min(1, messages.descriptionIsRequired),
})

export type PaymentMethodsSchemaInput = z.infer<typeof paymentMethodsSchema>
