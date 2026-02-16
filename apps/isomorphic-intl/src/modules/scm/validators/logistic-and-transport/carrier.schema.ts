import { z } from "zod"

import { messages } from "@/config/messages"

export const CarrierSchema = z.object({
  carrierName: z.string().min(1, messages.carrierName),
  phone: z.string().min(1, messages.phone),
  email: z.string().min(1, messages.email),
  address: z.string().min(1, messages.address),
})

export type CarrierFormInput = z.infer<typeof CarrierSchema>
