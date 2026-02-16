import { z } from "zod"

import { messages } from "@/config/messages"

// form zod validation schema
export const countryFormSchema = z.object({
  id: z.number().optional(),
  countryName: z.string().min(1, { message: messages.countryNameIsRequired }),
  countryCode: z.string().optional(),
  dateFormat: z.string().optional(),
  timeFormat: z.string().optional(),
  timeZone: z.string().optional(),
  isEnabled: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  actions: z.string().optional(),
})

// generate form types from zod validation schema
export type CountryFormInput = z.infer<typeof countryFormSchema>
