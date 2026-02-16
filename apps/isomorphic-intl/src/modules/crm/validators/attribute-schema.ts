import { z } from "zod"

import { messages } from "@/config/messages"

export const attributeFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, messages.thisFieldIsRequired),
  attributeValue: z.any().optional(),
})

export type AttributeCreateFormTypes = z.infer<typeof attributeFormSchema>
