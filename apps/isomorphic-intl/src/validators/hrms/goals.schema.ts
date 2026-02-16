import { z } from "zod"

import { messages } from "@/config/messages"

export const goalSchema = z.object({
  employeeId: z.number({
    required_error: messages.employeeIsRequired,
    invalid_type_error: messages.employeeIsRequired,
  }),
  goalName: z.string().min(1, { message: messages.nameRequired }),
  progress: z.number({
    required_error: messages.progressRequired,
    invalid_type_error: messages.progressRequired,
  }),
  deadline: z.string().min(1, { message: messages.deadlineRequired }),
  description: z.string().optional(),
  status: z.boolean().optional(),
  employee: z.any().optional(),
})

export type GoalFormInput = z.infer<typeof goalSchema>
