import { z } from "zod"

import { messages } from "@/config/messages"

export const categoryFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, messages.thisFieldIsRequired),
  parentCategoryId: z.any().optional(),
  status: z.string().optional(),
})

export type CategoryCreateFormTypes = z.infer<typeof categoryFormSchema>
