import { z } from "zod"

import { messages } from "@/config/messages"

export const WorkCenterSchema = z.object({
  id: z.number().optional(),
  workCenterName: z.string().min(1, messages.workCenterNameRequired),
  location: z.string().min(1, messages.locationRequired),
  capacity: z.number().min(1, messages.capacityRequired),
})

export type WorkCenterFormInput = z.infer<typeof WorkCenterSchema>
