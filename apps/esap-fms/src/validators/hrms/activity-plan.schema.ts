import * as z from "zod"

import { messages } from "@/config/messages"

const activitySchema = z.object({
  activityName: z.string().min(1, { message: messages.nameIsRequired }),
  summary: z.string().min(1, { message: messages.summaryIsRequired }),
  assignedTo: z
    .union([z.number(), z.string()])
    .refine((value) => value !== undefined && value !== null && value !== "", {
      message: messages.assignedToIsRequired,
    }),
})

export const planFormSchema = z.object({
  planName: z.string().min(1, { message: messages.nameIsRequired }),
  activities: z
    .array(activitySchema)
    .min(1, { message: messages.atLeastOneActivityRequired }),
  departmentId: z.union([z.number(), z.string()]).nullable().optional(),
})

export type PlanFormInput = z.infer<typeof planFormSchema>
