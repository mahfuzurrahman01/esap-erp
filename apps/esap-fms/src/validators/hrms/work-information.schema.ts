import { z } from "zod"

import { messages } from "@/config/messages"

const WorkInformationSchema = z.object({
  id: z.number().optional(),
  employeeId: z.number().optional(),
  workingAddressId: z
    .number()
    .min(1, { message: messages.workAddressRequired })
    .nullable(),
  state: z.string().optional(),
  country: z.string().min(1, { message: messages.countryRequired }).nullable(),
  workLocation: z.string().optional(),
  approverId: z.number().nullable().optional(),
  dailyHRId: z.number().nullable().optional(),
  workingScheduleId: z
    .number()
    .min(1, { message: messages.workScheduleRequired })
    .nullable(),
  timezone: z.string().optional(),
  createdDate: z.string().nullable().optional(),
  updatedDate: z.string().nullable().optional(),
  dateOfJoining: z.union([z.string(), z.null()]).optional(),
})

type WorkInformationFormInputType = z.infer<typeof WorkInformationSchema>

export { WorkInformationSchema, type WorkInformationFormInputType }
