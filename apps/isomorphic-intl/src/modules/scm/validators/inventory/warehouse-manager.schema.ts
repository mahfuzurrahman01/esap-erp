import { z } from "zod"

import { messages } from "@/config/messages"

// Zod validation schema for WarehouseManager
export const WarehouseManagerSchema = z.object({
  name: z.string().min(1, messages.nameRequired),
  contact: z.string().optional(),
})

export type WarehouseManagerFormInput = z.infer<typeof WarehouseManagerSchema>
