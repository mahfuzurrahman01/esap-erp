import { z } from "zod"

import { messages } from "@/config/messages"

export const unitFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, messages.thisFieldIsRequired),
})

export type UnitCreateFormTypes = z.infer<typeof unitFormSchema>
