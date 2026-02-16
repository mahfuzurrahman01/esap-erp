import { z } from "zod"

import { messages } from "@/config/messages"

export const messageFormSchema = z.object({
  newMessage: z.string().min(1, messages.thisFieldIsRequired),
})