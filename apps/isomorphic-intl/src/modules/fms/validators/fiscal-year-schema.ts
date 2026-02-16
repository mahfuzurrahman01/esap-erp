import { z } from "zod"

import { messages } from "@/config/messages"

// form zod validation schema
export const fiscalYearFormSchema = z.object({
  id: z.number().optional(),
  yearRange: z.string().min(1, { message: messages.yearRangeRequired }),
  startDate: z.string().min(1, { message: messages.startDateRequired }),
  endDate: z.string().min(1, { message: messages.endDateRequired }),
  actions: z.string().optional(),
})

// generate form types from zod validation schema
export type FiscalYearFormInput = z.infer<typeof fiscalYearFormSchema>
