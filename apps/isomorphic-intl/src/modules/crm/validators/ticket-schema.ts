import { z } from "zod"

import { messages } from "@/config/messages"

export const ticketFormSchema = z.object({
  id: z.string().optional(),
  subject: z.string().min(1, messages.thisFieldIsRequired),
  service: z.string().min(1, messages.thisFieldIsRequired),
  departmentId: z.string().min(1, messages.thisFieldIsRequired),
  email: z.string().optional(),
  project: z.string().optional(),
  mergeTicketId: z.string().optional(),
  status: z.string().optional(),
  file: z.instanceof(File).nullable().optional(),
})

export type TicketCreationFormTypes = z.infer<typeof ticketFormSchema>
