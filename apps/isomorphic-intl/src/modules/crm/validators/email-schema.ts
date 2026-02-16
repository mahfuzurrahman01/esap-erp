import { messages } from "@/config/messages"
import { z } from "zod"

export const sendEmailFormSchema = z.object({
  to: z.string().min(1, messages.thisFieldIsRequired),
  subject: z.string().min(1, messages.thisFieldIsRequired),
  body: z.string().optional(),
})

export type SendMailFormTypes = z.infer<typeof sendEmailFormSchema>
