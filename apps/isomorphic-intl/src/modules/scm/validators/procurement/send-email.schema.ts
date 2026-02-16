import { z } from "zod"

import { messages } from "@/config/messages"

export const SendEmailSchema = z.object({
  requisitionId: z.number().optional(),
  to: z.string().email().min(1, { message: messages.to }),
  subject: z.string().min(1, { message: messages.subject }),
  messageBody: z.string().min(1, { message: messages.messageBody }),
  attachmentFile: z.instanceof(File).optional(),
})

export type SendEmailSchemaInput = z.infer<typeof SendEmailSchema>
