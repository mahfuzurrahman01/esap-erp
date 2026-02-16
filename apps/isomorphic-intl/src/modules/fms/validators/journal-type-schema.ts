import { z } from "zod"

import { messages } from "@/config/messages"

export const journalEntryTypeFormSchema = z.object({
  id: z.number().optional(),
  journalTypeName: z
    .string()
    .min(1, { message: messages.thisFieldIsRequired }),
  actions: z.string().optional(),
})

// generate form types from zod validation schema
export type JournalEntryTypeFormInput = z.infer<typeof journalEntryTypeFormSchema>
