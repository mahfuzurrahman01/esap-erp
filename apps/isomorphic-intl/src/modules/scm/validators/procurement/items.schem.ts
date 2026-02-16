import { z } from "zod"

import { messages } from "@/config/messages"

export const itemsSchema = z.object({
  name: z.string().min(1, messages.nameIsRequired),
  description: z.string().min(1, messages.descriptionIsRequired),
  remarks: z.string().min(1, messages.remarksIsRequired),
})

export type ItemsSchemaInput = z.infer<typeof itemsSchema>
