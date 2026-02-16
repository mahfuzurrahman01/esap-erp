import { z } from "zod"

import { messages } from "@/config/messages"

export const MachineSchema = z.object({
  id: z.number().optional(),
  machineName: z.string().min(1, messages.machineNameRequired),
  description: z.string().min(1, messages.descriptionRequired),
  registerDate: z.string().min(1, messages.registerDateRequired),
  expireDate: z.string().min(1, messages.expireDateRequired),
  cost: z.number().min(1, messages.costRequired),
  status: z.string().min(1, messages.statusRequired),
})

export type MachineFormInput = z.infer<typeof MachineSchema>
