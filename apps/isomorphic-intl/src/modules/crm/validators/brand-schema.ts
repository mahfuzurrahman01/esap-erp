import { z } from "zod"

import { messages } from "@/config/messages"

export const brandFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, messages.thisFieldIsRequired),
})

export type BrandCreateFormTypes = z.infer<typeof brandFormSchema>
