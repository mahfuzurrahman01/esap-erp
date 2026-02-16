import { z } from "zod"

import { messages } from "@/config/messages"

const feedbackQuestionSchema = z.object({
  question: z.string(),
  answerType: z.enum(["text", "rating"]),
  answer: z.string().nullable(),
})

export const appraisalSchema = z.object({
  appraisalName: z.string().min(1, { message: messages.nameRequired }),
  employeeId: z.number({
    required_error: messages.employeeIsRequired,
    invalid_type_error: messages.employeeIsRequired,
  }),
  templateId: z.number({
    required_error: messages.templateRequired,
    invalid_type_error: messages.templateRequired,
  }),
  startDate: z.string().min(1, { message: messages.startDateIsRequired }),

  endDate: z.string().min(1, { message: messages.endDateIsRequired }),

  status: z
    .enum(["New", "Submitted", "Done", "Cancelled"])
    .default("New")
    .optional(),
  description: z.string().optional(),
  managerId: z.number().optional(),
})

export type AppraisalFormInput = z.infer<typeof appraisalSchema>
