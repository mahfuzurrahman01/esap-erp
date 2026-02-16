import { z } from "zod"

import { messages } from "@/config/messages"

// Journal Detail validation schema
const journalDetailSchema = z.object({
  id: z.number(),
  chartOfAccountId: z.number(),
  debit: z.union([z.number(), z.null()]).optional(),
  credit: z.union([z.number(), z.null()]).optional(),
})

// Journal Entry validation schema
export const journalEntryFormSchema = z.object({
  id: z.number(),
  journalNo: z.string(),
  journalTypeId: z
    .number()
    .min(1, { message: messages.journalEntryTypeRequired }),
  postingDate: z.string(),
  companyId: z.number().min(1, { message: messages.companyRequired }),
  journalTemplateId: z.union([z.number(), z.null()]).optional(),
  journalDetails: z.array(journalDetailSchema),
  referenceNo: z.string().min(1, { message: messages.thisFieldIsRequired }),
  referenceDate: z.string().min(1, { message: messages.thisFieldIsRequired }),
  totalDebit: z.union([z.number(), z.null()]).optional(),
  totalCredit: z.union([z.number(), z.null()]).optional(),
})

// Template detail schema
const templateDetailSchema = z.object({
  id: z.number().optional(),
  chartOfAccountId: z.number(),
})

// Template schema - updated to match JournalTemplate type
export const journalTemplateFormSchema = z.object({
  id: z.number().optional(),
  journalTemplateTitle: z
    .string()
    .min(1, { message: messages.templateTitleRequired }),
  companyId: z.number(),
  journalTypeId: z.number().optional(),
  chartOfAccountIds: z
    .array(z.number())
    .min(1, { message: messages.chartOfAccountRequired }),
})

// generate form types from zod validation schema
export type JournalEntryFormInput = z.infer<typeof journalEntryFormSchema>
export type JournalTemplateFormInput = z.infer<typeof journalTemplateFormSchema>
