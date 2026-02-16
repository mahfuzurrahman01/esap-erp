import { z } from "zod"

import { messages } from "@/config/messages"

const feedbackQuestionSchema = z.object({
  question: z.string().optional(),
  answerType: z.enum(["text", "rating"]),
  answer: z.string().nullable(),
})

export const appraisalTemplateSchema = z.object({
  templateName: z.string().min(1, { message: messages.nameRequired }),
  employeeFeedback: z.array(feedbackQuestionSchema),
  managerFeedback: z.array(feedbackQuestionSchema),
  description: z.string().optional(),
})

export type AppraisalTemplateFormInput = z.infer<typeof appraisalTemplateSchema>
